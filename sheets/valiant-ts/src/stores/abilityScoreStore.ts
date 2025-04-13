import { defineStore } from 'pinia';
import { ref, reactive, computed } from 'vue';
//import rollToChat from '@/utility/rollToChat';

export type AbilityScoresHydrate = {
    abilityScores: {
        Strength: { base: number; current: number };
        Fighting: { base: number; current: number };
        Stamina: { base: number; current: number };
        Intellect: { base: number; current: number };
        Agility: { base: number; current: number };
        Awareness: { base: number; current: number };
        Dexterity: { base: number; current: number };
        Presence: { base: number; current: number };
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

    const StrengthCurrent = ref(0);
    const FightingCurrent = ref(0);
    const StaminaCurrent = ref(0);
    const IntellectCurrent = ref(0);
    const AgilityCurrent = ref(0);
    const AwarenessCurrent = ref(0);
    const DexterityCurrent = ref(0);
    const PresenceCurrent = ref(0);

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
                Strength: { base: StrengthBase.value, current: StrengthCurrent.value },
                Fighting: { base: FightingBase.value, current: FightingCurrent.value },
                Stamina: { base: StaminaBase.value, current: StaminaCurrent.value },
                Intellect: { base: IntellectBase.value, current: IntellectCurrent.value },
                Agility: { base: AgilityBase.value, current: AgilityCurrent.value },
                Awareness: { base: AwarenessBase.value, current: AwarenessCurrent.value },
                Dexterity: { base: DexterityBase.value, current: DexterityCurrent.value },
                Presence: { base: PresenceBase.value, current: PresenceCurrent.value }
            }
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

            StrengthCurrent.value = scores.Strength.current ?? StrengthCurrent.value;
            FightingCurrent.value = scores.Fighting.current ?? FightingCurrent.value;
            StaminaCurrent.value = scores.Stamina.current ?? StaminaCurrent.value;
            IntellectCurrent.value = scores.Intellect.current ?? IntellectCurrent.value;
            AgilityCurrent.value = scores.Agility.current ?? AgilityCurrent.value;
            AwarenessCurrent.value = scores.Awareness.current ?? AwarenessCurrent.value;
            DexterityCurrent.value = scores.Dexterity.current ?? DexterityCurrent.value;
            PresenceCurrent.value = scores.Presence.current ?? PresenceCurrent.value;
        }
    });

    const dehydrate = () => {
        // We save our entire object with the base/current scores.
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
        dehydrate,
        hydrate
    };
});