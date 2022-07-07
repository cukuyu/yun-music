

//360度环绕
export const pannerNode = (ac:AudioContext)=>{
    const audioPosition = [0, 0, 1]
    const node = new PannerNode(ac, {
        panningModel: "HRTF",  // 音频空间化算法模型
        distanceModel: "linear",  // 远离时的音量衰减算法
        rolloffFactor: 2,  // 衰减速度
        coneInnerAngle: 360, // 声音 360 度扩散
        positionX: audioPosition[0],
        positionY: audioPosition[1],
        positionZ: audioPosition[2],
        maxDistance: 2000,
    })
    let movex:any, movey:any, movez:any
    const autoMove = (axis:number, interval:number, step = 100, maxDistance = 1000)=>{
        const positionAxisx: keyof PannerNode = "positionX"
        const positionAxisy: keyof PannerNode = "positionY"
        const positionAxisz: keyof PannerNode = "positionZ"
        const positionAxisMap= [positionAxisx,positionAxisy,positionAxisz]
        let isAdd = true

        return setInterval(() => {
          if (isAdd && audioPosition[axis] >= maxDistance) {
            isAdd = false;
          } else if (!isAdd && audioPosition[axis] <= -maxDistance) {
            isAdd = true;
          }
          if (isAdd) {
            audioPosition[axis] += step;
          } else {
            audioPosition[axis] -= step;
          }
          node[positionAxisMap[axis]].value = audioPosition[axis]
        }, interval)
  }
    const play =()=>{
        // 沿 x 轴在 -1000 到 1000 之间来回移动
        if(movex) return
        movex = autoMove(0, 500, 100, 1000)
        // 沿 z 轴在 -1000 到 1000 之间来回移动
        movey = autoMove(2, 200, 20, 1000)
        // 沿 y 轴在 -100 到 100 之间来回移动
        movez = autoMove(1, 400, 10, 100)
    }

    const pause=()=>{
        if(movex) {
            clearInterval(movex)
            movex = undefined
        }
        if(movey) {
            clearInterval(movey)
            movey = undefined
        }
        if(movez) {
            clearInterval(movez)
            movez = undefined
        }
    }
    return{
        play,
        pause,
        node,
    }
}