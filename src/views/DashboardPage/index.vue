<template>
  <div class="common-layout h-screen flex">
    <Menu />
    <el-container class="p-6 bg-[#141718]">
      <Aside>Aside</Aside>
      <el-container>
        <el-main class="rounded-2xl ml-4">
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import Aside from '@/views/DashboardPage/components/leftAside/index.vue'
</script>

<style lang="scss" scoped>
.el-main {
  padding: 0;

  background-color: white;
}

.el-container {
  width: 100%;
}
</style>
