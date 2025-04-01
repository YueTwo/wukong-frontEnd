import axios from 'axios'
import { useUserStore } from '@/stores'
// 假设您有一个用于显示消息的组件或函数
import { ElMessage } from 'element-plus'
import router from '@/router/index.js'

const baseURL = '/api'

const instance = axios.create({
  baseURL,
  timeout: 60000
})

// 请求拦截器
instance.interceptors.request.use(
  (config) => {
    const useStore = useUserStore()
    config.headers['Authorization'] = useStore.token
    return config
  },
  (err) => Promise.reject(err)
)

// 响应拦截器
instance.interceptors.response.use(
  (res) => {
    console.log(res.data)

    // 根据后端约定的成功状态码判断请求是否成功
    switch (res.data.code) {
      case 200:
        return res.data.data
      case 401:
        ElMessage.error('身份验证失败，请重新登录')
        router.push('/login')
        break
      case 400:
        ElMessage.error(res.data?.msg)
        break
      case 500:
        ElMessage.error('服务器出错！code：500')
        break
      default:
        ElMessage.error(res.data?.msg || '服务异常')
        break
    }
  },
  (err) => {
    // 处理网络请求失败的情况，如服务器错误(500)
    ElMessage.error(err.message || '服务异常')
    return Promise.reject(err)
  }
)

export default instance
export { baseURL }
