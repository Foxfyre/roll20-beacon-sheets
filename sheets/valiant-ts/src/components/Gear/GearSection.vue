<script setup>
import { useSheetStore } from '@/stores/sheetStore';
import { useGearStore } from '@/stores/GearStore';
import GearModal from './GearModal.vue';

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
            <button @click="toggleModal">
                <i class="fa-solid fa-gear"></i>
            </button>
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

.card_title>span {
    text-transform: uppercase;
    font-weight: bolder;
    color: #ffffff;
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
    display: flex;
    flex-direction: row;
    margin-top: 5px;
}

.gear_attribute {
    margin-top: 3px;
    padding-left: 10px;
}
</style>
