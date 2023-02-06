<template>
  <div class="login flex-column flex-justify-center flex-align-center m0 b0">
    <div class="logo">
      <img :src="bambiLogo" alt="Bambi logo"/>
      <p class="fz35 pb60 title">Bambi</p>
    </div>
    <a-form
      :model="formState"
      class="flex-row flex-justify-center flex-align-center"
      layout="inline"
    >
      <a-form-item>
        <a-input v-model:value="formState.username" placeholder="Username">
          <template #prefix
          >
            <UserOutlined style="color: rgba(0, 0, 0, 0.25)"/>
          </template>
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-input
          v-model:value="formState.password"
          placeholder="Password"
          type="password"
        >
          <template #prefix
          >
            <LockOutlined style="color: rgba(0, 0, 0, 0.25)"/>
          </template>
        </a-input>
      </a-form-item>
      <a-form-item class="login-button">
        <a-button
          :disabled="formState.user === '' || formState.password === ''"
          class="m0"
          html-type="submit"
          type="primary"
          @click="onSubmit"
        >
          Login
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script lang="ts" setup>
import bambiLogo from '/@/assets/icons/BAMBI_notext.png'
import { message } from 'ant-design-vue'
import { onMounted, reactive, ref, UnwrapRef } from 'vue'
import { CURRENT_CONFIG } from '/@/api/http/config'
import { login, LoginBody, refreshToken } from '/@/api/manage'
import apiPilot from '/@/api/pilot-bridge'
import { getRoot } from '/@/root'
import { EComponentName, ELocalStorageKey, ERouterName, EUserType } from '/@/types'
import { LockOutlined, UserOutlined } from '@ant-design/icons-vue'

const root = getRoot()

const formState: UnwrapRef<LoginBody> = reactive({
  username: 'pilot',
  password: 'pilot123',
  flag: EUserType.Pilot,
})
const isVerified = ref<boolean>(false)
onMounted(async () => {
  verifyLicense()
  if (!isVerified.value) {
    return
  }

  apiPilot.setPlatformMessage('Cloud Api Platform', '', '')

  const token = localStorage.getItem(ELocalStorageKey.Token)
  if (token) {
    await refreshToken({})
      .then(res => {
        apiPilot.setComponentParam(EComponentName.Api, {
          host: CURRENT_CONFIG.baseURL,
          token: res.data.access_token
        })
        const jsres = apiPilot.loadComponent(EComponentName.Api, apiPilot.getComponentParam(EComponentName.Api))
        if (!jsres) {
          message.error('Failed to load api module.')
          return
        }
        apiPilot.setToken(res.data.access_token)
        localStorage.setItem(ELocalStorageKey.Token, res.data.access_token)
        root.$router.push(ERouterName.PILOT_HOME)
      })
      .catch(err => {
        message.error(err)
      })
  }
})
const onSubmit = async (e: any) => {
  await login(formState)
    .then(res => {
      if (!isVerified.value) {
        message.error('Please verify the license firstly.')
        return
      }
      console.log('login res:', res)
      if (res.code === 0) {
        apiPilot.setComponentParam(EComponentName.Api, {
          host: CURRENT_CONFIG.baseURL,
          token: res.data.access_token
        })
        const jsres = apiPilot.loadComponent(
          EComponentName.Api,
          apiPilot.getComponentParam(EComponentName.Api)
        )
        console.log('load api module res:', jsres)
        apiPilot.setToken(res.data.access_token)
        localStorage.setItem(ELocalStorageKey.Token, res.data.access_token)
        localStorage.setItem(ELocalStorageKey.WorkspaceId, res.data.workspace_id)
        localStorage.setItem(ELocalStorageKey.UserId, res.data.user_id)
        localStorage.setItem(ELocalStorageKey.Username, res.data.username)
        localStorage.setItem(ELocalStorageKey.Flag, EUserType.Pilot.toString())
        message.success('Login Success')
        root.$router.push(ERouterName.PILOT_HOME)
      }
    })
    .catch(err => {
      message.error(err)
    })
}

function verifyLicense () {
  isVerified.value = apiPilot.platformVerifyLicense(CURRENT_CONFIG.appId, CURRENT_CONFIG.appKey, CURRENT_CONFIG.appLicense) &&
    apiPilot.isPlatformVerifySuccess()
  if (isVerified.value) {
    message.success('The license verification is successful.')
  } else {
    message.error('Filed to verify the license. Please check license whether the license is correct, or apply again.')
  }
}
</script>

<style lang="scss" scoped>
//@import '/@/styles/index.scss';
@import "/@/styles/variables.scss";

.login {

  .logo {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  img {
    width: 50vw;
    height: auto;
    max-width: 180px;
  }

  .title {
    -webkit-user-select: none; /* Safari */
    -moz-user-select: none; /* Firefox */
    -ms-user-select: none; /* IE10+/Edge */
    user-select: none; /* Standard */
    margin-bottom: 20vh;
  }

  background-color: $bambi-nat-ultralight;
  height: 100vh;

  form {
    .name,
    .password {
      width: 100%;
    }

    .login-button {

      margin: 5px 0 0; //reset button margin except top

      button {
        background-color: $bambi-shade-darker-2;
        border-color: $bambi-shade-darker-3;
      }
    }
  }
}

</style>
