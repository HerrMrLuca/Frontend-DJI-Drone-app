<template>
  <div
      class="login flex-column flex-justify-center flex-align-center m0 b0">
    <a-image
        style="width: 15vw; height: 15vw; margin-bottom: 30px"
        :src="bambi"
    />
    <p class="fz35 pb50" style="color: #78C480">Bambi</p>
    <a-form
        layout="inline"
        :model="formState"
        class="flex-row flex-justify-center flex-align-center"
    >
      <a-form-item>
        <a-input v-model:value="formState.username" placeholder="Username">
          <template #prefix
          ><UserOutlined style="color: rgba(120, 196, 128, 0.25)"
          /></template>
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-input
            v-model:value="formState.password"
            type="password"
            placeholder="Password"
        >
          <template #prefix
          ><LockOutlined style="color: rgba(120, 196, 128, 0.25"
          /></template>
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-button
            class="m0"
            type="primary"
            html-type="submit"
            :disabled="loginBtnDisabled"
            @click="onSubmit"
        >
          Login
        </a-button>
      </a-form-item>
    </a-form>
  </div>

</template>

<script lang="ts" setup>
import bambi from '../../assets/icons/bambi.png'
import { LockOutlined, UserOutlined } from '@ant-design/icons-vue'
import { message } from 'ant-design-vue'
import { reactive, computed, UnwrapRef } from 'vue'
import { login, LoginBody } from '/@/api/manage'
import { getRoot } from '/@/root'
import { ELocalStorageKey, ERouterName, EUserType } from '/@/types'
import router from '/@/router'

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
    root.$router.push(ERouterName.MEMBERS)
  } else {
    message.error(result.message)
  }
}

</script>

<style lang="scss" scoped>
@import '/@/styles/index.scss';
.login {
  background-color: white;
  height: 100vh;
}
</style>
