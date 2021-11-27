import { Bubble, BubbleTarget, getBubbles } from "@/types/bubble";
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    bubbles: getBubbles(),
    bubbleReserves: getBubbles(),
    randomKey: true,
    numHovered: 0,
    score: 0,
    hiScore: 0,
  },
  mutations: {
    resetNumHovered(state) {
      state.numHovered = 0;
    },
    toggleRandomKey(state) {
      state.randomKey = !state.randomKey;
    },
    setBubbleHover(state, payload: BubbleTarget) {
      state.bubbles[payload.x][payload.y].hovered = true;
      state.numHovered++;
    },
    incrementScore(state) {
      // this increments based on the number of bubbles hovered.
      // triggered only on click
      state.score += Math.pow(state.numHovered - 1, 2);
      if (state.score > state.hiScore) {
        state.hiScore = state.score;
      }
    },
    removeHoveredBubbles(state) {
      state.bubbles.forEach((bubStack, stackIdx) => {
        const prevStackLen = bubStack.length;
        state.bubbles[stackIdx] = bubStack.filter((bub) => !bub.hovered);
        const lenChange = prevStackLen - state.bubbles[stackIdx].length;

        // descend bubble reserves to the current stack.
        const reserveStack = state.bubbleReserves[stackIdx];
        for (let i = 0; i < lenChange; i++) {
          const reserveBub = reserveStack.shift();
          if (reserveBub) {
            state.bubbles[stackIdx].push(reserveBub);
          }
        }
      });

      state.numHovered = 0;
    },
    unhoverAll(state) {
      for (let stackIdx = 0; stackIdx < state.bubbles.length; stackIdx++) {
        const stack = state.bubbles[stackIdx];
        stack.forEach((bubble: Bubble) => (bubble.hovered = false));
      }
      state.numHovered = 0;
    },
    resetGameState(state) {
      state.bubbles = getBubbles();
      state.bubbleReserves = getBubbles();
      state.score = 0;
      state.numHovered = 0;
    },
  },
  actions: {
    hoverBubbleRecursive({ commit, dispatch }, bubbleTarget: BubbleTarget) {
      let currentBubble;

      try {
        currentBubble = this.state.bubbles[bubbleTarget.x][bubbleTarget.y];
      } catch (error) {
        return; // base case for index out of bounds
      }

      if (!currentBubble) {
        return; // because trycatch only returns from itself.
      }

      if (currentBubble.hovered === true) {
        return; // base case for finding an item we already found.
      }

      if (currentBubble.color !== bubbleTarget.requiredColor) {
        return; // base case for stopping (don't traverse wrong color)
      } else {
        commit("setBubbleHover", bubbleTarget);
      }

      const offsets = [
        [-1, 0],
        [1, 0],
        [0, 1],
        [0, -1],
      ];

      // recurse in offsets
      offsets.forEach((xy) => {
        dispatch("hoverBubbleRecursive", {
          x: bubbleTarget.x + xy[0],
          y: bubbleTarget.y + xy[1],
          requiredColor: bubbleTarget.requiredColor,
        });
      });
    },
    handleBubbleClick({ commit }) {
      if (this.state.numHovered > 1) {
        commit("incrementScore");
        commit("removeHoveredBubbles");
        commit("toggleRandomKey");
      }
    },
    hoverBubblesDriver({ commit, dispatch }, bubbleTarget: BubbleTarget) {
      commit("unhoverAll");
      dispatch("hoverBubbleRecursive", bubbleTarget);
      commit("toggleRandomKey");
    },
    unhoverAllBubbles({ commit }) {
      commit("unhoverAll");
      commit("toggleRandomKey"); // to rerender board
    },
    resetGame({ commit }) {
      commit("unhoverAll");
      commit("resetGameState");
      commit("toggleRandomKey"); // to rerender board
    },
  },
  modules: {},
});
