<template>
    <div >
        <div class="crop-demo" style="margin-bottom: 20px">
            <div style="margin-right: 20px;margin-bottom: 80px;margin-left: 20px">
                <span style="color:red;"></span>预览图
            </div>
            <img :src="cropImg" class="pre-img">
            <div class="crop-demo-btn">选择图片
                <input class="crop-input" type="file" name="image" accept="image/*" @change="setImage"/>
            </div>
        </div>
        <el-dialog title="裁剪图片" :visible.sync="dialogVisible" width="30%" append-to-body>
            <vue-cropper ref='cropper' :src="imgSrc" :ready="cropImage" :zoom="cropImage" :cropmove="cropImage"
                         style="width:100%;height:300px;"></vue-cropper>
            <span slot="footer" class="dialog-footer">
                <el-button @click="cancelCrop">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>
      </div>
</template>

<script>
    import VueCropper  from 'vue-cropperjs';
    export default {
        props:{
            defaultSrc: {
                type: String,
                default: './static/img/img.jpg'
            }
        },
        data: function(){
            return {
                // defaultSrc: './static/img/img.jpg',
                fileList: [],
                imgSrc: '',
                cropImg: '',
                dialogVisible: false,
            }
        },
        components: {
            VueCropper
        },
        methods:{
            setImage(e){
                const file = e.target.files[0];
                if (!file.type.includes('image/')) {
                    return;
                }
                const reader = new FileReader();
                reader.onload = (event) => {
                    this.dialogVisible = true;
                    this.imgSrc = event.target.result;
                    this.$refs.cropper && this.$refs.cropper.replace(event.target.result);
                };
                reader.readAsDataURL(file);
            },
            cropImage () {
                this.cropImg = this.$refs.cropper.getCroppedCanvas().toDataURL();
                this.$emit("cropImg",this.cropImg)
            },
            cancelCrop(){
                this.dialogVisible = false;
                this.cropImg = this.defaultSrc;
            },
            imageuploaded(res) {
                console.log(res)
            },
            handleError(){
                this.$notify.error({
                    title: '上传失败',
                    message: '图片上传接口上传失败，可更改为自己的服务器接口'
                });
            }
        },
        created(){
            this.cropImg = this.defaultSrc;
        }
    }
</script>

<style scoped>
    .pre-img{
        width: 120px;
        height: 120px;
        background: #f8f8f8;
        border: 1px solid #eee;
        border-radius: 5px;
    }
    .crop-demo{
        display: flex;
        align-items: flex-end;
    }
    .crop-demo-btn{
        position: relative;
        width: 80px;
        height: 30px;
        line-height: 30px;
        padding: 0 10px;
        margin-left: 30px;
        background-color: #409eff;
        color: #fff;
        font-size: 14px;
        border-radius: 4px;
        box-sizing: border-box;
    }
    .crop-input{
        position: absolute;
        width: 100px;
        height: 40px;
        left: 0;
        top: 0;
        opacity: 0;
        cursor: pointer;
    }
</style>
