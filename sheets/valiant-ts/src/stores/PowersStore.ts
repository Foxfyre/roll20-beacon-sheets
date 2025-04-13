import { defineStore } from 'pinia';

export const usePowersStore = defineStore('powers', {
    state: () => ({
        powers: [
            {
                id: 1,
                name: "Super Strength",
                cost: 5,
                effects: [
                    { id: 101, name: "Enhanced Strength", rank: 10, details: "Increased lifting capacity" }
                ]
            }
        ]
    }),
    actions: {
        addPower() {
            this.powers.push({ id: Date.now(), name: "", cost: 0, effects: [] });
        },
        removePower(id) {
            this.powers = this.powers.filter(power => power.id !== id);
        },
        addEffect(powerId) {
            const power = this.powers.find(p => p.id === powerId);
            power.effects.push({ id: Date.now(), name: "", rank: 0, details: "" });
        },
        removeEffect(powerId, effectId) {
            const power = this.powers.find(p => p.id === powerId);
            power.effects = power.effects.filter(e => e.id !== effectId);
        }
    }
});
