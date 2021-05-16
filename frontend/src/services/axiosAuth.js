import axios from 'axios'
import StorageService from './StorageService'

// Set up default config for http requests here
// Please have a look at here `https://github.com/axios/axios#request- config` for the full list of configs
const axiosAuth = axios.create({
  baseURL: 'http://127.0.0.1:8000',
  headers: {
    'content-type': 'application/json',
  },
})

createConfigInterceptor(axiosAuth)

function createConfigInterceptor(ins) {
  ins.interceptors.request.use(
    (config) => {
      if (StorageService.token) {
        config.headers['Authorization'] = `Bearer ${StorageService.token}`
      }
      return config
    },
    (error) => {
      throw error
    }
  )
}

export default axiosAuth
