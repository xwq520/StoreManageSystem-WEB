<template>
    <div class="login-wrap" :style="pageBg">
        <div class="ms-title" style="margin-top: -177px;color:rgba(0,0,0,.85);font-weight: 600;font-size: 33px">
            嘟嘟微商系统管理平台
            <div style="font-size: 14px;color: rgba(0,0,0,.45);margin-top: 10px;">
                方便，简单，快捷，微店管理平台</div>
        </div>

        <div class="ms-login">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="demo-ruleForm">
                <el-form-item prop="username" >
                    <el-input v-model="ruleForm.username" size="medium" placeholder="用户名" class="input-login"></el-input>
                </el-form-item>
                <el-form-item prop="password" >
                    <el-input type="password" size="medium" style="margin-top: 15px"
                              placeholder="密码"
                              v-model="ruleForm.password"
                              @keyup.enter.native="submitForm('ruleForm')"></el-input>
                </el-form-item>
                <div class="login-btn" >
                    <el-button type="primary" class="input-login" size="medium"
                               @click="submitForm('ruleForm')">登录</el-button>
                </div>
             <!--   <p style="font-size:12px;line-height:30px;color:#999;">Tips : 用户名和密码随便填。</p>-->
            </el-form>
        </div>
    </div>
</template>

<script>
    import {post} from '../common/HttpUtils';
    import {api} from '../common/HttpConfig';

    export default {
        data: function(){
            return {
                ruleForm: {
                    username: '',
                    password: ''
                },
                rules: {
                    username: [
                        { required: true, message: '*请输入用户名', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '*请输入密码', trigger: 'blur' }
                    ]
                },
                pageBg: {
                    backgroundImage: 'url(' + require('../../assets/bg-img.png') + ')',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: '100% 100%'
                }
            }
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        localStorage.setItem('ms_username',this.ruleForm.username);
                      //  this.$router.push('/');
                    } else {
                      //  console.log('error submit!!');
                        return false;
                    }
                });
                if(!this.ruleForm.username || !this.ruleForm.password){
                    return;
                }
                post({
                    url: api.api_user_checkUser,
                    // curPage: 0,
                    data: {
                        userId:this.ruleForm.username,
                        password:this.ruleForm.password
                    },
                    success: (res) => {
                        if (res && res.code > 0) {
                            localStorage.setItem('ms_username',this.ruleForm.username);
                            this.$router.push('/');
                        }else{
                            this.$message.error("登录异常，请确认输入用户与密码是否正确");
                        }
                    },
                    error: (err) => {
                    }
                }
                );

            }
        }
    }
</script>
<style scoped>

    .login-wrap{
        position: relative;
        width:100%;
        height:100%;
    }
    .ms-title{
        position: absolute;
        top:50%;
        width:100%;
        margin-top: -230px;
        text-align: center;
        font-size:30px;
        color: #fff;

    }
    .ms-login{
        position: absolute;
        left:50%;
        top:60%;
        width:300px;
        height:160px;
        margin:-150px 0 0 -190px;
        padding:40px;
        border-radius: 5px;
        background: #fff;
    }
    .login-btn{
        text-align: center;
        margin-top: 35px;
    }
    .login-btn button{
        width:100%;
        height:36px;
    }
</style>
