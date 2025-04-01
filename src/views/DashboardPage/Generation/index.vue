<script setup>
import rightAside from '../components/rightAside/index.vue'
import myMenu from '../components/menu/index.vue'
import { getModelSessionDetail } from '@/api/model.js'
import { getOSSUrl } from '@/utils/ossClient.js'
import { debounce, random } from 'lodash'

const mode = 'generation'

const test = () => {
  console.log(activeHistory.value)
}

const tipsContent = ref('')
const tipsLoading = computed(() => tipsContent.value.length === 0)
const isImage = ref(true)
const showPopover = ref(false)
const inputRef = ref() // 输入框的ref
const addToInput = () => {
  input.value = tipsContent.value
  handleSubmit()
  showPopover.value = false
}

const handleInput = () => {
  console.log('input~', random(0, 1))
  setTimeout(() => {
    showPopover.value = true
    setTimeout(() => {
      tipsContent.value =
        '在一个温暖的夏日黄昏，一位年轻的女子坐在一片广阔的薰衣草田中间的小木凳上，手中拿着一本打开的书，但她的视线却远离书页，凝视着远方壮丽的山脉。夕阳的金色黄昏洒在薰衣草上，为整个场景增添了一层梦幻的色彩。'
    }, 800)
  }, 1000)
}
const debounceHandleInput = debounce(handleInput, 300)

// 历史记录相关
const history = ref([])
const activeHistoryId = ref('')
const activeHistory = ref()
const activeHistoryTargetDataType = computed(() => activeHistory.value?.detail?.target_data_type || '')
watch(activeHistoryId, async (value) => {
  activeHistory.value = history.value.find((item) => item.id == activeHistoryId.value)
  if (value) {
    const res = await getModelSessionDetail(mode, activeHistory.value?.media_type, value)
    console.log(`获取id为 ${value} 的历史记录：`, res)
    activeHistory.value.detail = res
  }
})
onMounted(async () => {
  history.value = await getHistory(mode)
})

// 模型相关
const models = ref([])
const activeModelId = ref()
const activeModel = computed(() => {
  return models.value.find((item) => item.id === activeModelId.value) || null
})
const showMenu = ref(false)
const menu_media_type = computed(() => (isImage.value ? 'image' : 'video'))
const viewConfig = ref([])
const modelConfig = ref()
watch(menu_media_type, async (value) => {
  activeModelId.value = ''
  viewConfig.value = null
  console.log('value', value)
  models.value = await getModelMenu(mode, menu_media_type.value)
})
watch(activeModelId, async (value) => {
  if (activeModelId.value === '') return
  viewConfig.value = await getModelConfig(value)
  modelConfig.value = {}
  viewConfig.value.forEach((item) => {
    modelConfig.value[item.name] = item.default
  })
  // 使用 map 方法遍历数组，然后返回每个新对象，其中键为原对象的 name 属性，值为 ""
})

const autoResize = (e) => {
  inputRef.value.style.height = '40px'
  inputRef.value.style.height = e.target.scrollHeight + 'px'
}

// 提交post生成请求
const input = ref('')
const handleSubmit = async () => {
  console.log()
  const res = await postModeGeneration(menu_media_type.value, input.value, activeModel.value.name, modelConfig.value)
  console.log(res)
  history.value.unshift({
    id: `${res.id}`,
    name: input.value,
    media_type: menu_media_type.value
  })
  activeHistoryId.value = `${res.id}`
  ElNotification({
    title: 'Title',
    message: h('i', { style: 'color: teal' }, '上传成功！')
  })
  input.value = ''
  refresh()
  autoResize()
}

onMounted(async () => {
  inputRef.value.addEventListener('input', autoResize, false)
  history.value = await getHistory(mode)
  models.value = await getModelMenu(mode, menu_media_type.value)
})
const isCollapse = ref()
const refresh = async () => {
  console.log('刷新')
  activeHistory.value.detail = await getModelSessionDetail(mode, activeHistory.value.media_type, activeHistoryId.value)
  // 检查条件是否满足，如果不满足继续执行
  if (activeHistory.value.detail?.target_data != null) {
    console.log('目标数据类型已变化，停止刷新')
  } else {
    // 如果条件不满足，继续设置下一次执行
    setTimeout(refresh, 100)
  }
}
</script>

