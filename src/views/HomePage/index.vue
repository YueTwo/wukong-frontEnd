<script setup>
const isMobile = ref(false)

const checkDevice = () => {
  const ua = navigator.userAgent
  if (/mobile/i.test(ua)) {
    isMobile.value = true
  }
}

onMounted(() => {
  checkDevice()
})
</script>

<template>
  <el-scrollbar>
    <div class="flex flex-col">
      <!-- 封面页 -->
      <div
        class="relative aspect-video lg:max-h-[93vh] w-full bg-[#d3e8fc] mt-16 flex items-center justify-center py-20"
      >
        <div class="bg-white w-full h-auto mx-7 max-w-[1200px] mb-12">
          <div class="h-full grid grid-cols-2 md:grid-cols-1 lg:grid-cols-2">
            <!-- 文字 -->
            <div v-slide-in="{ duration: 1000, opacity: 0.5 }" class="flex flex-col items-center p-14">
              <img src="@/assets/logo_c128.png" class="object-fill max-w-[70px] h-auto w-full mb-14" />
              <img src="@/assets/logo_text_c.png" class="h-auto w-2/3 my-1" />
              <a
                href="/"
                class="h-12 w-2/5 bg-[#409EFF] rounded-full flex items-center justify-center mt-16 font-Noto-Sans-JP text-xl text-white"
              >
                START NOW
              </a>
              <a href="/" class="text-[#409EFF] underline font-Noto-Sans-JP mt-5">Learn More</a>
            </div>
            <!-- 图片 -->
            <div class="p-14 flex justify-center">
              <div>
                <img src="@/assets/website_illustration.jpg" class="object-fill max-w-[500px] h-auto w-full" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 产品介绍 -->
      <div class="layer1-bg h-[700px] relative z-20 items-center grid grid-cols-2">
        <div></div>
        <div v-slide-in="{ direction: 'left', duration: 1200 }" class="h-full w-full flex flex-col font-Noto-Sans-JP">
          <h1 class="f text-[#ffbd59] text-5xl mt-20">Lorem ipsum dolor</h1>
          <p class="font-medium w-4/5 mt-16 text leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. A accusantium alias esse et ex, exercitationem
            fugit labore laborum laudantium libero magnam minus nesciunt nostrum nulla perferendis placeat reiciendis
            sequi sit sunt voluptate? Doloremque fuga impedit laborum natus omnis pariatur quos?
          </p>
          <p class="font-medium w-4/5 mt-16 text leading-relaxed">
            Placeat quas quidem quis reprehenderit sed vero voluptates? Animi asperiores aspernatur assumenda corporis
            deserunt dolore maiores pariatur sapiente sed velit. Ab, at consequatur distinctio dolorem doloremque enim
            expedita laborum nesciunt officiis pariatur quaerat quam repellendus, tempora. Beatae ipsa labore optio!
          </p>
        </div>
      </div>
      <div
        class="layer2-bg h-[80vh] bg-blue-50 relative z-20 font-Noto-Sans-JP flex flex-col items-center justify-center"
      >
        <div class="absolute inset-0 bg-gray-500 bg-opacity-50"></div>
        <div class="text-6xl text-white z-10 text-center">
          <h1>Lorem ipsum dolor</h1>
          <h2>Lorem ipsum.</h2>
        </div>
      </div>
      <div class="layer1 h-screen relative z-20 flex flex-col items-center py-12">
        <img src="@/assets/icon/svg/test.svg" loading="lazy" class="w-1/4 max-w-[320px]" />
        <h1 v-slide-in class="font-Noto-Sans-JP mt-5 text-4xl text-[#ffbd59]">Contact Us</h1>
      </div>
    </div>
  </el-scrollbar>
</template>

<style scoped>
.font-Noto-Sans-JP {
  font-family: 'Noto Sans JP', sans-serif;
  font-optical-sizing: auto;
  font-weight: 800;
  font-style: normal;
}

.layer1-bg {
  background-position: left 10vw top 25vh;
  background-repeat: no-repeat;
  background-image: url('@/assets/pic1.png');
  background-attachment: fixed;
  background-size: 25vw auto;
}

.layer2-bg {
  background-image: url('@/assets/bigPic.jpg');
  background-repeat: no-repeat;
  background-size: cover;
}
</style>
