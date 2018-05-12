<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-setting"></i> 用户管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-input v-model="select_word" placeholder="输入姓名，手机号，用户ID" class="handle-input mr10"></el-input>
                <el-button type="primary" class="el-icon-search"  @click="search"></el-button>
                <el-button type="success" class="el-icon-plus"  @click="addUsers"></el-button>
            </div>
            <el-table :data="data" height="600" border style="width: 100%" ref="multipleTable" @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55" fixed="left"></el-table-column>
                <el-table-column prop="name" label="姓名"  width="100">
                </el-table-column>
                <el-table-column prop="date" label="手机号" width="100">
                </el-table-column>
                <el-table-column prop="name" label="性别" width="50">
                </el-table-column>
                <el-table-column prop="name" label="用户ID"  width="120">
                </el-table-column>
                <el-table-column prop="date" label="登录密码"  width="150" >
                </el-table-column>
                <el-table-column prop="date" label="验证码"  width="80" >
                </el-table-column>
                <el-table-column prop="date" label="注册时间" sortable width="150">
                </el-table-column>
                <el-table-column prop="date" label="最后登录时间" width="150">
                </el-table-column>
                <el-table-column prop="date" label="操作者"   width="100">
                </el-table-column>
                <el-table-column prop="date" label="操作时间"   width="150">
                </el-table-column>
                <el-table-column label="操作" width="150"  fixed="right">
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

        <!--用户详情 编辑弹出框 -->
        <el-dialog title="新增/编辑" :visible.sync="editVisible" width="55%" :before-close="handleClose">
            <div>
                <div class="container">
                    <div class="form-box">
                        <el-form ref="form" :model="form" label-width="80px">
                            <el-form-item label="姓名" required>
                                <el-input v-model="form.name"></el-input>
                            </el-form-item>
                            <el-form-item label="手机号" required>
                                <el-input type="number" maxlength = '11' v-model="form.name"></el-input>
                            </el-form-item>
                            <el-form-item label="选择性别" >
                                <el-select v-model="form.region" placeholder="请选择">
                                    <el-option key="man" label="男" value="1" selected="selected"></el-option>
                                    <el-option key="woman" label="女" value="0"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="用户ID" required>
                                <el-input v-model="form.name"></el-input>
                            </el-form-item>
                            <el-form-item label="登录密码" required>
                                <el-input type="password" v-model="form.pwd"></el-input>
                            </el-form-item>
                            <el-form-item label="确认密码" required >
                                <el-input type="password" v-model="form.pwd" auto-complete="off"></el-input>
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

        <!-- 删除提示框 -->
        <el-dialog title="提示" :visible.sync="delVisible" width="300px" center>
            <div class="del-dialog-cnt">删除不可恢复，是否确定删除？</div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="delVisible = false">取 消</el-button>
                <el-button type="primary" @click="deleteRow">确 定</el-button>
            </span>
        </el-dialog>
     </div>
    </div>
</template>

<script>
    export default {
        data: function(){
          return {
                url: './static/vuetable.json',
                tableData: [],
                cur_page: 1,
                multipleSelection: [],
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
                idx: -1,
                isNewAdd: true
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
                    if ((d.name.indexOf(this.select_word) > -1 ||
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
            filterTag(value, row) {
                return row.tag === value;
            },
            handleEdit(index, row) {
                this.idx = index;
                const item = this.tableData[index];
                this.form = {
                    name: item.name,
                    date: item.date,
                    pwd: '',
                    address: item.address
                }
                this.editVisible = true;
            },
            goEditDetail(index, row) {
                this.isNewAdd = false
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
                if(this.isNewAdd){
                    this.$set(this.tableData, 0, this.form);
                    this.$message.success('新增用户成功！');
                }else{
                    this.$set(this.tableData, this.idx, this.form);
                    this.$message.success(`修改第 ${this.idx+1} 行成功`);
                }
                this.editVisible = false;
                this.isNewAdd = false;
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
            addUsers(){
                this.isNewAdd = true;
                this.form = {
                    name: '',
                    date: '',
                    address: ''
                }
                this.editVisible = true;
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
