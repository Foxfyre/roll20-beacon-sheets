<script>
import abilityModal from '../modals/abilityModal.vue';

export default {
    name: "abilities", // Name your parent component
    components: {
        abilityModal
    },
    data() {
        return {
            isModalVisible: false
        };
    },
    methods: {
        toggleModal() {
            this.isModalVisible = !this.isModalVisible;
        }
    }
};
</script>

<script setup>
import { useSheetStore } from '@/stores/sheetStore.js';
import { useAbilityScoreStore } from '@/stores/abilityScoreStore';
const sheet = useSheetStore();
const abilityScores = useAbilityScoreStore().abilityScores;
const abilityTips = useAbilityScoreStore().abilityScoreTips;
const abilityShortNames = useAbilityScoreStore().abilityShortCodes;
const scoreNames = Object.keys(abilityScores);
</script>

<template>
    <div class="card_header">
        <div class="card_title">
            <span>Abilities</span>
        </div>
        <div class="ability_edit">
            <button @click="toggleModal">
                <i class="fa-solid fa-gear"></i>
            </button>

            <abilityModal :show="isModalVisible" @close="toggleModal"></abilityModal>
        </div>
    </div>
    <div class="ability_section">
        <div class="ability_subsection" v-for="name in scoreNames" :key="name" :score="name">
            <div class="ability-label" :data-title="name" :data-desc="abilityTips[name]">
                <span>{{ abilityShortNames[name] }}</span>
            </div>
            <div class="ability_number">
                {{ abilityScores[name].base }}
            </div>
        </div>
    </div>

</template>

<style lang="scss" scoped>
.card_header {
    display: flex;
    justify-content: center;
    width: 100%;
    height: 40px;
    text-align: center;
    align-items: center;
    background-color: #2b4d85;
}

.card_title {
    text-align: center;
    font-weight: bold;
    text-transform: uppercase;
    color: #ffffff;
    flex-grow: 1;
}

.ability_edit {
    position: relative;
    right: 20px;
}

.ability_edit button {
    background: none;
    border: none;
    cursor: pointer;
    font-size: 1.2rem;
    color: #ffffff;
}

.ability_edit button:hover {
    color: #a5a9e0;
}

.ability_section {
    display: flex;
    align-items: stretch;
    justify-content: space-around;
    color: #000000;
    font-weight: bold;
    text-transform: uppercase;
    margin-top: 5px;
}

.ability_subsection {
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;
    justify-content: space-between;
    flex-grow: 1;
    /* Make all subsections expand evenly */
}

.ability-label {
    display: flex;
    background-color: #2b4d85;
    color: whitesmoke;
    width: 95%;
    justify-content: center;
    font-size: 0.9em;
    padding: 5px 0;
    position: relative;
    cursor: pointer;
}

.ability-label:hover::after {
    content: attr(data-title) ' - ' attr(data-desc);
    position: absolute;
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%);
    background-color: #333;
    color: #fff;
    padding: 5px 10px;
    border-radius: 5px;
    white-space: nowrap;
    font-size: 0.8em;
    z-index: 10;
    opacity: 1;
    visibility: visible;
}

.ability-label::after {
    content: '';
    position: absolute;
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%);
    background-color: #333;
    color: #fff;
    padding: 5px 10px;
    border-radius: 5px;
    white-space: nowrap;
    font-size: 0.8em;
    z-index: 10;
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.2s ease-in-out, visibility 0.2s ease-in-out;
}

.ability-tips {
    display: flex;
    width: 95%;
    justify-content: center;
    font-size: 0.7em;
    background-color: #a5a9e0;
    margin-top: 1px;
    flex-grow: 1;
    /* Makes this section expand to fill empty space */
    align-items: center;
    /* Centers text vertically */
    min-height: 50px;
    /* Ensure uniform height across all sections */
}

.ability_number {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 95%;
    min-height: 30px;
    padding: 5px 0;
    color: black;
    background-color: #a5a9e0;
}
</style>