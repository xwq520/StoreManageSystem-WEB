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
                <el-select v-model="select_status" placeholder="商品状态" clearable class="handle-select mr10">
                    <el-option
                        v-for="item in status"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
                <el-input v-model="select_word" placeholder="商品编号，标题" class="handle-input mr10"></el-input>
                <el-button type="primary" class="el-icon-search"  @click="search"></el-button>
                <el-button type="success" class="el-icon-plus"  @click="addGoods"></el-button>
            </div>
            <el-table :data="tableData" border style="width: 100%"  @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55"  fixed="left"></el-table-column>
                <el-table-column prop="comNo" label="商品编号"  width="170">
                </el-table-column>
                <el-table-column prop="headline" label="标题"  >
                </el-table-column>
                <el-table-column prop="subtitle" label="子标题" >
                </el-table-column>
                <el-table-column prop="originalPrice" label="原价" sortable width="100">
                </el-table-column>
                <el-table-column prop="sellingPrice" label="售价" sortable width="100">
                </el-table-column>
                <el-table-column prop="typeName" label="类型" width="80">
                </el-table-column>
                <!--  <el-table-column prop="producedDate" label="生产日期" width="150">
                  </el-table-column>
                  <el-table-column prop="startGuaPeriodDate" label="保质期限"   width="150">
                  </el-table-column>-->
                <el-table-column prop="inventory"  label="库存" width="100">
                </el-table-column>
                <el-table-column prop="salesVolume" sortable label="销量" width="100">
                </el-table-column>
                <el-table-column prop="manufacturer" label="生产厂家" >
                </el-table-column>
                <el-table-column prop="commodityStatusName" label="状态" width="100">
                </el-table-column>
             <!--   <el-table-column prop="updaterName" label="操作者"   width="100">
                </el-table-column>
                <el-table-column prop="updateTime" label="操作时间"   width="150">
                </el-table-column>-->
                <el-table-column label="操作" fixed="right">
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

        <!--商品详情 编辑弹出框 -->
        <el-dialog title="新增/编辑" :visible.sync="editVisible" width="60%" :before-close="handleClose" >
                <div class="container">
                    <div class="form-box">
                       <!-- headline: '',
                        subtitle: '',
                        previewImg: '',//预览图 图片base64
                        commodityDetails: '',//商品详情 如：淘宝网商品详情描述
                        originalPrice: '',//原价
                        sellingPrice: '',// 售价
                        inventory: '',//库存
                        salesVolume: '',//销量
                        manufacturer: '',//产厂家
                        commodityStatus: '',//状态-->
                        <el-form ref="form" :model="form" label-width="80px">
                            <el-form-item label="标题" required >
                                <el-input v-model="form.headline"></el-input>
                            </el-form-item>
                            <el-form-item label="子标题" required>
                                <el-input v-model="form.subtitle"></el-input>
                            </el-form-item>
                            <el-form-item label="原价" >
                                <el-input   type="number" v-model="form.originalPrice" :maxlength="7"></el-input>
                            </el-form-item>
                            <el-form-item label="售价" >
                                <el-input  type="number" v-model="form.sellingPrice" :maxlength="7"> </el-input>
                            </el-form-item>
                            <el-form-item label="类型" >
                                <el-select v-model="form.type" placeholder="请选择" clearable>
                                    <el-option
                                        v-for="item in options"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="库存" >
                                <el-input  type="number" v-model="form.inventory" maxlength="7"></el-input>
                            </el-form-item>
                            <el-form-item label="销量" >
                                <el-input  type="number" v-model="form.salesVolume" maxlength="7"></el-input>
                            </el-form-item>
                            <el-form-item label="生产厂家">
                                <el-input
                                    type="textarea"
                                    :autosize="{ minRows: 2, maxRows: 4}"
                                    placeholder="生产厂家"
                                    v-model="form.manufacturer">
                                </el-input>
                            </el-form-item>
                            <el-form-item label="状态" >
                            <el-select v-model="form.commodityStatus" placeholder="请选择状态" clearable>
                                <el-option
                                    v-for="item in status"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                            </el-form-item>
                            <v-img-upload @cropImg = "cropImg" ref="imgUploadObj" :defaultSrc = "form.previewImg"></v-img-upload>
                            <!--<el-form-item label="选择器" required>
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
                            </el-form-item>-->
                            <v-goodsinfo-editor @change = "editorChange" ref="editorObj" :defaultValue = "form.commodityDetails" style="width: 160%"></v-goodsinfo-editor>
                            <el-form-item style="margin-top: 20px;text-align: right ">
                                <el-button type="primary" @click="saveEdit" >确定</el-button>
                                <el-button @click="editVisible = false" >取消</el-button>
                            </el-form-item>
                        </el-form>
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
    import {post} from '../common/HttpUtils';
    import {api} from '../common/HttpConfig';
    import {com} from '../common/Contants';

    export default {
        components:{
            "v-img-upload": vImgUpload,
            "v-goodsinfo-editor": vGoodsInfoEditor
        },
        data() {
            return {
                url: './static/vuetable.json',
                tableData: [],
                cur_page: 1,
                multipleSelection: [],
                select_status: '',
                select_word: '',
                del_list: [],
                editVisible: false,
                delVisible: false,
                form: {
                    headline: '',
                    subtitle: '',
                    previewImg: '',//预览图 图片base64
                    commodityDetails: '',//商品详情 如：淘宝网商品详情描述
                    originalPrice: '',//原价
                    sellingPrice: '',// 售价
                    inventory: '',//库存
                    salesVolume: '',//销量
                    manufacturer: '',//产厂家
                    commodityStatus: '',//状态,
                    type:'',//类型  SALE.热销 NEW.新品上架
                },
                idx: -1,
                total:0,
                pageSize: com.x_pagination_size,
                options: [{
                    value: 'NEW',
                    label: '新品上市'
                }, {
                    value: 'SALE',
                    label: '火热促销'
                }, {
                    value: 'DISCOUNT',
                    label: '精美折扣 '
                }],
                status: [{
                    value: 0,
                    label: '待发布'
                }, {
                    value: 1,
                    label: '销售中'
                }, {
                    value: 2,
                    label: '已下架 '
                }],
                isNewAdd: true,
                isDeleteAll: false
            }
        },
        created() {
            this.getData({});
        },
        mounted(){

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
                    url: api.api_commodity_list,
                    curPage: this.cur_page,
                    data: parms,
                    success: (res) => {
                        if (res && res.code > 0) {
                            this.tableData = res.commodityList;
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
                this.getData({"commodityStatus":this.select_status,"searchContant":this.select_word});
            },
            goEditDetail(index, row) {
               // console.log(row.originalPrice.replaceAll(",",""))
                this.isNewAdd = false
                this.form = {
                    headline: row.headline,
                    subtitle: row.subtitle,
                    previewImg: row.previewImg,//预览图 图片base64
                    commodityDetails: row.commodityDetails,//商品详情 如：淘宝网商品详情描述
                    originalPrice: row.originalPrice.replaceAll(",",""),//原价
                    sellingPrice: row.sellingPrice.replaceAll(",",""),// 售价
                    inventory: row.inventory,//库存
                    salesVolume: row.salesVolume,//销量
                    manufacturer: row.manufacturer,//产厂家
                    commodityStatus: row.commodityStatus,//状态,
                    type: row.type,//类型  1.热销 2.新品上架
                }
                let self = this
                let setTime = setTimeout(function () {
                    self.$refs.editorObj.html = self.form.commodityDetails
                    self.$refs.imgUploadObj.cropImg = self.form.previewImg
                    clearTimeout(setTime)
                },300)

                this.idx = row.id;
                this.editVisible = true;
            },
            // 添加宝贝商品
            addGoods() {
               // console.log(this.$refs)
                this.isNewAdd = true
                this.editVisible = true;
                this.clearFormData()
            },
            clearFormData(){
                let self = this
                let setTime = setTimeout(function () {
                    self.$refs.editorObj.html = ''
                    self.$refs.imgUploadObj.cropImg = ''
                    clearTimeout(setTime)
                },200)
               // this.$refs.editorObj.html = ''
                this.form = {
                    headline: '',
                    subtitle: '',
                    previewImg: '',//预览图 图片base64
                    commodityDetails: '',//商品详情 如：淘宝网商品详情描述
                    originalPrice: '',//原价
                    sellingPrice: '',// 售价
                    inventory: '',//库存
                    salesVolume: '',//销量
                    manufacturer: '',//产厂家
                    commodityStatus: '',//状态,
                    type:'',//类型  1.热销 2.新品上架
                }
            },
            handleDelete(index, row) {
                this.idx = row.id;
                this.delVisible = true;
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
            cropImg(data){
                this.form.previewImg = data
            },
            editorChange(data){
                this.form.commodityDetails = data.render
            },
            // 保存编辑
            saveEdit() {
                if(!this.form.headline || !this.form.subtitle){
                    this.$message.error('请填写必须输入项目');
                    return;
                }
                let url = '',id=''
                if(this.isNewAdd){
                    url = api.api_commodity_add
                }else{
                    url = api.api_commodity_update
                    id = this.idx
                }
                let originalPrice = this.form.originalPrice,sellingPrice=this.form.sellingPrice;
                if(originalPrice && originalPrice*1 < 0){
                    originalPrice = 0;
                }
                if(sellingPrice && sellingPrice*1 < 0){
                    sellingPrice = 0;
                }
                post({
                    url: url,
                    // curPage: this.cur_page,
                    data: {
                        "id":id,
                        "headline":this.form.headline,
                        "subtitle":this.form.subtitle,
                         "previewImg":this.form.previewImg,
                        "commodityDetails":this.form.commodityDetails,
                        "originalPrice": originalPrice,
                        "sellingPrice": sellingPrice,
                        "inventory": this.form.inventory,
                        "salesVolume": this.form.salesVolume,
                        "manufacturer": this.form.manufacturer,
                        "commodityStatus": this.form.commodityStatus?this.form.commodityStatus:0,
                        "type": this.form.type
                    },
                    success: (res) => {
                        if (res && res.code > 0) {
                            if(this.isNewAdd) {
                                this.$message.success(`新增成功！`);
                                this.cur_page = 1
                            }else{
                                this.$message.success(`修改成功！`);
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
                })
            },
            // 确定删除
            deleteRow(){
                //   this.tableData.splice(this.idx, 1);
                let del_list = [];
               // let str = '';
                // 删除全部
                if(this.isDeleteAll){
                    let length = this.multipleSelection.length;
                    for (let i = 0; i < length; i++) {
                      //  str += this.multipleSelection[i].userName + ' ';
                        del_list.push(this.multipleSelection[i].id)
                    }
                }else{
                    del_list.push(this.idx)
                }
                post({
                    url: api.api_commodity_delete,
                    // curPage: this.cur_page,
                    data: { delIds : del_list },
                    success: (res) => {
                        if (res && res.code > 0) {
                            this.cur_page = 1
                            this.$message.success('删除成功！');
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
            },
            handleClose(done) {
                this.$confirm('信息编辑中，确定关闭吗？', '提示', {
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

<style>
    .el-message-box{
        border-radius: 0;
    }

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