<template>
  <my-menu v-model:show="showMenu" :models="models" v-model:select-model-id="activeModelId"></my-menu>
  <div class="common-layout h-full">
    <el-container class="h-full">
      <el-container>
        <!-- header -->
        <el-header class="h-16 border-b-2">
          <div class="items-center flex h-full">
            <p class="text-2xl font-noto-sans-jp font-bold text-nowrap w-[20rem] truncate">
              {{ activeHistory?.name || '生成' }}
            </p>

            <div class="ml-auto flex gap-5">
              <div class="ml-auto h-full flex">
                <el-button @click="test">test</el-button>
                <el-button type="primary" @click="refresh">刷新</el-button>
              </div>
              <el-icon size="1.6rem">
                <i-ri-sidebar-unfold-line
                  class="hover:text-gray-500 hover:cursor-pointer -scale-x-[1]"
                  @click="isCollapse = !isCollapse"
                  v-show="isCollapse"
                />
              </el-icon>
            </div>
          </div>
        </el-header>
        <el-main style="padding: 0">
          <!-- main -->
          <div class="w-full h-full flex flex-col relative">
            <!-- 创建新聊天-->
            <template v-if="!activeHistoryId">
              <div class="w-full h-full flex items-center flex-col mt-20 pb-32">
                <h1 class="font-bold text-4xl mb-2">七十二变</h1>
                <p class="text-gray-500 mb-3">汲取灵感之源，用简单的文字描绘无限的可能。</p>
                <el-card style="width: 480px" shadow="hover" class="h-full">
                  <div class="font-bold">
                    <div class="flex justify-between">
                      <div class="invisible">
                        <span>视频生成</span>
                        <i-ep-Right />
                      </div>
                      <span class="self-center text-xl">{{ isImage ? '图片' : '视频' }}生成</span>
                      <div
                        class="flex items-center hover:text-blue-400 hover:cursor-pointer"
                        @click="isImage = !isImage"
                      >
                        <span class="text-gray-500">{{ isImage ? '视频' : '图片' }}生成</span>
                        <i-ep-Right />
                      </div>
                    </div>
                    <el-divider />
                    <div class="flex flex-col gap-3">
                      <div class="flex items-center">
                        <span>模型选择：</span>

                        <span v-if="activeModel !== null" class="text-gray-500 flex gap-3 whitespace-nowrap">
                          <span class="text-gray-500">{{ activeModel?.name }}</span>
                          <img :src="getOSSUrl(activeModel?.icon)" class="w-6 h-6" alt="" />
                        </span>
                        <span v-else class="text-gray-500">未选择</span>
                        <el-button
                          type="primary"
                          style="background-color: #0d1117; border: #0d1117"
                          @click="showMenu = true"
                          class="ml-5"
                        >
                          <template #icon>
                            <el-icon>
                              <i-ion-cube-outline />
                            </el-icon>
                          </template>
                          选择模型
                        </el-button>
                      </div>
                      <div v-for="item in viewConfig" :key="item" class="ml-4">
                        <!--数值类选项-->
                        <template v-if="item.type === 'int'">
                          <div class="flex gap-3 items-center w-10/12">
                            <span class="whitespace-nowrap w-36">{{ item.alias_name }}</span>
                            ：
                            <span class="whitespace-nowrap mr-5">
                              <span class="mr-3 ml-1">{{ modelConfig[item.name] }} </span>
                              {{ item.unit }}
                            </span>
                            <el-slider
                              v-model="modelConfig[item.name]"
                              :min="item.range[0]"
                              :max="item.range[1]"
                              :show-tooltip="false"
                            />
                          </div>
                          <!--枚举类选项-->
                        </template>
                        <template v-if="item.type === 'enum'">
                          <span class="whitespace-nowrap w-36">{{ item.alias_name }}</span>
                          ：
                          <el-select v-model="modelConfig[item.name]" placeholder="Select" style="width: 100px">
                            <el-option v-for="item in item.range" :key="item" :label="item" :value="item" />
                          </el-select>
                        </template>
                      </div>
                    </div>
                  </div>
                </el-card>
              </div>
            </template>
            <!-- 历史记录页面-->
            <template v-else>
              <div class="flex items-center justify-center text-4xl h-full">
                <template v-if="activeHistory.media_type === 'image'">
                  <el-image
                    v-if="activeHistory?.media_type === 'image'"
                    style="width: 400px; height: 400px"
                    :src="getOSSUrl(activeHistory.detail?.target_data)"
                    :zoom-rate="1.2"
                    :max-scale="7"
                    :min-scale="0.2"
                    :preview-src-list="[getOSSUrl(activeHistory.detail?.target_data)]"
                    :initial-index="4"
                    fit="cover"
                    hide-on-click-modal
                  >
                    <template #error>
                      <div class="w-full h-full flex items-center justify-center bg-[#fcfcff] flex-col gap-6">
                        <img src="@/assets/loading.gif" alt="" class="h-48 w-48" />
                        <p class="text-lg text-gray-400">模型正在努力工作 (*>.<*)</p>
                        <p class="text-[10px]"></p>
                      </div>
                    </template>
                    <template #placeholder>
                      <div class="w-full h-full flex items-center justify-center bg-[#fcfcff] flex-col gap-6">
                        <img src="@/assets/loading.gif" alt="" class="h-48 w-48" />
                        <p class="text-lg text-gray-400">正在加载图片 (*>.<*)</p>
                      </div>
                    </template>
                  </el-image>
                </template>
                <template v-if="activeHistory.media_type === 'video'">
                  <video
                    v-if="activeHistory.detail?.target_data != null"
                    :src="getOSSUrl(activeHistory.detail.target_data)"
                    class="h-1/2 flex bg-amber-200"
                    controls
                  ></video>
                  <div v-else class="w-full h-full flex items-center justify-center bg-[#fcfcff] flex-col gap-6">
                    <img src="@/assets/loading.gif" alt="" class="h-48 w-48" />
                    <p class="text-lg text-gray-400">模型正在努力工作 (*>.<*)</p>
                    <p class="text-[10px]"></p>
                  </div>
                </template>
              </div>
            </template>
            <!-- 聊天框-->
            <div class="absolute bottom-0 w-full flex mt-auto py-3 items-center justify-center">
              <div class="border-2 bg-white rounded-2xl w-5/6 max-w-[65rem] flex items-center px-3">
                <el-icon size="1.5rem">
                  <i-ep-chat-line-square class="text-gray-500" />
                </el-icon>
                <el-popover placement="top" :visible="showPopover" title="小悟提示" :width="600" trigger="hover">
                  <template #reference>
                    <textarea
                      ref="inputRef"
                      class="body2 resize-none outline-0 w-full my-2 mx-3 py-2 h-[40px]"
                      placeholder="请随意提问..."
                      v-model="input"
                      @keydown.enter="handleSubmit"
                      @input="debounceHandleInput"
                    />
                  </template>
                  <div v-loading="tipsLoading" class="flex flex-col">
                    <p>{{ tipsContent }}</p>
                    <div class="w-full justify-end flex">
                      <el-button :type="tipsContent ? 'primary' : ''" @click="addToInput">添加</el-button>
                    </div>
                  </div>
                </el-popover>

                <el-button
                  type="primary"
                  style="height: 2.5rem; width: 2.5rem"
                  :disabled="input.length === 0 || activeModel === null"
                  @click="handleSubmit"
                >
                  <el-icon size="1.5rem">
                    <i-ep-top class="text-4xl" />
                  </el-icon>
                </el-button>
              </div>
            </div>
          </div>
        </el-main>
      </el-container>
      <!-- 侧边栏-->
      <right-aside
        hide-config
        v-model:is-collapse="isCollapse"
        :history="history"
        v-model:active-history-id="activeHistoryId"
      />
    </el-container>
  </div>
</template>

<style lang="scss" scoped>
.el-header {
  height: 4rem;
}

.el-footer {
  height: 4.5rem;
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
}

.submit-button {
  width: 24rem;
  height: 4rem;
  border-radius: 1rem;
}

.el-input-number .el-slider__input {
  width: 1rem;
}

/* 隐藏Chrome, Safari等基于WebKit的浏览器的滚动条 */
textarea::-webkit-scrollbar {
  display: none;
}

/* 对于Firefox，可以使用`scrollbar-width`属性 */
textarea {
  scrollbar-width: none;
}

/* 对于IE和Edge，可以使用`-ms-overflow-style` */
textarea {
  -ms-overflow-style: none;
}
</style>
