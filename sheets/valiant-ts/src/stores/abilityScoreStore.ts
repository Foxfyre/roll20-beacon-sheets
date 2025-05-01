import { defineStore } from 'pinia';
import { ref, reactive, computed } from 'vue';
import getRollResult from '@/utility/getRollResult';
import rollToChat from '@/utility/rollToChat';
import sendToChat from '@/utility/sendToChat';

export type AbilityScoresHydrate = {
    abilityScores: {
        Strength: { base: number; mod: number; total: number };
        Fighting: { base: number; mod: number; total: number };
        Stamina: { base: number; mod: number; total: number };
        Intellect: { base: number; mod: number; total: number };
        Agility: { base: number; mod: number; total: number };
        Awareness: { base: number; mod: number; total: number };
        Dexterity: { base: number; mod: number; total: number };
        Presence: { base: number; mod: number; total: number };
    }
};

export type AbilityScore = 'Strength' | 'Fighting' | 'Stamina' | 'Intellect' | 'Agility' | 'Awareness' | 'Dexterity' | 'Presence';

export const useAbilityScoreStore = defineStore('abilityScores', () => {

    const StrengthBase = ref(0);
    const FightingBase = ref(0);
    const StaminaBase = ref(0);
    const IntellectBase = ref(0);
    const AgilityBase = ref(0);
    const AwarenessBase = ref(0);
    const DexterityBase = ref(0);
    const PresenceBase = ref(0);

    const StrengthMod = ref(0);
    const FightingMod = ref(0);
    const StaminaMod = ref(0);
    const IntellectMod = ref(0);
    const AgilityMod = ref(0);
    const AwarenessMod = ref(0);
    const DexterityMod = ref(0);
    const PresenceMod = ref(0);

    const abilityShortCodes = {
        Strength: 'str',
        Fighting: 'fgt',
        Stamina: 'sta',
        Intellect: 'int',
        Agility: 'agi',
        Awareness: 'awa',
        Dexterity: 'dex',
        Presence: 'pre'
    };

    const abilityScoreTips = {
        Strength: 'Close Damage',
        Fighting: 'Close Attack Checks, Parry Defense',
        Stamina: 'Toughness Defense, Fortitude Defense',
        Intellect: 'Intelligence Checks',
        Agility: 'Dodge Defense, Initiative Bonus',
        Awareness: 'Will Defense',
        Dexterity: 'Ranged Attack Checks',
        Presence: 'Presence Checks'
    };

    const abilityScores = computed({
        get() {
            return {
                Strength: { 
                    base: StrengthBase.value, 
                    mod: StrengthMod.value, 
                    total: StrengthBase.value + StrengthMod.value 
                },
                Fighting: { 
                    base: FightingBase.value, 
                    mod: FightingMod.value, 
                    total: FightingBase.value + FightingMod.value 
                },
                Stamina: { 
                    base: StaminaBase.value, 
                    mod: StaminaMod.value, 
                    total: StaminaBase.value + StaminaMod.value 
                },
                Intellect: { 
                    base: IntellectBase.value, 
                    mod: IntellectMod.value, 
                    total: IntellectBase.value + IntellectMod.value 
                },
                Agility: { 
                    base: AgilityBase.value, 
                    mod: AgilityMod.value, 
                    total: AgilityBase.value + AgilityMod.value 
                },
                Awareness: { 
                    base: AwarenessBase.value, 
                    mod: AwarenessMod.value, 
                    total: AwarenessBase.value + AwarenessMod.value 
                },
                Dexterity: { 
                    base: DexterityBase.value, 
                    mod: DexterityMod.value, 
                    total: DexterityBase.value + DexterityMod.value 
                },
                Presence: { 
                    base: PresenceBase.value, 
                    mod: PresenceMod.value, 
                    total: PresenceBase.value + PresenceMod.value 
                }
            };
        },
        set(scores) {
            StrengthBase.value = scores.Strength.base ?? StrengthBase.value;
            FightingBase.value = scores.Fighting.base ?? FightingBase.value;
            StaminaBase.value = scores.Stamina.base ?? StaminaBase.value;
            IntellectBase.value = scores.Intellect.base ?? IntellectBase.value;
            AgilityBase.value = scores.Agility.base ?? AgilityBase.value;
            AwarenessBase.value = scores.Awareness.base ?? AwarenessBase.value;
            DexterityBase.value = scores.Dexterity.base ?? DexterityBase.value;
            PresenceBase.value = scores.Presence.base ?? PresenceBase.value;

            StrengthMod.value = scores.Strength.mod ?? StrengthMod.value;
            FightingMod.value = scores.Fighting.mod ?? FightingMod.value;
            StaminaMod.value = scores.Stamina.mod ?? StaminaMod.value;
            IntellectMod.value = scores.Intellect.mod ?? IntellectMod.value;
            AgilityMod.value = scores.Agility.mod ?? AgilityMod.value;
            AwarenessMod.value = scores.Awareness.mod ?? AwarenessMod.value;
            DexterityMod.value = scores.Dexterity.mod ?? DexterityMod.value;
            PresenceMod.value = scores.Presence.mod ?? PresenceMod.value;
        }
    });

    const rollAbility = async (name: AbilityScore) => {

        console.log(`Rolling ability score for: ${name}`);
        console.log('Ability Scores:', abilityScores.value);

        // Validate the ability name
        if (!abilityScores.value[name]) {
            console.error(`Invalid ability name: ${name}`);
            return;
        }

        const ability = abilityScores.value[name];
        console.log(`Ability object for ${name}:`, ability);

        const baseScore = ability.base;
        const modScore = ability.mod;
        const totalScore = ability.total;

        console.log(`Base score for ${name}: ${baseScore}`);
        console.log(`Modifier score for ${name}: ${modScore}`);
        console.log(`Total score for ${name}: ${totalScore}`);

        const diceAmount = 1;
        const diceSides = 20;

        const components = [
            { label: `Base Roll`, sides: diceSides, count: diceAmount, alwaysShowInBreakdown: true },
            { label: 'Ability Score', value: Number(totalScore)}
        ]

        const { total: result } = await getRollResult([
            { count: Number(diceAmount), sides: Number(diceSides) },
            { label: `${name} Bonus`, value: totalScore },
        ]);

        //console.log(result);

        await rollToChat({
            title: `${name} Ability Check`,
            subtitle: `Rolling ${name}`,
            traits: ['Ability Check'],
            allowHeroDie: false,
            components,
        });
    }

    const heroDiceFailure = async (title: string): Promise<void> => {
        await sendToChat({
            title,
            subtitle: 'Failure!',
            textContent: "Uh Oh! You've run out of Hero Dice!!",
        });
    };

    const dehydrate = () => {
        // We save our entire object with the base/mod/total scores.
        return { abilityScores: abilityScores.value };
    };

    // Hydrate determines how the store is updated when we receive updates from Firebase
    const hydrate = (hydrateStore: AbilityScoresHydrate) => {
        abilityScores.value = hydrateStore.abilityScores;
    };

    return {
        abilityScores,
        abilityShortCodes,
        abilityScoreTips,
        rollAbility,
        dehydrate,
        hydrate
    };
});