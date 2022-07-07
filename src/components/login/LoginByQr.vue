<template>
    <div class="login-by-qr">
        <div class="msg-wrap">
        打开<a
            style="text-decoration: none; color: blue"
            href="https://music.163.com/#/download"
            target="_blank"
            >网易云客户端
            </a>扫描登录
        </div>
        <div class="img-wrap">
            <img class="img img-h" :src="imgData">
            <div class="btn-refresh pointer" @click="getKey">

            </div>
        </div>
    </div>
</template>


<script lang="ts" setup>
import { reactive, ref, onBeforeUnmount, onMounted } from 'vue'
import { getQrKey, createQr, checkQr, getAccount } from '@/api/api_user'
import {ElMessage} from 'element-plus'
import {useRouter} from 'vue-router'

let key = ref('')
let imgData = ref('')
let qrType = ref('')
let message = ref('')
let timer:number;
const router = useRouter()

const getKey = async () =>{
    const res = await getQrKey()
    if(res.code!=200) return ElMessage.error('获取二维码失败')
    key.value = res.data.unikey
    createImg()
}


async function createImg(){
    const res = await createQr(key.value)
    if(res.code!=200) return ElMessage.error('生成二维码失败')
    imgData.value = res.data.qrimg
    checkCode()
}


async function checkCode(){
    const res = await checkQr(key.value)
    console.log(res)
    qrType.value = res.code
    message.value = res.message
    if(res.code==801||res.code==802){
        timer = window.setTimeout(() => {
          checkCode()
        }, 5000)
    } else if(res.code==803){
        ElMessage.success('登录成功')
        const account = await getAccount()
        console.log(account)
        router.push('/')
    }
}

onMounted(()=>{ getKey()})

onBeforeUnmount(()=>{
    window.clearTimeout(timer)
})

</script>

<style ></style>