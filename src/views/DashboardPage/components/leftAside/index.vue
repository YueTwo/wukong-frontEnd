<script setup>
import { useRoute } from 'vue-router'
import { getOSSUrl } from '@/utils/ossClient.js'

const isCollaspse = defineModel('isCollaspse')
const route = useRoute()
const currentClass = ref()
onMounted(() => {
  currentClass.value = route.path.split('/')[2]
})
</script>

<template>
  <el-aside>
    <el-scrollbar>
      <el-menu router :default-active="currentClass" unique-opened :collapse="isCollaspse">
        <div class="w-full h-14 flex flex-row mb-14">
          <img
            :src="getOSSUrl('static/image.png')"
            class="w-40 mx-5 hover:cursor-pointer"
            @click="console.log('home~')"
          />
          <div class="flex items-center justify-center w-full mb-2">
            <el-icon style="width: 2em" @click="isCollaspse = !isCollaspse">
              <i-material-symbols-side-navigation
                class="text-5xl text-gray-500 hover:cursor-pointer hover:text-white duration-500"
              />
            </el-icon>
          </div>
        </div>
        <el-menu-item index="detection">
          <el-icon>
            <i-ph-list-magnifying-glass-bold class="icon text-blue-500" />
          </el-icon>
          <p>伪造检测</p>
        </el-menu-item>
        <el-menu-item index="generation">
          <el-icon>
            <i-fluent-scan-text-24-regular class="icon text-orange-600" />
          </el-icon>
          <p>生成</p>
        </el-menu-item>
        <el-menu-item index="replace">
          <el-icon>
            <i-material-symbols-background-replace class="icon text-purple-600" />
          </el-icon>
          <p>局部替换</p>
        </el-menu-item>
        <el-menu-item index="transfer">
          <el-icon>
            <i-icon-park-solid-transfer class="icon text-green-500" />
          </el-icon>
          <p>风格迁移</p>
        </el-menu-item>
      </el-menu>
    </el-scrollbar>
  </el-aside>
</template>

<style scoped>
.el-aside {
  background-color: #141718;
  height: 100%;
  width: auto;
}

.el-menu {
  background-color: #141718;

  border-right: none;

  &.el-menu--collapse {
    width: 60px;

    & p,
    img {
      display: none;
    }
  }
}

.el-menu-item {
  font-size: 1rem;
  line-height: 1.5rem;

  &:hover {
    background-color: #141718;

    &:not(.is-active) p {
      color: white;
    }
  }

  &.is-active {
    & p {
      color: white;
    }

    color: #ffffff;
    background-color: #2c2f35;
    border-radius: 0.375rem /* 6px */;
  }

  & p {
    $--el-menu-hover-bg-color: #fff;
    margin-left: 12px;
    color: rgb(107 114 128);
  }
}

.icon {
  width: 40px;
  height: 40px;
}
</style>
