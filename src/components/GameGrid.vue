<template>
  <div>
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

    <div id="scorebar">
      <div>
        <h2 class="score">Score: {{ this.$store.state.score }}</h2>
        <h2 class="score">Best: {{ this.$store.state.hiScore }}</h2>
      </div>
      <img v-on:click="resetGame()" src="@/assets/replay.svg" height="40px" />
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

  resetGame(): void {
    this.$store.dispatch("resetGame");
  }
}
</script>

<style>
#game-grid {
  width: 800px;
  height: 450px;
  margin: auto;
  background-color: rgba(0, 0, 0, 0.9);
  border: 1px solid rgba(255, 255, 255, 0.4);
  display: grid;

  grid-template-columns: repeat(16, 1fr);
}

.bubble-stack {
  display: flex;
  flex-wrap: wrap-reverse;
  align-content: flex-start;
  justify-content: space-evenly;
}

img {
  cursor: pointer;
  padding: 0px 20px;
}

.score {
  padding: 0px 20px;
}

#scorebar {
  display: flex;
  margin: auto;
  padding-top: 20px;
  align-items: center;
  justify-content: space-between;
  width: 800px;
  text-align: left;
}
</style>
