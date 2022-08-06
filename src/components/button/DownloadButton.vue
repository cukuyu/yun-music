<template>
    <span class="love-wrapper" @click="download">
        <i class="iconfont icon-down pointer">
        </i>
    </span>
</template>




<script lang='ts' setup>
import streamSaver from 'streamSaver'
import { downMusic } from '@/api/api_music'
import { ElMessage } from 'element-plus'
const props = defineProps({
    id: {
        type: Number,
        required: true
    },
    name: {
        type: String
    }
})


const download = async () => {
    const res = await downMusic(props.id)
    console.log('download', res)
    if (res.code != 200) {
        ElMessage.error('下载失败')
    }
    const url = res.data.url
    if (url) {
        let  filename = props.name||"default"
        filename +=  `.${res.data.type}`
        console.log('filename', filename)
        fetch(url, { method: 'GET' }).then(data => {
            const fileStream = streamSaver.createWriteStream(
                filename, {
                size: parseInt(data.headers.get("content-length") as string),
            })


            const readableStream = data.body;
            if (window.WritableStream && readableStream?.pipeTo) {
                return readableStream!.pipeTo(fileStream).then(() => {

                })
            }
            let writer = fileStream.getWriter()
            const reader = data.body!.getReader()
            const pump = () => {
                return reader.read().then(res => {
                     res.done ? writer.close() : writer.write(res.value).then(pump)
                })
            }
            pump()
        })
    }
}

</script>




<style lang='scss' scoped>
</style>