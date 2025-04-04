import { defineStore } from 'pinia';
import { ref, reactive, computed } from 'vue';
//import rollToChat from '@/utility/rollToChat';

export const useAbilityScoreStore = defineStore('abilityScores', () => {

    const abilityScores = reactive({
        Strength: { base: ref(0), current: ref(0) },
        Fighting: { base: ref(0), current: ref(0) },
        Stamina: { base: ref(0), current: ref(0) },
        Intellect: { base: ref(0), current: ref(0) },
        Agility: { base: ref(0), current: ref(0) },
        Awareness: { base: ref(0), current: ref(0) },
        Dexterity: { base: ref(0), current: ref(0) },
        Presence: { base: ref(0), current: ref(0) }
    });

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

    const dehydrate = () => {
        return Object.keys(abilityScores).reduce((result, key) => {
            result[key] = {
                base: abilityScores[key].base.value,
                current: abilityScores[key].current.value
            };
            return result;
        }, {});
    };

    const hydrate = (hydratedData) => {
        Object.keys(hydratedData).forEach(key => {
            if (abilityScores[key]) {
                abilityScores[key].base.value = hydratedData[key].base ?? abilityScores[key].base.value;
                abilityScores[key].current.value = hydratedData[key].current ?? abilityScores[key].current.value;
            }
        });
    };

    return {
        abilityScores,
        abilityShortCodes,
        abilityScoreTips,
        dehydrate,
        hydrate
    };
});