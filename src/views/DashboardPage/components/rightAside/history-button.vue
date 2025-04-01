<script setup>
const props = defineProps({
  // 定义一个名为'message'的prop，类型为String
  history: {
    title: String,
    id: String
  },
  active: String
})
const isEdit = ref(false)
const isActive = computed(() => props.active === props.history.id)
const newTitle = ref('')
const input = ref()
const switchEdit = () => {
  isEdit.value = !isEdit.value
  if (isEdit.value)
    nextTick(() => {
      input.value.focus()
    })
}

const postChangeTitle = (newTitle) => {
  console.log(`post修改id为${props.history.id}的标题→${newTitle}`)
}
const deleteHistory = () => {
  console.log(`delete删除id为${props.history.id}的历史记录`)
}
onMounted(() => {
  newTitle.value = props.history.title ?? ''
})
</script>

<template>
  <div class="w-full h-12 rounded-xl flex flex-row items-center px-5 gap-3" :class="{ 'bg-gray-200': isActive }">
    <el-icon>
      <i-ep-ChatLineSquare class="text-gray-700" />
    </el-icon>
    <template v-if="!isEdit">
      <el-text class="w-150px mb-2 font-normal" truncated> {{ history.name }}</el-text>
    </template>
    <template v-else>
      <el-input
        v-model="newTitle"
        @blur="switchEdit"
        @change="postChangeTitle"
        style="width: 250px"
        placeholder="Please input"
        ref="input"
      />
    </template>
    <div class="ml-auto flex gap-2" v-show="isActive">
      <el-icon @click="switchEdit" class="hover:cursor-pointer" v-show="!isEdit">
        <i-ep-EditPen class="text-gray-500" />
      </el-icon>
      <el-icon class="hover:cursor-pointer" @click="deleteHistory">
        <i-ep-Delete class="text-gray-500" />
      </el-icon>
    </div>
  </div>
</template>

<style scoped></style>
