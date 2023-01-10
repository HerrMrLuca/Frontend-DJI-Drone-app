<template>
  <div class="stream">
    <div class="content">
      <livestream-agora/>
    </div>
    <br>
  </div>
</template>

<script lang="ts" setup>
import LivestreamAgora from '/@/components/livestream-agora.vue'
import { ref } from 'vue';
import { ELocalStorageKey } from '/@/types';
import { getDeviceTopo, getLiveCapacity, getPlatformInfo, getUserInfo } from '/@/api/manage';

/* region testing get-functions and content */

const workspaceId = ref(localStorage.getItem(ELocalStorageKey.WorkspaceId)!)

console.log('start getDeviceTopo')
const test1 = getDeviceTopo(workspaceId.value)
console.log(test1)
console.log('end getDeviceTopo')

console.log('start getLiveCapacity')
const test2 = getLiveCapacity(workspaceId.value)
console.log(test2)
console.log('end getLiveCapacity')

// console.log('start getAllUsersInfo')
// const test3 = getAllUsersInfo(workspaceId.value, )
// console.log(test3)
// console.log('end getAllUsersInfo')

console.log('start getPlatformInfo')
const test4 = getPlatformInfo()
console.log(test4)
console.log('end getPlatformInfo')

console.log('start getUserInfo')
const test5 = getUserInfo()
console.log(test5)
console.log('end getUserInfo')

/* endregion */
</script>

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
