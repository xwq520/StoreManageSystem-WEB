<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-tickets"></i> 商品管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <!--商品头部-->
        <div class="container">
            <div class="handle-box">
                <el-button type="primary" icon="delete" class="handle-del mr10" @click="delAll">批量删除</el-button>
                <el-select v-model="select_cate" placeholder="商品状态" clearable class="handle-select mr10">
                    <el-option key="1" label="销售中" value="1"></el-option>
                    <el-option key="2" label="待发布" value="2"></el-option>
                    <el-option key="2" label="已下架" value="3"></el-option>
                </el-select>
                <el-input v-model="select_word" placeholder="筛选关键词" class="handle-input mr10"></el-input>
                <el-button type="primary" class="el-icon-search"  @click="search"></el-button>
                <el-button type="success" class="el-icon-plus"  @click="addGoods"></el-button>
            </div>
            <el-table :data="data" border style="width: 100%" ref="multipleTable" @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55"  fixed="left"></el-table-column>
                <el-table-column prop="name" label="标题"  width="120">
                </el-table-column>
                <el-table-column prop="name" label="子标题"  width="120">
                </el-table-column>
                <el-table-column prop="date" label="原价" sortable width="80">
                </el-table-column>
                <el-table-column prop="date" label="售价" sortable width="80">
                </el-table-column>
                <el-table-column prop="name" label="类型" width="80">
                </el-table-column>
                <el-table-column prop="name" label="生产日期" width="100">
                </el-table-column>
                </el-table-column>
                <el-table-column prop="date" label="保质期限"   width="150">
                </el-table-column>
                <el-table-column prop="date"  label="库存" width="80">
                </el-table-column>
                <el-table-column prop="date" sortable label="销量" width="80">
                </el-table-column>
                <el-table-column prop="name" label="生产厂家" width="150">
                </el-table-column>
                <el-table-column prop="date" label="状态" width="100">
                </el-table-column>
                <el-table-column prop="date" label="操作者"   width="100">
                </el-table-column>
                <el-table-column prop="date" label="操作时间"   width="150">
                </el-table-column>
                <el-table-column label="操作" width="150" fixed="right">
                    <template slot-scope="scope">
                     <!--   <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>-->
                        <el-button size="small" @click="goEditDetail(scope.$index, scope.row)">编辑</el-button>
                        <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination @current-change="handleCurrentChange" layout="prev, pager, next" :total="1000">
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
                            <v-img-upload></v-img-upload>
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
                            <v-goodsinfo-editor ></v-goodsinfo-editor>
                            <el-form-item style="margin-top: 20px;text-align: right ">
                                <el-button type="primary" @click="saveEdit" >确定</el-button>
                                <el-button @click="editVisible = false" >取消</el-button>
                            </el-form-item>
                        </el-form>
                    </div>
                </div>
            </div>

           <!-- <el-form ref="form" :model="form" label-width="100px">
                <el-form-item label="名称" required class="form-items">
                    <el-input v-model="form.name" ></el-input>
                </el-form-item>
                <el-form-item label="日期" >
                    <el-date-picker type="date" placeholder="选择日期"
                                    v-model="form.date" value-format="yyyy-MM-dd" style="width: 36%;"></el-date-picker>
                </el-form-item>
                <el-form-item label="地址"  required class="form-items">
                    <el-input v-model="form.address"></el-input>
                </el-form-item>
                <el-form-item label="活动形式" class="form-items">
                    <el-input type="textarea" v-model="form.address" ></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>-->
        </el-dialog>

        <!-- 删除提示框 -->
        <el-dialog title="提示" :visible.sync="delVisible" width="300px" center>
            <div class="del-dialog-cnt">删除不可恢复，是否确定删除？</div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="delVisible = false">取 消</el-button>
                <el-button type="primary" @click="deleteRow">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import vImgUpload from "./ImgUpload.vue"
    import vGoodsInfoEditor from "./GoodsInfo.vue"
    export default {
        components:{
            "v-img-upload":vImgUpload,
            "v-goodsinfo-editor":vGoodsInfoEditor
        },
        data() {
            return {
                url: './static/vuetable.json',
                tableData: [],
                cur_page: 1,
                multipleSelection: [],
                select_cate: '',
                select_word: '',
                del_list: [],
                is_search: false,
                editVisible: false,
                delVisible: false,
                form: {
                    name: '',
                    date: '',
                    address: ''
                },
                idx: -1
            }
        },
        created() {
            this.getData();
        },
        computed: {
            data() {
                return this.tableData.filter((d) => {
                    let is_del = false;
                    for (let i = 0; i < this.del_list.length; i++) {
                        if (d.name === this.del_list[i].name) {
                            is_del = true;
                            break;
                        }
                    }
                    if (!is_del) {
                        if (d.address.indexOf(this.select_cate) > -1 &&
                            (d.name.indexOf(this.select_word) > -1 ||
                                d.address.indexOf(this.select_word) > -1)
                        ) {
                            return d;
                        }
                    }
                })
            }
        },
        methods: {
            // 分页导航
            handleCurrentChange(val) {
                this.cur_page = val;
                this.getData();
            },
            // 获取 easy-mock 的模拟数据
            getData() {
                // 开发环境使用 easy-mock 数据，正式环境使用 json 文件
                if (process.env.NODE_ENV === 'development') {
                    this.url = '/ms/table/list';
                };
                this.$axios.post(this.url, {
                    page: this.cur_page
                }).then((res) => {
                    this.tableData = res.data.list;
                })
            },
            search() {
                this.is_search = true;
            },
            formatter(row, column) {
                return row.address;
            },
            filterTag(value, row) {
                return row.tag === value;
            },
            handleEdit(index, row) {
                this.idx = index;
                const item = this.tableData[index];
                this.form = {
                    name: item.name,
                    date: item.date,
                    address: item.address
                }
                this.editVisible = true;
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
            // 添加宝贝商品
            addGoods() {
                this.editVisible = true;
            },
            handleDelete(index, row) {
                this.idx = index;
                this.delVisible = true;
            },
            delAll() {
                const length = this.multipleSelection.length;
                let str = '';
                this.del_list = this.del_list.concat(this.multipleSelection);
                for (let i = 0; i < length; i++) {
                    str += this.multipleSelection[i].name + ' ';
                }
                this.$message.error('删除了' + str);
                this.multipleSelection = [];
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
