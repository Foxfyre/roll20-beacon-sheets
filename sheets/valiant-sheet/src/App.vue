<script setup>
import { useAppStore } from '@/stores/index.js'
import { useMetaStore } from '@/stores/metaStore.js'
import { useSheetStore } from '@/stores/sheetStore.js'

import Header from '@/components/header.vue';
import Sheet from '@/components/sheet.vue';
import Footer from '@/components/footer.vue';

// These stores should drive how to access the data in your sheet, and how to trigger actionable events.
const appStore = useAppStore()
// The meta store has generic character info for every sheet.
const meta = useMetaStore()
// The sheet store is where you want to be to customize what data / fields are on your sheet.
const sheet = useSheetStore()
</script>

<template>
  <div class="header">
    <Header/>
  </div>

  <div class="sheet">
    <Sheet/>
  </div>

  <div class="footer">
    <Footer/>
  </div>
</template>

<style scoped lang="scss">
/*
The quickstart header. Replace this with a logo, your sheet title, or remove this.
*/

/*
This is a boilerplate layout that uses grid to help you get started on your sheet.
Customize this layout by modifying the template columns and rows you will need for each section.
*/
.sheet {
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  width: 98%;
  padding-top: 2rem;
  padding: 0px;
  margin: 0 auto;
}
</style>
