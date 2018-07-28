<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-setting"></i> 用户管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="p-handle-box">
                <el-button type="primary" icon="delete" class="handle-del mr10" @click="delAll">批量删除</el-button>
                <el-input v-model="searchContant" placeholder="输入姓名，手机号，用户ID" class="p-handle-input mr10"></el-input>
                <el-button type="primary" class="el-icon-search"  @click="search"></el-button>
                <el-button type="success" class="el-icon-plus"  @click="addUsers"></el-button>
            </div>

            <el-table :data="tableData" height="700" border style="width: 100%" ref="multipleTable" @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55" fixed="left"></el-table-column>
                <el-table-column prop="userName" label="姓名"  width="150">
                </el-table-column>
                <el-table-column prop="userPhone" label="手机号" width="150">
                </el-table-column>
                <!--<el-table-column prop="userSexName" label="性别" width="80">-->
                <!--</el-table-column>-->
                <el-table-column prop="userId" label="用户ID"  width="150">
                </el-table-column>
                <!--<el-table-column prop="registerTime" label="登录密码"  width="150" >-->
                <!--</el-table-column>-->
                <el-table-column prop="codeKey" label="秘钥Key"  width="250" >
                </el-table-column>
                <el-table-column prop="lockTxt" label="是否锁定"  width="80" >
                </el-table-column>
                <el-table-column prop="registerTime" label="注册时间" sortable width="180">
                </el-table-column>
                <el-table-column prop="lastTime" label="最后登录时间" width="180">
                </el-table-column>
                <!--<el-table-column prop="updaterName" label="更新者"   width="150">-->
                <!--</el-table-column>-->
                <!--<el-table-column prop="updateTime" label="更新时间"   width="180">-->
                <!--</el-table-column>-->
                <el-table-column label="操作"  fixed="right">
                    <template slot-scope="scope">
                        <!--   <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>-->
                        <el-button size="small" @click="goEditDetail(scope.$index, scope.row)">编辑</el-button>
                        <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination @current-change="handleCurrentChange" layout="prev, pager, next" :total="total" :page-size="pageSize">
                </el-pagination>
            </div>
        </div>

        <!--用户详情 编辑弹出框 -->
        <el-dialog title="新增/编辑" :visible.sync="editVisible" width="40%" :before-close="handleClose">
            <div>
                <div class="container">
                    <div class="form-box">
                        <el-form ref="form" :model="form" label-width="80px">
                            <el-form-item label="姓名" required>
                                <el-input v-model="form.name"></el-input>
                            </el-form-item>
                            <el-form-item label="手机号" required>
                                <el-input type="number" maxlength = '11' v-model="form.phone"></el-input>
                            </el-form-item>
                            <!--<el-form-item label="选择性别" >-->
                                <!--<el-select v-model="form.sex" placeholder="请选择">-->
                                    <!--<el-option key="man" label="男" value="1" selected="selected"></el-option>-->
                                    <!--<el-option key="woman" label="女" value="0"></el-option>-->
                                <!--</el-select>-->
                            <!--</el-form-item>-->
                            <el-form-item label="用户ID" required>
                                <el-input v-model="form.userId"></el-input>
                            </el-form-item>
                            <el-form-item label="是否锁住" >
                                <el-switch
                                    v-model="form.isLock"
                                    active-text="是"
                                    inactive-text="否">
                                </el-switch>
                            </el-form-item>
                            <el-form-item label="登录密码">
                                <el-input type="password" v-model="form.pwd"></el-input>
                            </el-form-item>
                            <el-form-item label="确认密码">
                                <el-input type="password" v-model="form.confimPwd" auto-complete="off"></el-input>
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
            <div class="p-del-dialog-cnt">删除不可恢复，是否确定删除？</div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="delVisible = false">取 消</el-button>
                <el-button type="primary" @click="deleteRow">确 定</el-button>
            </span>
        </el-dialog>
     </div>

</template>

