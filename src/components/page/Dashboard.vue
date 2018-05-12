<template>
    <div>
        <el-row :gutter="20">
            <!--左边统计信息显示-->
            <el-col :span="16">
                <el-row :gutter="20" class="mgb20">
                    <el-col :span="8">
                        <el-card shadow="hover" :body-style="{padding: '0px'}">
                            <div class="grid-content grid-con-1">
                                <i class="el-icon-time grid-con-icon"></i>
                                <div class="grid-cont-right">
                                    <div>总销售额(元)</div>
                                    <div class="grid-num"
                                         style="font-size: 25px;color: red;padding-left: 5px;padding-right: 5px;">
                                        92,234.45</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                    <el-col :span="8">
                        <el-card shadow="hover" :body-style="{padding: '0px'}">
                            <div class="grid-content grid-con-2">
                                <i class="el-icon-message grid-con-icon"></i>
                                <div class="grid-cont-right">
                                    <div>待处理订单(件)</div>
                                    <div class="grid-num">321</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                    <el-col :span="8">
                        <el-card shadow="hover" :body-style="{padding: '0px'}">
                            <div class="grid-content grid-con-3">
                                <i class="el-icon-goods grid-con-icon"></i>
                                <div class="grid-cont-right">
                                    <div>总销量(件)</div>
                                    <div class="grid-num">76568</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                </el-row>
                <el-card shadow="hover" :body-style="{ height: '334px'}">
                    <div slot="header" class="clearfix">
                        <span>待办事项</span>
                        <el-button style="float: right; padding: 3px 0;font-size: 16px;font-weight: bold" type="text">
                            {{systemTime}}
                        </el-button>
                    </div>
                    <el-table :data="todoList" :show-header="false" height="334" style="width: 100%;font-size:14px;">
                       <!-- <el-table-column width="40">
                            <template slot-scope="scope">
                                <el-checkbox v-model="scope.row.status"></el-checkbox>
                            </template>
                        </el-table-column>-->
                        <el-table-column>
                            <template slot-scope="scope">
                                <div class="todo-item" :class="{'todo-item-del': scope.row.status}">
                                    {{scope.row.title}}
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column width="160">
                            <template slot-scope="scope">
                              <!--  <i class="el-icon-edit"></i>
                                <i class="el-icon-delete"></i>-->
                                <div>2018/02/03 12:32</div>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-card>
            </el-col>
            <!--右边用户信息显示-->
            <el-col :span="8">
                <el-row>
                    <el-col>
                        <el-card shadow="hover" class="mgb20">
                            <div class="user-info">
                                <img src="static/img/img.jpg" class="user-avator" alt="">
                                <div class="user-info-cont">
                                    <div class="user-info-name">{{name}}</div>
                                    <div>{{role}}</div>
                                </div>
                            </div>
                            <div class="user-info-list">上次登录时间：<span>2018-01-01 12:30:30</span></div>
                          <!--  <div class="user-info-list">上次登录地点：<span>杭州</span></div>-->
                        </el-card>
                        <el-card shadow="hover" >
                            <div slot="header" class="clearfix">
                                <span>销量排行(前10)</span>
                            </div>
                            <div style="font-size: 14px">
                             <div>
                                 <span >日本SANA豆乳洗面奶化洗面... </span> <span style="float: right;color: #42b983;">2342件</span>
                             </div>
                            <div>
                                <span>日本SANA豆乳洗面奶化洗面... </span> <span style="float: right;color: #42b983;">2342件</span>
                            </div>
                            <div>
                                <span>日本SANA豆乳洗面奶化洗面... </span> <span style="float: right;color: #42b983;">2342件</span>
                            </div>
                            <div>
                                <span>日本SANA豆乳洗面奶化洗面... </span> <span style="float: right;color: #42b983;">2342件</span>
                            </div>
                            <div>
                                <span>日本SANA豆乳洗面奶化洗面... </span> <span style="float: right;color: #42b983;">2342件</span>
                            </div>
                            <div>
                                <span>日本SANA豆乳洗面奶化洗面... </span> <span style="float: right;color: #42b983;">2342件</span>
                            </div>
                            <div>
                                <span>日本SANA豆乳洗面奶化洗面... </span> <span style="float: right;color: #42b983;">2342件</span>
                            </div>
                            <div>
                                <span>日本SANA豆乳洗面奶化洗面... </span> <span style="float: right;color: #42b983;">2342件</span>
                            </div>
                            <div>
                                <span>日本SANA豆乳洗面奶化洗面... </span> <span style="float: right;color: #42b983;">2342件</span>
                            </div>
                            <div>
                                <span>日本SANA豆乳洗面奶化洗面... </span> <span style="float: right;color: #42b983;">2342件</span>
                            </div>
                            </div>
                          <!--    <el-progress :percentage="57.2" color="#42b983"></el-progress>-->
                          <!--   <el-progress :percentage="29.8" color="#f1e05a"></el-progress>-->
                           <!-- <el-progress :percentage="11.9"></el-progress>-->
                           <!-- <el-progress :percentage="1.1" color="#f56c6c"></el-progress>-->
                        </el-card>
                    </el-col>
                </el-row>
            </el-col>

        </el-row>
    </div>
