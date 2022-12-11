<template>
  <div class="width-100 flex-row flex-justify-between flex-align-center" style="height: 60px;">
    <div class="height-100">
      <a-avatar :size="50" shape="square" :src="bambi" />
      <span class="ml10 fontBold fz28">{{ workspaceName }}</span>
    </div>

    <a-space class="fz16 height-100" size="large">
        <router-link
        v-for="item in options"
        :key="item.key"
        :to="item.path"
        :class="{
            'menu-item': true,
        }">
          <span @click="selectedRoute(item.path)" :style="selected === item.path ? 'color: #002F00;' : 'color: white'">{{ item.label }}</span>
        </router-link>
    </a-space>
  </div>
</template>

<script lang="ts" setup>
import { defineComponent, onMounted, ref } from 'vue'
import { getRoot } from '/@/root'
import { getPlatformInfo } from '/@/api/manage'
import { ELocalStorageKey, ERouterName } from '/@/types'
import bambi from '/@/assets/icons/bambi.png'

const root = getRoot()

interface IOptions {
  key: number
  label: string
  path:
    | string
    | {
        path: string
        query?: any
      }
  icon: string
}
const username = ref(localStorage.getItem(ELocalStorageKey.Username))
const workspaceName = ref('')
const options = [
  { key: 0, label: ERouterName.HOME.charAt(0).toUpperCase() + ERouterName.HOME.substr(1), path: '/' + ERouterName.BAMBIHOME }
]

const selected = ref<string>(root.$route.path)

onMounted(() => {
  getPlatformInfo().then(res => {
    workspaceName.value = res.data.workspace_name
  })
})

function selectedRoute (path: string) {
  selected.value = path
}

const logout = () => {
  localStorage.clear()
  root.$router.push(ERouterName.PROJECT)
}
</script>

<style lang="scss" scoped>
</style>
