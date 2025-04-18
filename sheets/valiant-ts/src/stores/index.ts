import { defineStore } from 'pinia'
import { ref } from 'vue'
import jp from 'jsonpath'
import { useMetaStore, type MetaHydrate } from '@/stores/metaStore'
//import { useSheetStore } from '@/stores/sheetStore'
import { useAbilityScoreStore } from '@/stores/abilityScoreStore'

// Here you can set all default values for your sheet.
// This is your blank slate, new character setup.
export const DEFAULT_CHARACTER_NAME = 'My Hero'
export const DEFAULT_AVATAR_URL =
  'https://s3.amazonaws.com/files.d20.io/images/388362206/5R6pOnpvGrIRL2L0ImU-uA/original.png'
export const DEFAULT_FACTION = 'The Guild of Awesome'

/*
 * This is the master store for the entire character sheet.
 * This has access to all fields from all the other stores.
 * It is in charge of combining all data in 1 big object to sync it with Firebase.
 * We are listening to changes in this object in other to trigger Dehydrates.
 * Most of this does not need to be changed if you're using Vue.
 * */

type Stores = {
  meta: ReturnType<typeof useMetaStore>
  abilityScores: ReturnType<typeof useAbilityScoreStore>
}

export const useAppStore = defineStore('app', () => {
  // List all the stores individually.
  const stores = {
    meta: useMetaStore(),
    //sheet: useSheetStore(),
    abilityScores: useAbilityScoreStore()
  }
  const storeRegistry = Object.keys(stores) as (keyof typeof stores)[];

  const pageLoading = ref(false)

  const getValue = (path: string) => {
    return jp.value(stores, path)
  }
  const setValue = (path: string, newValue: any) => {
    return jp.value(stores, path, newValue)
  }
  const doAction = (path: string, payload: Record<string, any>) => {
    const func = jp.value(stores, path)
    if (typeof func === 'function') func(payload, stores)
  }

  // Loops through all the stores and runs their Dehydrate.
  // Meta store has unique behavior which shouldn't be modified.
  // This is invoked any time Firebase data changes.
  const dehydrateStore = () => {
    const character: Record<string, any> = {};
    character.attributes = {};
    const storeKeys = Object.keys(stores) as (keyof typeof stores)[];
    storeKeys.forEach((key) => {
      //if (key === "rolls") return;
      if (key === 'meta') {
        const { name, bio, gmNotes, avatar } = stores.meta.dehydrate();
        character.name = name;
        character.bio = bio;
        character.gmNotes = gmNotes;
        character.avatar = avatar;
      } else {
        character.attributes[key] = stores[key].dehydrate();
      }
    });
    return character;
  };

  // Loops through all stores and runs Hydrate. 
  // Invoked every time anything in this sheet is updated.
  const hydrateStore = (partial: Record<string, any>, meta: MetaHydrate) => {
    if (partial) {
      storeRegistry.forEach((store) => {
        if (!partial[store]) return
        stores[store].hydrate(partial[store])
      })
    }
    if (meta) {
      stores.meta.hydrate(meta)
    }
  }

  const setPermissions = (owned: boolean, gm: boolean) => {
    stores.meta.permissions.isOwner = owned
    stores.meta.permissions.isGM = gm
  }
  const setCampaignId = (campaignId?: number) => {
    stores.meta.campaignId = campaignId
  }

  /*
  DEV METHOD used to fill the sheet with a lot of data without affecting how the stores are initialized.
  * Can invoke it from a button in the Settings tab.
  * */
  const loadExampleData = () => {
    stores.meta.name = DEFAULT_CHARACTER_NAME
    stores.meta.avatar = DEFAULT_AVATAR_URL
    //stores.sheet.faction = DEFAULT_FACTION
    //stores.sheet.traits = []
  }

  return {
    ...stores,
    storeRegistry,
    getValue,
    setValue,
    doAction,
    dehydrateStore,
    hydrateStore,
    setPermissions,
    setCampaignId,
    pageLoading,
    loadExampleData
  }
})
