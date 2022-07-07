import {ref, Ref, watch, nextTick, computed} from 'vue'
import {pannerNode} from './audioEffect/panner'
import { useMainStore } from '@/store';
import {effectNode} from '@/types/audioEffectType'

//音频控制器
export const useAudio = (audio:Ref<HTMLAudioElement>)=>{
    const store = useMainStore()
    console.log("123345")
    const AudioContext = window.AudioContext ;
    const ac = new AudioContext()
    let gainNode = ac.createGain()
    const effectNodes = [{name:'panner',node:pannerNode}]
    let curNode:any = null
    nextTick(()=>{
       
        //同源策略

        audio.value.crossOrigin = 'anonymous';
        let sourceNode = ac.createMediaElementSource(audio.value)
        sourceNode.connect(gainNode)

        //增益器
        gainNode.connect(ac.destination)
        gainNode.gain.setValueAtTime(0,ac.currentTime)
        //音效器
        watch(()=>store.audioEffect,(val)=>{
            if(curNode!=null){
                curNode.pause()
                curNode.node.disconnect(ac.destination)
                gainNode.connect(ac.destination)
                curNode=null
            }
            for(let i=0;i<effectNodes.length;i++){
                if(effectNodes[i].name==val){
                    curNode = effectNodes[i].node(ac)
                    gainNode.disconnect(ac.destination)
                    gainNode.connect(curNode.node)
                    curNode.node.connect(ac.destination)
                    if(store.play) curNode.play()
                    break
                }
            }
        })
    })


    const play = ()=>{
        //淡入
        ac.resume()
        gainNode.gain.linearRampToValueAtTime(0.5,ac.currentTime+1)
        if(curNode!=null) curNode.play()
        audio.value.play()
    }
    const pause =()=>{
        //淡出
        gainNode.gain.linearRampToValueAtTime(0,ac.currentTime+1)
        setTimeout(()=>{
            if(!store.play){
                audio.value.pause()
                if(curNode!=null) curNode.pause()
            }
        },1000)
    }

    return {
        play,
        pause,
    }
}