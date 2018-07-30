<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-tickets"></i> 平台设置</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
    <table>
        <tr>
            <td>
            <el-form ref="form" :model="form" label-width="80px">
                <div style="color: red">（重要）请设置您的收款二维码。此设置将在用户移动端支付时显示并使用。</div>
                <div style="margin-top: 40px;margin-bottom: 20px;color: #20a0ff">微信收款二维码</div>
                <v-img-upload @cropImg = "cropImg" ref="wxplay" type = "wxplay" :defaultSrc = "form.wxplay"></v-img-upload>
                <div style="margin-top: 40px;margin-bottom: 20px;color: #20a0ff">支付宝收款二维码</div>
                <v-img-upload @cropImg = "cropImg" ref="zfbplay" type = "zfbplay" :defaultSrc = "form.zfbplay"></v-img-upload>

                <div style="margin-top: 40px;margin-bottom: 20px;color: #20a0ff">设置咨询方式</div>
                <el-form-item label="手机号">
                    <el-input type="number" maxlength = '11' min="0"  v-model="form.phone"></el-input>
                </el-form-item>
                <el-form-item label="联系方式" >
                    <el-input v-model="form.other" placeholder="如：微信号:XXX，QQ:XXX，微博等:XXX"></el-input>
                </el-form-item>

                <div style="text-align: -webkit-right ">
                    <el-button type="primary" @click="saveEdit" >确定</el-button>
                    <el-button >取消</el-button>
                </div>
            </el-form>
            </td>
            <td style="padding-left: 200px;"><div>移动端显示事例：</div>
                <div><img  style="height: 600px;margin-top: 10px" src="../../assets/qrcode-play.png"/></div>
            </td>
        </tr>
    </table>
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
                    zfbplay: '',//支付宝
                    phone: '',
                    other: ''
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
                let userInfo = JSON.parse(localStorage.getItem(com.x_userinfoPC));
                this.form.wxplay = userInfo.play1;
                this.form.zfbplay = userInfo.play2;
                this.form.phone = userInfo.phone;
                this.form.other = userInfo.other;
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
                if(!this.form.wxplay && !this.form.zfbplay){
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
                        "userPhone": this.form.phone,
                        "other": this.form.other,
                    },
                    success: (res) => {
                        if (res && res.code > 0) {
                            let user = {
                                play1 : this.form.wxplay,
                                play2 :  this.form.zfbplay,
                               phone : this.form.phone,
                               other : this.form.other,
                            }
                            localStorage.setItem(com.x_userinfoPC,JSON.stringify(user))
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