</template>

<script>
    import {showLocale} from '../common/DateUtils.js'
    export default {
        data() {
            return {
                name: localStorage.getItem('ms_username'),
                systemTime: '',
                todoList: [
                    {
                        title: '今天要修复100个bug',
                        status: false,
                    },
                    {
                        title: '今天要修复100个bug',
                        status: false,
                    },
                    {
                        title: '今天要写100行代码加几个bug吧',
                        status: false,
                    }, {
                        title: '今天要修复100个bug',
                        status: false,
                    },
                    {
                        title: '今天要修复100个bug',
                        status: true,
                    },
                    {
                        title: '今天要写100行代码加几个bug吧',
                        status: true,
                    },
                    {
                        title: '今天要写100行代码加几个bug吧',
                        status: true,
                    },
                    {
                        title: '今天要写100行代码加几个bug吧',
                        status: true,
                    },
                    {
                        title: '今天要写100行代码加几个bug吧',
                        status: true,
                    },
                    {
                        title: '今天要写100行代码加几个bug吧',
                        status: true,
                    },
                    {
                        title: '今天要写100行代码加几个bug吧',
                        status: true,
                    },
                ]
            }
        },
        computed: {
            role() {
                return this.name === 'admin' ? '超级管理员' : '普通用户';
            }
        },
        created(){
            this.systemTime = showLocale(new Date());
            let self = this
            setInterval(function () {
                self.systemTask()
            }, 1000);
        },
        mounted() {
        },
        methods:{
            systemTask(){
                let today = new Date();
                this.systemTime  = showLocale(today);
            }
        }
    }

</script>


<style scoped>
    .user-info-name {
        margin-bottom: 10px;
    }

    .grid-content {
        display: flex;
        align-items: center;
        height: 100px;
    }

    .grid-cont-right {
        flex: 1;
        text-align: center;
        font-size: 12px;
        color: #999;
    }

    .grid-num {
        font-size: 30px;
        font-weight: bold;
    }

    .grid-con-icon {
        font-size: 50px;
        width: 100px;
        height: 100px;
        text-align: center;
        line-height: 100px;
        color: #fff;
    }

    .grid-con-1 .grid-con-icon {
        background: rgb(45, 140, 240);
    }

    .grid-con-1 .grid-num {
        color: rgb(45, 140, 240);
    }

    .grid-con-2 .grid-con-icon {
        background: rgb(100, 213, 114);
    }

    .grid-con-2 .grid-num {
        color: rgb(45, 140, 240);
    }

    .grid-con-3 .grid-con-icon {
        background: rgb(242, 94, 67);
    }

    .grid-con-3 .grid-num {
        color: rgb(242, 94, 67);
    }

    .user-info {
        display: flex;
        align-items: center;
        padding-bottom: 20px;
        border-bottom: 1px solid #f3f3f3;
        margin-bottom: 20px;
    }

    .user-avator {
        width: 120px;
        height: 120px;
        border-radius: 50%;
    }

    .user-info-cont {
        padding-left: 20px;
        flex: 1;
        font-size: 14px;
        color: #999;
    }

    .user-info-cont div:first-child {
        font-size: 24px;
        color: #222;
    }

    .user-info-list {
        font-size: 14px;
        color: #999;
        line-height: 25px;
    }

    .user-info-list span {
        margin-left: 10px;
    }

    .mgb20 {
        margin-bottom: 20px;
    }

    .todo-item {
        font-size: 14px;
    }


</style>
