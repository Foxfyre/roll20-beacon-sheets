<script setup>
import { useAppStore } from '@/stores/index.js'
import { useMetaStore } from '@/stores/metaStore.js'
import { useSheetStore } from '@/stores/sheetStore.js'

import Abilities from '@/components/cards/AbilityScoreSection.vue';
import Skills from '@/components/cards/SkillScoreSection.vue';
import Advantages from '@/components/cards/AdvantagesSection.vue';
import Complications from '@/components/cards/ComplicationSection.vue';
import Offense from '@/components/cards/OffenseSection.vue';

// These stores should drive how to access the data in your sheet, and how to trigger actionable events.
const appStore = useAppStore()
// The meta store has generic character info for every sheet.
const meta = useMetaStore()
// The sheet store is where you want to be to customize what data / fields are on your sheet.
const sheet = useSheetStore()

</script>

<template>

    <div class="card">
        <Abilities />
    </div>
    <div class="card">
        <Skills />
    </div>
    <div class="card">
        <h2>Powers</h2>
        <div class="subheader">
            <div class="subtitle">Skills - {{ sheet.traitsCount }}</div>
            <button class="button" @click="sheet.addTrait">Add</button>
        </div>
        <div class="traits">
            <div class="trait-item" v-for="trait in sheet.traits" :key="trait._id">
                <input v-model="trait.name" placeholder="Name" />
                <input v-model="trait.description" placeholder="Description" />
                <button class="button" @click="sheet.postTraitToChat(trait)">Chat</button>
                <button class="button" @click="sheet.removeTrait(trait._id)">Remove</button>
            </div>
        </div>
    </div>
    <div class="card">
        <Offense />
    </div>
    <div class="card">
        <h2>Equip</h2>
    </div>
    <div class="card">
        <h2>Defense</h2>
    </div>
    <div class="card">
        <Advantages />
    </div>
    <div class="card">
        <Complications />
    </div>

</template>

<style scoped lang="scss">
.card {
    display: grid;
    gap: 0.5rem;
    border-radius: 1rem;
    padding: 1rem;
    width: 90%;

    &:hover {
        background: rgba(14, 98, 107, 0.86);
    }
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
Avatar positioning and default styles
*/
.avatar {
    justify-self: center;

    img {
        height: 10rem;
        border-radius: 0.5rem;
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