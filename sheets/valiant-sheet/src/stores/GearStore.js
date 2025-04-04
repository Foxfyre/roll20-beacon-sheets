import { defineStore } from 'pinia';

export const useGearStore = defineStore('gear', {
    state: () => ({
        gear: [
            {
                id: 1,
                name: "Sanctum Sanctorum Headquarters",
                type: "Equipment",
                attributes: [
                    { title: "Size", description: "Medium" },
                    { title: "Toughness", description: "10" },
                    { title: "Powers", description: "Movement 3 (Time Travel)" }
                ]
            },
            {
                id: 2,
                name: "Plasma Rifle",
                type: "Weapon",
                attributes: [
                    { title: "Effect", description: "Ranged Damage 5" },
                    { title: "Critical", description: "19-20" },
                    { title: "Cost", description: "12 points" }
                ]
            }
        ]
    }),
    actions: {
        addGear() {
            this.gear.push({
                id: Date.now(),
                name: "",
                type: "Equipment",
                attributes: [{ title: "", description: "" }]
            });
        },
        removeGear(id) {
            this.gear = this.gear.filter(gear => gear.id !== id);
        },
        addAttribute(gearId) {
            const gear = this.gear.find(g => g.id === gearId);
            if (gear.type !== "Weapon") {
                gear.attributes.push({ title: "", description: "" });
            }
        },
        removeAttribute(gearId, index) {
            const gear = this.gear.find(g => g.id === gearId);
            if (gear.type !== "Weapon") {
                gear.attributes.splice(index, 1);
            }
        },
        updateGearType(gearId, newType) {
            const gear = this.gear.find(g => g.id === gearId);
            gear.type = newType;

            if (newType === "Weapon") {
                gear.attributes = [
                    { title: "Effect", description: "" },
                    { title: "Critical", description: "" },
                    { title: "Cost", description: "" }
                ];
            } else {
                gear.attributes = [{ title: "", description: "" }];
            }
        }
    }
});
