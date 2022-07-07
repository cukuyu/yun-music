import { ref, watch, nextTick, Ref } from "vue"

export const useAnimation = ()=>{

    // begin: 滑动初始坐标
    // end: 滑动结束坐标
    // scrollDom: 滑动元素
    // timeOfAnimation: 滑动动画持续时间
    const scrollAnimation = (begin:number|null, end:number|null ,scrollDom:HTMLElement|null, timeOfAnimation:number=500)=>{
        if(!begin||!end||!scrollDom) return
        let start:number
        const step = (timestamp:number)=>{
            if(start==undefined) start= timestamp
            const process = timestamp - start
            scrollDom.scrollTop = begin+(end-begin)/(timeOfAnimation/process)
            if(process<=timeOfAnimation){
                window.requestAnimationFrame(step)
            } 
        }
        window.requestAnimationFrame(step)
    }

    //点击clickDom区域外的元素， 隐藏Dom元素
    //clickDom: 要控制的元素
    //show: 控制clickDom的变量
    const clickHidden = (clickDom:Ref<HTMLElement>, show=ref<boolean>())=>{
        const addClickListener = ()=>{
            //nextTick保证clickDom不为空
            nextTick(()=>{   
                const closeLayer = (e:Event)=>{
                    if(!clickDom.value) return
                    //如果点击到clickDom元素之外的地方 关闭clickdom元素
                    if(!clickDom.value.contains(e.target as Node)){
                        show.value = false
                    }
                }
                //监听show的变化
                //show==false 关闭clickdom元素删除点击监听
                //show==true 打开clickdom元素添加点击监听
                watch(()=>show.value,(newVal, oldVal)=>{
                    // console.log(val, old)
                    if(newVal && !oldVal){
                        setTimeout(() => {
                            window.addEventListener('click', closeLayer)
                        }, 10)
                    }else if(!newVal && oldVal){
                        window.removeEventListener('click', closeLayer)
                    }
                })
            })
        }
        //如果没有给show参数， 生成一个show参数返回
        if(show.value==null){
            show = ref(false)
            addClickListener()
            return show
        }
        addClickListener()

    }

    return {
        scrollAnimation,
        clickHidden,
    }
   
}



// export default useAnimation