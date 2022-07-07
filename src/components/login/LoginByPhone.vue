<template>
    <div class="login-by-phone">
        <el-form
        :model="form"
        ref = 'loginRef'
        label-position="top"
        >
            <el-form-item 
            lable="手机号"
            prop="phone"
            >
                <el-input 
                v-model='form.phone' 
                placeholder="">
                </el-input>
            </el-form-item>
            <el-form-item 
            lable="密码"
            prop="password"
            >
                <el-input 
                v-model='form.password' 
                placeholder="">
                </el-input>
            </el-form-item>
        </el-form>
    </div>
</template>


<script lang="ts" setup>
import {ref, reactive,defineExpose } from 'vue'
import { useRouter } from 'vue-router';
import {doLogin} from '@/api/api_user'

let form = reactive({phone:'18569253739',password:'a745612389',captcha:''})
const router = useRouter()

const login = async ()=>{
    const res = await doLogin(form)
    router.push('/')
}

defineExpose({
    login
})

</script>