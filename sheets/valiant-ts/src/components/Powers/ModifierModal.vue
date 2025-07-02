<template>
  <div class="modifier-modal-overlay">
    <div class="modifier-modal-content">
      <h3>Add Modifier</h3>
      <input v-model="modifierText" placeholder="Enter modifier..." />
      <div class="modal-actions">
        <button @click="save">Save</button>
        <button @click="$emit('close')">Cancel</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
const emit = defineEmits(['save', 'close']);
const modifierText = ref('');

function save() {
  if (modifierText.value.trim()) {
    emit('save', modifierText.value.trim());
    modifierText.value = '';
  }
}
</script>

<style scoped>
.modifier-modal-overlay {
  position: fixed; top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.5); z-index: 3000;
  display: flex; align-items: center; justify-content: center;
}
.modifier-modal-content {
  background: #fff; color: #222; border-radius: 8px;
  padding: 24px; min-width: 320px; box-shadow: 0 0 20px #000;
}
.modal-actions {
  margin-top: 16px; display: flex; gap: 10px; justify-content: flex-end;
}
input {
  width: 100%; padding: 8px; margin-top: 10px;
  border: 1px solid #a00; border-radius: 4px;
}
</style>