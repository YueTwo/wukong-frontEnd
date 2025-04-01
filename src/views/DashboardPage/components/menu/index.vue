<script setup>
import { getOSSUrl } from '@/utils/ossClient.js'

const selectModelId = defineModel('selectModelId')
const show = defineModel('show')
const props = defineProps({
  models: [Object]
})
const select = (id) => {
  selectModelId.value = id
}

const test = () => {}
const viewModels = computed(() => {
  return props.models?.map((item) => {
    item.splitAbstract = item.introduction.split('\n')
    item.isSelected = !!(selectModelId.value && item.id === selectModelId.value)
    return item
  })
})

onMounted(async () => {})
</script>

<template>
  <el-dialog v-model="show" title="Tips" width="80vw" style="height: 70vh">
    <template #header="{ titleId }">
      <div class="w-full h-full">
        <h4 :id="titleId" class="font-bold text-xl">选择模型</h4>
      </div>
    </template>
    <template v-if="viewModels?.length === 0">
      <el-skeleton :rows="5" />
    </template>
    <template v-else>
      <div class="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        <el-card style="max-width: 520px" v-for="(item, index) in viewModels" :key="index">
          <template #header>
            <div class="flex flex-row">
              <img :src="getOSSUrl(item.icon)" class="h-16 rounded-md mr-4" />
              <div class="w-full flex flex-col">
                <div class="flex-grow text-lg font-bold flex text-nowrap">
                  {{ item.name }}
                  <div class="ml-auto">
                    <el-tooltip placement="right-start">
                      <template #content
                        ><p v-for="i in item.splitAbstract" :key="i">{{ i }}<br /></p
                      ></template>
                      <el-icon>
                        <i-ep-InfoFilled />
                      </el-icon>
                    </el-tooltip>
                  </div>
                </div>
                <div class="" @click="select(item.id)">
                  <el-button :type="item.isSelected ? 'primary' : 'default'">
                    <template v-if="item.isSelected">已选择</template>
                    <template v-else>选择</template>
                  </el-button>
                </div>
              </div>
            </div>
          </template>
          <div class="group hover:line-clamp-none max-w-xs">
            <p class="line-clamp-3 overflow-hidden group-hover:line-clamp-none">
              {{ item.description }}
            </p>
          </div>
        </el-card>
      </div>
    </template>
  </el-dialog>
</template>

<style lang="scss" scoped>
.el-button {
  width: 90px;
  height: 35px;
  border-radius: 0.4rem;
}
</style>
