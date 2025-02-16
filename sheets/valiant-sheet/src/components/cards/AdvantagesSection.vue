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
            <button @click="toggleModal">Open Popup</button>
            <advantageModal :show="isModalVisible" @close="toggleModal"></advantageModal>
        </div>
    </div>

    <div class="advantage_section">
        <div class="advantage_subsection" v-for="advantage in advantages" :key="name" >
            <div class="advantage_label">{{ advantage.name }}</div>
            <div class="advantage_desc_dropdown">
                <div class="advantage_description">
                    {{ advantage.description }}
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

.advantage_label {
    margin-bottom: 5px;
}

.advantage_desc_dropdown {
    border-bottom: black 1px solid;
    padding-bottom: 10px;
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