import { defineStore } from 'pinia';

export const useOffenseStore = defineStore('offense', {
    state: () => ({
        initiative: 2,
        offenses: [
            { id: 1, name: "Bio-Stun", bonus: 8, target: "Ranged", effect: "Stun", save: "DC 18 Fortitude Check"},
            { id: 2, name: "Unarmed", bonus: 8, target: "Close", effect: "Damage 2", save: "Fortitude Check" }
        ]
    }),
    actions: {
        addOffense() {
            this.offenses.push({ id: Date.now(), name: "", bonus: 0, details: "" });
        },
        removeOffense(id) {
            this.offenses = this.offenses.filter(offense => offense.id !== id);
        }
    }
});
