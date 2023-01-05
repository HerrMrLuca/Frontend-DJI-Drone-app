<template>
  <a-layout class="width-100 flex-display" style="height: 100vh">
    <MyTopbar />
    <router-view>
    </router-view>
    <div class="bottom-bar">
      <BottomBar/>
    </div>
  </a-layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { getRoot } from '/@/root'
import BottomBar from '/@/components/common/bottombar.vue'
import MyTopbar from '/@/components/common/my-topbar.vue'

export default defineComponent({
  components: { MyTopbar, BottomBar }
})
</script>

<style lang="scss" scoped>
//@import '/@/styles/index.scss';
@import '/@/styles/variables.scss';

.fontBold {
  font-weight: 500;
  font-size: 18px;
}

router-view{
  height: auto;
}

.bottom-bar {
  display: block;
  background-color: $bambi-shade-darker-2;
  position: fixed;
  bottom: 0;
  width: 100%;
  overflow: hidden;
}
</style>
