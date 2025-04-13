<script setup>
import { useSheetStore } from '@/stores/sheetStore';
import ComplicationModal from './ComplicationModal.vue';
import { useComplicationStore } from '@/stores/ComplicationStore';
const sheet = useSheetStore();
const complicationStore = useComplicationStore();
const complications = complicationStore.complications;
</script>

<script>
export default {
    name: "complications",
    components: {
        ComplicationModal
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
            <span>Complications</span>
        </div>
        <div class="edit">
            <button @click="toggleModal">
                <i class="fa-solid fa-gear"></i>
            </button>
            <ComplicationModal :show="isModalVisible" @close="toggleModal"></ComplicationModal>
        </div>
    </div>

    <div class="complication-section">
        <div class="complication_subsection" v-for="complication in complications" :key="name" >
            <div class="complication_label"> {{ complication.name }}</div>
            <div class="complication_desc_separator">
                <div class="complication_description">
                    {{ complication.description }}
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

.complication-section {
    padding: 5px 10px;
}

.complication_label {
    margin-bottom: 5px;
    color: black;
    font-weight: bold;
}

.complication_description {
    color: black;
}

.complication_desc_separator {
    padding-bottom: 10px;
}
</style>