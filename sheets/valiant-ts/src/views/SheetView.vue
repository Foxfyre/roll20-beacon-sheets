<script setup>
import SheetHeader from '@/components/SheetHeader.vue';
import SheetBody from '@/components/SheetBody.vue';
import SheetFooter from '@/components/SheetFooter.vue';
</script>

<template>
  <div class="header">
    <SheetHeader/>
  </div>

  <div class="sheet">
    <SheetBody/>
  </div>

  <div class="footer">
    <SheetFooter/>
  </div>
</template>
  <!--<div class="examplesheet-sheet">
    <div class="examplesheet__header"></div>
    <div class="examplesheet__main">
      <div class="examplesheet__column">
        <div class="examplesheet__character">
          <BioSection />
        </div>
        <div class="examplesheet__combat">
          <CombatSection />
        </div>
      </div>
      <div class="examplesheet__column">
        <div class="examplesheet__ability-scores">
          <AbilityScoresSection />
        </div>
        <div class="examplesheet__traits">
          <TraitsSection />
        </div>
      </div>
      <div class="examplesheet__column">
        <div class="examplesheet__xp">
          <XPSection />
        </div>
      </div>
    </div>
    <div class="examplesheet__inventory">
      <InventorySection />
    </div>
  </div>-->



<style lang="scss">
@use '../common/scss/vars.scss' as vars;

.examplesheet {
  &__header {
    background-color: green;
  }

  &__main {
    display: grid;
    gap: 1rem;
    margin-bottom: 1rem;
    grid-template-columns: 33rem 33rem 20rem;
  }

  &__column {
    display: grid;
    gap: 1rem;
  }

  &__inventory {
    width: 88rem;
  }
}
</style>
