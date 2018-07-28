<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-tickets"></i> 平台设置</el-breadcrumb-item>
            </el-breadcrumb>
        </div>

        <div class="container">
            <div style="color: red">（重要）请在下面图片选择框，设置您个人收款二维码。此设置将在用户支付时使用</div>
            <div style="margin-top: 40px;margin-bottom: 20px;color: #20a0ff">微信收款二维码</div>
            <v-img-upload @cropImg = "cropImg" ref="wxplay" type = "wxplay" :defaultSrc = "form.wxplay"></v-img-upload>
            <div style="margin-top: 40px;margin-bottom: 20px;color: #20a0ff">支付宝收款二维码</div>
            <v-img-upload @cropImg = "cropImg" ref="zfbplay" type = "zfbplay" :defaultSrc = "form.zfbplay"></v-img-upload>
            <div style="text-align: -webkit-right ">
                <el-button type="primary" @click="saveEdit" >确定</el-button>
                <el-button >取消</el-button>
            </div>
        </div>
    </div>
</template>

<script>
    import vImgUpload from "./ImgUpload.vue"
    import {post} from '../common/HttpUtils';
    import {api} from '../common/HttpConfig';
    import {com} from '../common/Contants';

    export default {
        components:{
            "v-img-upload": vImgUpload,
        },
        data() {
            return {
                form: {
                    wxplay: '',//微信支付
                    zfbplay:'',//支付宝
                },
                playType: '',// 1微信支付 2支付宝
            }
        },
        created() {
            this.getData({});
        },
        mounted(){
        },
        methods: {
            // 获取 easy-mock 的模拟数据
            getData(parms) {
                this.form.wxplay = localStorage.getItem(com.play1);
                this.form.zfbplay = localStorage.getItem(com.play2)
            },
            cropImg(data){
                if(data[1] === 'wxplay'){
                    this.form.wxplay = data[0]
                }else if(data[1] === 'zfbplay'){
                    this.form.zfbplay = data[0]
                }
            },
            // 保存编辑
            saveEdit() {
                if(!this.form.wxplay || !this.form.zfbplay){
                    this.$message.error('请上传收款二维码');
                    return;
                }
                let url = api.api_user_update;

                post({
                    url: url,
                    // curPage: this.cur_page,
                    data: {
                        "userId": localStorage.getItem('ms_username'),
                        "play1": this.form.wxplay,
                        "play2": this.form.zfbplay,
                    },
                    success: (res) => {
                        if (res && res.code > 0) {
                            localStorage.setItem(com.play1,this.form.wxplay);
                            localStorage.setItem(com.play2,this.form.zfbplay);
                            this.$message.success(`信息保存成功`);
                        }else{
                            this.$message.error(res.message);
                        }
                    },
                    error: (err) => {
                    }
                })
            },
        }
    }

</script>

<style>
</style>
