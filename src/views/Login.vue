<template>
    <div class="login">
        <div class="login-container">
            <div class="login-header">
                <div class="img-wrap" v-show="loginType!=1">
                    <img src="@/assets/img/loginqr.png" alt="" @click="loginType=1">
                    <div class="img-wrap-tip">扫码登录更安全</div>
                </div>
                <div class="off-view-btn">
                    <i class="iconfont icon-off font-24 pointer" @click="store.loginView=false"></i>
                </div>
            </div>
            <div class="login-wrapper">
                <keep-alive>
                    <component :is="currentComponent" ref="loginRef" @toOtherMode="changeType"></component>
                </keep-alive>
            </div>
        </div>
    </div>
</template>


<script lang="ts" setup>

import {ref, reactive, computed, onBeforeUnmount, shallowRef} from 'vue'
import LoginByQr from '@/components/login/LoginByQr.vue'
import LoginByPhone from '@/components/login/LoginByPhone.vue'
import {useMainStore} from '@/store/index'

const store = useMainStore()

let loginRef = ref()
// let isLoading = ref(false)
let loginType = ref(1)
const type = reactive(['手机号','二维码','短信验证码'])
const loginComponent = shallowRef([LoginByPhone, LoginByQr])

let currentComponent = computed (()=>{ return loginComponent.value[loginType.value]})


onBeforeUnmount(()=>{
    store.getAcount()
})

const changeType = (index:number)=>{
    loginType.value = index
}


const doLogin = ()=>{
    loginRef.value.login()
}

</script>

<style lang="scss" scoped>
.login {
    position: fixed;
    top: 20%;
    left: 40%;
    width: 350px;
    height: 530px;
    background-color: #fff;
    z-index: 1000;
    border-radius: 1%;
    box-shadow: 0 0 10px 4px #666;
    .login-container {
        height: 100%;
        .login-header{
            display: flex;
            justify-content: space-between;
            height: 50px;
            .img-wrap{
                // display: none;
                display: flex;
                align-items: center;
                justify-content: center;

                img{
                    height: 50px;
                    width: 50px;
                    clip-path: polygon(0 0, 100% 0, 0 100% );
                    cursor: pointer;
                }
                .img-wrap-tip{
                    position: relative;
                    height: 25px;
                    width: 107px;
                    margin-left: 10px;
                    margin-top: 5px;
                    background-color:#999999;
                    color: #fff;
                    text-align: center;
                    line-height: 25px;
                    font-size: 12px;
                    border-radius: 4%;
                }
                .img-wrap-tip::before{
                    position: absolute;
                    content: "";
                    left: -6px;
                    border: 6px solid transparent;
                    border-top-color: #999999;
                }
            }
            .off-view-btn{
                margin-left: auto;
                line-height: 40px;
                margin-right: 10px;
                color: #a5a5a5;
            }
        }
    }

    // .login-wrapper{
    // }
}
</style>