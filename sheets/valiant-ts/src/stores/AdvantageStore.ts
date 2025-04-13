import { defineStore } from 'pinia';
import { ref, reactive, computed } from 'vue';
import { v4 as uuidv4 } from 'uuid';
import { arrayToObject, objectToArray } from '@/utility/objectify';

/*
Adds an advantage to the list of advantages
 */
const addAdvantage = (advantages) => {
    const advantage = {
        _id: uuidv4(),
        name: `Advantage ${advantages.value?.length + 1}`,
        description: ''
    }
    advantages.value.push(advantage)
}

/*
Removes an advantage from the list of advantages
 */
const removeAdvantage = (advantages, advantageId) => {
    const indexToRemove = advantages.value.findIndex((advantage) => advantage._id === advantageId)
    if (indexToRemove >= 0) advantages.value.splice(indexToRemove, 1)
}

export const useAdvantageStore = defineStore("advantages", () => {
    const advantages = ref([]);

    const dehydrate = () => {
        return {
            advantages: arrayToObject(advantages.value)
        }
    };

    const hydrate = (hydrateStore) => {
        if (hydrateStore?.advantages) {
            advantages.value = objectToArray(hydrateStore.advantages) || [];
        }
    };

    return {
        advantages,
        addAdvantage: () => addAdvantage(advantages),
        removeAdvantage: (advantageId) => removeAdvantage(advantages, advantageId),
        hydrate,
        dehydrate
    }
});