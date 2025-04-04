<script setup>
import { useSheetStore } from '@/stores/sheetStore.js';
import { useGearStore } from '@/stores/GearStore.js';
import GearModal from '../modals/GearModal.vue';

const sheet = useSheetStore();
const gearStore = useGearStore();
const gearList = gearStore.gear;
</script>

<script>
export default {
    name: "GearSection",
    components: {
        GearModal
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
            <span>Equipment</span>
        </div>
        <div class="edit">
            <button @click="toggleModal">Edit</button>
            <GearModal :show="isModalVisible" @close="toggleModal"></GearModal>
        </div>
    </div>

    <div class="gear_section">
        <div class="gear_list">
            <div class="gear_item" v-for="gear in gearList" :key="gear.id">
                <div class="gear_header">
                    <span class="gear_name">{{ gear.name }}</span>
                    <span class="gear_type">({{ gear.type }})</span>
                </div>
                <div class="gear_attributes">
                    <div class="gear_attribute" v-for="(attr, index) in gear.attributes" :key="index">
                        <strong>{{ attr.title }}:</strong> {{ attr.description }}
                    </div>
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
    background-color: #3a567b;
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

.gear_section {
    margin-top: 10px;
}

.gear_list {
    display: flex;
    flex-direction: column;
    gap: 10px;
    color: black;
}

.gear_item {
    background-color: #f5f5f5;
    border: 1px solid #3a567b;
    padding: 10px;
    border-radius: 5px;
}

.gear_header {
    display: flex;
    justify-content: space-between;
    font-weight: bold;
    color: #2c3e50;
}

.gear_name {
    font-size: 1.1em;
}

.gear_type {
    font-style: italic;
    color: #6c757d;
}

.gear_attributes {
    margin-top: 5px;
}

.gear_attribute {
    margin-top: 3px;
}
</style>
