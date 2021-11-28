<template>
  <div id="app">
    <div id="nav">
      <h1>Same Goblin</h1>
      <router-link to="/settings">Settings</router-link> |
      <router-link to="/game">Game</router-link>
    </div>
    <router-view />
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #6eaeee;
}

body {
  background-color: rgb(35, 35, 35);
}

#nav {
  padding: 10px 0px 30px;
}

#nav a {
  font-weight: bold;
  color: #6eaeee;
}

#nav a.router-link-exact-active {
  color: #cfc53b;
}
</style>
