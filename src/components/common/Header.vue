<template>
    <div class="header">
        <!-- 折叠按钮 -->
        <div class="collapse-btn" @click="collapseChage">
            <i class="el-icon-info" style="font-size: 44px"></i>
        </div>
        <div class="logo">个人商店管理平台</div>
        <div class="header-right">
            <div class="header-user-con">
                <!-- 全屏显示 -->
                <div class="btn-fullscreen" @click="handleFullScreen">
                    <el-tooltip effect="dark" :content="fullscreen?`取消全屏`:`全屏`" placement="bottom">
                        <i class="el-icon-rank"></i>
                    </el-tooltip>
                </div>
                <!-- 消息中心 -->
                <div class="btn-bell">
                    <el-tooltip effect="dark" :content="message?`有${message}条未读消息`:`消息中心`" placement="bottom">
                        <router-link to="/systemmsg">
                            <i class="el-icon-bell"></i>
                        </router-link>
                    </el-tooltip>
                    <span class="btn-bell-badge" v-if="message"></span>
                </div>
                <!-- 用户头像 -->
                <div class="user-avator"><img src="static/img/img.jpg"></div>
                <!-- 用户名下拉菜单 -->
                <el-dropdown class="user-name"   @command="handleCommand">
                    <span class="el-dropdown-link">
                        {{username}} <i class="el-icon-caret-bottom"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <!--<a href="http://blog.gdfengshuo.com/about/" target="_blank">
                            <el-dropdown-item>关于作者</el-dropdown-item>
                        </a>
                        <a href="https://github.com/lin-xin/vue-manage-system" target="_blank">
                            <el-dropdown-item>项目仓库</el-dropdown-item>
                        </a>-->
                        <el-dropdown-item divided  command="updatePwd"> 修改密码</el-dropdown-item>
                        <el-dropdown-item divided  command="loginout">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
        </div>

        <!-- 修改密码 -->
        <el-dialog title="修改登录密码" :visible.sync="editVisible" width="25%">
            <div>
                <div class="container">
                    <div class="form-box">
                        <el-form ref="form" :model="form" label-width="100px">
                            <el-form-item label="原密码" required>
                                <el-input type="password" v-model="form.password" style="width: 200px"></el-input>
                            </el-form-item>
                            <el-form-item label="新密码" required>
                                <el-input type="password" v-model="form.newPassword"style="width: 200px"></el-input>
                            </el-form-item>
                            <el-form-item label="确认新密码" required>
                                <el-input type="password" v-model="form.comfirmPassword" auto-complete="off"style="width: 200px"></el-input>
                            </el-form-item>
                            <el-form-item style="margin-top: 20px;">
                                <el-button type="primary" @click="saveEdit" >确定</el-button>
                                <el-button @click="editVisible = false" >取消</el-button>
                            </el-form-item>
                        </el-form>
                    </div>
                </div>
            </div>
        </el-dialog>

    </div>
</template>
<script>
    import bus from '../common/bus';
    import {post} from '../common/HttpUtils';
    import {api} from '../common/HttpConfig';
    export default {
        data() {
            return {
                collapse: false,
                fullscreen: false,
                name: '',
                message: 2,
                editVisible:false,
                form: {
                    password: '',
                    newPassword: '',
                    comfirmPassword: '',
                },
            }
        },
        computed:{
            username(){
                let username = localStorage.getItem('ms_username');
                return username ? username : this.name;
            }
        },
        methods:{
            // 用户名下拉菜单选择事件
            handleCommand(command) {
                if(command == 'loginout'){
                    localStorage.removeItem('ms_username')
                    this.$router.push('/login');
                }else if(command == 'updatePwd'){
                    this.form={
                        password: '',
                        newPassword: '',
                        comfirmPassword: '',
                    }
                    this.editVisible = true
                }
            },
            // 侧边栏折叠
            collapseChage(){
                this.collapse = !this.collapse;
                bus.$emit('collapse', this.collapse);
            },
            // 全屏事件
            handleFullScreen(){
                let element = document.documentElement;
                if (this.fullscreen) {
                    if (document.exitFullscreen) {
                        document.exitFullscreen();
                    } else if (document.webkitCancelFullScreen) {
                        document.webkitCancelFullScreen();
                    } else if (document.mozCancelFullScreen) {
                        document.mozCancelFullScreen();
                    } else if (document.msExitFullscreen) {
                        document.msExitFullscreen();
                    }
                } else {
                    if (element.requestFullscreen) {
                        element.requestFullscreen();
                    } else if (element.webkitRequestFullScreen) {
                        element.webkitRequestFullScreen();
                    } else if (element.mozRequestFullScreen) {
                        element.mozRequestFullScreen();
                    } else if (element.msRequestFullscreen) {
                        // IE11
                        element.msRequestFullscreen();
                    }
                }
                this.fullscreen = !this.fullscreen;
            },
            saveEdit(){

                if(!this.form.password || !this.form.newPassword || !this.form.comfirmPassword){
                    this.$message.error('请须输入密码');
                    return;
                }else if(this.form.password == this.form.newPassword){
                    this.$message.error('新密码与原密码不能相同');
                    return;
                }else if(this.form.comfirmPassword != this.form.newPassword){
                    this.$message.error('新密码与确认密码不一致');
                    return;
                }
                post({
                    url: api.api_user_changePassowrd,
                  // curPage: this.cur_page,
                    data: this.form,
                    success: (res) => {
                        if (res && res.code > 0) {
                            this.$message.success(`登录密码修改成功,请重新登录！`);
                            localStorage.removeItem('ms_username')
                            this.$router.push('/login');
                        }else{
                            this.$message.error(res.message);
                        }
                    },
                    error: (err) => {
                      //  this.$message.error(res.massage);
                    }
                }
                );
            }
        }
    }
</script>
<style scoped>
    .header {
        position: relative;
        box-sizing: border-box;
        width: 100%;
        height: 70px;
        font-size: 22px;
        color: #fff;
    }
    .collapse-btn{
        float: left;
        padding: 0 21px;
        cursor: pointer;
        line-height: 84px;
    }
    .header .logo{
        float: left;
        width:250px;
        line-height: 70px;
    }
    .header-right{
        float: right;
        padding-right: 50px;
    }
    .header-user-con{
        display: flex;
        height: 70px;
        align-items: center;
    }
    .btn-fullscreen{
        transform: rotate(45deg);
        margin-right: 5px;
        font-size: 24px;
    }
    .btn-bell, .btn-fullscreen{
        position: relative;
        width: 30px;
        height: 30px;
        text-align: center;
        border-radius: 15px;
        cursor: pointer;
    }
    .btn-bell-badge{
        position: absolute;
        right: 0;
        top: -2px;
        width: 8px;
        height: 8px;
        border-radius: 4px;
        background: #f56c6c;
        color: #fff;
    }
    .btn-bell .el-icon-bell{
        color: #fff;
    }
    .user-name{
        margin-left: 10px;
    }
    .user-avator{
        margin-left: 20px;
    }
    .user-avator img{
        display: block;
        width:40px;
        height:40px;
        border-radius: 50%;
    }
    .el-dropdown-link{
        color: #fff;
        cursor: pointer;
    }
    .el-dropdown-menu__item{
        text-align: center;
    }
</style>
