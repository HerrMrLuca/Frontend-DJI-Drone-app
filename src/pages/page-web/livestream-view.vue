<template>
  <div class="livestream-wrapper">
    <agora/>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue'
import { getRoot } from '/@/root'
import { ERouterName } from '/@/types'
import Agora from '/@/components/livestream-agora.vue'

const root = getRoot()
const showLive = ref<boolean>(false)

onMounted(() => {
  watch(() => root.$route.name,
    data => {
      showLive.value = data === ERouterName.LIVING
    },
    {
      deep: true
    })
})
</script>

<style lang="scss" scoped>

.livestream-wrapper:nth-child(1n + 2) {
  display: none;
}

.full-modal {
  .ant-modal {
    max-width: 100%;
    top: 0;
    padding-bottom: 0;
    margin: 0;
  }

  .ant-modal-content {
    display: flex;
    flex-direction: column;
    height: calc(100vh);
  }

  .ant-modal-body {
    flex: 1;
  }
}

.livestream-wrapper {
  height: 100%;
}

.live {
  position: absolute;
  z-index: 1;
  right: 50%;
  left: 50%;
  top: 50%;
  margin: auto;
  transform: translate(-50%, -50%);
  text-align: center;
  width: 800px;
  height: 700px;
  background: #232323;
}
</style>
