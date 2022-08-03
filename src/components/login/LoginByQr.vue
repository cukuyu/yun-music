<template>
    <div class="login-by-qr" v-loading="loading">
        <div class="msg-wrap text-center font-24">
                扫码登录
        </div>
        <div 
        class="login-qr-container mtop-20 mleft-10" 
        @mouseover="mouseAnimationIn"
        @mouseout="mouseAnimationout" v-if="!qr802">
            <div 
            class="container-phone-img"
            :class="{
                    'container-phone-img-in':animationIn,
                    'container-phone-img-out':!animationIn
                    }"
            >
                <img src="@/assets/img/loginphone.png"/>
            </div>
            <div 
            class="container-qr-img"
            :class="{
                'container-qr-img-in':animationIn,
                'container-qr-img-out':!animationIn
                }"
            >
                <div class="img-wrap text-center">
                    <img  :src="imgData"/>
                    <div class="btn-refresh pointer" @click="refresh" v-show="qrRefresh">
                        <div class="font-12">二维码已失效</div>
                        <button class="btn">点击刷新</button>
                    </div>
                </div>
                <div class="text-center font-12">
                    使用<a
                    style="text-decoration: none; color: blue"
                    href="https://music.163.com/#/download"
                    target="_blank"
                    >网易云APP
                    </a>扫码登录
                </div>
            </div>
        </div>
        <div class="to-other-login-mode text-center pointer" v-if="!qr802">
            <span 
            @mouseover="mouseAnimationIn"
            @mouseout="mouseAnimationout"
            @click="toOtherLoginMode">
                选择其他登录方式 
            </span> 
            <i class="iconfont icon-arrow-right "></i>
        </div>
        <div v-if="qr802" class="login-qr802">
            <div class="login-qr802-img mtop-20">
                <img src="@/assets/img/qr802.png" alt="">
            </div>
            <div class="mtop-20 font-14">
                扫码成功， 请在手机上确认登录
            </div>
        </div>
    </div>
</template>


<script lang="ts" setup>
import { ref, onBeforeUnmount, onMounted, computed } from 'vue'
import { getQrKey, createQr, checkQr } from '@/api/api_user'
import {ElMessage} from 'element-plus'
import {useMainStore} from '@/store'

const store = useMainStore()
let key = ref('')
let imgData = ref('')
let qrType = ref('')
let message = ref('')
let timer:number;

//二维码过期
let qrRefresh = ref(false)

//已扫码
let qr802 = ref(false)

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

let loading = computed(()=>{
    if(imgData.value!=''){
        setTimeout(()=>{animationIn.value=true}, 200)
        setTimeout(()=>{animationIn.value=false}, 5000)
    }
    return imgData.value==''
})




async function checkCode(){
    const res = await checkQr(key.value)
    qrType.value = res.code
    message.value = res.message
    if(res.code==800){
        qrRefresh.value = true
    }
    if(res.code==801||res.code==802){
        if(res.code==802){
            qr802.value = true
        }
        timer = window.setTimeout(() => {
          checkCode()
        }, 5000)
    } else if(res.code==803){
        const successOrNo = await store.getAcount()
        if(successOrNo){
            ElMessage.success('登录成功')
            store.loginView = false
        }else{
            ElMessage.error('登录失败')
            store.loginView = false
        }
    }
}

const refresh = ()=>{
    imgData.value = ''
    qrRefresh.value = false
    getKey()
}



onMounted(()=>{ getKey()})

//控制进出动画
let animationIn = ref(false)

onBeforeUnmount(()=>{
    window.clearTimeout(timer)
})


const mouseAnimationIn = ()=>{
    animationIn.value = true
}


const mouseAnimationout = ()=>{
    animationIn.value = false
}


const emits = defineEmits(['toOtherMode'])

const toOtherLoginMode = ()=>{
    emits('toOtherMode',0)
}


</script>

<style  lang='scss' scoped >
a{
 color:  #0c73c2 !important; 
}

.login-by-qr{
    margin-top: 40px;
    padding: 0 10px;
}


.login-qr-container{
    position: relative;
    height: 240px;
}



.container-phone-img{
    position: absolute;
    height: 130px;
    img{
        height: 240px;
    }
}

.container-qr-img{
    left: 50%;
    transform: translateX(-50%) scale(1.2);
    position: absolute;

    .img-wrap{
        position: relative;

        .btn-refresh{
            position: absolute;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            color: #fff;
	        background-color: rgba(0, 0, 0 ,0.7);

            .btn{
                margin-top: 10px;
                background-color: #0c73c2;
                color: #fff;
                border-radius: 5px;
                font-size: 12px;
                height: 23px;
                padding: 0 5px;
                width: 70px;
            }
        }

    }
}

.container-phone-img-in{
    animation: qr-phone-in 1s;
    animation-fill-mode: forwards;
}
.container-phone-img-out{
    animation: qr-phone-out 1s;
    animation-fill-mode: forwards;
}


.to-other-login-mode{
    margin-top: 60px;
    font-size: 14px;
    color: #666666;
}


.login-qr802{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}

.container-qr-img-in{
    animation: qr-img-in 1s;
    animation-fill-mode: forwards;
}
.container-qr-img-out{
    animation: qr-img-out 1s;
    animation-fill-mode: forwards;
}




@keyframes qr-phone-in{
    from{
        opacity: 0;
        left: 25%;
    }
    to{
        opacity: 1;
        left: 0;
    }
}

@keyframes qr-phone-out{
    from{
        opacity: 1;
        left: 0;
    }
    to{
        opacity: 0;
        left: 25%;
    }
}

@keyframes qr-img-in{
    from{
        height: 170px;
        width: 170px;
        left: 50%;
        top: 0;
        transform: translateX(-50%) scale(1.2)
    }
    to{
        height: 130px;
        width: 130px;
        left: 70%;
        top: 40%;
        transform: translate(-50%,-50%) scale(1)
    }
}

@keyframes qr-img-out{
    from{
        height: 130px;
        width: 130px;
        left: 70%;
        top: 40%;
        transform: translate(-50%,-50%) scale(1)
    }
    to{
        height: 170px;
        height: 170px;
        left: 50%;
        top: 0;
        transform: translateX(-50%,50%) scale(1.2)
    }
}


</style>