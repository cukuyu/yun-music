<template>
    <div class="login">
        <div class="login-container">
            <div class="login-wrapper">
                <span class="title">{{currentType}}登入</span>
                <div class="type-btn-wrap">
                    <button
                    v-for="(item,index) in type"
                    :key="index"
                    class="no-btn"
                    @click="changeType(index)"
                    :class="{'btn-active' :index===loginType}"
                    >{{item}}</button>
                </div>
                <component :is="currentComponent" ref="loginRef"></component>
                <div class="form-btn-container" v-show="loginType!=1">
                    <div class="btn-bg">
                        <button class="form-btn" @click="doLogin">
                            {{btnText}}
                            <el-icon v-show="isLoading"><i-loading/></el-icon>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script lang="ts" setup>

import {ref, reactive, computed, onBeforeUnmount} from 'vue'
import LoginByQr from '@/components/login/LoginByQr.vue'
import LoginByPhone from '@/components/login/LoginByPhone.vue'
import LoginByCode from '@/components/login/LoginByCode.vue'
import {useMainStore} from '@/store/index'
// import { doLogin } from '@/api/api_user'

const store = useMainStore()

let loginRef = ref()
let isLoading = ref(false)
let loginType = ref()
const type = reactive(['手机号','二维码','短信验证码'])
const loginComponent = reactive([LoginByPhone, LoginByQr, LoginByCode])

let btnText = computed(()=>{return isLoading.value ? '登录中':'登录'})
let currentComponent = computed (()=>{ return loginComponent[loginType.value]})
let currentType = computed(()=>{return type[loginType.value]})


onBeforeUnmount(()=>{
    console.log("onBeforeUnmount")
    store.getAcount()
    console.log("afterBeforeUnmount")
})
const changeType = (newType:number)=>{
    loginType.value  = newType
}

const doLogin = ()=>{
    loginRef.value.login()
}

</script>

<style lang="scss" scoped>
.login {
    width: 100%;
    margin: 0 auto;
    overflow: hidden;
    background-color: #FFF;
    .login-container {
        display: flex;
        height: 100vh;
        justify-content: center;
        align-items: center;
        
    }

    .login-wrapper{
        width: 500px;
        height: 600px;
        background-color: #CCC;
        border-radius: 10px;
        padding: 65px 55px 54px 55px;
    }
}
</style>