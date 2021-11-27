<template>
  <div class="game">
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
export default class Game extends Vue {
  getKey(): string {
    return this.$store.state.randomKey.toString();
  }
  //   unhoverAll(): void {
  //     console.log("attemtping unoveralhl");
  //     this.$store.commit("unhoverAll");
  //   }
}
</script>
