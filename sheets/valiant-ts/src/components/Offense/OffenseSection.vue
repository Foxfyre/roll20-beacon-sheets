<script setup>
import { useSheetStore } from '@/stores/sheetStore';
import { useOffenseStore } from '@/stores/OffenseStore';
import OffenseModal from './OffenseModal.vue';

const sheet = useSheetStore();
const offenseStore = useOffenseStore();
const offenses = offenseStore.offenses;
</script>

<script>
export default {
    name: "offenses",
    components: {
        OffenseModal
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
            <span>Offense</span>
        </div>
        <div class="edit">
            <button @click="toggleModal">
                <i class="fa-solid fa-gear"></i>
            </button>
            <OffenseModal :show="isModalVisible" @close="toggleModal"></OffenseModal>
        </div>
    </div>

    <div class="section">
        <div class="subsection-header">
            <div class="header-name">Attack</div>
            <div class="header-bonus">Bonus</div>
            <div class="header-target">Targets</div>
            <div class="header-effect">Effect</div>
            <div class="header-save">Save</div>
        </div>

        <div class="subsection">
            <div class="offense-item" v-for="offense in offenses" :key="offense.id">
                <div class="offense-name">{{ offense.name }}</div>
                <div class="offense-bonus">+{{ offense.bonus }}</div>
                <div class="offense-target">{{ offense.target }}</div>
                <div class="offense-effect">{{ offense.effect }}</div>
                <div class="offense-save">{{ offense.save }}</div>
            </div>
        </div>

        <div class="initiative">
            <div class="initiative_label">Initiative</div>
            <div class="initiative_value">
                +<span>{{ offenseStore.initiative }}</span>
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
    margin-top: 10px;
    color: black;
}

.subsection-header {
  display: grid;
  grid-template-columns: repeat(5, 1fr); // 5 equal columns
  background-color: #f2f3ff;
  width: 100%;
  text-align: center;
}

.subsection {
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    width: 100%;
    align-items: center;
    justify-content: space-between;
    margin: 5px 0 0 0;
    background-color: #e8e9ff;
}

.offense_list {
    margin-top: 10px;
}

.offense-item {
  display: grid;
  grid-template-columns: repeat(5, 1fr); // Same 5 equal columns
  background-color: #f5f5f5;
  margin: 5px 0;
  width: 100%;
  align-items: center;
  text-align: center;
}

.offense-name {
    font-weight: bold;
    flex-grow: 1;
}

.initiative {
    display: flex;
    flex-direction: row;
    justify-content: center;
}

.initiative_label {
    padding: 5px;
    font-weight: bold;
    text-align: center;
}

.initiative_value {
    padding: 5px;
    font-weight: bold;
    text-align: center;
}

</style>