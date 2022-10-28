import axios from "axios"
import type { AxiosInstance } from "axios"
import type { HttpRequestConfig, HttpRequestinterceptors } from "./type"
import { ElLoading } from "element-plus"

const DEFAULT_LOADING = false

class HttpRequest {
  instance: AxiosInstance
  interceptors?: HttpRequestinterceptors
  showLoading?: boolean //用来判断是否loading展示
  loading?: any //ElLoading.service类型以后深挖找找

  constructor(config: HttpRequestConfig) {
    this.instance = axios.create(config)
    this.interceptors = config.interceptors

    // ??判断前者为null或undifined则用后者,默认用后者
    this.showLoading = config.showLoading ?? false
    // if (config.showLoading) {
    //   this.showLoading = config.showLoading
    // }

    // 从config中取出的拦截器是对应的实例的拦截器
    this.instance.interceptors.request.use(
      this.interceptors?.requestinterceptors,
      this.interceptors?.requestinterceptorsCatch
    )
    this.instance.interceptors.response.use(
      this.interceptors?.responseinterceptors,
      this.interceptors?.responseinterceptorsCatch
    )

    // 添加所有的实例都有的拦截器(全局拦截器)
    this.instance.interceptors.request.use(
      (config) => {
        console.log("全局请求拦截器")
        if (this.showLoading) {
          this.loading = ElLoading.service({
            lock: true,
            text: "正在加载",
            background: "rgba(0,0,0,0.5)"
          })
        }
        return config
      },
      (error) => {
        return error
      }
    )
    this.instance.interceptors.response.use(
      (response) => {
        console.log("全局响应拦截器")

        // 将loading移除
        if (this.showLoading) {
          this.loading?.close()
        }

        // 结构axios的封装,拿出data
        const data = response.data
        return data
      },
      (error) => {
        return error
      }
    )
  }

  request<T>(config: HttpRequestConfig): Promise<T> {
    return new Promise((resolve, reject) => {
      // 将showLoading设置成true
      if (config.showLoading === true) {
        this.showLoading = config.showLoading
      }

      // 单个请求的实现拦截 requestinterceptors
      if (config.interceptors?.requestinterceptors) {
        config = config.interceptors?.requestinterceptors(config)
      }

      this.instance
        .request<any, T>(config)
        .then((response) => {
          if (config.interceptors?.responseinterceptors) {
            response = config.interceptors?.responseinterceptors(response)
          }

          //this.showLoading重新设置回false 这样不会影响下一个请求
          this.showLoading = DEFAULT_LOADING

          console.log(response)
          resolve(response)
        })
        .catch((err) => {
          this.showLoading = DEFAULT_LOADING
          reject(err)
        })
    })
  }

  get<T>(config: HttpRequestConfig): Promise<T> {
    return this.request<T>({ ...config, method: "GET" })
  }

  post<T>(config: HttpRequestConfig): Promise<T> {
    return this.request<T>({ ...config, method: "POST" })
  }

  delete<T>(config: HttpRequestConfig): Promise<T> {
    return this.request<T>({ ...config, method: "DELETE" })
  }

  patch<T>(config: HttpRequestConfig): Promise<T> {
    return this.request<T>({ ...config, method: "PATCH" })
  }
}

export default HttpRequest
