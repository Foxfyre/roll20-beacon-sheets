import { defineStore } from 'pinia';
import { ref, reactive, computed } from 'vue';
import { v4 as uuidv4 } from 'uuid';
import { arrayToObject, objectToArray } from '@/utility/objectify';

const addComplication = (complications) => {
    const complication = {
        _id: uuidv4(),
        name: `Complication ${complications.value?.length + 1}`,
        description: ''
    }
    complications.value.push(complication)
}

const removeComplication = (complications, complicationId) => {
    const indexToRemove = complications.value.findIndex((complication) => complication._id === complicationId)
    if (indexToRemove >= 0) complications.value.splice(indexToRemove, 1)
}

export const useComplicationStore = defineStore("complications", () => {
    const complications = ref([]);

    const dehydrate = () => {
        return {
            complications: arrayToObject(complications.value)
        }
    };

    const hydrate = (hydrateStore) => {
        if (hydrateStore?.complications) {
            complications.value = objectToArray(hydrateStore.complications) || [];
        }
    };

    return {
        complications,
        addComplication: () => addComplication(complications),
        removeComplication: (complicationId) => removeComplication(complications, complicationId),
        hydrate,
        dehydrate
    }
});