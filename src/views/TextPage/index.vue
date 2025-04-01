<template>
  <div class="flex items-center justify-center">
    <img src="./pic.jpg" alt="" />
    <img src="./1.svg" alt="" class="absolute" />
  </div>
</template>

<!--<script setup></script>-->

<!--<style lang="scss" scoped>-->
<!--polyline {-->
<!--  stroke: red;-->
<!--  stroke-width: 66rem;-->
<!--}-->
<!--</style>-->
<!--&lt;!&ndash;<script setup>&ndash;&gt;-->
<!--&lt;!&ndash;import originpic from './pic.jpg'&ndash;&gt;-->
<!--&lt;!&ndash;import maskpic from './mask.jpg' // 引入遮罩图&ndash;&gt;-->

<!--&lt;!&ndash;const canvasRef = ref()&ndash;&gt;-->
<!--&lt;!&ndash;const canvasRef2 = ref()&ndash;&gt;-->
<!--&lt;!&ndash;var ctx&ndash;&gt;-->

<!--&lt;!&ndash;const init = () => {&ndash;&gt;-->
<!--&lt;!&ndash;  ctx = canvasRef.value.getContext('2d', {&ndash;&gt;-->
<!--&lt;!&ndash;    willReadFrequently: true&ndash;&gt;-->
<!--&lt;!&ndash;  })&ndash;&gt;-->

<!--&lt;!&ndash;  const originImg = new Image()&ndash;&gt;-->
<!--&lt;!&ndash;  const maskImg = new Image()&ndash;&gt;-->

<!--&lt;!&ndash;  originImg.onload = () => {&ndash;&gt;-->
<!--&lt;!&ndash;    maskImg.onload = () => {&ndash;&gt;-->
<!--&lt;!&ndash;      // 确保两张图片都加载完成&ndash;&gt;-->
<!--&lt;!&ndash;      canvasRef.value.width = originImg.width&ndash;&gt;-->
<!--&lt;!&ndash;      canvasRef.value.height = originImg.height&ndash;&gt;-->
<!--&lt;!&ndash;      ctx.drawImage(originImg, 0, 0) // 先画原图&ndash;&gt;-->

<!--&lt;!&ndash;      let originImgData = ctx.getImageData(0, 0, originImg.width, originImg.height)&ndash;&gt;-->
<!--&lt;!&ndash;      ctx.drawImage(maskImg, 0, 0) // 再画遮罩图&ndash;&gt;-->
<!--&lt;!&ndash;      let maskImgData = ctx.getImageData(0, 0, maskImg.width, maskImg.height)&ndash;&gt;-->

<!--&lt;!&ndash;      for (let i = 0; i < maskImgData.data.length; i += 4) {&ndash;&gt;-->
<!--&lt;!&ndash;        // 如果遮罩图的像素是黑色，则将原图对应像素的alpha值设为0，实现透明效果&ndash;&gt;-->
<!--&lt;!&ndash;        if (maskImgData.data[i] === 0 && maskImgData.data[i + 1] === 0 && maskImgData.data[i + 2] === 0) {&ndash;&gt;-->
<!--&lt;!&ndash;          originImgData.data[i + 3] = 0 // A, 设置alpha值为0&ndash;&gt;-->
<!--&lt;!&ndash;        }&ndash;&gt;-->
<!--&lt;!&ndash;      }&ndash;&gt;-->

<!--&lt;!&ndash;      // 将修改后的图片数据画回画布&ndash;&gt;-->
<!--&lt;!&ndash;      ctx.putImageData(originImgData, 0, 0)&ndash;&gt;-->
<!--&lt;!&ndash;    }&ndash;&gt;-->
<!--&lt;!&ndash;    maskImg.src = maskpic&ndash;&gt;-->
<!--&lt;!&ndash;  }&ndash;&gt;-->
<!--&lt;!&ndash;  originImg.src = originpic&ndash;&gt;-->
<!--&lt;!&ndash;}&ndash;&gt;-->

<!--&lt;!&ndash;const processMaskImage = () => {&ndash;&gt;-->
<!--&lt;!&ndash;  const ctx2 = canvasRef2.value.getContext('2d')&ndash;&gt;-->
<!--&lt;!&ndash;  const maskImg = new Image()&ndash;&gt;-->

<!--&lt;!&ndash;  maskImg.onload = () => {&ndash;&gt;-->
<!--&lt;!&ndash;    canvasRef2.value.width = maskImg.width&ndash;&gt;-->
<!--&lt;!&ndash;    canvasRef2.value.height = maskImg.height&ndash;&gt;-->
<!--&lt;!&ndash;    ctx2.drawImage(maskImg, 0, 0)&ndash;&gt;-->

<!--&lt;!&ndash;    let imgData = ctx2.getImageData(0, 0, maskImg.width, maskImg.height)&ndash;&gt;-->
<!--&lt;!&ndash;    for (let i = 0; i < imgData.data.length; i += 4) {&ndash;&gt;-->
<!--&lt;!&ndash;      // 如果像素是黑色，将alpha值设为0，使其透明&ndash;&gt;-->
<!--&lt;!&ndash;      imgData.data[i + 3] = 0&ndash;&gt;-->
<!--&lt;!&ndash;      // 白色像素保持不变&ndash;&gt;-->
<!--&lt;!&ndash;    }&ndash;&gt;-->
<!--&lt;!&ndash;    ctx2.putImageData(imgData, 0, 0)&ndash;&gt;-->
<!--&lt;!&ndash;  }&ndash;&gt;-->
<!--&lt;!&ndash;  maskImg.src = maskpic&ndash;&gt;-->
<!--&lt;!&ndash;}&ndash;&gt;-->

