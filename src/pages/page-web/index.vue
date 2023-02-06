<template>
  <div class="login flex-column flex-justify-center flex-align-center m0 b0">
    <div class="logo">
      <img :src="bambiLogo"/>
      <p class="fz35 pb60 title">Bambi</p>
    </div>
    <a-form
      :model="formState"
      class="flex-display flex-align-stretch flex-row flex-justify-center flex-align-center"
      layout="inline"
    >
      <a-form-item class="name">
        <a-input v-model:value="formState.username" placeholder="Username">
          <template #prefix>
            <UserOutlined style="color: rgba(0, 0, 0, 0.25)"/>
          </template>
        </a-input>
      </a-form-item>
      <a-form-item class="password">
        <a-input
          v-model:value="formState.password"
          placeholder="Password"
          type="password"
        >
          <template #prefix>
            <LockOutlined style="color: rgba(0, 0, 0, 0.25)"/>
          </template>
        </a-input>
      </a-form-item>
      <a-form-item class="login-button">
        <a-button
          :disabled="loginBtnDisabled"
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
import { LockOutlined, UserOutlined } from '@ant-design/icons-vue'
import { message } from 'ant-design-vue'
import { computed, reactive, UnwrapRef } from 'vue'
import { login, LoginBody } from '/@/api/manage'
import { getRoot } from '/@/root'
import { ELocalStorageKey, ERouterName, EUserType } from '/@/types'

// TODO 2 postpone displaying until the picture is done loading

const root = getRoot()

const formState: UnwrapRef<LoginBody> = reactive({
  username: 'adminPC',
  password: 'adminPC',
  flag: EUserType.Web,
})

const loginBtnDisabled = computed(() => {
  return !formState.username || !formState.password
})

const onSubmit = async (e: any) => {
  const result = await login(formState)
  if (result.code === 0) {
    localStorage.setItem(ELocalStorageKey.Token, result.data.access_token)
    localStorage.setItem(ELocalStorageKey.WorkspaceId, result.data.workspace_id)
    localStorage.setItem(ELocalStorageKey.Username, result.data.username)
    localStorage.setItem(ELocalStorageKey.UserId, result.data.user_id)
    localStorage.setItem(ELocalStorageKey.Flag, EUserType.Web.toString())
    root.$router.push(ERouterName.HOMEPAGE)
  } else {
    message.error(result.message)
  }
}

</script>

<style lang="scss" scoped>
// @import '/@/styles/index.scss';
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
    display: flex;
    flex-direction: column;
    gap: 8px;

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

@media screen and (orientation: landscape) {
  .login {
    // flex-direction: row;
    justify-content: space-evenly;
    align-content: center;

    .title {
      margin-bottom: 0;
    }

    form {
      flex-direction: row;
      flex-wrap: nowrap;
      max-width: 200px;

      .login-button {

        margin: 0; //reset button margin except top
      }
    }
  }
}

</style>
