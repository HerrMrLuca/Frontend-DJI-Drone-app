<template>
  <div class="width-100 flex-row flex-justify-between flex-align-center topbar">
    <div class="height-100 logo not-selectable">
      <img :src="bambiLogo"/>
      <p> <span>Bambi</span> Info Center</p>
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
import bambiLogo from '/@/assets/icons/BAMBI_notext.png'
import userIcon from '/@/assets/icons/user.png'

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

const selected = ref<string>(root.$route.path)

onMounted(() => {
  getPlatformInfo().then(res => {
    workspaceName.value = res.data.workspace_name
  })
})

const logout = () => {
  localStorage.clear()
  root.$router.push(ERouterName.PROJECT)
}
</script>

<style lang="scss" scoped>
//@import '/@/styles/index.scss';
@import '/@/styles/variables.scss';

p, span{
  font-family: 'Fredoka', sans-serif;
  font-size: large;
}
span{
  text-transform: uppercase;
}

.fontBold {
  font-weight: 500;
  font-size: 18px;
}

.topbar {
  height: $bottom-bar-height;
  width: 100%;
  background-color: $bambi-nat-ultralight;
  box-shadow: 0 2px 4px 0 rgba(0,0,0,.1);

  .logo {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin: 0 0 0 10px;

    p{
      margin: 0 0 0 10px;
      font-weight: 550;
    }

    img {
      height: 80%;
      width: auto;
    }
  }

  .user {
    margin-right: 15px;
    display: flex;
    flex-direction: column;
    height: 80%;
    align-items: center;

    .user-icon {
      height: 30px;
      width: 30px;
      flex-grow: 1;
      filter: invert(80%);

      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      img {
        display: block;
        height: 90%;
        width: auto;
      }
    }

    .username {
      flex-grow: 2;
      font-size: small;
    }
  }
}

</style>
