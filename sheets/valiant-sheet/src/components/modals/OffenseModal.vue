<script>
export default {
    name: "OffenseModal",
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
import { useOffenseStore } from '@/stores/OffenseStore.js';

const offenseStore = useOffenseStore();
const offenses = offenseStore.offenses;
</script>

<template>
    <div class="modal-overlay" v-if="show">
        <div class="modal-content">
            <button class="close-button" @click="close">&times;</button>
            <h2>Edit Offense</h2>

            <div class="offense_section">
                <div class="initiative_edit">
                    <label>Initiative</label>
                    <input v-model="offenseStore.initiative" type="number" />
                </div>

                <div class="offense-item" v-for="offense in offenses" :key="offense.id">
                    <input v-model="offense.name" placeholder="Name" />
                    <input v-model="offense.bonus" type="number" placeholder="Bonus" />
                    <input v-model="offense.details" placeholder="Details" />
                    <button class="button" @click="offenseStore.removeOffense(offense.id)">Remove</button>
                </div>
            </div>

            <div class="modal_footer">
                <button class="button" @click="offenseStore.addOffense">Add New</button>
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

.offense_section {
    margin-top: 10px;
}

.initiative_edit {
    margin-bottom: 10px;
}

.offense-item {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-top: 10px;
}

input {
    border: 1px solid #ccc;
    padding: 5px;
    border-radius: 5px;
}

.modal_footer {
    margin-top: 10px;
    text-align: center;
}
</style>