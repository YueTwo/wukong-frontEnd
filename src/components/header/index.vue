<template>
  <div class="header fixed h-16 w-full flex items-center justify-center px-36 z-50">
    <div class="max-w-[1380px] py-[20px] w-full flex flex-row h-full justify-between items-center">
      <div>
        <img src="" alt="" />
      </div>
      <div>
        <el-link type="primary" v-for="item in menu" :key="item.name" :href="item.path" @click="item.handleClick">
          {{ item.name }}
        </el-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from '@/stores/index.js'

const userStore = useUserStore()
const genMenu = () => {
  let tmpMenu = [
    {
      name: 'HOME',
      path: '/'
    },
    {
      name: 'DASHBOARD',
      path: '/dashboard'
    },
    {
      name: 'TECHNOLOGY',
      path: '/'
    },
    {
      name: 'PRESS',
      path: '/'
    },
    {
      name: 'TEST',
      path: '/test'
    }
  ]
  if (userStore.isLogin()) {
    tmpMenu.push(
      {
        name: userStore.username,
        path: '/'
      },
      {
        name: 'LOGOUT',
        path: '/',
        handleClick: () => {
          userStore.token = ''
          userStore.username = ''
        }
      }
    )
  } else {
    tmpMenu.push({
      name: 'LOGIN',
      path: '/login'
    })
  }
  menu.value = tmpMenu
}
const menu = ref()
onMounted(() => {
  genMenu()
})
</script>

<style lang="less" scoped>
.header {
  background-image: linear-gradient(to bottom, white, transparent);
}

.el-link {
  margin-right: 30px;
}

.el-link.el-link--primary {
  --el-link-text-color: #000000;
  --el-link-hover-text-color: #000000;
}
</style>
