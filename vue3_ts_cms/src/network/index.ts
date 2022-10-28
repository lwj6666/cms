import HttpRequest from "./request"
import { BASE_URL, TIME_OUT } from "./request/config"

const httpRequest = new HttpRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  method: "GET",
  interceptors: {
    requestinterceptors(config) {
      // 携带token拦截
      const token = ""
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }

      console.log("请求成功")
      return config
    },
    requestinterceptorsCatch(error) {
      return error
    },
    responseinterceptors(response) {
      console.log("响应成功")
      return response
    },
    responseinterceptorsCatch(error) {
      return error
    }
  }
})

export default httpRequest
