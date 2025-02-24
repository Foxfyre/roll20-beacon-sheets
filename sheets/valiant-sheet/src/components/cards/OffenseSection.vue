<script setup>
import { useSheetStore } from '@/stores/sheetStore.js';
import { useOffenseStore } from '@/stores/OffenseStore.js';
import OffenseModal from '../modals/OffenseModal.vue';

const sheet = useSheetStore();
const offenseStore = useOffenseStore();
const offenses = offenseStore.offenses;
</script>

<script>
export default {
    name: "offenses",
    components: {
        OffenseModal
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
            <span>Offense</span>
        </div>
        <div class="edit">
            <button @click="toggleModal">Open Popup</button>
            <OffenseModal :show="isModalVisible" @close="toggleModal"></OffenseModal>
        </div>
    </div>

    <div class="offense_section">
        <div class="offense_subsection">
            <div class="initiative_label">Initiative</div>
            <div class="initiative_value">
                +<span>{{ offenseStore.initiative }}</span>
            </div>
        </div>

        <div class="offense_list">
            <div class="offense_item" v-for="offense in offenses" :key="offense.id">
                <div class="offense_name">{{ offense.name }}</div>
                <div class="offense_bonus">+{{ offense.bonus }}</div>
                <div class="offense_details">{{ offense.details }}</div>
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

.offense_section {
    margin-top: 10px;
    color: black;
}

.offense_subsection {
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: center;
}

.initiative_label {
    background-color: #f49dc4;
    padding: 5px;
    font-weight: bold;
    text-align: center;
}

.initiative_value {
    background-color: #fa9da3;
    padding: 5px;
    font-weight: bold;
    text-align: center;
}

.offense_list {
    margin-top: 10px;
}

.offense_item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #f5f5f5;
    border: 1px solid #ccc;
    padding: 5px;
    margin-top: 5px;
    text-wrap-style: balance;
}

.offense_name {
    font-weight: bold;
    flex-grow: 1;
}

.offense_bonus {
    background-color: #fa9da3;
    padding: 5px;
    font-weight: bold;
    border-radius: 5px;
    text-align: center;
    width: 50px;
}

.offense_details {
    flex-grow: 2;
    text-align: right;
}
</style>