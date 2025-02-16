<script>
export default {
    name: "skillModal",
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
import { useSkillStore } from '@/stores/skillStore';
import { useAbilityScoreStore } from '@/stores/abilityScoreStore';
const sheet = useSheetStore();
const skillScores = useSkillStore().skillScores;
const abilityScores = useAbilityScoreStore().abilityScores;
const scoreNames = Object.keys(skillScores);

function getPropertyName(shortCode) {
    const abilityShortCodes = useAbilityScoreStore().abilityShortCodes;
    const entry = Object.entries(abilityShortCodes).find(([_, value]) => value === shortCode);
    return entry ? entry[0] : undefined;
}

console.log(abilityScores[getPropertyName('fgt')]?.base || 0);
console.log(getPropertyName(skillScores['fgt']));

function calculateTotal(base, modifier) {
    return Number(base) + Number(modifier || 0);
}
</script>

<template>
    <div class="modal-overlay" v-if="show">
        <div class="modal-content">
            <button class="close-button" @click="close">&times;</button>
            <slot></slot>
            <div class="card_header">
                <div class="card_title">
                    <span>Skills</span>
                </div>

                <div class="ability_edit">
                    <skillModal :show="isModalVisible" @close="toggleModal">
                        <h2>Popup Title</h2>
                        <p>This is the content inside the popup.</p>
                    </skillModal>
                </div>
            </div>

            <!-- Subheader -->
            <div class="skill_subheader">
                <div class="subheader_item">Skill Name</div>
                <div class="subheader_item">Ability Modifier</div>
                <div class="subheader_item">Ability Rank</div>
                <div class="subheader_item">Total Skill Rank</div>
            </div>

            <!-- Skills List -->
            <div class="skill_section">

                <div class="skill_row" v-for="name in Object.keys(skillScores)" :key="name" :score="name">
                    <div class="skill_label">{{ skillScores[name].label }}</div>
                    <div class="skill_modifier">{{ skillScores[name].shortAbility }} ({{
                        abilityScores[getPropertyName(skillScores[name].shortAbility)]?.base || 0 }})</div>
                    <div class="skill_rank">
                        <input type="number" v-model.number="skillScores[name].base" />
                    </div>
                    <div class="total_skill_rank">
                        {{ skillScores[name].current }}
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
    color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
}

.card_title {
    font-weight: bold;
    text-transform: uppercase;
}

/* Subheader Styles */
.skill_subheader {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    font-weight: bold;
    text-transform: uppercase;
    margin-bottom: 10px;
    text-align: center;
    color: black;
}

.subheader_item {
    padding: 5px 0;
    background-color: #eee;
}

/* Skills List Styles */
.skill_section {
    display: flex;
    flex-direction: column;
    gap: 10px;
    color: black;
}

.skill_row {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    align-items: center;
    height: 15px;
    padding: 5px 0;
    border-bottom: 1px solid #ddd;
}

.skill_label {
    text-align: center;
    text-transform: capitalize;
    text-wrap: nowrap;
}

.skill_modifier,
.total_skill_rank {
    text-align: center;
    text-transform: capitalize;
}

.skill_rank {
    text-align: center;
}

.skill_rank input {
    width: 40px;
    height: 25px;
    border: 1px solid #ddd;
    border-radius: 5px;
    text-align: center;
    background-color: #fafafa;
}
</style>