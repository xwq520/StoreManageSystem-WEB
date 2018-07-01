<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-tickets"></i> 订单管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <!--商品头部-->
        <div class="container">
            <div class="handle-box">
                <el-select v-model="select_status" placeholder="订单状态" size="small" clearable >
                    <el-option
                        v-for="item in orderStatus"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
                <el-input v-model="select_word" placeholder="筛选关键词 如：商品名称，收货地址" class="handle-input mr10"></el-input>
                <el-button type="primary" class="el-icon-search"  @click="search"></el-button>
            </div>
            <el-table :data="tableData" border style="width: 100%"  @selection-change="handleSelectionChange">
                <el-table-column prop="orderNo" label="订单编号" fixed width="170">
                </el-table-column>
                <el-table-column prop="orderTime" label="下单时间" sortable  width="150">
                </el-table-column>

                <el-table-column prop="commodityName" label="商品名称" width="250">
                </el-table-column>
                <el-table-column prop="commodityNo" label="商品编号" width="170">
                </el-table-column>
              <!--  <el-table-column prop="name" label="用户"   width="120">
                </el-table-column>
                <el-table-column prop="date" label="手机号"   width="120">
                </el-table-column>-->
                <el-table-column prop="purchaseQuantity" label="购买数量" width="100">
                </el-table-column>
                <el-table-column prop="orderMoney" label="订单金额" sortable width="100">
                </el-table-column>
                <el-table-column prop="address" label="收货地址" width="300">
                </el-table-column>
                <el-table-column prop="orderStatusName" label="订单状态"  width="100">
                </el-table-column>
                <el-table-column prop="playTime" label="支付时间"  width="150">
                </el-table-column>
                <el-table-column prop="shipmentsTime" label="发货时间"  width="150">
                </el-table-column>
                <el-table-column prop="cancelTime" label="取消订单时间"  width="150">
                </el-table-column>
               <!-- <el-table-column prop="date" label="操作者"   width="100">
                </el-table-column>
                <el-table-column prop="date" label="操作时间"   width="150">
                </el-table-column>-->
                <el-table-column label="操作"  fixed="right">
                    <template slot-scope="scope">
                     <!--   <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>-->
                        <el-button size="small" @click="goEditDetail(scope.$index, scope.row)">编辑</el-button>
                   <!--     <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>-->
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination @current-change="handleCurrentChange" layout="prev, pager, next" :total="total" :page-size="pageSize">
                </el-pagination>
            </div>
        </div>

        <!--商品详情 编辑弹出框 -->
        <el-dialog title="新增/编辑" :visible.sync="editVisible" width="55%" :before-close="handleClose">
            <div>
                <div class="container">
                    <div class="form-box">
                        <el-form ref="form" :model="form" label-width="80px">
                            <el-form-item label="标题" required>
                                <el-input v-model="form.name"></el-input>
                            </el-form-item>
                            <el-form-item label="子标题" required>
                                <el-input v-model="form.name"></el-input>
                            </el-form-item>

                            <el-form-item label="选择器" required>
                                <el-select v-model="form.region" placeholder="请选择">
                                    <el-option key="bbk" label="步步高" value="bbk"></el-option>
                                    <el-option key="xtc" label="小天才" value="xtc"></el-option>
                                    <el-option key="imoo" label="imoo" value="imoo"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="日期时间" required>
                                <el-col :span="11">
                                    <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
                                </el-col>
                                <el-col class="line" :span="2">-</el-col>
                                <el-col :span="11">
                                    <el-time-picker placeholder="选择时间" v-model="form.date2" style="width: 100%;"></el-time-picker>
                                </el-col>
                            </el-form-item>
                            <el-form-item style="margin-top: 20px;text-align: right">
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

    import {post} from '../common/HttpUtils';
    import {api} from '../common/HttpConfig';
    import {com} from '../common/Contants';
    export default {
        components:{

        },
        data() {
            return {
                url: './static/vuetable.json',
                tableData: [],
                cur_page: 1,
                multipleSelection: [],
                select_status: '',
                select_word: '',
                editVisible: false,
                form: {
                    orderTime: '',
                    commodityName: '',
                    address: '',
                    purchaseQuantity:'',// 购买数量
                    orderMoney: '',
                    orderStatus: '',
                    playTime: '',//支付时间
                    shipmentsTime: '',//发货时间
                    cancelTime: '',
                },
                orderStatus: [{
                    value: 1,
                    label: '待支付'
                }, {
                    value: 2,
                    label: '已支付（待发货）'
                }, {
                    value: 3,
                    label: '已发货'
                }, {
                    value: 4,
                    label: '已取消订单'
                }],
                idx: -1,
                total: 0,
                pageSize: com.x_pagination_size,
            }
        },
        created() {
            this.getData({});
        },
        methods: {
            // 分页导航
            handleCurrentChange(val) {
                this.cur_page = val;
                this.getData({});
            },
            // 获取 easy-mock 的模拟数据
            getData(parms) {
                post({
                url: api.api_order_list,
                curPage: this.cur_page,
                data: parms,
                success: (res) => {
                    if (res && res.code > 0) {
                        this.tableData = res.orderList;
                        this.total = res.total;
                    }
                },
                error: (err) => {
                }
                }
                );
            },
            search() {
                this.tableData = []
                this.cur_page = 1
                this.getData({"orderStatus":this.select_status,"searchContant":this.select_word});
            },

            goEditDetail(index, row) {
               // alert(row.name)
              //  this.$router.push({name:'/goodsDetails',params:{"row":row}});
                this.idx = index;
                const item = this.tableData[index];
                this.form = {
                    name: item.name,
                    date: item.date,
                    address: item.address
                }
                this.editVisible = true;
            },

            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            // 保存编辑
            saveEdit() {
                this.$set(this.tableData, this.idx, this.form);
                this.editVisible = false;
                this.$message.success(`修改第 ${this.idx+1} 行成功`);
            },
            // 确定删除
            deleteRow(){
                this.tableData.splice(this.idx, 1);
                this.$message.success('删除成功');
                this.delVisible = false;
            },
            handleClose(done) {
                this.$confirm('编辑中，确定关闭吗？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    center: true
                }).then(() => {
                    done();
                }).catch(() => {
                    this.$message({
                    type: 'warning',
                    message: '已取消'
                   });
               });
            },
        }
    }

</script>

<style scoped>
    .handle-box {
        margin-bottom: 20px;
    }

    .handle-select {
        width: 120px;
    }

    .handle-input {
        width: 300px;
        display: inline-block;
    }
    .del-dialog-cnt{
        font-size: 16px;
        text-align: center
    }
</style>
