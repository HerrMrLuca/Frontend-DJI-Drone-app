<template>
  <div class="width-100 flex-row all" style="height: 60px;">
    <!--    <img src="src/assets/icons/bottombar/home.svg">-->
    <a-space class="fz16 height-100 items" size="large">
      <router-link
          v-for="item in options"
          :key="item.key"
          :to="item.path"
          :class="{
            'menu-item': true,
        }">
        <span @click="selectedRoute(item.path)"
              :style="selected === item.path ? 'color: #2d8cf0;' : 'color: white'">
          <img :src="item.icon"
               alt="Icon for page {{item.label}}"
               class="icons">
          <!--todo 1 get itemlable to fill text-->
          <!--{{item.label}}-->
        </span>

      </router-link>
    </a-space>
  </div>
</template>

<script lang="ts" setup>
import { message } from 'ant-design-vue'
import { defineComponent, onMounted, ref } from 'vue'
import { getRoot } from '/@/root'
import { getPlatformInfo } from '/@/api/manage'
import { ELocalStorageKey, ERouterName } from '/@/types'
import { UserOutlined, ExportOutlined } from '@ant-design/icons-vue'
import homeIcon from '/@/assets/icons/bottombar/home.png'
import videoIcon from '/@/assets/icons/bottombar/video-camera-alt.png'
import settingsIcon from '/@/assets/icons/bottombar/picture.png'

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

// TODO 4 change Routes and names
const options = [
  {
    key: 0,
    label: ERouterName.WORKSPACE.charAt(0).toUpperCase() + ERouterName.WORKSPACE.substr(1),
    path: '/' + ERouterName.WORKSPACE,
    icon: homeIcon
  },
  {
    key: 1,
    label: ERouterName.MEMBERS.charAt(0).toUpperCase() + ERouterName.MEMBERS.substr(1),
    path: '/' + ERouterName.MEMBERS,
    icon: videoIcon
  },
  {
    key: 2,
    label: ERouterName.DEVICES.charAt(0).toUpperCase() + ERouterName.DEVICES.substr(1),
    path: '/' + ERouterName.DEVICES,
    icon: settingsIcon
  }
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
</script>

<style lang="scss" scoped>
//@import '/@/styles/index.scss';
@import '/@/styles/variables.scss';

.fontBold {
  font-weight: 500;
  font-size: 18px;
}

.all {
  display: flex;
  justify-content: center;
  align-items: center;

  .items {
    width: 100%;
    height: auto;
    justify-content: center;
    align-items: center;

    .icons {
      width: 100%;
      max-width: 45px;
      height: auto;
    }
  }
}

</style>
