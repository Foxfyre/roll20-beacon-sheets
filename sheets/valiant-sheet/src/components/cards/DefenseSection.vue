<script setup>
import { useSheetStore } from '@/stores/sheetStore.js';
import { useDefenseStore } from '@/stores/DefenseStore.js';
import DefenseModal from '../modals/DefenseModal.vue';

const sheet = useSheetStore();
const defenseStore = useDefenseStore();
const defenses = defenseStore.defenses;
</script>

<script>
export default {
    name: "DefenseSection",
    components: {
        DefenseModal
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

<template>
    <div class="card_header">
        <div class="card_title">
            <span>Defense</span>
        </div>
        <div class="edit">
            <button @click="toggleModal">Open Popup</button>
            <DefenseModal :show="isModalVisible" @close="toggleModal"></DefenseModal>
        </div>
    </div>

    <div class="defense_section">
        <div class="defense_list">
            <div class="defense_item" v-for="defense in defenses" :key="defense.id">
                <div class="defense_name">{{ defense.name }}</div>
                <div class="defense_value">
                    <span>{{ defense.value }}</span>
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
    justify-content: flex-start;
    width: 50%;
}

.card_title>span {
    text-transform: uppercase;
    font-weight: bolder;
    color: #ffffff;
}

.edit {
    flex-direction: column;
    height: 100%;
    align-content: center;
    width: 50%;
}

.defense_section {
    margin-top: 10px;
    color: black;
}

.defense_list {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
}

.defense_item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #ffffff;
    border: 1px solid #f04986;
    padding: 5px;
    border-radius: 5px;
}

.defense_name {
    font-weight: bold;
}

.defense_value {
    background-color: #fa9da3;
    padding: 5px;
    font-weight: bold;
    border-radius: 5px;
    text-align: center;
    width: 50px;
}
</style>