<script>
    import {post} from '../common/HttpUtils';
    import {api} from '../common/HttpConfig';
    import {com} from '../common/Contants';
    export default {
        data: function(){
          return {
            tableData: [],
            cur_page: 1,
            multipleSelection: [],
            searchContant: '',
            del_list: [],
            editVisible: false,
            delVisible: false,
            form: {
                name: '',
                phone: '',
              //  sex: '1',
                userId: '',
                pwd: '',
                confimPwd: '',
                isLock:true
            },
            idx: -1,
            isNewAdd: true,
            total: 0,
            isDeleteAll: false,
            pageSize: com.x_pagination_size,

        }
        },
        created() {
            this.getData({});
        },
        computed: {
          /*  data() {
                return this.tableData.filter((d) => {
                     let is_del = false;
                for (let i = 0; i < this.del_list.length; i++) {
                    if (d.userName === this.del_list[i].userName) {
                        is_del = true;
                        break;
                    }
                 }
                 // console.log("ddjddddd")
                 // if (!is_del) {
                 //    if ((d.userName.indexOf(this.searchContant)) > -1){
                 //        return d;
                 //    }
                 // }
            })
            }*/
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
                    url: api.api_user_list,
                    curPage: this.cur_page,
                    data: parms,
                    success: (res) => {
                        if (res && res.code > 0) {
                            this.tableData = res.userList;
                            this.total = res.total;
                        }
                    },
                    error: (err) => {
                    }
                    }
                );
            },
            search(ars) {
                this.tableData = []
                this.cur_page = 1
                this.getData({"searchContant":this.searchContant});
            },
            filterTag(value, row) {
                return row.tag === value;
            },
           /* handleEdit(index, row) {

                const item = this.tableData[index];
                this.idx = item.id;

                this.form = {
                    phone: item.userPhone,
              //      sex: item.userSex,
                    userId: item.userId,
                    pwd: '',
                    confimPwd: '',
                    isLock: item.isLock*1 == 0?false:true
                }
                this.editVisible = true;
            },*/
            goEditDetail(index, row) {
                this.isNewAdd = false
                // alert(row.name)
                //  this.$router.push({name:'/goodsDetails',params:{"row":row}});
                const item = this.tableData[index];
                this.idx = item.id;
                // name: '',
                //     phone: '',
                //     sex: '1',
                //     userId: '',
                //     pwd: '',
                //     confimPwd: ''
                this.form = {
                    name: item.userName,
                    phone: item.userPhone,
                   // sex: item.userSex,
                    userId: item.userId,
                    pwd: '',
                    confimPwd: '',
                    isLock: item.isLock*1 == 0?false:true
                }
                this.editVisible = true;
            },
            handleDelete(index, row) {
                const item = this.tableData[index];
                this.idx = item.userId;
                this.delVisible = true;
                this.isDeleteAll = false
            },
            delAll() {
                let length = this.multipleSelection.length;
                if(length <=0 ){
                    this.$message.warning('请选择要删除的数据');
                    return;
                }
                this.delVisible = true;
                this.isDeleteAll = true;
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            // 保存编辑
            saveEdit() {
                if(!this.form.name || !this.form.phone || !this.form.userId){
                    this.$message.error('请填写必须输入项目');
                    return;
                }
                if(this.form.pwd != this.form.confimPwd){
                    this.$message.error('两次输入密码不一致！');
                    return;
                }
                let url = '',id=''
                if(this.isNewAdd){
                    url = api.api_user_add
                }else{
                    url = api.api_user_update
                    id = this.idx
                   // this.$set(this.tableData, this.idx, this.form);
                   // this.$message.success(`修改第 ${this.idx+1} 行成功`);
                }
                // this.$set(this.tableData, 0, this.form);
                post({
                    url: url,
                    // curPage: this.cur_page,
                    data: {
                        "id":id,
                        "userName":this.form.name,
                        "userPhone":this.form.phone,
                      //  "userSex":this.form.sex,
                        "userId":this.form.userId,
                        "password":this.form.pwd,
                        "isLock": this.form.isLock?1:0
                    },
                    success: (res) => {
                        if (res && res.code > 0) {
                            if(this.isNewAdd) {
                                this.$message.success(`新增用户【 ${this.form.name} 】成功！`);
                                this.cur_page = 1
                            }else{
                                this.$message.success(`修改用户信息 ${this.form.name} 成功！`);
                            }
                            this.editVisible = false;
                            this.isNewAdd = false;
                            this.getData({});
                        }else{
                            this.$message.error(res.message);
                        }
                    },
                    error: (err) => {
                    }
                    }
                );

            },
            // 确定删除
            deleteRow(){
                // 删除全部
                if(this.isDeleteAll){
                    let del_list = [];
                    let length = this.multipleSelection.length;
                    let str = '';
                    for (let i = 0; i < length; i++) {
                        str += this.multipleSelection[i].userName + ' ';
                        del_list.push(this.multipleSelection[i].userId)
                    }
                    post({
                        url: `${api.api_user_delete}`,
                        // curPage: this.cur_page,
                        data: { userIds : del_list },
                        success: (res) => {
                            if (res && res.code > 0) {
                                this.cur_page = 1
                                this.$message.success('删除了' + str);
                                this.delVisible = false;
                                this.getData({});
                            }
                            this.multipleSelection = [];
                            this.isDeleteAll = false
                        },
                        error: (err) => {
                        }
                        }
                    );

                }else{
                    this.isDeleteAll = false
                    post({
                            url: `${api.api_user_delete}`,
                            // curPage: this.cur_page,
                            data: { userIds : [this.idx]},
                            success: (res) => {
                                if (res && res.code > 0) {
                                    this.cur_page = 1

                                    // this.tableData.splice(this.idx, 1);
                                    this.$message.success('删除成功');
                                    this.delVisible = false;
                                    this.getData({});
                                }
                            },
                            error: (err) => {
                            }
                        }
                    );
                }
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

<style>
    .p-handle-box {
        margin-bottom: 20px;
    }

    .el-message-box{
        border-radius: 0;
    }

    .p-handle-input {
        width: 300px;
        display: inline-block;
    }
    .p-del-dialog-cnt{
        font-size: 16px;
        text-align: center
    }
</style>
