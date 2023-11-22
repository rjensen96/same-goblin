<template>
  <div
    :class="[className]"
    @click="clickBubble()"
    @mouseover="hoverBubble()"
  ></div>
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
    bombMode: Boolean,
  },
});

@Component
export default class GameBubble extends GameBubbleProps {
  clickBubble(): void {
    // head into store and remove bubble at this index.
    this.$store.dispatch("handleBubbleClick");
  }

  hoverBubble(): void {
    if (!this.bubble.hovered) {
      const bubbleTarget: BubbleTarget = {
        x: this.stackIndex,
        y: this.bubbleIndex,
        requiredColor: this.bubble.color,
      };
      if (this.bombMode) {
        this.$store.dispatch("hoverSingleBubble", bubbleTarget);
      } else {
        this.$store.dispatch("hoverBubblesDriver", bubbleTarget);
      }
    }
  }

  getColor(): string {
    return this.className;
  }
}
</script>

<style>
.bubble {
  height: 40px;
  width: 40px;
  margin: 3px 0px;
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

/* TODO: bug! opacity goes to 1% in dist folder! */
.red {
  background-color: #eb026f;
  opacity: 0.75;
}

.green {
  background-color: #43e099;
  opacity: 0.75;
}

.blue {
  background-color: #1b4dd6;
  opacity: 0.75;
}

.yellow {
  background-color: #f5ee1f;
  opacity: 0.75;
}

.hovered {
  opacity: 1;
}
</style>
