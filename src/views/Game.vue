<template>
  <div ud="game">
    <GameGrid :key="$store.state.randomKey" />
  </div>
</template>

<script>
import GameGrid from "@/components/GameGrid.vue";

export default {
  components: {
    GameGrid,
  },
};
</script>
