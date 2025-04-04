import { defineStore } from 'pinia';
import { ref, reactive, computed } from 'vue';
import { useAbilityScoreStore } from '@/stores/abilityScoreStore';

export const useSkillStore = defineStore('skillScores', () => {
    const abilityScores = useAbilityScoreStore().abilityScores;
    const abilityShortCodes = useAbilityScoreStore().abilityShortCodes;

    const skillScores = reactive({
        Acrobatics: {
            base: ref(0),
            current: computed(() => skillScores.Acrobatics.base + Number(abilityScores.Agility.base || 0)),
            shortAbility: abilityShortCodes.Agility,
            modifier: computed(() => abilityScores.Agility.base), // Computed Modifier
            isTrained: true,
            label: "acrobatics"
        },
        Athletics: {
            base: ref(0),
            current: computed(() => skillScores.Athletics.base + Number(abilityScores.Strength.base || 0)),
            shortAbility: abilityShortCodes.Strength,
            modifier: computed(() => abilityScores.Strength.base),
            isTrained: false,
            label: "athletics"
        },
        CloseCombat: {
            base: ref(0),
            current: computed(() => skillScores.CloseCombat.base + Number(abilityScores.Fighting.base || 0)),
            shortAbility: abilityShortCodes.Fighting,
            modifier: computed(() => abilityScores.Fighting.base),
            isTrained: false,
            label: "close combat"
        },
        Computers: {
            base: ref(0),
            current: computed(() => skillScores.Computers.base + Number(abilityScores.Intellect.base || 0)),
            shortAbility: abilityShortCodes.Intellect,
            modifier: computed(() => abilityScores.Intellect.base),
            isTrained: true,
            label: "computers"
        },
        Deception: {
            base: ref(0),
            current: computed(() => skillScores.Deception.base + Number(abilityScores.Presence.base || 0)),
            shortAbility: abilityShortCodes.Presence,
            modifier: computed(() => abilityScores.Presence.base),
            isTrained: false,
            label: "deception"
        },
        Driving: {
            base: ref(0),
            current: computed(() => skillScores.Driving.base + Number(abilityScores.Dexterity.base || 0)),
            shortAbility: abilityShortCodes.Dexterity,
            modifier: computed(() => abilityScores.Dexterity.base),
            isTrained: true,
            label: "driving"
        },
        Electronics: {
            base: ref(0),
            current: computed(() => skillScores.Electronics.base + Number(abilityScores.Intellect.base || 0)),
            shortAbility: abilityShortCodes.Intellect,
            modifier: computed(() => abilityScores.Intellect.base),
            isTrained: true,
            label: "electronics"
        },
        Expertise: {
            base: ref(0),
            current: computed(() => skillScores.Expertise.base + Number(abilityScores.Intellect.base || 0)),
            shortAbility: abilityShortCodes.Intellect,
            modifier: computed(() => abilityScores.Intellect.base),
            isTrained: true,
            label: "expertise"
        },
        Insight: {
            base: ref(0),
            current: computed(() => skillScores.Insight.base + Number(abilityScores.Awareness.base || 0)),
            shortAbility: abilityShortCodes.Awareness,
            modifier: computed(() => abilityScores.Awareness.base),
            isTrained: false,
            label: "insight"
        },
        Intimidation: {
            base: ref(0),
            current: computed(() => skillScores.Intimidation.base + Number(abilityScores.Presence.base || 0)),
            shortAbility: abilityShortCodes.Presence,
            modifier: computed(() => abilityScores.Presence.base),
            isTrained: false,
            label: "intimidation"
        },
        Investigation: {
            base: ref(0),
            current: computed(() => skillScores.Investigation.base + Number(abilityScores.Intellect.base || 0)),
            shortAbility: abilityShortCodes.Intellect,
            modifier: computed(() => abilityScores.Intellect.base),
            isTrained: true,
            label: "investigation"
        },
        Mechanics: {
            base: ref(0),
            current: computed(() => skillScores.Mechanics.base + Number(abilityScores.Intellect.base || 0)),
            shortAbility: abilityShortCodes.Intellect,
            modifier: computed(() => abilityScores.Intellect.base),
            isTrained: true,
            label: "mechanics"
        },
        Perception: {
            base: ref(0),
            current: computed(() => skillScores.Perception.base + Number(abilityScores.Awareness.base || 0)),
            shortAbility: abilityShortCodes.Awareness,
            modifier: computed(() => abilityScores.Awareness.base),
            isTrained: false,
            label: "perception"
        },
        Persuasion: {
            base: ref(0),
            current: computed(() => skillScores.Persuasion.base + Number(abilityScores.Presence.base || 0)),
            shortAbility: abilityShortCodes.Presence,
            modifier: computed(() => abilityScores.Presence.base),
            isTrained: false,
            label: "persuasion"
        },
        RangedCombat: {
            base: ref(0),
            current: computed(() => skillScores.RangedCombat.base + Number(abilityScores.Dexterity.base || 0)),
            shortAbility: abilityShortCodes.Dexterity,
            modifier: computed(() => abilityScores.Dexterity.base),
            isTrained: false,
            label: "ranged combat"
        },
        Sleight: {
            base: ref(0),
            current: computed(() => skillScores.Sleight.base + Number(abilityScores.Dexterity.base || 0)),
            shortAbility: abilityShortCodes.Dexterity,
            modifier: computed(() => abilityScores.Dexterity.base),
            isTrained: true,
            label: "sleight of hand"
        },
        Stealth: {
            base: ref(0),
            current: computed(() => skillScores.Stealth.base + Number(abilityScores.Agility.base || 0)),
            shortAbility: abilityShortCodes.Agility,
            modifier: computed(() => abilityScores.Agility.base),
            isTrained: false,
            label: "stealth"
        },
        Theivery: {
            base: ref(0),
            current: computed(() => skillScores.Theivery.base + Number(abilityScores.Dexterity.base || 0)),
            shortAbility: abilityShortCodes.Dexterity,
            modifier: computed(() => abilityScores.Dexterity.base),
            isTrained: true,
            label: "theivery"
        },
        Treatment: {
            base: ref(0),
            current: computed(() => skillScores.Treatment.base + Number(abilityScores.Intellect.base || 0)),
            shortAbility: abilityShortCodes.Intellect,
            modifier: computed(() => abilityScores.Intellect.base),
            isTrained: true,
            label: "treatment"
        }
    });
    
    

    const dehydrate = () => {
        return Object.keys(skillScores).reduce((result, key) => {
            result[key] = { base: skillScores[key].base, isTrained: skillScores[key].isTrained };
            return result;
        }, {});
    };

    const hydrate = (hydrateStore) => {
        Object.keys(skillScores).forEach(key => {
            if (hydrateStore[key]) {
                skillScores[key].base = hydrateStore[key].base || skillScores[key].base;
                skillScores[key].isTrained = hydrateStore[key].isTrained ?? skillScores[key].isTrained;
            }
        });
    };

    return {
        skillScores,
        hydrate,
        dehydrate
    }
});