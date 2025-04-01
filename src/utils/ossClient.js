// ossClient.js
import OSS from 'ali-oss' // 假设你已经正确导入了ali-oss

export const getOSSUrl = (fileName) => 'https://cmvclab.oss-cn-beijing.aliyuncs.com/' + fileName

export const getStaticOSSUrl = (fileName) => 'https://cmvclab.oss-cn-beijing.aliyuncs.com/static/' + fileName
let client // 用于缓存OSS客户端实例

export const initOSSClient = async () => {
  try {
    if (client) {
      console.log('返回已存在的oss实例')
      return client // 如果已经初始化过，直接返回现有实例
    }
    console.log('获取新的OSS实例')

    const res = await getSTS() // 假设getSTS是一个异步函数，用于获取STS令牌

    client = new OSS({
      region: 'oss-cn-beijing',
      bucket: 'cmvclab',
      accessKeyId: res.accessKeyId,
      accessKeySecret: res.accessKeySecret,
      stsToken: res.securityToken,
      refreshSTSToken: async () => {
        const refreshToken = await getSTS() // 刷新令牌逻辑
        return {
          accessKeyId: refreshToken.accessKeyId,
          accessKeySecret: refreshToken.accessKeySecret,
          stsToken: refreshToken.securityToken
        }
      }
    })

    return client
  } catch (error) {
    // 在这里处理所有上面try块中发生的错误
    console.error(error.message) // 打印错误信息
    throw error // 可以选择重新抛出错误，让调用者处理
  }
}
