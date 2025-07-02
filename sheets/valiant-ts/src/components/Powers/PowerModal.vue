<template>
  <div class="power-modal-overlay">
    <div class="power-modal-content">
      <button class="close-btn" @click="$emit('close')">&times;</button>
      <h2>ADD POWER</h2>
      <div class="total-cost-box">
        <span>TOTAL COST</span>
        <div class="cost">{{ totalCost }}</div>
      </div>
      <form @submit.prevent="createPower">
        <div class="form-row">
          <label>Power Name *</label>
          <input v-model="powerName" required />
          <label>Descriptor</label>
          <input v-model="descriptor" />
        </div>
        <div class="form-row">
          <label>Effect</label>
          <select v-model="effect">
            <option disabled value="">Select an effect...</option>
            <option v-for="e in effectOptions" :key="e" :value="e">{{ e }}</option>
          </select>
          <label>Action *</label>
          <select v-model="action" required>
            <option disabled value="">Select an action...</option>
            <option v-for="a in actionOptions" :key="a" :value="a">{{ a }}</option>
          </select>
        </div>
        <div class="form-row">
          <label>Range</label>
          <select v-model="range">
            <option>Ranged</option>
            <option>Close</option>
            <option>Personal</option>
          </select>
          <label>Duration</label>
          <select v-model="duration">
            <option>Instant</option>
            <option>Sustained</option>
            <option>Permanent</option>
          </select>
        </div>
        <div class="form-row">
          <label>Effect Rank</label>
          <input v-model.number="effectRank" type="number" min="1" />
          <label>Effect Cost</label>
          <input v-model.number="effectCost" type="number" min="0" />
          <span>per rank</span>
        </div>
        <div class="form-row">
          <label>Effect Type</label>
          <select v-model="effectType">
            <option disabled value="">Select effect type...</option>
            <option v-for="t in effectTypeOptions" :key="t" :value="t">{{ t }}</option>
          </select>
        </div>
        <div class="form-row">
          <button type="button" class="add-modifier-btn" @click="showModifierModal = true">Add Modifier</button>
          <button type="submit" class="create-power-btn">Create Power</button>
        </div>
        <div v-if="extras.length" class="modifiers-list">
          <strong>Modifiers:</strong>
          <ul>
            <li v-for="(mod, i) in extras" :key="i">{{ mod }}</li>
          </ul>
        </div>
      </form>
      <ModifierModal v-if="showModifierModal" @save="addModifier" @close="showModifierModal = false" />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { usePowersStore } from '@/stores/PowersStore';
import ModifierModal from './ModifierModal.vue';

const emit = defineEmits(['close']);
const powersStore = usePowersStore();

const powerName = ref('');
const descriptor = ref('');
const effect = ref('');
const action = ref('');
const range = ref('Ranged');
const duration = ref('Instant');
const effectRank = ref(10);
const effectCost = ref(0);
const effectType = ref('');
const extras = ref([]);

const showModifierModal = ref(false);

const effectOptions = ['Damage', 'Move Object', 'Affliction', 'Create', 'Nullify'];
const actionOptions = ['Standard', 'Move', 'Free', 'Reaction'];
const effectTypeOptions = ['Attack', 'Defense', 'Utility'];

const totalCost = computed(() => effectRank.value * effectCost.value);

function addModifier(mod) {
  extras.value.push(mod);
  showModifierModal.value = false;
}

function createPower() {
  powersStore.addPower('standalone');
  const newPower = powersStore.powers[powersStore.powers.length - 1];
  newPower.name = powerName.value;
  newPower.descriptor = descriptor.value;
  newPower.cost = totalCost.value;
  newPower.extras = [...extras.value];
  newPower.effects = [
    {
      id: Date.now(),
      name: effect.value,
      rank: effectRank.value,
      details: `${action.value}, ${range.value}, ${duration.value}, ${effectType.value}`
    }
  ];
  emit('close');
}
</script>

<style scoped>
.power-modal-overlay {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.7);
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
}
.power-modal-content {
  background: #222;
  color: #fff;
  border-radius: 8px;
  padding: 30px 30px 20px 30px;
  min-width: 500px;
  position: relative;
  box-shadow: 0 0 30px #000;
  background-image: url('/img/valiant-bg.jpg');
  background-size: cover;
}
.close-btn {
  position: absolute;
  top: 10px; right: 10px;
  background: none;
  border: none;
  color: #fff;
  font-size: 2rem;
  cursor: pointer;
}
h2 {
  margin-top: 0;
  font-size: 2rem;
  font-weight: bold;
  letter-spacing: 1px;
  text-shadow: 2px 2px 4px #000;
}
.total-cost-box {
  position: absolute;
  top: 20px; right: 20px;
  background: #a00;
  color: #fff;
  border-radius: 6px;
  padding: 8px 16px;
  text-align: center;
  font-weight: bold;
  box-shadow: 2px 2px 8px #000;
}
.total-cost-box span {
  font-size: 0.9rem;
  display: block;
}
.total-cost-box .cost {
  font-size: 2rem;
  margin-top: 2px;
}
form {
  margin-top: 30px;
}
.form-row {
  display: flex;
  gap: 10px;
  margin-bottom: 12px;
  align-items: center;
}
input, select {
  background: #f8d1d1;
  border: 1px solid #a00;
  border-radius: 4px;
  padding: 5px 8px;
  color: #222;
  font-size: 1rem;
  min-width: 120px;
}
.add-modifier-btn, .create-power-btn {
  background: #fff;
  color: #a00;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  font-weight: bold;
  cursor: pointer;
  margin-right: 10px;
}
.create-power-btn {
  background: #a00;
  color: #fff;
}
.add-modifier-btn {
  background: #fff;
  color: #222;
  border: 1px solid #222;
}
.modifiers-list {
  margin-top: 10px;
  background: #fff3;
  border-radius: 4px;
  padding: 8px 12px;
  color: #fff;
}
.modifiers-list ul {
  margin: 0; padding-left: 18px;
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
</style>