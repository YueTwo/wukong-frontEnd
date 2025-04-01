import request from '@/utils/request.js'

// 获取用户基本信息
export const userGetInfoService = () => request.get('/user/info')

export const postLogin = (form) => request.post('/user/login', form)

export const getHelloWorld = () => request.get('/user/helloworld')

export const getSTS = () => request.get('/user/getkey')
