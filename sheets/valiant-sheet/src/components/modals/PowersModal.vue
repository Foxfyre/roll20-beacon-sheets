<script>
export default {
    name: "PowersModal",
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
import { usePowersStore } from '@/stores/PowersStore.js';

const powersStore = usePowersStore();
const powers = powersStore.powers;
</script>

<template>
    <div class="modal-overlay" v-if="show">
        <div class="modal-content">
            <button class="close-button" @click="close">&times;</button>
            <h2>Edit Powers</h2>

            <div class="power_section">
                <div class="power_item" v-for="power in powers" :key="power.id">
                    <input v-model="power.name" placeholder="Power Name" />
                    <input v-model="power.cost" type="number" placeholder="PP Cost" />

                    <div class="effects_section">
                        <div class="effect_item" v-for="effect in power.effects" :key="effect.id">
                            <input v-model="effect.name" placeholder="Effect Name" />
                            <input v-model="effect.rank" type="number" placeholder="Rank" />
                            <input v-model="effect.details" placeholder="Effect Details" />
                            <button class="button" @click="powersStore.removeEffect(power.id, effect.id)">Remove</button>
                        </div>
                        <button class="button" @click="powersStore.addEffect(power.id)">Add Effect</button>
                    </div>

                    <button class="button remove" @click="powersStore.removePower(power.id)">Remove Power</button>
                </div>
            </div>

            <div class="modal_footer">
                <button class="button" @click="powersStore.addPower">Add New Power</button>
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
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
}

.modal-content {
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    max-width: 500px;
    width: 100%;
    position: relative;
}

.close-button {
    position: absolute;
    top: 10px;
    right: 10px;
    font-size: 1.5rem;
    background: none;
    border: none;
    cursor: pointer;
}

.power_section {
    margin-top: 10px;
}

.power_item {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-top: 10px;
    padding: 10px;
    background-color: #ede7f6;
    border-radius: 5px;
}

input {
    border: 1px solid #ccc;
    padding: 5px;
    border-radius: 5px;
}

.effects_section {
    margin-top: 10px;
}

.effect_item {
    display: flex;
    flex-direction: column;
    gap: 5px;
    padding: 5px;
    background-color: #d1c4e9;
    border-radius: 5px;
}

.modal_footer {
    margin-top: 10px;
    text-align: center;
}

.remove {
    background-color: #e57373;
    color: white;
}
</style>
