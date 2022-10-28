import { createApp } from "vue"

import App from "./App.vue"
import router from "./router"
import { createPinia } from "pinia"

import httpRequest from "./network"

import "element-plus/theme-chalk/index.css"

interface DataType {
  data: any
  returnCode: string
  success: boolean
}

httpRequest
  .request<DataType>({
    url: "/home/multidata",
    interceptors: {
      requestinterceptors(config) {
        console.log(1)
        return config
      },
      responseinterceptors(response) {
        console.log(2)
        return response
      }
    }
  })
  .then((res) => {
    console.log(res)
    console.log(res.data)
    console.log(res.returnCode)
    console.log(res.success)
  })

const pinia = createPinia()
const app = createApp(App)
app.use(pinia).use(router)

app.mount("#app")
