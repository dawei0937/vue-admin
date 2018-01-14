<template lang="html">
    <div class="password">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>密码修改</span>
            </div>
            <el-form :model="modifyForm" :labelPosition="labelPosition" label-width="100px" :rules="modifyFormRules" ref="modifyForm">
                <el-form-item label="当前密码:" prop="mb_password">
                    <el-input v-model="modifyForm.mb_password" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="新密码:" prop="mb_newPass">
                    <el-input v-model="modifyForm.mb_newPass" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="确认新密码:" prop="mb_checkPass">
                    <el-input v-model="modifyForm.mb_checkPass" auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
            <div class="dialog-footer">
                <el-button type="primary" pos="center" @click.native="editSubmit" :loading="editLoading">提交</el-button>
            </div>
        </el-card>
    </div>
</template>

<script>
export default {

    data(){
        return {
            editLoading: false,
            labelPosition: 'top',
            //编辑界面数据
            modifyForm: {
                mb_password:'',
                mb_newPass: '',
                mb_checkPass: ''
            },
            modifyFormRules: {
                mb_password: [
                    { required: true, message: '请输入密码', trigger: 'blur' }
                ],
                mb_newPass: [
                    { required: true, message: '请输入新密码', trigger: 'blur' }
                ],
                mb_checkPass: [
                    { required: true, message: '请输入确认密码', trigger: 'blur' }
                ]
            },
        }
    },
    methods: {
            editSubmit: function(){  //修改个人密码方法
                this.$refs.modifyForm.validate((valid) => {
                    if (valid) {
                        this.$confirm('确认提交吗？', '系统提示', {}).then(() => {
                            this.editLoading = true;
                            //NProgress.start();
                            let para = Object.assign({}, this.modifyForm);
                            para.birth = (!para.birth || para.birth == '') ? '' : util.formatDate.format(new Date(para.birth), 'yyyy-MM-dd');
                            this.$api.post('doEditPassword',para,data=>{
                                    this.$message({
                                        message: '提交成功',
                                        type: 'success'
                                    });
                                    //this.getMemberList();
                            });
                            this.$refs['modifyForm'].resetFields();
                            this.editFormVisible = false;
                            this.editLoading = false;
                        });
                    }
                });
            }
    }
}
</script>

<style lang="css">
    .password{max-width:800px;padding-top:100px;margin:0 auto;}
    .dialog-footer{ text-align:center;}
</style>
