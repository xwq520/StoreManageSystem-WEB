<template>
    <div>
        <div class="container1" >
            <div class="crumbs">
                <el-breadcrumb separator="/">
                    <el-breadcrumb-item>宝贝详情</el-breadcrumb-item>
                </el-breadcrumb>
            </div>
            <mavon-editor
                          v-model="html"
                          placeholder="输入商品详情，此内容将在移动端里显示商品详情描述"
                          ref="md" @imgAdd="$imgAdd" @change="change" />
        </div>
    </div>
</template>

<script>
    import { mavonEditor } from 'mavon-editor'
    import 'mavon-editor/dist/css/index.css'
    export default {
        props:{
            defaultValue: {
                type: String,
                default: ''
            }
        },
        data: function(){
            return {
                html:this.defaultValue,
                configs: {
                }
            }
        },
        components: {
            mavonEditor
        },
        created(){
         // this.html = this.defaultValue
        },
        methods: {
            // 将图片上传到服务器，返回地址替换到md中
            $imgAdd(pos, $file){
               var formdata = new FormData();
                formdata.append('file', $file);
                // 这里没有服务器供大家尝试，可将下面上传接口替换为你自己的服务器接口
                this.$axios({
                    url: '/api/commodity/mediaFiles',
                    method: 'post',
                    data: formdata,
                    headers: { 'Content-Type': 'multipart/form-data' },
                }).then((data) => {
                    console.log(data);
                    let url = '';
                    if(data.data.code*1 > 0 ){
                        url = data.data.mediaFiles.filePath;
                    }
                    this.$refs.md.$img2Url(pos, url);
                })
            },
            change(value, render){
                // render 为 markdown 解析后的结果
                this.html = render;
                this.$emit("change",{render:render,value:value})
            },
            submit(){
               // console.log(this.content);
               // console.log(this.html);
              //  this.$message.success('提交成功！');
            }
        }
    }
</script>
<style scoped>
</style>
