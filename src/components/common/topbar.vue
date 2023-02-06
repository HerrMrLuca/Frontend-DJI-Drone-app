<template>
  <div class="width-100 flex-row flex-justify-between flex-align-center topbar">
    <div class="height-100 logo not-selectable">
      <img :src="bambiLogo" alt="logo of bambi company"/>
      <p><span>Bambi</span> Info Center</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { getRoot } from '/@/root'
import { getPlatformInfo } from '/@/api/manage'
import bambiLogo from '/@/assets/icons/BAMBI_notext.png'

const root = getRoot()
const workspaceName = ref('')

onMounted(() => {
  getPlatformInfo().then(res => {
    workspaceName.value = res.data.workspace_name
  })
})

</script>

<style lang="scss" scoped>
//@import '/@/styles/index.scss';
@import '/@/styles/variables.scss';

p, span {
  font-family: $bambi-font-fredoka;
  font-size: var(--font-size-bar);
}

span {
  text-transform: uppercase;
}

.fontBold {
  font-weight: 500;
  font-size: 18px;
}

.topbar {
  height: var(--bar-height);
  width: 100%;
  background-color: $bambi-nat-ultralight;

  .logo {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin: 0 0 0 10px;

    p {
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
