<script setup>
import { useAppStore } from '@/stores/index'
import { useMetaStore } from '@/stores/metaStore'
import { useSheetStore } from '@/stores/sheetStore'

import Skills from '@/components/Skills/SkillScoreSection.vue';
import Advantages from '@/components/Advantage/AdvantagesSection.vue';
import Complications from '@/components/Complication/ComplicationSection.vue';
import Offense from '@/components/Offense/OffenseSection.vue';
import Defense from '@/components/Defense/DefenseSection.vue';
import Powers from '@/components/Powers/PowersSection.vue';
import Gear from '@/components/Gear/GearSection.vue';

// These stores should drive how to access the data in your sheet, and how to trigger actionable events.
const appStore = useAppStore()
// The meta store has generic character info for every sheet.
const meta = useMetaStore()
// The sheet store is where you want to be to customize what data / fields are on your sheet.
const sheet = useSheetStore()

</script>

<template>
    <div class="row">
        <div class="card">
            <Skills />
        </div>
        <div class="card">
            <Advantages />
        </div>
    </div>


    <div class="row">
        <div class="powers-equipment-column">
            <div class="card powers">
                <Powers />
            </div>
            <div class="card gear">
                <Gear />
            </div>
        </div>
        <div class="card complications">
            <Complications />
        </div>
    </div>

    <div class="row">
        <div class="card defense">
            <Defense />
        </div>
        <div class="card offense">
            <Offense />
        </div>
    </div>

</template>

<style scoped lang="scss">
.row {
    display: flex;
    flex-direction: row;
}

.card {
    border-radius: 1rem;
    padding: 1rem;
    width: 100%;
    box-sizing: border-box;

    &:hover {
        background: rgba(14, 98, 107, 0.86);
    }
}

.powers-equipment-column {
    display: flex;
    flex-direction: column;
    width: 70%;
}

.complications {
    display: flex;
    flex-direction: column;
    justify-content: stretch;
    width: 30%;
}

.defense {
    width: 30%;
}

.offense {
    width: 70%;
}

/*
Header for each card in your grid layout
*/
.subheader {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
}

.subtitle {
    padding-top: 1.25rem;
    font-size: 1.75rem;
    line-height: 2rem;
}

/*
Styling for buttons
*/
.button {
    cursor: pointer;
    width: auto;
    height: fit-content;
    background: #b719be;
    color: #ffffff;
    border-radius: 0.25rem;
    font-size: 0.75rem;
    padding: 0.25rem;
    border: none;
    font-weight: 500;

    &:hover {
        background: rgb(200, 68, 206);
    }
}

/*
Styling for form labels
*/
.label {
    font-weight: 600;
    font-size: 0.75rem;
    text-transform: uppercase;
}

/*
Styling for form inputs, currently this quickstart is only using default inputs that handle text.
*/
input {
    font-size: 1rem;
    color: #ffffff;
    background-color: #000000;
    border-radius: 0.25rem;
    border: none;
    height: 2rem;
    padding: 0.25rem;

    &:focus {
        outline-color: #ffffff;
        outline-style: groove;
    }
}

/*
Styling for the scrollable traits list.
*/
.traits {
    overflow-y: scroll;
    padding: 0.25rem;
}

/*
Styling for each trait row, that uses a grid.
*/
.trait-item {
    display: grid;
    grid-template-columns: 8rem 1fr auto auto 1rem;
    column-gap: 0.25rem;
    padding-bottom: 0.25rem;
}
</style>