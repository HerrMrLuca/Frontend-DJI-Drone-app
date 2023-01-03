<template>
  <div class="width-100 flex-row all" style="height: 60px;">
    <!--    <img src="src/assets/icons/bottombar/home.svg">-->
    <div class="fz16 height-100 items" size="large">
      <router-link
          v-for="item in options"
          :key="item.key"
          :to="item.path"
          :class="{
            'menu-item': true,
            'selected': selected === item.path
          }"> <!--TODO 4 check click behavior-->
        <span @click="selectedRoute(item.path)" :class="selected === item.path ? 'selected' : 'not-selected'">
          <img :src="item.icon"
               alt="Icon for page {{item.label}}"
               class="icons">
          <!--todo 1 get itemlable to fill text-->
          <!--{{item.label}}-->
        </span>

      </router-link>
    </div>
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

// TODO 1 change img colors to delete line "filter: invert(100%);"
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
    display: flex;
    width: 100%;
    max-width: 300px;
    height: 100%;
    justify-content: center;
    align-content: center;
    //gap: 10vw;

    a {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
      width: 100%;
    }

    .selected {
      background-color: $bambi-shade-darker-3;
    }

    .icons {
      height: 100%;
      max-height: 30px;
      width: 100%;
      color: $bambi-nat-ultralight;
      filter: invert(100%);
    }
  }
}
</style>