<!--&lt;!&ndash;onMounted(() => {&ndash;&gt;-->
<!--&lt;!&ndash;  init()&ndash;&gt;-->
<!--&lt;!&ndash;  canvasRef2.value.addEventListener('mousemove', function (event) {&ndash;&gt;-->
<!--&lt;!&ndash;    var rect = canvasRef2.value.getBoundingClientRect()&ndash;&gt;-->
<!--&lt;!&ndash;    var x = event.clientX - rect.left&ndash;&gt;-->
<!--&lt;!&ndash;    var y = event.clientY - rect.top&ndash;&gt;-->

<!--&lt;!&ndash;    // 获取鼠标位置的像素数据&ndash;&gt;-->
<!--&lt;!&ndash;    var pixel = ctx.getImageData(x, y, 1, 1).data&ndash;&gt;-->
<!--&lt;!&ndash;    // 如果像素不是全黑，则打印“原图”&ndash;&gt;-->
<!--&lt;!&ndash;    if (pixel[0] !== 0 || pixel[1] !== 0 || pixel[2] !== 0) {&ndash;&gt;-->
<!--&lt;!&ndash;      console.log('原图')&ndash;&gt;-->
<!--&lt;!&ndash;      if (!canvasRef.value.classList.contains('zoomed')) {&ndash;&gt;-->
<!--&lt;!&ndash;        canvasRef.value.classList.add('zoomed')&ndash;&gt;-->
<!--&lt;!&ndash;      }&ndash;&gt;-->
<!--&lt;!&ndash;    } else {&ndash;&gt;-->
<!--&lt;!&ndash;      if (canvasRef.value.classList.contains('zoomed')) {&ndash;&gt;-->
<!--&lt;!&ndash;        canvasRef.value.classList.remove('zoomed')&ndash;&gt;-->
<!--&lt;!&ndash;      }&ndash;&gt;-->
<!--&lt;!&ndash;    }&ndash;&gt;-->
<!--&lt;!&ndash;  })&ndash;&gt;-->
<!--&lt;!&ndash;  processMaskImage() // 处理第二个canvas&ndash;&gt;-->
<!--&lt;!&ndash;})&ndash;&gt;-->
<!--&lt;!&ndash;</script>&ndash;&gt;-->

<!--&lt;!&ndash;<template>&ndash;&gt;-->
<!--&lt;!&ndash;  <div class="container">&ndash;&gt;-->
<!--&lt;!&ndash;    <canvas ref="canvasRef" class="z-20" />&ndash;&gt;-->
<!--&lt;!&ndash;    <canvas ref="canvasRef2" class="z-30" />&ndash;&gt;-->
<!--&lt;!&ndash;    <img :src="originpic" alt="Background Image" class="w-full blur-sm" />&ndash;&gt;-->
<!--&lt;!&ndash;  </div>&ndash;&gt;-->
<!--&lt;!&ndash;</template>&ndash;&gt;-->

<!--&lt;!&ndash;<style lang="scss" scoped>&ndash;&gt;-->
<!--&lt;!&ndash;.container {&ndash;&gt;-->
<!--&lt;!&ndash;  position: relative;&ndash;&gt;-->
<!--&lt;!&ndash;  width: fit-content;&ndash;&gt;-->
<!--&lt;!&ndash;  margin: 1em auto;&ndash;&gt;-->
<!--&lt;!&ndash;}&ndash;&gt;-->

<!--&lt;!&ndash;canvas,&ndash;&gt;-->
<!--&lt;!&ndash;.background-img {&ndash;&gt;-->
<!--&lt;!&ndash;  position: absolute;&ndash;&gt;-->
<!--&lt;!&ndash;  top: 0;&ndash;&gt;-->
<!--&lt;!&ndash;  left: 0;&ndash;&gt;-->
<!--&lt;!&ndash;  display: block;&ndash;&gt;-->
<!--&lt;!&ndash;}&ndash;&gt;-->

<!--&lt;!&ndash;.Background-Img {&ndash;&gt;-->
<!--&lt;!&ndash;  z-index: -1; // 确保图片位于画布后方&ndash;&gt;-->
<!--&lt;!&ndash;}&ndash;&gt;-->

<!--&lt;!&ndash;canvas {&ndash;&gt;-->
<!--&lt;!&ndash;  display: block;&ndash;&gt;-->
<!--&lt;!&ndash;  transition: transform 0.3s ease; // 平滑变换效果&ndash;&gt;-->
<!--&lt;!&ndash;  transform-origin: center; // 从中心放大&ndash;&gt;-->
<!--&lt;!&ndash;}&ndash;&gt;-->

<!--&lt;!&ndash;.zoomed {&ndash;&gt;-->
<!--&lt;!&ndash;  transform: scale(1.5); // 放大至1.2倍&ndash;&gt;-->
<!--&lt;!&ndash;}&ndash;&gt;-->
<!--&lt;!&ndash;</style>&ndash;&gt;-->
