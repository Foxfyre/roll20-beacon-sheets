<script>
export default {
    name: "abilityModal",
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
import { useSheetStore } from '@/stores/sheetStore.js';
import { useAbilityScoreStore } from '@/stores/abilityScoreStore';
const sheet = useSheetStore();
const abilityScores = useAbilityScoreStore().abilityScores;
const scoreNames = Object.keys(abilityScores);
</script>

<template>
    <div class="modal-overlay" v-if="show">
        <div class="modal-content">
            <button class="close-button" @click="close">&times;</button>
            <slot></slot>
            <div class="card_header">
                <div class="card_title">
                    <span>Abilities</span>
                </div>
                <div class="ability_edit">
                    <abilityModal :show="isModalVisible" @close="toggleModal">
                        <h2>Popup Title</h2>
                        <p>This is the content inside the popup.</p>
                    </abilityModal>
                </div>
            </div>
            <div class="ability_section">

                    <div v-for="name in scoreNames" :key="name" :score="name">
                        <div class="ability_subsection">
                            <div class="ability_label"><span>{{ name }}</span></div>
                            <div class="ability_number">
                                <input v-model="abilityScores[name].base" />
                            </div>
                        </div>
                    </div>

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
    /* Semi-transparent background */
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    /* Ensure it's above other content */
}

.modal-content {
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    position: relative;
    max-width: 500px;
    width: 100%;
}

.close-button {
    position: absolute;
    top: 0px;
    right: 0px;
    font-size: 1.5rem;
    background: none;
    border: none;
    cursor: pointer;
}

.card_header {
    width: 100%;
    height: 40px;
    background-color: maroon;
    text-align: center;
    align-content: center;
}

.card_title {
    font-weight: bold;
    text-transform: uppercase;
}

.ability_section {
    display: grid;
    grid-template-columns: 1fr 1fr;
    color: #000000;
    font-weight: bold;
    text-transform: uppercase;
}

.ability_subsection {
    display: flex;
    flex-direction: row;
    padding: 0.5rem;
}

.ability_label {
    width: 50%;
    display: flex;
    align-items: center;
}

.ability_number {
    width: 30px;
    height: 25px;
    border: 1px black solid;
    border-radius: 5px;
    color: black;
    margin: auto;
    text-align: center;
    background-color: #fa9da3;
}


.ability_number input {
    width: 20px;
    height: 15px;
    background-color: transparent;
    border: none;
    text-align: center;
    color: #000000;
    font-weight: bold;
}
</style>