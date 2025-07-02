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
import { ref } from 'vue';
import { usePowersStore } from '@/stores/PowersStore';
import PowerModal from './PowerModal.vue'; // <-- Add this import

const powersStore = usePowersStore();
const powers = powersStore.powers;
const addingType = ref("standalone");
const showPowerModal = ref(false); // <-- Add this ref

function openPowerModal() {
  showPowerModal.value = true;
}
function closePowerModal() {
  showPowerModal.value = false;
}
</script>

<template>
    <div class="modal-overlay" v-if="show">
        <div class="modal-content">
            <button class="close-button" @click="close">&times;</button>
            <h2>Edit Powers</h2>
            <div class="add-power-controls">
                <label>
                    <input type="radio" value="standalone" v-model="addingType" />
                    Standalone Power
                </label>
                <label>
                    <input type="radio" value="array" v-model="addingType" />
                    Power Array
                </label>
            </div>
            <div class="modal-scrollable-content">
                <div class="power_section">
                    <template v-for="power in powers" :key="power.id">
                        <!-- Standalone Power -->
                        <div v-if="power.type === 'standalone'" class="power_item">
                            <div><strong>Power Name:</strong> {{ power.name }}</div>
                            <div><strong>PP Cost:</strong> {{ power.cost }}</div>
                            <div><strong>Descriptor:</strong> {{ power.descriptor }}</div>
                            <div>
                                <strong>Modifiers:</strong>
                                <ul v-if="Array.isArray(power.extras)">
                                    <li v-for="(mod, i) in power.extras" :key="i">{{ mod }}</li>
                                </ul>
                                <span v-else>{{ power.extras }}</span>
                            </div>
                            <div class="effects_section">
                                <div class="effect_item" v-for="effect in power.effects" :key="effect.id">
                                    <div><strong>Effect Name:</strong> {{ effect.name }}</div>
                                    <div><strong>Rank:</strong> {{ effect.rank }}</div>
                                    <div><strong>Effect Details:</strong> {{ effect.details }}</div>
                                    <button class="button" @click="powersStore.removeEffect(power.id, effect.id)">Remove</button>
                                </div>
                                <button class="button" @click="powersStore.addEffect(power.id)">Add Effect</button>
                            </div>
                            <button class="button remove" @click="powersStore.removePower(power.id)">Remove Power</button>
                        </div>
                        <!-- Power Array -->
                        <div v-else-if="power.type === 'array'" class="power_item">
                            <input v-model="power.name" placeholder="Array Name" />
                            <!-- Type Dropdown -->
                            <select v-model="power.arrayType" style="margin-bottom: 5px;">
                                <option value="Standard">Standard</option>
                                <option value="Dynamic">Dynamic</option>
                            </select>
                            <input v-model="power.modifiers" placeholder="Modifiers (comma separated)" />
                            <div class="array_powers">
                                <div class="child_power" v-for="child in power.powers" :key="child.id">
                                    <input v-model="child.name" placeholder="Power Name" />
                                    <input v-model="child.descriptor" placeholder="Descriptor" />
                                    <input v-model="child.extras" placeholder="Extras (comma separated)" />
                                    <div class="effects_section">
                                        <div class="effect_item" v-for="effect in child.effects" :key="effect.id">
                                            <input v-model="effect.name" placeholder="Effect Name" />
                                            <input v-model="effect.rank" type="number" placeholder="Rank" />
                                            <input v-model="effect.details" placeholder="Effect Details" />
                                            <button class="button" @click="powersStore.removeEffect(power.id, effect.id, true, child.id)">Remove</button>
                                        </div>
                                        <button class="button" @click="powersStore.addEffect(power.id, true, child.id)">Add Effect</button>
                                    </div>
                                    <button class="button remove" @click="powersStore.removeChildPower(power.id, child.id)">Remove Power</button>
                                </div>
                                <button class="button" @click="powersStore.addChildPower(power.id)">Add Power to Array</button>
                            </div>
                            <button class="button remove" @click="powersStore.removePower(power.id)">Remove Array</button>
                        </div>
                    </template>
                </div>
            </div>
            <div class="modal_footer">
                <button
                    v-if="addingType === 'standalone'"
                    class="button add"
                    @click="openPowerModal"
                >
                    Add Standalone Power
                </button>
                <button
                    v-else
                    class="button add"
                    @click="powersStore.addPower('array')"
                >
                    Add Power Array
                </button>
            </div>
        </div>
        <!-- PowerModal for adding a standalone power -->
        <PowerModal v-if="showPowerModal" @close="closePowerModal" />
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
    height: 500px; /* Fixed height */
    min-height: 300px;
    max-height: 80vh;
    resize: both;
    overflow: auto;
    position: relative;
    display: flex;
    flex-direction: column;
}

.modal-scrollable-content {
    flex: 1 1 auto;
    overflow-y: auto;
    margin-top: 10px;
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

.child_power {
    display: flex;
    flex-direction: column;
    gap: 5px;
    padding: 5px;
    background-color: #e8eaf6;
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

.add-power-controls {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 10px;
}

.button.add {
    font-weight: bold;
}

.power-block {
  background: #333;
  border-radius: 6px;
  padding: 15px;
  margin-bottom: 15px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.5);
}
.power-block h4 {
  margin: 0 0 10px 0;
  font-size: 1.5rem;
  color: #ffd700;
}
.power-block div {
  margin-bottom: 8px;
}
.effect-block {
  background: #444;
  border-radius: 4px;
  padding: 8px 12px;
  margin-top: 8px;
  color: #fff;
}
</style>
