import { defineStore } from 'pinia';

export const useDefenseStore = defineStore('defense', {
    state: () => ({
        defenses: [
            { id: 1, name: "Dodge", value: 9 },
            { id: 2, name: "Parry", value: 9 },
            { id: 3, name: "Will", value: 8 },
            { id: 4, name: "Fortitude", value: 8 },
            { id: 5, name: "Toughness", value: "6/3" }
        ]
    }),
    actions: {
        addDefense() {
            this.defenses.push({ id: Date.now(), name: "", value: "" });
        },
        removeDefense(id) {
            this.defenses = this.defenses.filter(defense => defense.id !== id);
        }
    }
});
