import { defineStore } from 'pinia';
import { ref, reactive, computed } from 'vue';
import { useAbilityScoreStore } from '@/stores/abilityScoreStore';

export interface Skill {
    base: number;
    current: number;
    shortAbility: string;
    modifier: number;
    isTrained: boolean;
    label: string;
}

type SkillScores = {
    [key: string]: Skill;
};

export const useSkillStore = defineStore('skillScores', () => {
    const abilityScores = useAbilityScoreStore().abilityScores;
    const abilityShortCodes = useAbilityScoreStore().abilityShortCodes;

    const skills = reactive({
        Acrobatics: {
            base: 0,
            get current() { return this.base + abilityScores.Agility.base },
            shortAbility: abilityShortCodes.Agility,
            modifier: abilityScores.Agility.base,
            isTrained: true,
            label: "acrobatics"
        },
        Athletics: {
            base: 0,
            get current() { return this.base + abilityScores.Strength.base },
            shortAbility: abilityShortCodes.Strength,
            modifier: abilityScores.Strength.base,
            isTrained: false,
            label: "athletics"
        },
        CloseCombat: {
            base: 0,
            get current() { return this.base + abilityScores.Fighting.base },
            shortAbility: abilityShortCodes.Fighting,
            modifier: abilityScores.Fighting.base,
            isTrained: false,
            label: "close combat"
        },
        Computers: {
            base: 0,
            get current() { return this.base + abilityScores.Intellect.base },
            shortAbility: abilityShortCodes.Intellect,
            modifier: abilityScores.Intellect.base,
            isTrained: true,
            label: "computers"
        },
        Deception: {
            base: 0,
            get current() { return this.base + abilityScores.Presence.base },
            shortAbility: abilityShortCodes.Presence,
            modifier: abilityScores.Presence.base,
            isTrained: false,
            label: "deception"
        },
        Driving: {
            base: 0,
            get current() { return this.base + abilityScores.Dexterity.base },
            shortAbility: abilityShortCodes.Dexterity,
            modifier: abilityScores.Dexterity.base,
            isTrained: true,
            label: "driving"
        },
        Electronics: {
            base: 0,
            get current() { return this.base + abilityScores.Intellect.base },
            shortAbility: abilityShortCodes.Intellect,
            modifier: abilityScores.Intellect.base,
            isTrained: true,
            label: "electronics"
        },
        Expertise: {
            base: 0,
            get current() { return this.base + abilityScores.Intellect.base },
            shortAbility: abilityShortCodes.Intellect,
            modifier: abilityScores.Intellect.base,
            isTrained: true,
            label: "expertise"
        },
        Insight: {
            base: 0,
            get current() { return this.base + abilityScores.Awareness.base },
            shortAbility: abilityShortCodes.Awareness,
            modifier: abilityScores.Awareness.base,
            isTrained: false,
            label: "insight"
        },
        Intimidation: {
            base: 0,
            get current() { return this.base + abilityScores.Presence.base },
            shortAbility: abilityShortCodes.Presence,
            modifier: abilityScores.Presence.base,
            isTrained: false,
            label: "intimidation"
        },
        Investigation: {
            base: 0,
            get current() { return this.base + abilityScores.Intellect.base },
            shortAbility: abilityShortCodes.Intellect,
            modifier: abilityScores.Intellect.base,
            isTrained: true,
            label: "investigation"
        },
        Mechanics: {
            base: 0,
            get current() { return this.base + abilityScores.Intellect.base },
            shortAbility: abilityShortCodes.Intellect,
            modifier: abilityScores.Intellect.base,
            isTrained: true,
            label: "mechanics"
        },
        Perception: {
            base: 0,
            get current() { return this.base + abilityScores.Awareness.base },
            shortAbility: abilityShortCodes.Awareness,
            modifier: abilityScores.Awareness.base,
            isTrained: false,
            label: "perception"
        },
        Persuasion: {
            base: 0,
            get current() { return this.base + abilityScores.Presence.base },
            shortAbility: abilityShortCodes.Presence,
            modifier: abilityScores.Presence.base,
            isTrained: false,
            label: "persuasion"
        },
        RangedCombat: {
            base: 0,
            get current() { return this.base + abilityScores.Dexterity.base },
            shortAbility: abilityShortCodes.Dexterity,
            modifier: abilityScores.Dexterity.base,
            isTrained: false,
            label: "ranged combat"
        },
        Sleight: {
            base: 0,
            get current() { return this.base + abilityScores.Dexterity.base },
            shortAbility: abilityShortCodes.Dexterity,
            modifier: abilityScores.Dexterity.base,
            isTrained: true,
            label: "sleight of hand"
        },
        Stealth: {
            base: 0,
            get current() { return this.base + abilityScores.Agility.base },
            shortAbility: abilityShortCodes.Agility,
            modifier: abilityScores.Agility.base,
            isTrained: false,
            label: "stealth"
        },
        Theivery: {
            base: 0,
            get current() { return this.base + abilityScores.Dexterity.base },
            shortAbility: abilityShortCodes.Dexterity,
            modifier: abilityScores.Dexterity.base,
            isTrained: true,
            label: "theivery"
        },
        Treatment: {
            base: 0,
            get current() { return this.base + abilityScores.Intellect.base },
            shortAbility: abilityShortCodes.Intellect,
            modifier: abilityScores.Intellect.base,
            isTrained: true,
            label: "treatment"
        },
    });
    
    function dehydrate(): Record<string, Skill> {
        const out: Record<string, Skill> = {}
        for (const key in skills) {
            const skillKey = key as keyof typeof skills; // Cast key to keyof typeof skills
            out[skillKey] = {
                base: skills[skillKey].base,
                current: skills[skillKey].current,
                shortAbility: skills[skillKey].shortAbility,
                modifier: skills[skillKey].modifier,
                isTrained: skills[skillKey].isTrained,
                label: skills[skillKey].label,
            };
        }
        return out
    }

    function hydrate(data: Record<string, Skill>) {
        for (const key in data) {
            const skillKey = key as keyof typeof skills;
            if (skills[skillKey]) {
                skills[skillKey].base = data[skillKey].base;
                skills[skillKey].isTrained = data[skillKey].isTrained;
            }
        }
    }
    return {
        skills,
        hydrate,
        dehydrate
    }
});