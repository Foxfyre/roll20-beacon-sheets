<script setup>
import { useMetaStore } from '@/stores/metaStore'
import defaultAvatar from '@/assets/default-avatar.jpg';
import Abilities from '@/components/AbilityScore/AbilityScoreSection.vue';
const meta = useMetaStore()

const onAvatarChange = (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            meta.avatar = e.target.result;
        };
        reader.readAsDataURL(file);
    }
};

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
                    <span>Real Name: </span>
                    <input v-model="meta.realName" placeholder="Enter Real Name" />
                </div>
                <div class="bio-item">
                    <span>Age: </span>
                    <input v-model="meta.age" placeholder="Age" />
                </div>
                <div class="bio-item">
                    <span>Hair: </span>
                    <input v-model="meta.hair" placeholder="Hair Color" />
                </div>
                <div class="bio-item">
                    <span>Occupation: </span>
                    <input v-model="meta.occupation" placeholder="Occupation" />
                </div>
                <div class="bio-item">
                    <span>Origin: </span>
                    <input v-model="meta.origin" placeholder="Place Of Origin" />
                </div>
            </div>

            <div class="card">
                <Abilities />
            </div>
        </div>

        <div class="avatar-container">
            <img :src="meta.avatar || defaultAvatar" alt="Character Avatar" class="avatar-image" />
            <input type="file" @change="onAvatarChange" class="avatar-input"/>
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
    padding: 10px 20px;
    border-radius: 10px;
    min-width: 850px;
    color: white;
}

.character-header input::placeholder {
    color: whitesmoke;
}

.character-info {
    display: flex;
    flex-direction: column;
    min-width: 600px;
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

.bio-container,
.bio-item,
.bio-item input {
    box-sizing: border-box;
}

.bio-container {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
    padding: 10px;
    border-radius: 5px;
    width: 100%;
}

.bio-item {
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 25px;
    width: 100%;
}

.bio-item span {
    width: 40%;
    font-weight: bold;
    color: black;
    flex-wrap: nowrap;
}

.bio-item input {
    display: flex;
    flex-direction: column;
    width: 70%;
    flex-grow: 1;
    background: none;
    border: none;
    color: black;
    font-size: 1rem;
}

.bio-item input::placeholder {
    color: black;
    align-self: center;
}

/* Avatar Section */
.avatar-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    align-self: start;
    position: relative;
}

.avatar-image {
    width: 90%;
    height: 90%;
    border-radius: 5px;
    border: 2px solid white;
    cursor: pointer;
}

.avatar-input {
    position: absolute;
    bottom: 10px;
    left: 50%;
    transform: translateX(-50%);
    opacity: 0;
    cursor: pointer;
    width: 90%;
    height: 90%;
}
</style>