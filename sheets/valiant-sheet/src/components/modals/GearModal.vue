<script>
export default {
    name: "GearModal",
    props: {
        show: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        close() {
            this.$emit("close");
        }
    }
};
</script>

<script setup>
import { useGearStore } from '@/stores/GearStore.js';

const gearStore = useGearStore();
const gearList = gearStore.gear;
</script>

<template>
    <div class="modal-overlay" v-if="show">
        <div class="modal-content">
            <button class="close-button" @click="close">&times;</button>
            <h2>Edit Equipment</h2>

            <div class="gear_section">
                <div class="gear_item" v-for="gear in gearList" :key="gear.id">
                    <input v-model="gear.name" placeholder="Gear Name" />
                    <select v-model="gear.type">
                        <option value="Equipment">Equipment</option>
                        <option value="Device">Device</option>
                        <option value="Weapon">Weapon</option>
                    </select>

                    <div class="attributes_section">
                        <div class="attribute_row" v-for="(attr, index) in gear.attributes" :key="index">
                            <template v-if="gear.type === 'Weapon'">
                                <input :value="attr.title" disabled class="disabled_input" />
                            </template>
                            <template v-else>
                                <input v-model="attr.title" placeholder="Attribute Title" />
                            </template>
                            <input v-model="attr.description" placeholder="Description" />
                            <button class="button remove" v-if="gear.type !== 'Weapon'" @click="gearStore.removeAttribute(gear.id, index)">Remove</button>
                        </div>

                        <button class="button" v-if="gear.type !== 'Weapon'" @click="gearStore.addAttribute(gear.id)">Add Attribute</button>
                    </div>

                    <button class="button remove" @click="gearStore.removeGear(gear.id)">Remove Item</button>
                </div>
            </div>

            <div class="modal_footer">
                <button class="button" @click="gearStore.addGear">Add New Equipment</button>
            </div>
        </div>
    </div>
</template>

<style scoped>
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
}

.modal-content {
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    max-width: 500px;
    width: 100%;
    position: relative;
}

.close-button {
    position: absolute;
    top: 10px;
    right: 10px;
    font-size: 1.5rem;
    background: none;
    border: none;
    cursor: pointer;
}

.gear_section {
    margin-top: 10px;
}

.attribute_row {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-top: 5px;
}

input,
select {
    border: 1px solid #ccc;
    padding: 5px;
    border-radius: 5px;
}

.disabled_input {
    background-color: #e9ecef;
    color: #495057;
    border: 1px solid #ced4da;
    cursor: not-allowed;
}

.modal_footer {
    margin-top: 10px;
    text-align: center;
}

.remove {
    background-color: #e57373;
    color: white;
}
</style>
