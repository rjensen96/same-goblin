<template>
  <div class="settings">
    <div class="carousel">
      <router-link to="/game">
        <div class="optionCard" v-on:click="startGame(9, 9)">
          <h2 class="cardTitle">Quick</h2>
          <div class="sampleBoard quick"></div>
          <h2 class="cardTitle">9 x 9</h2>
        </div>
      </router-link>

      <router-link to="/game">
        <div class="optionCard" v-on:click="startGame(9, 16)">
          <h2 class="cardTitle">Classic</h2>
          <div class="sampleBoard classic"></div>
          <h2 class="cardTitle">9 x 16</h2>
        </div>
      </router-link>

      <router-link to="/game">
        <div class="optionCard" v-on:click="startGame(16, 24)">
          <h2 class="cardTitle">Jumbo</h2>
          <div class="sampleBoard jumbo"></div>
          <h2 class="cardTitle">16 x 24</h2>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component
export default class GameGrid extends Vue {
  startGame(numRows: number, numCols: number): void {
    this.$store.dispatch("startNewGame", { numRows, numCols });
  }
}
</script>

<style scoped>
.carousel {
  text-decoration: none;
  display: flex;
  width: 100%;
  margin: auto;
  max-width: 1500px;
  margin-top: 80px;
  justify-content: space-evenly;
}

.optionCard {
  background-color: rgb(230, 230, 230);
  height: 300px;
  width: 275px;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  transition: all;
  transition-duration: 300ms;
}

.optionCard:hover {
  transition-duration: 300ms;
  height: 315px;
}

a {
  text-decoration: none;
}

.cardTitle {
  font-size: 20pt;
  color: rgb(59, 59, 59);
}

.sampleBoard {
  background-color: rgb(163, 163, 163);
  width: 200px;
  border-radius: 5px;
}
.quick {
  width: 125px;
  height: 125px;
}
.classic {
  height: 112px;
}
.jumbo {
  height: 133px;
}
</style>
