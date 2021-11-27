<template>
  <div id="game-grid" @mouseout="unhoverAllBubbles()">
    <div
      class="bubble-stack"
      v-for="(bubbleStack, stackIndex) in this.$store.state.bubbles"
      :key="stackIndex"
    >
      <GameBubble
        v-for="(bubble, bubbleIndex) in bubbleStack"
        :key="getKey(bubbleIndex, bubble)"
        v-on:click="clickBubble(stackIndex, bubbleIndex)"
        v-bind:bubbleIndex="bubbleIndex"
        v-bind:stackIndex="stackIndex"
        v-bind:bubble="bubble"
        v-bind:className="getClassName(bubble)"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import GameBubble from "@/components/GameBubble.vue";
import { Bubble } from "@/types/bubble";

@Component({ components: { GameBubble } })
export default class GameGrid extends Vue {
  bubbles = this.$store.state.bubbles;

  getClassName(bubble: Bubble): string {
    let className = "bubble ";
    className += bubble.color;
    className += bubble.hovered ? " hovered" : "";
    return className;
  }

  getKey(bubbleIndex: number, bubble: Bubble): string {
    let str = bubbleIndex.toString();
    str += bubble.hovered ? "hov" : "reg";
    return str;
  }

  unhoverAllBubbles(): void {
    this.$store.dispatch("unhoverAllBubbles");
  }
}
</script>

<style>
#game-grid {
  width: 800px;
  height: 450px;
  margin: auto;
  background-color: rgba(0, 0, 0, 0.5);
  display: grid;

  grid-template-columns: repeat(16, 1fr);
}

.bubble-stack {
  display: flex;
  flex-wrap: wrap-reverse;
  align-content: flex-start;
  justify-content: space-evenly;
}
</style>
