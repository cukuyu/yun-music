<template>

    <div>
        <div class="login-by-phone">
            <div class="login-icon-wrap">
                <img src="@/assets/img/loginicon.jpeg" alt="">
            </div>
            <div class="login-form">
                <div class="login-form-item ">
                    <div class="login-form-item-region pointer">
                        <el-icon class="font-16 mleft-10">
                            <Iphone />
                        </el-icon>
                        <div class="font-12 mleft-5">{{ '+' + form.region }}</div>
                        <el-icon class="font-12 mleft-5">
                            <CaretBottom />
                        </el-icon>
                    </div>
                    <input 
                    class="login-form-item-phone" 
                    placeholder="请输入手机号" 
                    v-model="form.phone"
                    @focus="errorMsg = ''"
                    >
                </div>
                <div class="login-form-item" v-show="mode == 'password'">
                    <el-icon class="mleft-10">
                        <Lock />
                    </el-icon>
                    <input 
                    class="login-form-item-password " 
                    placeholder="请输入密码" 
                    type="password"
                    @focus="errorMsg = ''"
                    v-model="form.password">
                </div>
                <div class="login-form-item" v-show="mode == 'code'">
                    <el-icon class="mleft-10">
                        <Key />
                    </el-icon>
                    <input 
                    class="login-form-item-code" 
                    placeholder="请输入验证码" 
                    @focus="errorMsg = ''"
                    v-model="form.captcha"
                    >
                    <div class="v-line">|</div>
                    <div 
                    class="login-form-item-get-code font-12 mleft-10"
                    >
                        <span 
                        class="pointer"  
                        @click="sentCaptcha" 
                        v-show="waitResentCaptchaTime>60">
                            获取验证码
                        </span>
                        <span v-show="waitResentCaptchaTime<=60">
                            {{waitResentCaptchaTime+'s'}}
                        </span>
                    </div>
                </div>
            </div>
            <div class="login-error-msg font-12 mtop-10" v-if="errorMsg.length>0">
                {{errorMsg}}
            </div>
            <div class="login-option font-12 mtop-10">
                <div class="login-option-auto-login" @click="form.autoLogin = !form.autoLogin">
                    <el-icon class="font-12" v-if="form.autoLogin">
                        <Check />
                    </el-icon>
                </div>
                <div class="mleft-5"> 自动登录</div>
                <div class="login-option-forget" v-show="mode == 'password'">
                    <span class="pointer">忘记密码</span>
                    <span class="mleft-5 mright-5">|</span>
                    <span class="pointer" @click="mode = 'code'">验证码登录</span>
                </div>
                <div class="login-option-code" v-show="mode == 'code'">
                    <span class="pointer" @click="mode = 'password'">密码登录</span>
                </div>
            </div>

            <div class="login-btn mtop-20 pointer font-16" @click="login">
                登 录
            </div>

            <div class="login-register  mtop-20 font-14 text-center pointer">
                注册
            </div>

            <div class="login-by-third-app">
                <div class="login-by-weixin">
                </div>
                <div class="login-by-qq">
                </div>
                <div class="login-by-weibo">
                </div>
                <div class="login-by-wangyi">
                </div>
            </div>
        </div>
        <div class="login-pre-protocal font-12 ">
            <div class="login-pre-protocal-check" @click="form.protocalCheck = !form.protocalCheck"
                :class="{ 'login-pre-protocal-check-active': form.protocalCheck }">
                <el-icon v-if="form.protocalCheck">
                    <Check />
                </el-icon>
            </div>
            <span class="cl-color mleft-5">同意</span>
            <span class="cblue-color mleft-5 pointer">《服务条款》</span>
            <span class="cblue-color pointer mleft-5">《隐私条款》</span>
            <span class="cblue-color pointer mleft-5">《儿童隐私条款》</span>
        </div>
    </div>
</template>


<script lang="ts" setup>
import { doLogin, getCaptcha} from '@/api/api_user'
import { ref, reactive } from 'vue'


import { ElMessage } from 'element-plus'
// import { useRouter } from 'vue-router'
import { useMainStore } from '@/store'
// import { Md5 } from 'ts-md5'

//登录模式 password密码登录  code验证码登录
let mode = ref('password')

const store = useMainStore()
// const router = useRouter()
// const md5 = new Md5()

let form = reactive({
    phone: '',
    password: '',
    md5Password: '',
    region: '86',
    autoLogin: false,
    protocalCheck: false,
    captcha:"",
})


// let loginRef = ref()

let errorMsg = ref('')

const checkForm = () => {
    if(!checkPhone()) return false
    
    if(mode.value=='password'){
        if(form.password.length==0){
            errorMsg.value = '请输入密码'
            return false
        }
    }else if(mode.value=='code'){
        console.log('code',/[0-9]{4}$/.test(form.captcha+""))
        console.log('form.captcha',form.captcha)
        if(!/[0-9]{4}$/.test(form.captcha+"")){
            errorMsg.value = '请输入正确的验证码'
            return false
        }
    }

    return true
}


