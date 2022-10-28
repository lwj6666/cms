import { AxiosRequestConfig } from "axios"

export interface HttpRequestinterceptors {
  requestinterceptors?: (config: HttpRequestConfig) => HttpRequestConfig
  requestinterceptorsCatch?: (error: any) => any
  responseinterceptors?: (response: any) => any
  responseinterceptorsCatch?: (error: any) => any
}

export interface HttpRequestConfig extends AxiosRequestConfig {
  interceptors?: HttpRequestinterceptors
  showLoading?: boolean //是否显示loading
  headers?: any // 解决一个bug header可能为undifined
}
