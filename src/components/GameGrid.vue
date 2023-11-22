<template>
  <div class="wrapper">
    <div id="game-grid" @mouseout="unhoverAllBubbles()">
      <div
        class="bubble-stack"
        v-for="(bubbleStack, stackIndex) in $store.state.bubbles"
        :key="stackIndex"
      >
        <GameBubble
          v-for="(bubble, bubbleIndex) in bubbleStack"
          :key="getKey(bubbleIndex, bubble)"
          :bubbleIndex="bubbleIndex"
          :stackIndex="stackIndex"
          :bubble="bubble"
          :bombMode="bombMode"
          :className="getClassName(bubble)"
        />
      </div>
    </div>

    <div id="bombrack">
      <div
        v-for="(bomb, index) in $store.state.bombs"
        :key="index"
        @click="clickBomb(index)"
      >
        <Bomb :active="index === activeBombIndex" />
      </div>
    </div>

    <div id="scorebar">
      <div>
        <h2 class="score">
          Score: {{ $store.state.score }}
          <span v-if="getPotentialScore() > 0" class="potential"
            >+ {{ getPotentialScore() }}</span
          >
        </h2>
        <h2 class="score">Best: {{ $store.state.hiScore }}</h2>
      </div>
      <img v-on:click="resetGame()" src="@/assets/replay.svg" height="40px" />
    </div>
  </div>
</template>

<script lang="js">
import { Bubble } from "@/types/bubble";
import GameBubble from "@/components/GameBubble.vue";

import Bomb from "@/components/Bomb.vue";
export default {
  components: {
    GameBubble,
    Bomb,
  },

  computed: {
    bombMode() {
      return this.activeBombIndex > -1
    },
    activeBombIndex() {
      return this.$store.state.activeBombIndex
    }
  },

  methods: {
    getClassName(bubble) {
      let className = "bubble ";
      className += bubble.color;
      className += bubble.hovered ? " hovered" : "";
      return className;
    },

    getKey(bubbleIndex, bubble) {
      let str = bubbleIndex.toString();
      str += bubble.hovered ? "hov" : "reg";
      return str;
    },

    getPotentialScore() {
      let potentialScore = 0;
      this.$store.state.bubbles.forEach((bubbleStack) => {
        bubbleStack.forEach((bubble) => {
          if (bubble.hovered) {
            potentialScore++;
          }
        });
      });

      return potentialScore === 0 ? 0 : Math.pow(potentialScore - 1, 2);
    },
    unhoverAllBubbles() {
      this.$store.dispatch("unhoverAllBubbles");
    },
    resetGame() {
      this.$store.dispatch("resetGame");
    },
    clickBomb(index) {
      if(this.activeBombIndex === index) {
        this.$store.dispatch("deactivateBombs");
      } else {
        this.$store.dispatch("activateBomb", index)
      }
    },
  },
};
</script>

<style>
.wrapper {
  margin: auto;
  width: fit-content;
}

#game-grid {
  width: fit-content;
  margin: auto;
  background-color: rgb(15, 15, 15);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 5px;
  display: flex;
  flex-basis: min-content;
}

.bubble-stack {
  display: flex;
  width: 46px;
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

.potential {
  color: #7e7e7e;
}

#scorebar {
  display: flex;
  margin: auto;
  align-items: center;
  justify-content: space-between;
  text-align: left;
}

#bombrack {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 48px;
  width: 80%;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 8px;
  margin: 16px auto;
  user-select: none;
}
</style>
