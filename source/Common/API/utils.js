import axios from 'axios'
import axiosRetry from 'axios-retry'

axiosRetry(axios, { retries: 3 })

export const getRequest = (url) => axios
  .get(url, {
    responseType: 'text',
    transformResponse: [(data) => data],
  })
  .then((res) => res.data)

export const aaa = () => {}
