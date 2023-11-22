<template>
  <div class="wrapper" :style="wrapperStyle">
    <img src="../assets/bomb.svg" :style="style" />
  </div>
</template>

<script>
export default {
  props: {
    active: Boolean,
  },

  computed: {
    style() {
      return {
        height: "24px",
        // color: this.active ? "red" : "black",
        fill: "red",
      };
    },
    wrapperStyle() {
      const baseStyle = {
        height: "36px",
        width: "36px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        cursor: "pointer",
        borderRadius: "4px",
        margin: "4px",
      };

      if (this.active) {
        return {
          ...baseStyle,
          border: "1px solid red",
          backgroundColor: "rgba(255, 0, 0, 0.2)",
        };
      }
      return {
        ...baseStyle,
        border: "1px solid black",
      };
    },
  },
};
</script>

<style></style>
