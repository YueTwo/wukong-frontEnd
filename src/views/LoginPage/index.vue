<template>
  <div class="page">
    <div class="shell">
      <div class="h-full absolute left-12 pt-20 z-[300] text-black">
        <el-link @click="router.push('/')">返回首页</el-link>
      </div>
      <div class="container a-container is-txl" ref="a_container">
        <form class="form" id="a-form">
          <h2 class="title tracking-widest">创建账号</h2>
          <div class="form_icons">
            <el-icon class="iconfont" @click="gotoExternalLogin('qq', 'signIn')">
              <i-simple-icons-tencentqq />
            </el-icon>
            <el-icon class="iconfont" @click="gotoExternalLogin('wechat', 'signIn')">
              <i-ic-baseline-wechat />
            </el-icon>
            <el-icon class="iconfont" @click="gotoExternalLogin('bilibili', 'signIn')">
              <i-ri-bilibili-line />
            </el-icon>
          </div>
          <span class="form_span">选择注册方式活电子邮箱注册</span>
          <input
            type="text"
            class="form_input"
            placeholder="username"
            v-model="registerForm.username"
            autocomplete="username"
          />
          <input type="text" class="form_input" placeholder="Email" v-model="registerForm.Email" autocomplete="email" />
          <input
            type="password"
            class="form_input"
            placeholder="Password"
            v-model="registerForm.Password"
            autocomplete="password"
          />
          <button class="form_button button submit">SIGN UP</button>
        </form>
      </div>

      <div class="container b-container is-z is-txl" ref="b_container">
        <form @submit="handleLogin" class="form" id="b-form">
          <h2 class="title">登入账号</h2>
          <div class="form_icons">
            <el-icon class="iconfont" @click="gotoExternalLogin('qq', 'login')">
              <i-simple-icons-tencentqq />
            </el-icon>
            <el-icon class="iconfont" @click="gotoExternalLogin('wechat', 'login')">
              <i-ic-baseline-wechat />
            </el-icon>
            <el-icon class="iconfont" @click="gotoExternalLogin('bilibili', 'login')">
              <i-ri-bilibili-line />
            </el-icon>
          </div>
          <span class="form_span">选择登录方式或电子邮箱登录</span>
          <input type="text" class="form_input" placeholder="Email" v-model="loginForm.username" autocomplete="email" />
          <input
            type="password"
            class="form_input"
            placeholder="Password"
            v-model="loginForm.password"
            autocomplete="current-password"
          />
          <el-link class="form_link">忘记密码?</el-link>
          <button class="form_button button submit">SIGN IN</button>
        </form>
      </div>

      <div class="switch is-txr" ref="switch_cnt">
        <div class="switch_circle" ref="switch_circle1"></div>
        <div class="switch_circle switch_circle-t" ref="switch_circle2"></div>
        <div class="switch_container is-hidden" ref="switch_c1">
          <h2 class="switch_title title text-nowrap" style="letter-spacing: 0">Hello Friend！</h2>
          <p class="switch_description description">已经有账号了嘛，去登入账号来进入奇妙世界吧！！！</p>
          <button class="switch_button button switch-btn" @click="changeForm">SIGN IN</button>
        </div>

        <div class="switch_container" ref="switch_c2">
          <h2 class="switch_title title text-nowrap" style="letter-spacing: 0">Welcome Back！</h2>
          <p class="switch_description description">没有账号？去注册一个账号，让我们踏入奇妙的旅途！</p>
          <button class="switch_button button switch-btn" @click="changeForm">SIGN UP</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { postLogin } from '@/api/user.js'
import { useUserStore } from '@/stores/index.js'
import { ElMessage } from 'element-plus'

const router = useRouter()
const userStore = useUserStore()
const switch_circle1 = ref()
const switch_circle2 = ref()
const switch_cnt = ref()
const switch_c1 = ref()
const switch_c2 = ref()
const a_container = ref()
const b_container = ref()

const registerForm = ref({
  Email: '',
  username: '',
  Password: ''
})
const isLogin = ref(true)

const loginForm = ref({
  username: '',
  password: ''
})
const handleLogin = async (e) => {
  console.log('执行登陆操作~')
  e.preventDefault()
  const res = await postLogin(loginForm.value)
  console.log(res)
  userStore.token = res.jwt
  userStore.username = loginForm.value.username
  ElMessage({
    message: '登陆成功！.',
    type: 'success'
  })
  router.go(-1)
}

const changeForm = () => {
  // 修改类名
  switch_cnt.value.classList.add('is-gx')
  setTimeout(() => {
    switch_cnt.value.classList.remove('is-gx')
  }, 1500)
  switch_cnt.value.classList.toggle('is-txr')
  switch_circle1.value.classList.toggle('is-txr')
  switch_circle2.value.classList.toggle('is-txr')
  switch_c1.value.classList.toggle('is-hidden')
  switch_c2.value.classList.toggle('is-hidden')
  a_container.value.classList.toggle('is-txl')
  b_container.value.classList.toggle('is-txl')
  b_container.value.classList.toggle('is-z')
  isLogin.value = !isLogin.value
}

const gotoExternalLogin = (website, mode) => {
  console.log(website, mode)
  ElNotification({
    title: 'oops!',
    message: h('i', { style: 'color: teal' }, '该功能尚未开放，敬请期待！')
  })
}
</script>

