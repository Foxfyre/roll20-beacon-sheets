<script setup>
import { useSheetStore } from '@/stores/sheetStore';
import { usePowersStore } from '@/stores/PowersStore';
import PowersModal from './PowersModal.vue';

const sheet = useSheetStore();
const powersStore = usePowersStore();
const powers = powersStore.powers;
</script>

<script>
export default {
    name: "PowersSection",
    components: {
        PowersModal
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
            <span>Powers</span>
        </div>
        <div class="edit">
            <button @click="toggleModal">
                <i class="fa-solid fa-gear"></i>
            </button>
            <PowersModal :show="isModalVisible" @close="toggleModal"></PowersModal>
        </div>
    </div>

    <div class="powers_section">
        <div class="power_list">
            <template v-for="power in powers" :key="power.id">
                <!-- Standalone Power -->
                <div v-if="power.type === 'standalone'" class="power_item">
                    <div class="power-group-header">
                        <div class="power_name">{{ power.name }}</div>
                        <div class="power_cost">{{ power.cost }} PP</div>
                    </div>
                    <div class="power_effects">
                        <div v-for="effect in power.effects" :key="effect.id" class="effect_item">
                            <span class="effect_name">{{ effect.name }}</span>
                            <span> -</span>
                            <span class="effect_rank">Rank {{ effect.rank }}</span>
                            <span> - </span>
                            <span class="effect_details">{{ effect.details }}</span>
                        </div>
                    </div>
                </div>
                <!-- Power Array -->
                <div v-else-if="power.type === 'array'" class="power_item">
                    <div class="power-group-header">
                        <div class="power_name">{{ power.name }}</div>
                        <div class="power_cost">{{ power.totalCost }} PP</div>
                    </div>
                    <div class="power_effects">
                        <div v-for="child in power.powers" :key="child.id" class="effect_item">
                            <div class="power_name">{{ child.name }}</div>
                            <div class="power_effects">
                                <div v-for="effect in child.effects" :key="effect.id" class="effect_item">
                                    <span class="effect_name">{{ effect.name }}</span>
                                    <span> -</span>
                                    <span class="effect_rank">Rank {{ effect.rank }}</span>
                                    <span> - </span>
                                    <span class="effect_details">{{ effect.details }}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </template>
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

.powers_section {
    margin-top: 10px;
    color: black;
}

.power_list {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.power_item {
    background-color: #f5f5f5;
    border: 1px solid #8B5CF6;
    padding: 10px;
    border-radius: 5px;
}

.power-group-header {
    display: flex;
    flex-direction: row;
    align-items: center;
}

.power_name {
    font-weight: bold;
    font-size: 1.1em;
}

.power_cost {
    background-color: #d1c4e9;
    padding: 5px;
    font-weight: bold;
    border-radius: 5px;
    text-align: center;
    width: 50px;
    margin-left: 10px;
}

.power_effects {
    margin-top: 5px;
    padding-left: 10px;
}

.effect_item {
    background-color: #ede7f6;
    padding: 5px;
    border-radius: 5px;
    margin-top: 5px;
}

.effect_name {
    font-weight: bold;
}

.effect_rank {
    font-style: italic;
    margin-left: 10px;
}
</style>
