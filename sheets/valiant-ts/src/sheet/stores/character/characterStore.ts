import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { useAbilityScoreStore } from '@/stores/abilityScoreStore';
import getRollResult from '@/utility/getRollResult';
import rollToChat from '@/utility/rollToChat';

export type CharacterHydrate = {
    character: {};
};

export const useCharacterStore = defineStore('character', () => {
    const abilityScoreStore = useAbilityScoreStore();

    const rollAbility = async (name: keyof typeof abilityScoreStore.abilityScores) => {
        console.log(`Rolling ability score for: ${name}`);
        console.log(abilityScoreStore.abilityScores[name].base);
        const ability = name;
        const abilityScore = abilityScoreStore.abilityScores[ability].base;
        const diceAmount = 1;
        const diceSides = 20;
        const { total: result } = await getRollResult([
            { count: Number(diceAmount), sides: Number(diceSides) },
            { label: `${ability} Bonus`, value: abilityScore },
        ]);
        console.log(`Rolled ${result} for ${ability}`);
        await rollToChat({
            title: `Rolling ${ability}`,
            components: [
                { label: `Base Roll`, sides: 20 },
                { label: `${ability} Bonus`, value: abilityScore },
            ]
        });
    }

    return {
        rollAbility
    }

})

