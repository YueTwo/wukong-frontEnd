import api from '@/utils/request.js'

const result = (data) => {
  return {
    code: 200,
    msg: '成功',
    data: data,
    map: null
  }
}

/**
 * 根据分类获取参数
 * @param mode  操作模式：generation（生成），detection（检测），replace（替换），Transfer（迁移）
 * @param type  媒体类型：image（图片），video（视频）
 * @returns Promise对象
 */
export const getModelMenu = (mode, type) => {
  console.log(`根据 ${mode} 模式获取 ${type} 模型菜单`)
  return api.get('/model/menus', {
    params: {
      mode,
      type
    }
  })
}

/**
 * 根据模型id获取模型参数项
 * @param id 操作模式：generation（生成），detection（检测），replace（替换），Transfer（迁移）
 * @returns {{msg: string, code: number, data, map: null}}
 */
export const getModelConfig = (id) => {
  console.log(`获取模型id为 ${id} 的参数`)
  return api.get('/model/config', {
    params: {
      id
    }
  })
}

/**
 * 根据类型获取历史记录表
 * @param mode
 * @returns {{msg: string, code: number, data, map: null}}
 */
export const getHistory = (mode) => {
  console.log(`根据 ${mode} 类型获取历史记录表`)
  return api.get('/model/histories', {
    params: {
      mode
    }
  })
}

/**
 * 获取检测记录
 * @param mode  操作模式：generation（生成），detection（检测），replace（替换），Transfer（迁移）
 * @param type  媒体类型：image（图片），video（视频），检测：boolOnly mask multiple
 * @param id
 * @returns {{msg: string, code: number, data, map: null}}
 */
export const getModelSessionDetail = (mode, type, id) => {
  console.log(`获取 ${mode} 模式下，${type}类型，id为 ${id} 的详细记录`)

  return api.get('/model/sessionDetail', {
    params: {
      mode,
      type,
      id
    }
  })
}

/**
 * 文生图/视频上传请求
 * @param type
 * @param content
 * @param model
 * @param config
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export const postModeGeneration = (type, content, model, config) => {
  console.log(`发送上传请求：\ntype:${type}\ncontent:${content}\nmodel:${model}\nconfig:`, config)

  return api.post('/model/generation', {
    type,
    content,
    model,
    config
  })
}

/**
 * 发送检测上传请求
 * @param type  媒体类型
 * @param model 模型名字
 * @param address 文件的下载地址
 */
export const postModelDetection = (type, model, address) => {
  console.log(`发送检测请求：type=${type},model=${model},address=${address}`)
  return api.post('/model/detection', {
    type,
    model,
    address
  })
}

export const postModelReplace = (type, address, origin_section, target_section) => {
  console.log(
    `发送检测请求：type=${type},address=${address},origin_section=${origin_section},target_section=${target_section}`
  )
  return api.post('model/replace', {
    type,
    address,
    origin_section,
    target_section
  })
}

export const postModelTransfer = (type, url, style) => {
  console.log(`发送检测请求：type=${type},url=${url},style=${style}`)
  return api.post('/model/transfer', {
    type,
    url,
    style
  })
}
