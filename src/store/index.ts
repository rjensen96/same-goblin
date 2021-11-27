import { Bubble, BubbleTarget, getBubbles } from "@/types/bubble";
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    bubbles: getBubbles(),
    randomKey: true,
  },
  mutations: {
    toggleRandomKey(state) {
      state.randomKey = !state.randomKey;
    },
    setBubbleHover(state, payload: BubbleTarget) {
      state.bubbles[payload.x][payload.y].hovered = true;
    },

    unhoverAll(state) {
      for (let stackIdx = 0; stackIdx < state.bubbles.length; stackIdx++) {
        const stack = state.bubbles[stackIdx];
        stack.forEach((bubble: Bubble) => (bubble.hovered = false));
      }
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
    hoverBubblesDriver({ commit, dispatch }, bubbleTarget: BubbleTarget) {
      commit("unhoverAll");
      dispatch("hoverBubbleRecursive", bubbleTarget);
      commit("toggleRandomKey");
    },
    unhoverAllBubbles({ commit }) {
      commit("unhoverAll");
      commit("toggleRandomKey"); // to rerender board
    },
  },
  modules: {},
});
