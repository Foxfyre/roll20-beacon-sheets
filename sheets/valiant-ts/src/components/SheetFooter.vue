<script setup>
import { useMetaStore } from '@/stores/metaStore'
const meta = useMetaStore()

</script>

<template>
    <div class="container">
        <div class="summary">Summary of stats</div>
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

.col1 {
    width: 75%;
}

.col2 {
    width: 25%;
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

.character_power input {
    height: 100%;
}

.avatar {
    justify-self: center;

    img {
        height: 10rem;
        border-radius: 0.5rem;
    }
}
</style>