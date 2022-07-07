import axios from 'axios'

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
axios.defaults.timeout = 10000
axios.defaults.baseURL = 'https://netease-cloud-music-api-theta-nine-20.vercel.app'

export default function (url: string, params?: Object) {
  return axios
    .get(url, { params })
    .then((res) => res.data)
    .catch((err) => err)
}
