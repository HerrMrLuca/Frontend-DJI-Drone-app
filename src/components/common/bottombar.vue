<template>
  <div class="width-100 flex-row all">
    <div class="fz16 height-100 items">
      <router-link
        v-for="item in options"
        :key="item.key"
        :class="{
            'menu-item': true,
            selected: selectedRoute(item)
          }"
        :to="item.path"
      > <!--TODO 4 check click behavior-->
        <span @click="selectedRoute(item)">
          <img :alt="`Icon for page ${item.label}`"
               :src="item.icon"
               class="icons">
          <p class="label"> {{ item.label }}</p>
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
        label: 'Home',
        path: '/' + ERouterName.HOMEPAGE,
        icon: homeIcon
      },
      {
        key: 1,
        label: 'Livestream',
        path: '/' + ERouterName.LIVESTREAM,
        icon: videoIcon
      },
      {
        key: 2,
        label: 'Profile',
        path: '/' + ERouterName.PROFILE,
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

</script>

<style lang="scss" scoped>
//@import '/@/styles/index.scss';
@import '/@/styles/variables.scss';

p {
  font-family: $bambi-font-open-sans;
  font-size: var(--font-size-bar);
  padding-left: calc(var(--font-size-bar) / 4);
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.all {
  display: flex;
  justify-content: center;
  align-items: center;
  height: var(--bar-height);
  background-color: white;

  .items {
    display: flex;
    width: 100%;
    max-width: 300px;
    height: 100%;
    justify-content: space-evenly;
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

      .label {
        color: black;
      }
    }

    a.selected {
      img {
        filter: none;
      }

      .label {
        color: $bambi-main;
      }
    }

    .icons {
      height: 100%;
      max-height: 30px;
      width: auto;
      color: $bambi-nat-ultralight;
    }

    .label {
      user-select: none;
      display: none;
    }
  }
}

@media screen and (orientation: landscape) and (min-width: 801px) {
  .all {
    .items {
      .label {
        display: block;
      }
    }
  }
}

@media screen and (orientation: landscape) {
  .all {
    background-color: $bambi-nat-ultralight;
    justify-content: flex-end;

    .items {
      max-width: 500px;

      a {
        span {
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }

      .label {
        margin-left: 0.5rem;
        margin-bottom: 0;
      }
    }
  }
}
</style>
