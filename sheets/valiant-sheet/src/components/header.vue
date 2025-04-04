<script setup>
import { useMetaStore } from '@/stores/metaStore.js'
import defaultAvatar from '@/assets/default-avatar.jpg';
import Abilities from '@/components/cards/AbilityScoreSection.vue';
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
    <div class="character-header">
        <div class="character-info">
            <div class="name-container">
                <input class="character-name" v-model="meta.name" placeholder="Character Name" />
                <div class="power-level">
                    <span>PL</span>
                    <input class="pl-input" v-model="meta.power" placeholder="10" />
                </div>
            </div>

            <div class="bio-container">
                <div class="bio-item">
                    <span>Real Name:</span>
                    <input v-model="meta.realName" placeholder="Enter Real Name" />
                </div>
                <div class="bio-item">
                    <span>Age:</span>
                    <input v-model="meta.age" placeholder="Age" />
                </div>
                <div class="bio-item">
                    <span>Hair:</span>
                    <input v-model="meta.hair" placeholder="Hair Color" />
                </div>
                <div class="bio-item">
                    <span>Occupation:</span>
                    <input v-model="meta.occupation" placeholder="Occupation" />
                </div>
                <div class="bio-item">
                    <span>Place Of Origin</span>
                    <input v-model="meta.origin" placeholder="Place Of Origin" />
                </div>
            </div>

            <div class="card">
                <Abilities />
            </div>
        </div>

        <div class="avatar-container">
            <img :src="meta.avatar || defaultAvatar" alt="Character Avatar" class="avatar-image" />
        </div>
    </div>

</template>

<style scoped lang=scss>
/*
Avatar positioning and default styles
*/
.character-header {
    display: grid;
    grid-template-columns: 75% 25%;
    align-items: center;
    padding: 10px 20px;
    border-radius: 10px;
    color: white;
}

.character-header input::placeholder {
    color: whitesmoke;
}

.character-info {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.name-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #2b4d85;
    padding: 10px;
    border-radius: 5px;
}

.character-name {
    flex-grow: 1;
    font-size: 1.5rem;
    font-weight: bold;
    background: none;
    border: none;
    color: white;
}

.power-level {
    display: flex;
    align-items: center;
    background-color: #4d6fa7;
    padding: 5px 10px;
    border-radius: 5px;
}

.power-level span {
    font-size: 1.2rem;
    font-weight: bold;
    margin-right: 5px;
}

.pl-input {
    width: 40px;
    text-align: center;
    background: none;
    border: none;
    font-size: 1.2rem;
    font-weight: bold;
    color: white;
}

.bio-container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
    padding: 10px;
    border-radius: 5px;
}

.bio-item {
    display: flex;
    align-items: center;
    gap: 5px;
}

.bio-item span {
    font-weight: bold;
    color: black;
}

.bio-item input {
    flex-grow: 1;
    background: none;
    border: none;
    color: black;
    font-size: 1rem;
}

.bio-item input::placeholder {
    color: black;
}

/* Avatar Section */
.avatar-container {
    display: flex;
    justify-content: center;
    align-items: center;
}

.avatar-image {
    width: 90%;
    height: 90%;
    border-radius: 5px;
    border: 2px solid white;
}
</style>