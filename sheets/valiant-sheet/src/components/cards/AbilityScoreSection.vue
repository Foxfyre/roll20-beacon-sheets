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
const scoreNames = Object.keys(abilityScores);
</script>

<template>
    <div class="card_header">
        <div class="card_title">
            <span>Abilities</span>
        </div>
        <div class="ability_edit">
            <button @click="toggleModal">Open Popup</button>

            <abilityModal :show="isModalVisible" @close="toggleModal">

            </abilityModal>
        </div>
    </div>
    <div class="ability_section">
        <div class="ability_subsection" v-for="name in scoreNames" :key="name" :score="name">
            <div class="ability_subsection">
                <div class="ability_label">{{ name }}</div>
                <div class="ability_number">
                    <div class="ability_value">{{ abilityScores[name].base }}</div>
                </div>
            </div>
        </div>
    </div>

</template>

<style lang="scss" scoped>
.card_header {
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 40px;
    text-align: center;
    align-content: center;
    background-color: #ef343f;
}

.card_title {
    flex-direction: column;
    align-content: center;
    justify-content:flex-start;
    width: 50%;
}

.card_title > span {
    text-transform:uppercase;
    font-weight: bolder;
    color: #ffffff;
}

.ability_edit {
    flex-direction: column;
    height: 100%;
    align-content: center;
    width: 50%;
}

.ability_section {
    display: grid;
    grid-template-columns: 50% 50%;
    align-items: center;
    align-content: space-around;
    color: #000000;
    font-weight: bold;
    text-transform: uppercase;
    padding: 10px;
}

.ability_subsection {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    width: 100%;
    align-items: center;
    justify-content: space-between;
    margin: 5px 0 0 0;
}

.ability_number {
    width: 30px;
    height: 20px;
    border: 1px black solid;
    border-radius: 5px;
    color: black;
    margin-right: 15px;
    text-align:center;
    background-color: #fa9da3
}
</style>