<script>
import skillModal from '../modals/skillModal.vue';


export default {
    name: "skills", // Name your parent component
    components: {
        skillModal
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
import { useSkillStore } from '@/stores/skillStore.js';
import { useAbilityScoreStore } from '@/stores/abilityScoreStore.js';
import { computed } from 'vue';
const sheet = useSheetStore();
const abilityScores = useAbilityScoreStore().abilityScores;
const skillScores = useSkillStore().skillScores;
const scoreNames = computed(() => Object.keys(skillScores).filter(name => !skillScores[name].isTrained || (skillScores[name].isTrained && skillScores[name].base > 0)));
</script>

<template>
    <div class="card_header">
        <div class="card_title">
            <span>Skills</span>
        </div>
        <div class="skill_edit">
            <button @click="toggleModal">
                <i class="fa-solid fa-gear"></i>
            </button>
            <skillModal :show="isModalVisible" @close="toggleModal"></skillModal>
        </div>
    </div>

    <div class="skill_section">
        <div class="skill_subsection_header">
            <div class="skill_header_name">Skill Name</div>
            <div class="skill_header_rank">Ranks</div>
            <div class="skill_header_bonus">Bonus</div>
        </div>
        <div class="skill_subsection" v-for="name in scoreNames" :key="name" :score="name">
            <div class="skill_label">{{ skillScores[name].label }}</div>
            <div class="skill_modifier">{{ skillScores[name].base }}</div>
            <div class="skill_number">{{ skillScores[name].current }}</div>
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

.skill_edit {
    position: relative;
    right: 20px;
}

.skill_edit button {
    background: none;
    border: none;
    cursor: pointer;
    font-size: 1.2rem;
    color: #ffffff;
}

.skill_edit button:hover {
    color: #a5a9e0;
}

.skill_section {
    display: flex;
    flex-direction: column;
    align-items: center;
    align-content: space-around;
    color: #000000;
    font-weight: bold;
    text-transform: uppercase;
    background-color: #a5a9e0;
    padding: 0 0 20px 0;
}

.skill_subsection_header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    background-color: #f2f3ff;
}

.skill_header_name {
    width: 60%;
}

.skill_header_rank {
    display: flex;
    justify-content: center;
    width: 20%;
}

.skill_header_bonus {
    display: flex;
    justify-content: center;
    width: 20%;
}

.skill_subsection {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    width: 100%;
    align-items: center;
    justify-content: space-between;
    margin: 5px 0 0 0;
    background-color: #e8e9ff;
}

.skill_label {
    display: flex;
    justify-content: flex-start;
    width: 60%;
}

.skill_modifier {
    display: flex;
    justify-content: center;
    width: 20%;
}

.skill_number {
    display: flex;
    width: 20%;
    height: 20px;
    text-align: center;
    justify-content: center;
}
</style>