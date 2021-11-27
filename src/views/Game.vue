<template>
  <div ud="game">
    <h1>Same Gnome</h1>
    <GameGrid :key="this.$store.state.randomKey" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import GameGrid from "@/components/GameGrid.vue";

@Component({
  components: {
    GameGrid,
  },
})
export default class Game extends Vue {}
</script>
