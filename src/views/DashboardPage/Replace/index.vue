<script setup>
import rightAside from '../components/rightAside/index.vue'
import myMenu from '../components/menu/index.vue'
import { getModelConfig, getModelSessionDetail } from '@/api/model.js'
import { useUserStore } from '@/stores/index.js'
import { getOSSUrl, initOSSClient } from '@/utils/ossClient.js'
import BlobUtils from '@/utils/BlobUtils.js'

const mode = 'replace'

const test = () => {
  console.log(history.value)
  console.log(activeHistory.value)
  console.log(activeHistoryId.value)
  console.log(typeof activeHistoryId.value)
}

// 历史记录相关
const history = ref([])
const activeHistoryId = ref()
const activeHistory = ref()
const activeHistoryTargetDataType = computed(() => activeHistory.value?.detail?.target_data_type || '')
watch(activeHistoryId, async (value) => {
  activeHistory.value = history.value.find((item) => item.id == activeHistoryId.value)
  if (value) {
    const res = await getModelSessionDetail(mode, activeHistory.value.media_type, value)
    console.log(`获取id为 ${value} 的历史记录：`, res)
    activeHistory.value.detail = res
  }
})
onMounted(async () => {
  history.value = await getHistory(mode)
})

// 模型菜单相关
const models = ref([])
const activeModelId = ref()
const activeModel = computed(() => {
  return models.value.find((item) => item.id === activeModelId.value) || null
})
const showMenu = ref(false)
const viewConfigs = ref([])
const formConfigs = ref([])
const userStore = useUserStore()
const submitButtonRef = ref()
const title = ref('伪造检测')
watch(activeModel, async (value) => {
  if (value == null) return
  const res = await getModelConfig(value.id)
  viewConfigs.value = res
  formConfigs.value = {}
  res.forEach((item) => {
    formConfigs.value[item.name] = item.type === 'int' ? Number(item.default) : item.default
  })
  console.log('模型参数列表', viewConfigs.value)
})

// 上传相关
const origin_section = ref()
const target_section = ref()
const allowDrag = computed(() => !fileList.value.length)
const allowSubmit = computed(() => activeUploadFile.value !== null && activeModelId.value)
const fileList = ref([])
const activeUploadFile = computed(() => {
  if (fileList.value.length === 0) return null
  return { raw: fileList.value[0].raw, type: fileList.value[0].raw.type.split('/')[0] }
})
const uploadRef = ref()
const uploadFilePreview = ref()
const cancelUpload = (file) => {
  uploadRef.value.clearFiles()
}
const handleExceed = (files) => {
  uploadRef.value.clearFiles()
  nextTick(() => {
    uploadRef.value.handleStart(files[0])
  })
}
const handleUpload = () => {
  const fileName = activeUploadFile.value.raw.name
  OSSClient.put(`replace/${activeUploadFile.value.type}/${userStore.username}/${fileName}`, activeUploadFile.value.raw)
    .then(async (value) => {
      title.value = fileName
      console.log(`已经准备好发请求：\nname:${fileName}\npath:${value.name}\n模型：${activeModel.value}`)
      try {
        const res = await postModelReplace(
          activeUploadFile.value.type,
          value.name,
          origin_section.value,
          target_section.value
        )

        history.value.unshift({
          id: `${res.id}`,
          name: `${origin_section.value} to ${target_section.value}`,
          media_type: activeUploadFile.value.type
        })

        activeHistoryId.value = `${res.id}`
        uploadRef.value.clearFiles()
        ElNotification({
          title: 'Title',
          message: h('i', { style: 'color: teal' }, '上传成功！')
        })
        test()
        refresh()
      } catch (e) {
        ElNotification({
          title: 'Warning',
          message: h('i', { style: 'color: red' }, '上传失败！')
        })
      }
    })
    .catch((e) => console.log(e))
}
watch(activeUploadFile, async (value) => {
  if (value === null) return
  models.value = await getModelMenu(mode, value.type)

  if (value.type === 'video') {
    const res = await BlobUtils.captureFrame(value.raw)
    uploadFilePreview.value = res.url
  }
})
//上传相关
var OSSClient
onMounted(async () => {
  OSSClient = await initOSSClient()
})

const refresh = async () => {
  console.log('刷新')
  activeHistory.value.detail = await getModelSessionDetail(mode, activeHistory.value.media_type, activeHistoryId.value)
  // 检查条件是否满足，如果不满足继续执行
  if (activeHistory.value.detail.target_data !== null) {
    console.log('目标数据类型已变化，停止刷新')
  } else {
    // 如果条件不满足，继续设置下一次执行
    setTimeout(refresh, 100)
  }
}

const isCollapse = ref()
</script>

