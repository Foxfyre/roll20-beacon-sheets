import { defineStore } from 'pinia';

// --- Type Definitions ---
export interface Effect {
    id: number;
    name: string;
    rank: number;
    details: string;
}

export interface StandalonePower {
    id: number;
    type: "standalone";
    name: string;
    cost: number;
    effects: Effect[];
    extras: string[];
    descriptor: string;
}

export interface ArrayChildPower {
    id: number;
    name: string;
    effects: Effect[];
    extras: string[];
    descriptor: string;
    cost: number;
}

export interface PowerArray {
    id: number;
    type: "array";
    name: string;
    arrayType: string;
    modifiers: string[];
    powers: ArrayChildPower[];
    totalCost: number;
}

export type Power = StandalonePower | PowerArray;

// --- Unique ID Generator ---
let nextId = 1000;
function getUniqueId() {
    return nextId++;
}

// --- Store ---
export const usePowersStore = defineStore('powers', {
    state: () => ({
        powers: [
            {
                id: getUniqueId(),
                type: "standalone",
                name: "Super Strength",
                cost: 5,
                effects: [
                    { id: getUniqueId(), name: "Enhanced Strength", rank: 10, details: "Increased lifting capacity" }
                ],
                extras: [],
                descriptor: ""
            } as StandalonePower,
            // Example array (uncomment if you want a default array in state)
            // {
            //     id: getUniqueId(),
            //     type: "array",
            //     name: "Kryptonian Abilities",
            //     modifiers: [],
            //     powers: [],
            //     totalCost: 0
            // } as PowerArray
        ] as Power[]
    }),
    actions: {
        addPower(type: "standalone" | "array" = "standalone") {
            if (type === "array") {
                this.powers.push({
                    id: getUniqueId(),
                    type: "array",
                    name: "",
                    arrayType: "Standard",
                    modifiers: [],
                    powers: [],
                    totalCost: 0
                } as PowerArray);
            } else {
                this.powers.push({
                    id: getUniqueId(),
                    type: "standalone",
                    name: "",
                    cost: 0,
                    effects: [],
                    extras: [],
                    descriptor: ""
                } as StandalonePower);
            }
        },
        removePower(id: number) {
            this.powers = this.powers.filter(power => power.id !== id);
        },
        addEffect(powerId: number, isArray = false, childPowerId: number | null = null) {
            if (isArray) {
                const array = this.powers.find(p => p.id === powerId && p.type === "array") as PowerArray | undefined;
                if (!array) return;
                const child = array.powers.find(p => p.id === childPowerId);
                if (!child) return;
                child.effects.push({ id: getUniqueId(), name: "", rank: 0, details: "" });
            } else {
                const power = this.powers.find(p => p.id === powerId && p.type === "standalone") as StandalonePower | undefined;
                if (!power) return;
                power.effects.push({ id: getUniqueId(), name: "", rank: 0, details: "" });
            }
        },
        removeEffect(powerId: number, effectId: number, isArray = false, childPowerId: number | null = null) {
            if (isArray) {
                const array = this.powers.find(p => p.id === powerId && p.type === "array") as PowerArray | undefined;
                if (!array) return;
                const child = array.powers.find(p => p.id === childPowerId);
                if (!child) return;
                child.effects = child.effects.filter(e => e.id !== effectId);
            } else {
                const power = this.powers.find(p => p.id === powerId && p.type === "standalone") as StandalonePower | undefined;
                if (!power) return;
                power.effects = power.effects.filter(e => e.id !== effectId);
            }
        },
        addChildPower(arrayId: number) {
            const array = this.powers.find(p => p.id === arrayId && p.type === "array") as PowerArray | undefined;
            if (!array) return;
            array.powers.push({
                id: getUniqueId(),
                name: "",
                effects: [
                    { id: getUniqueId(), name: "", rank: 0, details: "" }
                ],
                extras: [],
                descriptor: "",
                cost: 0
            } as ArrayChildPower);
        },
        removeChildPower(arrayId: number, childPowerId: number) {
            const array = this.powers.find(p => p.id === arrayId && p.type === "array") as PowerArray | undefined;
            if (!array) return;
            array.powers = array.powers.filter(p => p.id !== childPowerId);
        },
    }
});
