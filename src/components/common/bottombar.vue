<template>
  <div class="width-100 flex-row all">
    <!--    <img src="src/assets/icons/bottombar/home.svg">-->
    <div class="fz16 height-100 items">
      <router-link
          v-for="item in options"
          :key="item.key"
          :to="item.path"
          :class="{
            'menu-item': true,
            selected: selectedRoute(item)
          }"
      > <!--TODO 4 check click behavior-->
        <span @click="selectedRoute(item)">
          <img :src="item.icon"
               alt="Icon for page ${{item.label}}"
               class="icons">
          <!--todo 1 get itemlable to fill text-->
          <!--{{item.label}}-->
        </span>
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { createVNode, defineComponent } from 'vue'
import { getRoot } from '/@/root'
import { ERouterName } from '/@/types'
import homeIcon from '/@/assets/icons/bottombar/home_colored.png'
import videoIcon from '/@/assets/icons/bottombar/video-colored.png'
import settingsIcon from '/@/assets/icons/bottombar/profile-colored.png'
import gallery from '/@/assets/icons/bottombar/gallery-colored.png'

const icons = {
  homeIcon,
  videoIcon,
  settingsIcon,
  // note add icon here
}

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

const Icon = (props: { icon: string }) => {
  return createVNode((icons as any)[props.icon])
}

export default defineComponent({
  components: {
    Icon,
  },
  name: 'Bottom-bar',
  setup () {
    const root = getRoot()
    // TODO 4 change Routes and names
    const options = [
      {
        key: 0,
        label: ERouterName.HOMEPAGE.charAt(0).toUpperCase() + ERouterName.HOMEPAGE.substr(1),
        path: '/' + ERouterName.HOMEPAGE,
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

    function selectedRoute (item: IOptions) {
      const path = typeof item.path === 'string' ? item.path : item.path.path
      return root.$route.path?.indexOf(path) === 0
    }

    return {
      options,
      selectedRoute,
    }
  }
})

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
  height: $bottom-bar-height;
  background-color: white;

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

    a:not(.selected) {
      img {
        filter: brightness(0%);
      }
    }

    a.selected {
      img {
        filter: none;
      }
    }

    .icons {
      height: 100%;
      max-height: 30px;
      width: 100%;
      color: $bambi-nat-ultralight;
    }
  }
}
</style>
