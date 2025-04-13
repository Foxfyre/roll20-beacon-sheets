<script>
export default {
    name: "ComplicationModal",
    props: {
        show: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        close() {
            this.$emit("close");
        }
    }
};
</script>

<script setup>
import {useSheetStore } from '@/stores/sheetStore';
import {useComplicationStore} from '@/stores/ComplicationStore';
const sheet = useSheetStore();
const complicationStore = useComplicationStore();
const complications = complicationStore.complications;
</script>

<template>
    <div class="modal-overlay" v-if="show">
        <div class="modal-content">
            <button class="close-button" @click="close">&times;</button>
            <slot></slot>
            <div class="card_header">
                <div class="card_title">
                    <span>Complications</span>
                </div>
                <div class="ability_edit">
                    <complicationModal :show="isModalVisible" @close="toggleModal">
                        <h2>Popup Title</h2>
                        <p>This is the content inside the popup.</p>
                    </complicationModal>
                </div>
            </div>

            <div class="advantage_section">

                <div class="advantage-item" v-for="complication in complications" :key="complication._id">
                    <input v-model="complication.name" placeholder="Name" />
                    <input v-model="complication.description" placeholder="Description" />
                    <button class="button" @click="complications.postComplicationToChat(complication)">Chat</button>
                    <button class="button" @click="complicationStore.removeComplication(complication._id)">Remove</button>
                </div>

            </div>

            <div class="subheader">
                <button class="button" @click="complicationStore.addComplication">Add</button>
            </div>

        </div>
    </div>
</template>

<style scoped>
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    /* Semi-transparent background */
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    /* Ensure it's above other content */
}

.modal-content {
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    position: relative;
    max-width: 500px;
    width: 100%;
}

.close-button {
    position: absolute;
    top: 0px;
    right: 0px;
    font-size: 1.5rem;
    background: none;
    border: none;
    cursor: pointer;
}

.card_header {
    width: 100%;
    height: 40px;
    background-color: maroon;
    text-align: center;
    align-content: center;
}

.card_title {
    font-weight: bold;
    text-transform: uppercase;
}

.ability_section {
    display: grid;
    grid-template-columns: 1fr 1fr;
    color: #000000;
    font-weight: bold;
    text-transform: uppercase;
}

.ability_subsection {
    display: flex;
    flex-direction: row;
    padding: 0.5rem;
}

.ability_label {
    width: 50%;
    display: flex;
    align-items: center;
}

.ability_number {
    width: 30px;
    height: 25px;
    border: 1px black solid;
    border-radius: 5px;
    color: black;
    margin: auto;
    text-align: center;
    background-color: #fa9da3;
}


.ability_number input {
    width: 20px;
    height: 15px;
    background-color: transparent;
    border: none;
    text-align: center;
    color: #000000;
    font-weight: bold;
}
</style>