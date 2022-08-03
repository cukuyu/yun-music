<template>
    <div class='account-info'>
        <div class="account-info-social">
            <div>
                <div class="font-20 font-bold">0</div>
                <div class="cl-color">动态</div>
            </div>
            <div>
                <div class="font-20 font-bold">1</div>
                <div class="cl-color">关注</div>
            </div>
            <div>
                <div class="font-20 font-bold">0</div>
                <div class="cl-color">粉丝</div>
            </div>
        </div>
        <div class="account-info-sign">
            <button class="btn btn-white"> 
                <el-icon><Coin /></el-icon>
                <span class="mleft-5">签到</span>
            </button>
        </div>
        <div class="font-14">
            <div class="account-info-operate">
                <div class='account-info-operate-item border-top'>
                    <div>
                        <el-icon ><User/></el-icon> 
                        我的会员
                    </div>
                    <el-icon><ArrowRight /></el-icon> 
                </div>
            </div>
            <div class="account-info-operate">
                <div class='account-info-operate-item '>
                    <div>
                        <el-icon><Coin /></el-icon>
                        等级
                    </div>
                    <el-icon><ArrowRight /></el-icon>
                </div>
            </div>
            <div class="account-info-operate">
                <div class='account-info-operate-item'>
                    <div>
                        <el-icon><ShoppingCartFull /></el-icon>
                        商城
                    </div>
                    <el-icon><ArrowRight /></el-icon>
                </div>
            </div>
            <div class="account-info-operate">
                <div class='account-info-operate-item border-top'>
                    <div>
                        <el-icon><Document /></el-icon>
                        个人信息设置
                    </div>
                     <el-icon><ArrowRight /></el-icon>
                </div>
            </div>
            <div class="account-info-operate">
                <div class='account-info-operate-item'>
                    <div>
                        <el-icon><Ship /></el-icon>
                        绑定社交账号
                    </div>
                     <el-icon><ArrowRight /></el-icon>
                </div>
            </div>
            <div class="account-info-operate">
                <div class='account-info-operate-item border-top'>
                    <div>
                        <el-icon><Service /></el-icon>
                        我的客服
                    </div>
                     <el-icon><ArrowRight /></el-icon>
                </div>
            </div>
            <div class="account-info-operate" @click="loginOut">
                <div class='account-info-operate-item border-top'>
                    <div>
                        <el-icon><SwitchButton /></el-icon>
                        退出登录
                    </div>
                </div>
            </div>
        </div>
    </div>
    
</template>




<script lang='ts' setup>
import { ref} from 'vue'
import { useMainStore } from '@/store';
const store = useMainStore()

const loginOut = ()=>{
    store.loginOut()
}

</script>




<style lang='scss' scoped>
.account-info{
    position: absolute;
    z-index: 100;
    top: 38px;
    left: -80px;
    width: 280px;
    height: 415px;
    @include get-class-from-key('c-color');
    @include get-class-from-key('c-bgc');
    @include get-class-from-key('c-color');
    border-radius: 2%;
    @include get-var('box-shadow','0px 0px 4px','cl-color');

    &-social{
        margin-top: 25px;
        display: flex;
        div{
            flex: 1;
            text-align: center;
        }
    }
    &-sign{
        // text-align: center;
        margin: 15px 0;
        .btn-white{
            display: flex;
            justify-content: center;
            align-items: center;
            width: 80px;
            height: 30px;
            margin: 0 auto;
        }
    }
    &-operate{
        padding: 0 15px;
        &:hover {
            @include get-class-from-key('draw-hover-bgc');
        }
        &-item{
            height: 40px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .border-top{
            @include get-var('border-top','','s-border')
        }
    }
}



</style>