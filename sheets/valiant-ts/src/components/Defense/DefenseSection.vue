<script setup>
import { useSheetStore } from '@/stores/sheetStore';
import { useDefenseStore } from '@/stores/DefenseStore';
import DefenseModal from './DefenseModal.vue';

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
            <button @click="toggleModal">
                <i class="fa-solid fa-gear"></i>
            </button>
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

.edit {
    position: relative;
    right: 20px;
}

.edit button {
    background: none;
    border: none;
    cursor: pointer;
    font-size: 1.2rem;
    color: #ffffff;
}

.edit button:hover {
    color: #a5a9e0;
}

.defense_section {
    margin-top: 5px;
    color: black;
}

.defense_list {
    display: flex;
    flex-direction: column;
}

.defense_item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #ede7f6;
    margin-bottom: 5px;
}

.defense_name {
    height: 100%;
    width: 35%;
    padding: 10px;
    background-color: #2b4d85;
    color: whitesmoke;
    font-weight: bold;
    text-transform: uppercase;
}

.defense_value {
    padding: 5px;
    font-weight: bold;
    text-align: center;
    width: 50px;
}
</style>
