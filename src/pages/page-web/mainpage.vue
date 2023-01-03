<template>
  <a-layout class="width-100 flex-display" style="height: 100vh">
    <div class="topbar">
      <MyTopbar />
    </div>

    <div class="bottombar">
      <Bottombar />
    </div>
    <!--- TODO  change routes in index.ts or change this html content
    <a-layout-content>
      <router-view />
    </a-layout-content>
    -->
  </a-layout>
</template>

<script lang="ts">
import { onMounted, reactive, ref, UnwrapRef, watch, defineComponent } from 'vue'
import { getRoot } from '/@/root'
import { EBizCode, ELocalStorageKey, ERouterName } from '/@/types'
import { useConnectWebSocket } from '/@/hooks/use-connect-websocket'
import EventBus from '/@/event-bus'
import MyTopbar from '/@/components/common/my-topbar.vue'

export default defineComponent({
  components: { MyTopbar }
})

</script>

<style lang="scss" scoped>
@import '/@/styles/index.scss';
@import '/@/styles/variables.scss';

.fontBold {
  font-weight: 500;
  font-size: 18px;
}

.bottombar{
  background-color: $bambi-shade-darker-2;
  position: fixed;
  bottom: 0;
  width: 100%;
  overflow: hidden;
}

.header {
  background-color: black;
  color: white;
  height: 60px;
  font-size: 15px;
  padding: 0 20px;
}
</style>
