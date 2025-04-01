<script setup>
import router from '@/router'
import { getOSSUrl } from '@/utils/ossClient.js'

const isCollapse = defineModel('isCollapse')
const activeHistoryId = defineModel('activeHistoryId')

const props = defineProps({
  history: [
    {
      id: String,
      name: String,
      media_type: String
    }
  ],
  hideConfig: {
    type: Boolean,
    default: false
  }
})
const option = ref('history')

const changeActiveHistory = (id) => {
  if (id === activeHistoryId.value) return
  activeHistoryId.value = id
}
const debouncedChangeActiveHistory = useDebounce(changeActiveHistory, 100)
</script>

<template>
  <transition name="aside">
    <el-aside v-show="!isCollapse">
      <el-container class="aside h-full">
        <el-header class="border-b-2">
          <div class="w-full h-full flex flex-row items-center">
            <el-icon size="1.6rem">
              <i-ri-sidebar-unfold-line
                class="hover:text-gray-500 hover:cursor-pointer"
                @click="isCollapse = !isCollapse"
              />
            </el-icon>
            <div class="ml-auto flex gap-2">
              <el-avatar :size="35" :src="getOSSUrl('/static/avatar.jpg')" />
              <el-button
                style="border-radius: 0.6rem; background-color: #0d1117; color: white"
                @click="router.push('/')"
                >返回首页
              </el-button>
            </div>
          </div>
        </el-header>
        <el-main style="padding: 0">
          <!-- 按钮组 -->
          <div class="mx-6 my-3 mt-5" style="border-radius: 10px; box-shadow: rgba(0, 0, 0, 0.3) 2px 2px 10px">
            <div
              v-if="!props.hideConfig"
              :class="{ 'before:translate-x-full': option === 'option' }"
              class="relative flex w-full p-1 bg-neutral-800 rounded-xl before:absolute before:left-1 before:top-1 before:bottom-1 before:w-[calc(50%-0.25rem)] before:bg-blue-500 before:rounded-[0.625rem] before:transition-all false"
            >
              <button
                @click="option = 'history'"
                class="relative flex justify-center items-center h-10 basis-1/2 font-semibold transition-colors hover:text-white text-[#6d7376] bg-transparent"
                :class="{ 'text-white': option === 'history' }"
              >
                历史
              </button>
              <button
                @click="option = 'option'"
                class="relative flex justify-center items-center h-10 basis-1/2 font-semibold transition-colors hover:text-white text-[#6d7376] bg-transparent"
                :class="{ 'text-white': option === 'option' }"
              >
                设置
              </button>
            </div>
          </div>
          <p class="ml-7 text-gray-500 text-sm mb-4">历史聊天</p>
          <div class="flex items-center h-full flex-col w-full">
            <template v-if="option === 'history'">
              <!-- 无历史记录 -->
              <template v-if="history?.length === 0">
                <div class="w-1/3 mt-20 text-center flex flex-col items-center justify-center">
                  <img src="@/assets/icon/svg/no%20data.svg" class="relative ml-5" />
                  <p class="text-gray-300">no data</p>
                </div>
              </template>
              <!-- 有历史记录 -->
              <template v-else>
                <el-scrollbar>
                  <div class="w-full px-5 flex flex-col gap-2 mb-32">
                    <history-button
                      v-for="item in history"
                      :key="item"
                      :history="item"
                      :active="activeHistoryId"
                      @click="debouncedChangeActiveHistory(item.id)"
                      :class="{ 'cursor-pointer hover:bg-gray-200': activeHistoryId != item.id }"
                    />
                  </div>
                </el-scrollbar>
              </template>
            </template>
          </div>
        </el-main>
        <el-footer class="new-chat-footer px-3">
          <el-button class="new-chat-button" type="primary" @click="activeHistoryId = null">+ 新聊天</el-button>
        </el-footer>
      </el-container>
    </el-aside>
  </transition>
</template>

<style lang="scss" scoped>
.el-main {
  overflow: hidden;
}

.el-header {
  height: 4rem;
}

.el-scrollbar {
  width: 100%;
  height: 100%;
}

.aside.el-container {
  background-color: #f8f8f8;
}

.new-chat-footer {
  padding: 0.5rem 1rem;
}

.new-chat-button {
  width: 100%;
  height: 100%;
  border-radius: 0.5rem;
}

.el-aside {
  width: 18rem;
  overflow-x: hidden;
}

.aside-enter-active {
  animation: aside-in 0.5s;
}

.aside-leave-active {
  animation: aside-in 0.5s reverse;
}

@keyframes aside-in {
  0% {
    width: 0;
  }
  100% {
    width: 18rem;
  }
}
</style>
