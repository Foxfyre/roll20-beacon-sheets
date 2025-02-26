<script>
export default {
    name: "DefenseModal",
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
import { useDefenseStore } from '@/stores/DefenseStore.js';

const defenseStore = useDefenseStore();
const defenses = defenseStore.defenses;
</script>

<template>
    <div class="modal-overlay" v-if="show">
        <div class="modal-content">
            <button class="close-button" @click="close">&times;</button>
            <h2>Edit Defense</h2>

            <div class="defense_section">
                <div class="defense-item" v-for="defense in defenses" :key="defense.id">
                    <!--<input v-model="defense.name" placeholder="Name" />-->
                    <span>{{ defense.name }}</span>
                    <input v-model="defense.value" type="text" placeholder="Value" />
                    <!--<button class="button" @click="defenseStore.removeDefense(defense.id)">Remove</button>-->
                </div>
            </div>

            <!--<div class="modal_footer">
                <button class="button" @click="defenseStore.addDefense">Add New</button>
            </div>-->
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
    color: black;
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

.defense_section {
    display: flex;
    flex-direction:column;
    margin-top: 10px;
    align-items: center;
}

.defense-item {
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
