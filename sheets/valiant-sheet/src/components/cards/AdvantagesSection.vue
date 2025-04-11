<script setup>
import { useSheetStore } from '@/stores/sheetStore.js';
import advantageModal from '../modals/advantageModal.vue';
import { useAdvantageStore } from '@/stores/AdvantageStore';
const sheet = useSheetStore();
const advantageStore = useAdvantageStore();
const advantages = advantageStore.advantages;
</script>

<script>
export default {
    name: "advantages", // Name your parent component
    components: {
        advantageModal
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
            <span>Advantages</span>
        </div>
        <div class="edit">
            <button @click="toggleModal">
                <i class="fa-solid fa-gear"></i>
            </button>
            <advantageModal :show="isModalVisible" @close="toggleModal"></advantageModal>
        </div>
    </div>

    <div class="section">
        <div class="subsection_header">
            <div class="header_name">Advantage</div>
            <div class="header_detail">Details</div>
        </div>
        <div class="subsection" v-for="advantage in advantages" :key="name">
            <div class="label">
                {{ advantage.name }}
            </div>
            <div class="description">
                {{ advantage.description }}
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

.section {
    display: flex;
    flex-direction: column;
    align-items: center;
    align-content: space-around;
    color: #000000;
    background-color: #a5a9e0;
    padding: 0 0 20px 0;
}

.subsection_header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    background-color: #f2f3ff;
    font-weight: bold;
}

.header_name {
    width: 30%;
}

.header_detail {
    display: flex;
    justify-content: center;
    width: 80%;
}

.subsection {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    width: 100%;
    align-items: center;
    justify-content: space-between;
    margin: 5px 0 0 0;
    background-color: #e8e9ff;
}

.label {
    display: flex;
    justify-content: flex-start;
    width: 30%;
    color: black;
    font-weight: bold;
}

.description {
    display: flex;
    justify-content: flex-start;
    color: black;
    padding: 5px;
}
</style>

<!--
<div class="subheader">
    <div class="subtitle">Skills - {{ sheet.traitsCount }}</div>
    <button class="button" @click="sheet.addTrait">Add</button>
</div>
<div class="traits">
    <div class="trait-item" v-for="trait in sheet.traits" :key="trait._id">
        <input v-model="trait.name" placeholder="Name" />
        <input v-model="trait.description" placeholder="Description" />
        <button class="button" @click="sheet.postTraitToChat(trait)">Chat</button>
        <button class="button" @click="sheet.removeTrait(trait._id)">Remove</button>
    </div>
</div>*/-->