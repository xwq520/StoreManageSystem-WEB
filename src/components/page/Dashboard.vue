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
                                        {{sumMoney}}</div>
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
                                    <div class="grid-num">{{waritCount}}</div>
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
                                    <div class="grid-num">{{sumCount}}</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                </el-row>
                <el-card shadow="hover" :body-style="{ height: '534px'}">
                    <div slot="header" class="clearfix">
                        <span>待办事项(前15)</span>
                        <el-button style="float: right; padding: 3px 0;font-size: 16px;font-weight: bold" type="text">
                            {{systemTime}}
                        </el-button>
                    </div>
                    <el-table :data="todoList" :show-header="false" height="534">
                        <el-table-column>
                            <template slot-scope="scope">
                                <div class="todo-item" >
                                    {{scope.row.commodityName}} (金额：<span style="color: red">{{scope.row.orderMoney}}</span>{{" 单号：" + scope.row.orderNo}})
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column width="180">
                            <template slot-scope="scope">
                              <!--  <i class="el-icon-edit"></i>
                                <i class="el-icon-delete"></i>-->
                                <i>{{scope.row.orderStatusName}}</i>
                                <div> {{scope.row.orderTime}}</div>
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
                            <div class="user-info-list">便捷，简单，快速，有效个体微商系统管理平台</div>
                            <div class="user-info-list">移动端商店(复制发送手机)：
                                <a :href="mobileUrl" target="_blank">
                                    {{mobileUrl}}
                                </a></div>
                        </el-card>
                        <el-card shadow="hover" >
                            <div slot="header" class="clearfix">
                                <span>销量排行(前20)</span>
                            </div>
                            <div style="font-size: 14px">
                             <div v-for="(order,index) in orderVolumeList" style="border-bottom: 1px solid #d2d7da70; margin-bottom: 5px;padding-bottom: 5px;">
                                 <span >{{order.commodityName}}</span> <span>{{order.commodityNo}}</span>
                                 <span style="float: right;color: #eaac0d;">{{order.countNum}}件</span>
                             </div>
                                <div style="color: #909399;text-align: -webkit-center" v-show="orderVolumeList.length <=0">
                                    暂无数据
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                </el-row>
            </el-col>

        </el-row>
    </div>
</template>

<script>
    import {showLocale} from '../common/DateUtils.js'
    import {post} from '../common/HttpUtils';
    import {api} from '../common/HttpConfig';
    import {com} from '../common/Contants';
    export default {
        data() {
            return {
                name: localStorage.getItem('ms_username'),
                systemTime: '',
                todoList: [],
                orderVolumeList:[],
                sumCount:'0',
                sumMoney:'0.00',
                waritCount:'0',
                mobileUrl:''
            }
        },
        computed: {
            role() {
                return this.name.indexOf(com.roleKey)>=0 ? '超级管理员' : '嘟嘟用户';
            }
        },
        watch:{
            // refresh page datas
            $route(newValue, oldValue){
                if(newValue.fullPath === '/dashboard'){
                    let self = this
                   setTimeout(function () {
                       self.initDatas();
                   },100)
                }
            }
        },
        created(){
            this.systemTime = showLocale(new Date());
            let self = this
            setInterval(function () {
                self.systemTask()
            }, 1000);
            this.initDatas();
            let ms_usercodekey = localStorage.getItem('ms_usercodekey');

            this.mobileUrl = com.mobileUrl + ms_usercodekey + '#/wecome';
        },
        mounted() {
        },
        methods:{
            systemTask(){
                let today = new Date();
                this.systemTime  = showLocale(today);
            },
            initDatas(){
                post({
                    url: api.api_home_list,
                   // curPage: 0,
                     data: {},
                    success: (res) => {
                        if (res && res.code > 0) {
                            this.todoList = res.orderList;
                            //this.total = res.total;
                        }
                    },
                    error: (err) => {
                    }
                    }
                );
                post({
                    url: api.api_home_count,
                    // curPage: 0,
                    data: {},
                    success: (res) => {
                        if (res && res.code > 0) {
                            let orderHomeDTO = res.orderHomeDTO;
                            this.sumCount = orderHomeDTO.sumCount;
                            this.sumMoney = orderHomeDTO.sumMoney;
                            this.waritCount = orderHomeDTO.waritCount;
                        }
                    },
                    error: (err) => {
                    }
                }
                );
                post({
                    url: api.api_home_volume,
                    // curPage: 0,
                    data: {},
                    success: (res) => {
                        if (res && res.code > 0) {
                            this.orderVolumeList = res.orderVolumeList;
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
        color: #eaac0d;
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