<template>
  <my-menu v-model:show="showMenu" :models="models" v-model:select-model-id="activeModelId"></my-menu>
  <div class="common-layout h-full">
    <el-container class="h-full">
      <el-container>
        <!-- header -->
        <el-header class="h-16 border-b-2">
          <div class="items-center flex h-full">
            <p class="text-2xl font-noto-sans-jp font-bold w-[20rem] truncate">
              {{ activeHistory?.name || '伪造检测' }}
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
            <!-- 新聊天页面 -->
            <template v-if="!activeHistoryId">
              <div class="grid h-full" :class="{ 'grid-cols-2': activeUploadFile?.type }">
                <div class="w-full h-full flex items-center justify-center flex-col gap-3">
                  <h1 class="text-4xl font-bold font-noto-sans-jp">千变万画</h1>
                  <p class="text-gray-500 text-xl">文本指示下的AI影像创作与智能伪造检测系统</p>

                  <div>
                    <el-upload
                      class=""
                      ref="uploadRef"
                      v-model:file-list="fileList"
                      :drag="allowDrag"
                      :on-exceed="handleExceed"
                      :limit="1"
                      list-type="picture"
                      action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
                      :auto-upload="false"
                    >
                      <template v-if="allowDrag">
                        <el-icon class="el-icon--upload">
                          <i-ep-upload-filled />
                        </el-icon>
                        <div class="el-upload__text">拖拽文件至此处或 <em>点击上传</em></div>
                      </template>
                      <template #file="file">
                        <div class="flex gap-3 items-center h-full">
                          <el-image
                            style="width: 100px; height: 100px"
                            :src="activeUploadFile.type === 'video' ? uploadFilePreview : file.file.url"
                            fit="contain"
                          />

                          <p class="w-24 truncate">{{ file.file.name }}</p>
                          <div class="flex h-full mb-auto hover:cursor-pointer" @click="cancelUpload(file.file)">
                            <i-ep-close class="hover:text-black"></i-ep-close>
                          </div>
                        </div>
                      </template>
                      <template #tip v-if="allowDrag">
                        <div class="el-upload__tip">jpg/png files with a size less than 500kb</div>
                      </template>
                    </el-upload>
                  </div>
                </div>
                <template v-if="activeUploadFile?.type">
                  <div class="flex flex-col items-center justify-center w-10/12">
                    <div
                      class="flex flex-col border-2 rounded-2xl w-11/12 max-w-[27rem] mx-4 border-black x px-4 py-2 bg-white"
                    >
                      <h1 class="text-xl">配置项</h1>

                      <el-divider />
                      <div class="flex flex-col gap-5">
                        <p class="flex items-end">
                          <span class="whitespace-nowrap">模型：</span>
                          <span class="text-gray-500 flex gap-3 whitespace-nowrap" v-if="activeModel !== null">
                            {{ activeModel.name }}
                            <img :src="getOSSUrl(activeModel.icon)" class="w-6 h-6" alt="" />
                          </span>
                          <span v-else>未选择</span>
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
                        </p>

                        <div class="flex gap-3">
                          <span class="text-nowrap">被替换部分</span>
                          <el-input v-model="origin_section" style="width: 200px" placeholder="" />
                        </div>
                        <div class="flex gap-3">
                          <span class="text-nowrap">欲替换部分</span>
                          <el-input v-model="target_section" style="width: 200px" placeholder="" />
                        </div>
                      </div>
                    </div>
                  </div>
                </template>
              </div>
            </template>
            <!-- 历史记录页面 -->
            <template v-else>
              <div class="flex items-center justify-center w-full h-full">
                <div class="w-10/12 h-4/5 flex gap-7">
                  <div class="h-full flex-grow justify-center flex items-center justify-center">
                    <el-image
                      style="width: 300px; height: 300px"
                      :src="getOSSUrl(activeHistory.detail?.origin_data)"
                      :zoom-rate="1.2"
                      :max-scale="7"
                      :min-scale="0.2"
                      :preview-src-list="[getOSSUrl(activeHistory.detail?.origin_data)]"
                      :initial-index="4"
                      fit="cover"
                      hide-on-click-modal
                    >
                    </el-image>
                  </div>
                  <div class="flex items-center">
                    <el-image style="width: 100px; height: 100px" :src="getOSSUrl('/static/rightArrow.png')" fit="fill">
                    </el-image>
                    <!--                    <img :src="getOSSUrl('/static/rightArrow.png')" class="w-24" alt="" />-->
                  </div>
                  <div class="h-full flex-grow flex items-center justify-center">
                    <div class="flex items-center justify-center">
                      <el-image
                        v-if="activeHistory.media_type === 'image'"
                        style="width: 300px; height: 300px"
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
                          </div>
                        </template>
                        <template #placeholder>
                          <div class="w-full h-full flex items-center justify-center bg-[#fcfcff] flex-col gap-6">
                            <img src="@/assets/loading.gif" alt="" class="h-48 w-48" />
                            <p class="text-lg text-gray-400">正在加载图片 (*>.<*)</p>
                          </div>
                        </template>
                      </el-image>
                    </div>
                  </div>
                </div>
              </div>
            </template>

            <!-- 聊天框-->
            <div class="absolute bottom-0 w-full flex mt-auto py-3 items-center justify-center" v-if="!activeHistoryId">
              <el-button
                type="primary"
                class="submit-button"
                ref="submitButtonRef"
                :disabled="!allowSubmit || !target_section || !origin_section"
                @click="handleUpload"
                @keydown.enter="handleUpload"
                ><p class="text-4xl">替换</p>
              </el-button>
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
</style>