const checkPhone = ()=>{
    if(form.phone.length!=11){
        errorMsg.value = '请输入11位手机号'
        return false
    }
    let reg = /^1(3\d|4[5-9]|5[0-35-9]|6[567]|7[0-8]|8\d|9[0-35-9])\d{8}$/
    if(!reg.test(form.phone)){
        errorMsg.value = '请输入正确的手机号'
        return false
    }
    return true
}

const login = async () => {
    if(!checkForm()) return 
    const res = await doLogin(form)
    if (res.code != 200){
        console.log("login",res)
        errorMsg.value = res.message
        if(errorMsg.value=="Request failed with status code 501"){
            errorMsg.value = '手机号未注册'
        }
        if(errorMsg.value=="Request failed with status code 509"){
            errorMsg.value = '登录次数超出，请等下登录'
        }
        return
    }
    const successOrNo = await store.getAcount()
    if(successOrNo){
        ElMessage.success('登录成功')
        store.loginView = false
    }else{
        ElMessage.error('登录失败')
    }
}
//
const waitResentCaptchaTime = ref(61)
const ResentCaptchaTime = ()=>{

    waitResentCaptchaTime.value = waitResentCaptchaTime.value - 1
    if(waitResentCaptchaTime.value == 0){
        waitResentCaptchaTime.value = 61
        return
    }
    setTimeout(ResentCaptchaTime,1000)
}
const sentCaptcha = async ()=>{
    console.log('seneCaptchaStart')
    if(!checkPhone()) return
    const res = await getCaptcha(form.phone)
    if(res.code!=200) {
        ElMessage.error('获取二维码失败')
        return
    }
    ResentCaptchaTime()
}


defineExpose({
    login
})

</script>


<style lang="scss" scoped>
.login-by-phone {
    width: 260px;
    margin: 0 auto;

    .login-icon-wrap {
        width: 80px;
        height: 80px;
        margin: 0 auto;
        margin-bottom: 40px;
        line-height: 50px;
    }
}

.login-form {
    flex-direction: column;
    width: 260px;
    margin: 0 auto;

    .login-form-item {
        display: flex;
        align-items: center;

        input {
            padding: 0;
            height: 40px;
            border-color: #d9d9d9;
            border-style: solid;
            border-width: 1px;
            line-height: 40px;
            border-radius: 2px;
            text-indent: 10px;

            &:focus {
                outline: 0;
            }
        }

        &-region {
            display: flex;
            align-items: center;
            width: 85px;
            height: 40px;
            border: 1px solid #d9d9d9;
            border-bottom: 0px;
        }

        &-phone {
            width: 175px;
            border-bottom: 0px !important;
            border-left: 0px !important;
        }

        &-password {
            border: 0px !important;
        }

        &-code{
            border: 0px !important;
            width: 130px;
        }

        &:nth-child(2), &:nth-child(3){
            width: 260px;
            border: 1px solid #d9d9d9;
        }
        &-get-code{
            width: 60px;
            height: 40px;
            line-height: 40px;
            text-align: center;
        }
        .v-line{
            color: #e3dde3;
        }
    }
}

.login-error-msg{
    color: #ff3a3a;
}

.login-option {
    display: flex;
    align-items: center;

    &-auto-login {
        height: 14px;
        width: 14px;
        line-height: 14px;
        border: 1px solid #d9d9d9;
        color: #bd3434;
    }

    &-forget {
        margin-left: auto;

        span:nth-child(2n+1) {
            color: #0c73c2;
        }

        span:nth-child(2n) {
            color: #d9d9d9;
        }
    }

    &-code {
        margin-left: auto;

        span {
            color: #0c73c2;
        }
    }

}

.login-btn {
    width: 100%;
    height: 40px;
    color: #fff;
    background-color: #ff3a3a;
    border-radius: 4px;
    line-height: 40px;
    text-align: center;

    &:hover {
        background-color: #e53434;
    }
}

.login-register {
    text-decoration-line: underline;
}

.login-by-third-app {
    display: flex;
    width: 100%;
    height: 40px;
    justify-content: space-between;
    margin-top: 30px;

    div {
        width: 40px;
        height: 40px;
        cursor: pointer;
    }

    .login-by-weixin {
        background: url(@/assets/img/thirdapp.png) no-repeat -150px -670px;
    }

    .login-by-qq {
        background: url(@/assets/img/thirdapp.png) no-repeat -190px -670px;
        // margin-left: 30px;
    }

    .login-by-weibo {
        background: url(@/assets/img/thirdapp.png) no-repeat -230px -670px;
        // margin-left:30px;
    }

    .login-by-wangyi {
        background: url(@/assets/img/thirdapp.png) no-repeat -270px -670px;
        // margin-left: 30px;
    }
}

.login-pre-protocal {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 20px;

    &-check {
        width: 12px;
        height: 12px;
        border: 1px solid #999999;
        border-radius: 3px;
        line-height: 12px;
        color: #fff;
    }

    &-check-active {
        border: none;
        background-color: #ec4141;
    }
}
</style>