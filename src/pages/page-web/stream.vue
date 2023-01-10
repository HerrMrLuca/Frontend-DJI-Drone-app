<template>
  <div class="stream">
    <div class="content">
      <livestream-agora/>
    </div>
    <br>
  </div>
</template>

<script lang="ts" setup>import LivestreamAgora from '/@/components/livestream-agora.vue'</script>

<style lang="scss" scoped>
@import "/@/styles/variables.scss";

.stream {
  width: 100%;
  height: calc(100% - (2 * $bottom-bar-height));
  border: $bambi-white 3px solid;
  background-color: $bambi-white;

  padding: 2vw;

  overflow-y: scroll;

  .content {
    width: 100%;
    height: auto;
    display: grid;
    max-width: 500px;
    row-gap: min(2vw, 2.5em);
    column-gap: min(2vw, 2.5em);
    grid-template-columns: repeat(8, 1fr);
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);

    > div { //divs with content
      background-color: white;
      text-align: center;

      width: 100%;
      height: 100%;

      border-radius: 1em;
      border-color: $bambi-stroke-light;
      box-shadow: rgba(0, 0, 0, 0.1) 0 1px 3px 0, rgba(0, 0, 0, 0.06) 0 1px 2px 0; //#36
      padding: 1em;
    }

    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
}
</style>
