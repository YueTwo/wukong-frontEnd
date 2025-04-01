<script setup>
import myHeader from '@/components/header/index.vue'

const Route = useRoute()
const ignorePaths = ['/login', '/500', '/404','/test']
const ignorePrefix = '/dashboard'

const shouldRenderHeader = () => {
  if (ignorePaths.includes(Route.path)) {
    return false
  }
  return !Route.path.startsWith(ignorePrefix)
}
</script>

<template>
  <my-header v-if="shouldRenderHeader()"></my-header>
  <RouterView />
</template>

<style scoped></style>
