import { ref } from 'vue'

const drawVideo = (vdo) => {
  return new Promise((resolve) => {
    const cvs = document.createElement('canvas')
    const ctx = cvs.getContext('2d')
    cvs.width = vdo.videoWidth
    cvs.height = vdo.videoHeight
    ctx.drawImage(vdo, 0, 0, cvs.width, cvs.height)
    cvs.toBlob((blob) => {
      resolve({
        blob,
        url: URL.createObjectURL(blob)
      })
    })
  })
}

class BlobUtils {
  // 将 Blob URL 转换为 Data URL
  static blobUrlToDataUrl(blobUrl) {
    const dataUrl = ref('')

    fetch(blobUrl)
      .then((response) => response.blob())
      .then((blob) => {
        const reader = new FileReader()
        reader.onload = () => {
          dataUrl.value = reader.result
        }
        reader.readAsDataURL(blob)
      })
      .catch((error) => console.error('Blob URL 转换为 Data URL 失败:', error))

    return dataUrl
  }

  static captureFrame(vdoFile, time = 0) {
    return new Promise((resolve) => {
      const vdo = document.createElement('video')

      vdo.currentTime = time
      vdo.muted = true
      vdo.autoplay = true
      vdo.oncanplay = async () => {
        const frame = await drawVideo(vdo)
        resolve(frame)
      }
      vdo.src = URL.createObjectURL(vdoFile)
    })
  }
}

export default BlobUtils
