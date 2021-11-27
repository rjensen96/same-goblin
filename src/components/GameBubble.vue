<template>
  <div
    v-bind:class="[className]"
    v-on:click="clickBubble()"
    v-on:mouseover="hoverBubble()"
  >
    <!-- <p>{{ this.bubble.key }}</p> -->
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Bubble, BubbleTarget } from "@/types/bubble";

const GameBubbleProps = Vue.extend({
  props: {
    stackIndex: Number,
    bubbleIndex: Number,
    bubble: { type: Object as () => Bubble },
    className: String,
  },
});

@Component
export default class GameBubble extends GameBubbleProps {
  clickBubble(): void {
    // head into store and remove bubble at this index.
    this.$store.state.bubbles[this.stackIndex].splice(this.bubbleIndex, 1);
  }

  hoverBubble(): void {
    if (!this.bubble.hovered) {
      const bubbleTarget: BubbleTarget = {
        x: this.stackIndex,
        y: this.bubbleIndex,
        requiredColor: this.bubble.color,
      };
      this.$store.dispatch("hoverBubblesDriver", bubbleTarget);
    }
  }

  getColor(): string {
    return this.className;
  }
}
</script>

<style>
.bubble {
  height: 42px;
  width: 42px;
  margin: 4px 0px;
  display: flex;
  justify-content: center;
  color: white;
  border-radius: 7px;
  user-select: none;
  cursor: pointer;
}

.bubble p {
  margin: auto 0px;
}

.red {
  background-color: #ff0000;
  opacity: 25%;
}

.green {
  background-color: #00ff00;
  opacity: 25%;
}

.blue {
  background-color: #0000ff;
  opacity: 25%;
}

.yellow {
  background-color: #ffff00;
  opacity: 25%;
}

.hovered {
  opacity: 100%;
}
</style>