<style lang="scss" scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  /* 字体无法选中 */
  user-select: none;
}

.page {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  background-color: #ecf0f3;
  color: #a0a5a8;
}

.shell {
  position: relative;
  width: 1000px;
  min-width: 1000px;
  min-height: 600px;
  height: 600px;
  padding: 25px;
  background-color: #ecf0f3;
  box-shadow:
    10px 10px 10px #d1d9e6,
    -10px -10px 10px #f9f9f9;
  border-radius: 12px;
  overflow: hidden;
  transition: transform 0.3s ease-in-out;
  @media (max-width: 1000px) {
    transform: scale(0.9);
  }
  @media (max-width: 900px) {
    transform: scale(0.8);
  }
  @media (max-width: 800px) {
    transform: scale(0.7);
  }
  @media (max-width: 700px) {
    transform: scale(0.6);
  }
  @media (max-width: 600px) {
    transform: scale(0.5);
  }
}

.container {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  width: 600px;
  height: 100%;
  padding: 25px;
  background-color: #ecf0f3;
  transition: 1.25s;
}

.form {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
}

.form_icons {
  display: flex;
  justify-content: center;
  align-items: center;
}

.iconfont {
  margin: 0 5px;
  border: rgba(0, 0, 0, 0.5) 2px solid;
  border-radius: 50%;
  font-size: 35px;
  padding: 3px;
  opacity: 0.5;
  transition: 0.1s;
}

.iconfont:hover {
  opacity: 1;
  transition: 0.15s;
  cursor: pointer;
}

.form_input {
  width: 350px;
  height: 40px;
  margin: 4px 0;
  padding-left: 25px;
  font-size: 13px;
  letter-spacing: 0.15px;
  border: none;
  outline: none;
  background-color: #ecf0f3;
  transition: 0.25s ease;
  border-radius: 8px;
  box-shadow:
    inset 2px 2px 4px #d1d9e6,
    inset -2px -2px 4px #f9f9f9;
}

.form_input:focus {
  box-shadow:
    inset 4px 4px 4px #d1d9e6,
    inset -4px -4px 4px #f9f9f9;
}

.form_span {
  margin-top: 30px;
  margin-bottom: 12px;
}

.form_link {
  color: #181818;
  font-size: 15px;
  margin-top: 25px;
  line-height: 2;
  --el-link-hover-text-color: #000000;
}

.title {
  text-indent: 10px;
  letter-spacing: 10px;
  font-size: 34px;
  font-weight: 700;
  line-height: 3;
  color: #181818;
}

.description {
  font-size: 14px;
  letter-spacing: 0.25px;
  text-align: center;
  line-height: 1.6;
}

.button {
  width: 180px;
  height: 50px;
  border-radius: 25px;
  margin-top: 50px;
  font-weight: 700;
  font-size: 14px;
  letter-spacing: 1.15px;
  background-color: #4b70e2;
  color: #f9f9f9;
  box-shadow:
    8px 8px 16px #d1d9e6,
    -8px -8px 16px #f9f9f9;
  border: none;
  outline: none;
}

.a-container {
  z-index: 100;
  left: calc(100% - 600px);
}

.b-container {
  left: calc(100% - 600px);
  z-index: 0;
}

.switch {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 400px;
  padding: 50px;
  z-index: 200;
  transition: 1.25s;
  background-color: #ecf0f3;
  overflow: hidden;
  box-shadow:
    4px 4px 10px #d1d9e6,
    -4px -4px 10px #d1d9e6;
}

.switch_circle {
  position: absolute;
  width: 500px;
  height: 500px;
  border-radius: 50%;
  background-color: #ecf0f3;
  box-shadow:
    inset 8px 8px 12px #b8bec7,
    inset -8px -8px 12px #fff;
  bottom: -60%;
  left: -60%;
  transition: 1.25s;
}

.switch_circle-t {
  top: -30%;
  left: 60%;
  width: 300px;
  height: 300px;
}

.switch_container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: absolute;
  width: 400px;
  padding: 50px 55px;
  transition: 1.25s;
}

.switch_button {
  cursor: pointer;
}

.switch_button:hover,
.submit:hover {
  box-shadow:
    6px 6px 10px #d1d9e6,
    -6px -6px 10px #f9f9f9;
  transform: scale(0.985);
  transition: 0.25s;
}

.switch_button:active,
.switch_button:focus {
  box-shadow:
    2px 2px 6px #d1d9e6,
    -2px -2px 6px #f9f9f9;
  transform: scale(0.97);
  transition: 0.25s;
}

.is-txr {
  left: calc(100% - 400px);
  transition: 1.25s;
  transform-origin: left;
}

.is-txl {
  left: 0;
  transition: 1.25s;
  transform-origin: right;
}

.is-z {
  z-index: 200;
  transition: 1.25s;
}

.is-hidden {
  visibility: hidden;
  opacity: 0;
  position: absolute;
  transition: 1.25s;
}

.is-gx {
  animation: is-gx 1.25s;
}

@keyframes is-gx {
  0%,
  10%,
  100% {
    width: 400px;
  }

  30%,
  50% {
    width: 500px;
  }
}
</style>
