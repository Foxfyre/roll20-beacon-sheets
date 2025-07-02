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

    const abilityScores = reactive({
        Strength: {
          base: StrengthBase,
          mod: StrengthMod,
          get total() {
            return Number(StrengthBase.value) + Number(StrengthMod.value);
          }
        },
        Fighting: {
          base: FightingBase,
          mod: FightingMod,
          get total() {
            return Number(FightingBase.value) + Number(FightingMod.value);
          }
        },
        Stamina: {
          base: StaminaBase,
          mod: StaminaMod,
          get total() {
            return Number(StaminaBase.value) + Number(StaminaMod.value);
          }
        },
        Intellect: {
          base: IntellectBase,
          mod: IntellectMod,
          get total() {
            return Number(IntellectBase.value) + Number(IntellectMod.value);
          }
        },
        Agility: {
          base: AgilityBase,
          mod: AgilityMod,
          get total() {
            return Number(AgilityBase.value) + Number(AgilityMod.value);
          }
        },
        Awareness: {
          base: AwarenessBase,
          mod: AwarenessMod,
          get total() {
            return Number(AwarenessBase.value) + Number(AwarenessMod.value);
          }
        },
        Dexterity: {
          base: DexterityBase,
          mod: DexterityMod,
          get total() {
            return Number(DexterityBase.value) + Number(DexterityMod.value);
          }
        },
        Presence: {
          base: PresenceBase,
          mod: PresenceMod,
          get total() {
            return Number(PresenceBase.value) + Number(PresenceMod.value);
          }
        },
      });
      

    const rollAbility = async (name: AbilityScore) => {

        console.log(`Rolling ability score for: ${name}`);
        console.log('Ability Scores:', abilityScores[name]);

        // Validate the ability name
        if (!abilityScores[name]) {
            console.error(`Invalid ability name: ${name}`);
            return;
        }

        const ability = abilityScores[name];
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
/*         const out: Record<string, { base: number; mod: number; total: number }> = {};
      
        for (const key in abilityScores) {
          const k = key as keyof typeof abilityScores;
          out[k] = {
            base: abilityScores[k].base,
            mod: abilityScores[k].mod,
            total: abilityScores[k].total
          };
        }
      
        return { abilityScores: out }; */
        return {abilityScores: abilityScores };
      };
      
      const hydrate = (hydrateStore: AbilityScoresHydrate) => {
        for (const key in hydrateStore.abilityScores) {
          const k = key as keyof typeof abilityScores;
          abilityScores[k].base = hydrateStore.abilityScores[k].base;
          abilityScores[k].mod = hydrateStore.abilityScores[k].mod;
        }
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