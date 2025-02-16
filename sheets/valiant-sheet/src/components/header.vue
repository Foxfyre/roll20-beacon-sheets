<script setup>
import { useMetaStore } from '@/stores/metaStore.js'
const meta = useMetaStore()

/*
        <div class="avatar">
            <img :src="meta.avatar" alt="Character Avatar" />
        </div>
        <label for="character_name">
            <span class="label">Character Name</span>
        </label>
        <input id="character_name" v-model="meta.name" />
        */
</script>

<template>
    <div class="container">
        <div class="avatar1">Avatar</div>
        <div class="character_details">
            <div class="name">{{meta.name}}</div>
            <div class="summary">Summary of stats</div>
        </div>
        <div class="character_power">PL/Hero Points</div>

    </div>

</template>

<style scoped lang=scss>
/*
Avatar positioning and default styles
*/
.container {
    display: grid;
    grid-template-columns: 20% 60% 20%;
    grid-template-rows: 100%;
    grid-gap: 10px;
    background-color: blue;
    margin: auto 30px;
    padding: 0 20px;
    justify-content: center;
}

.avatar1 {
    background-color: lightblue;
    aspect-ratio: 1/1;
    color: black;
    margin: 10px;
}

.character_details {
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: center;
}

.name {
    display: flex;
    background-color: lightcoral;
    height: 50%;
    align-items: center;
    justify-content: center;
}

.summary {
    display: flex;
    background-color: slateblue;
    height: 25%;
    align-items: center;
    justify-content: center;
}

.character_power {
    display: flex;
    flex-direction: column;
    background-color: seagreen;
    margin: 10px;
}

.avatar {
    justify-self: center;

    img {
        height: 10rem;
        border-radius: 0.5rem;
    }
}

input {
    font-size: 1rem;
    color: #ffffff;
    background-color: #000000;
    border-radius: 0.25rem;
    border: none;
    height: 2rem;
    padding: 0.25rem;
}
</style>