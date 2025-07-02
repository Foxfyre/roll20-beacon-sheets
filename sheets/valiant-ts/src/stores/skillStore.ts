import { defineStore } from 'pinia';
import { ref, reactive, computed } from 'vue';
import { useAbilityScoreStore } from '@/stores/abilityScoreStore';
import getRollResult from '@/utility/getRollResult';
import rollToChat from '@/utility/rollToChat';
import sendToChat from '@/utility/sendToChat';

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
            get current() { return this.base + Number(abilityScores.Agility.total) },
            shortAbility: abilityShortCodes.Agility,
            modifier: abilityScores.Agility.base,
            isTrained: true,
            label: "acrobatics"
        },
        Athletics: {
            base: 0,
            get current() { return this.base + Number(abilityScores.Strength.total) },
            shortAbility: abilityShortCodes.Strength,
            modifier: abilityScores.Strength.base,
            isTrained: false,
            label: "athletics"
        },
        CloseCombat: {
            base: 0,
            get current() { return this.base + Number(abilityScores.Fighting.total) },
            shortAbility: abilityShortCodes.Fighting,
            modifier: abilityScores.Fighting.base,
            isTrained: false,
            label: "close combat"
        },
        Computers: {
            base: 0,
            get current() { return this.base + Number(abilityScores.Intellect.total) },
            shortAbility: abilityShortCodes.Intellect,
            modifier: abilityScores.Intellect.base,
            isTrained: true,
            label: "computers"
        },
        Deception: {
            base: 0,
            get current() { return Number(this.base) + Number(abilityScores.Presence.total) },
            shortAbility: abilityShortCodes.Presence,
            modifier: abilityScores.Presence.base,
            isTrained: false,
            label: "deception"
        },
        Driving: {
            base: 0,
            get current() { return this.base + Number(abilityScores.Dexterity.total) },
            shortAbility: abilityShortCodes.Dexterity,
            modifier: abilityScores.Dexterity.base,
            isTrained: true,
            label: "driving"
        },
        Electronics: {
            base: 0,
            get current() { return this.base + Number(abilityScores.Intellect.total) },
            shortAbility: abilityShortCodes.Intellect,
            modifier: abilityScores.Intellect.base,
            isTrained: true,
            label: "electronics"
        },
        Expertise: {
            base: 0,
            get current() { return this.base + Number(abilityScores.Intellect.total) },
            shortAbility: abilityShortCodes.Intellect,
            modifier: abilityScores.Intellect.base,
            isTrained: true,
            label: "expertise"
        },
        Insight: {
            base: 0,
            get current() { return this.base + Number(abilityScores.Awareness.total) },
            shortAbility: abilityShortCodes.Awareness,
            modifier: abilityScores.Awareness.base,
            isTrained: false,
            label: "insight"
        },
        Intimidation: {
            base: 0,
            get current() { return this.base + Number(abilityScores.Presence.total) },
            shortAbility: abilityShortCodes.Presence,
            modifier: abilityScores.Presence.base,
            isTrained: false,
            label: "intimidation"
        },
        Investigation: {
            base: 0,
            get current() { return this.base + Number(abilityScores.Intellect.total) },
            shortAbility: abilityShortCodes.Intellect,
            modifier: abilityScores.Intellect.base,
            isTrained: true,
            label: "investigation"
        },
        Mechanics: {
            base: 0,
            get current() { return this.base + Number(abilityScores.Intellect.total) },
            shortAbility: abilityShortCodes.Intellect,
            modifier: abilityScores.Intellect.base,
            isTrained: true,
            label: "mechanics"
        },
        Perception: {
            base: 0,
            get current() { return this.base + Number(abilityScores.Awareness.total) },
            shortAbility: abilityShortCodes.Awareness,
            modifier: abilityScores.Awareness.base,
            isTrained: false,
            label: "perception"
        },
        Persuasion: {
            base: 0,
            get current() { return this.base + Number(abilityScores.Presence.total) },
            shortAbility: abilityShortCodes.Presence,
            modifier: abilityScores.Presence.base,
            isTrained: false,
            label: "persuasion"
        },
        RangedCombat: {
            base: 0,
            get current() { return this.base + Number(abilityScores.Dexterity.total) },
            shortAbility: abilityShortCodes.Dexterity,
            modifier: abilityScores.Dexterity.base,
            isTrained: false,
            label: "ranged combat"
        },
        Sleight: {
            base: 0,
            get current() { return this.base + Number(abilityScores.Dexterity.total) },
            shortAbility: abilityShortCodes.Dexterity,
            modifier: abilityScores.Dexterity.base,
            isTrained: true,
            label: "sleight of hand"
        },
        Stealth: {
            base: 0,
            get current() { return this.base + Number(abilityScores.Agility.total) },
            shortAbility: abilityShortCodes.Agility,
            modifier: abilityScores.Agility.base,
            isTrained: false,
            label: "stealth"
        },
        Theivery: {
            base: 0,
            get current() { return this.base + Number(abilityScores.Dexterity.total) },
            shortAbility: abilityShortCodes.Dexterity,
            modifier: abilityScores.Dexterity.base,
            isTrained: true,
            label: "theivery"
        },
        Treatment: {
            base: 0,
            get current() { return this.base + Number(abilityScores.Intellect.total) },
            shortAbility: abilityShortCodes.Intellect,
            modifier: abilityScores.Intellect.base,
            isTrained: true,
            label: "treatment"
        },
    });

    type SkillName = keyof typeof skills;

    const rollSkill = async (name: SkillName) => {
        console.log(`Rolling skill for: ${name}`);
        console.log('Skills:', skills[name]);

        if (!skills[name]) {
            console.error(`Invalid ability name: ${name}`);
            return;
        }

        const skill = skills[name];
        console.log(`Skill object for ${name}:`, skill);

        const baseSkill = skill.base;
        const abilityModifier = skill.current;
        const diceAmount = 1;
        const diceSides = 20;
        const components = [
            { label: `Base Roll`, sides: diceSides, count: diceAmount, alwaysShowInBreakdown: true },
            { label: `Ability Modifier`, value: abilityModifier, alwaysShowInBreakdown: true },
        ];

        await rollToChat({
            title: `${name} Skill Check`,
            subtitle: `Rolling ${name}`,
            traits: ['Skill Check'],
            allowHeroDie: false,
            components,
        });

    }

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
        rollSkill,
        hydrate,
        dehydrate
    }
});