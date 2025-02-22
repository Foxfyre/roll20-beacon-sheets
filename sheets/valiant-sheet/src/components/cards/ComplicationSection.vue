<script setup>
import { useSheetStore } from '@/stores/sheetStore.js';
import complicationModal from '../modals/ComplicationModal.vue';
import { useComplicationStore } from '@/stores/ComplicationStore';
const sheet = useSheetStore();
const complicationStore = useComplicationStore();
const complications = complicationStore.complications;
</script>

<script>
export default {
    name: "complications",
    components: {
        complicationModal
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
            <button @click="toggleModal">Open Popup</button>
            <complicationModal :show="isModalVisible" @close="toggleModal"></complicationModal>
        </div>
    </div>

    <div class="complication_section">
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

.complication_label {
    margin-bottom: 5px;
    color: black;
    font-weight: bold;
}

.complication_description {
    color: black;
}

.complication_desc_separator {
    border-bottom: black 1px solid;
    padding-bottom: 10px;
}
</style>