
// 全局指令
export default  (app:any) => {
    // 图片懒加载指令
    app.directive('lazyLoad', {
      mounted (el:any, binding:any) { //
        const observer = new IntersectionObserver(([{ isIntersecting }]) => {
          if (isIntersecting) { // isIntersecting判断是否进入视图
            observer.unobserve(el) // 进入视图后，停止监听
            // el.onerror = () => { // 加载失败显示默认图片
            //     el.src = '/img/a.jpg'
            // }
            const img = new Image();
            img.src = binding.value
            img.onload = function() {
                //图片加载完成后
                el.src = img.src;
            }
            el.src = 'src/assets/img/img-loading.gif' // 进入视图后，加载图片
          }
        }, {
          threshold: 0.01 // 当图片img元素占比视图0.01时 el.src = '@/assets/img/img-loading.png'
        })
        observer.observe(el) //观察指令绑定的dom
      }
    })
}
  