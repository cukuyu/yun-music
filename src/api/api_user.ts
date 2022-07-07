import get from '@/service/get'

export const getQrKey = () => get('/login/qr/key', { timestamp: Date.now() })

export const createQr = (key: string, qrimg = true) =>
  get('/login/qr/create', { key, qrimg, timestamp: Date.now() })

export const checkQr = (key: string) => get('/login/qr/check', { key, timestamp: Date.now() })

export const getAccount = () => get('/user/account', { timestamp: Date.now() })

export const loginOut = () => get('/logout', { timestamp: Date.now() })

export const getUserPlayList = (uid: number, offset = 0, limit = 50) => get('/user/playlist', { uid, offset, limit, timestamp: Date.now() })


export const doLogin = ({ phone, password, captcha }: { phone: string, password: string, captcha?: string }) =>
  get('/login/cellphone', { phone, password, captcha, timestamp: Date.now() })


export const doUserDetail = (uid: number) => get('/user/detail', { uid, timestamp: Date.now() })


export const doVipInfo = ()=>get('/vip/info', {timestamp: Date.now() })

///user/subcount

