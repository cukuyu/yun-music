import axios from 'axios'

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
axios.defaults.timeout = 10000
axios.defaults.baseURL = '/api'

export default function (url: string, params?: Object) {
  return axios
    .get(url, { params })
    .then((res) => res.data)
    .catch((err) => err)
}
