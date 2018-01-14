<template>
	<div>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters">
				<el-form-item>
					<el-input v-model="filters.sub_account" placeholder="子账号查询"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="getSubAccountList">查询</el-button>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="handleAdd">新增</el-button>
				</el-form-item>
			</el-form>
		</el-col>
		<!--列表-->
		<el-table :data="users" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">
			<el-table-column type="selection"></el-table-column>
			<el-table-column prop="sub_account" label="子账号"  sortable></el-table-column>
			<el-table-column prop="sub_valid" label="状态" sortable>
				<template slot-scope="scope">
				  <el-tag
					:type="scope.row.sub_valid == 1 ? 'success' : 'danger'"
					close-transition>{{scope.row.sub_valid==1?'有效':'冻结'}}</el-tag>
				</template>
			</el-table-column>
			<el-table-column prop="sub_name" label="名称"  sortable></el-table-column>
			<el-table-column prop="sub_createTime" label="创建时间"></el-table-column>
			<el-table-column label="操作">
				<template scope="scope">
					<el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
					<el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		<!--工具条-->
		<el-col :span="24" class="toolbar">
			<el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button>
			<el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="20" :total="total" style="float:right;">
			</el-pagination>
		</el-col>

		<!--新增界面-->
		<el-dialog title="编辑" :visible.sync="editFormVisible" :close-on-click-modal="false">
				 <el-form :model="editForm" label-width="100px" :rules="editFormRules" ref="editForm">
					<el-form-item label="子账号ID:" prop="sub_account">
						<el-input v-model="editForm.sub_account" auto-complete="off"></el-input>
					</el-form-item>
					<el-form-item label="名称:" prop="name">
						<el-input v-model="editForm.name" auto-complete="off"></el-input>
					</el-form-item>
					<el-form-item label="电话:">
						<el-input v-model="editForm.sub_mobile" auto-complete="off"></el-input>
					</el-form-item>
				</el-form>
				<div slot="footer" class="dialog-footer">
					<el-button @click.native="editFormVisible = false">取消</el-button>
					<el-button type="primary" @click.native="editSubmit" :loading="addLoading">提交</el-button>
				</div>
		</el-dialog>

		<!--新增界面-->
		<el-dialog title="添加子账号" :visible.sync="addFormVisible">
                 <el-form :model="addForm" label-width="100px" :rules="addSubAccountRules" ref="addForm">
                    <el-form-item label="子账号ID:" prop="sub_account">
                        <el-input v-model="addForm.sub_account" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="名称:">
                        <el-input v-model="addForm.name" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="电话:">
                        <el-input v-model="addForm.sub_mobile" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="密码:">
                        <el-input type="password" v-model="addForm.sub_password" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="确认密码:">
                        <el-input type="password" v-model="addForm.sub_checkPass" auto-complete="off"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click.native="addFormVisible = false">取消</el-button>
                    <el-button type="primary" @click.native="doAddSubAccount" :loading="addLoading">提交</el-button>
                </div>
		</el-dialog>
	</div>
</template>

<script>
	//import util from '../../common/js/util'
	//import NProgress from 'nprogress'
	//import { getUserListPage, removeUser, batchRemoveUser, editUser, addUser } from '../../api/api';

	export default {
		data() {
			return {
				filters: {
					sub_account: ''
				},
				users: [
					{sub_account:'sysadmin1',sub_valid:'1',sub_name:'大伟',sub_createTime:'2018-01-11 18:00:00'}
				],
				total: 10,
				page: 1,
				listLoading: false,
				sels: [],//列表选中列

				editFormVisible: false,//编辑界面是否显示
				editLoading: false,
				editFormRules: {
					name: [
						{ required: true, message: '请输入姓名', trigger: 'blur' }
					]
				},
				//编辑界面数据
				editForm: {
					id: 0,
					sub_account: '',
					sub_name: -1,
					sub_mobile: 0
				},

				addFormVisible: false,//新增界面是否显示
				addLoading: false,
				addSubAccountRules: {
					sub_account: [
						{ required: true, message: '请输入子账号ID', trigger: 'blur' }
					]
				},
				//新增界面数据
				addForm: {
					sub_account: '',
					sub_name: '',
					sub_mobile: '',
					sub_password: '',
					sub_checkPass: ''
				}

			}
		},
		methods: {
			handleCurrentChange(val) {
				this.page = val;
				this.getSubAccountList();
			},

			getSubAccountList() { //获取子账户列表
				let para = {
					page: this.page,
					name: this.filters.sub_account
				};
				this.listLoading = true;
				//NProgress.start();
				console.log(para)
				this.$api.get('login',para,data =>{
						console.log(data);
				});
				this.listLoading = false;
				// getUserListPage(para).then((res) => {
				// 	this.total = res.data.total;
				// 	this.users = res.data.users;
				// 	this.listLoading = false;
				// 	//NProgress.done();
				// });
			},
			//删除
			handleDel: function (index, row) {
				this.$confirm('确认删除该记录吗?', '提示', {
					type: 'warning'
				}).then(() => {
					this.listLoading = true;
					//NProgress.start();
					let para = { id: row.id };
					this.listLoading = false;
					this.$api.post('doRemoveSubAccount',para,data =>{
							//NProgress.done();
							this.$message({
								message: '删除成功',
								type: 'success'
							});
					});
					// removeUser(para).then((res) => {
					// 	this.listLoading = false;
					// 	//NProgress.done();
					// 	this.$message({
					// 		message: '删除成功',
					// 		type: 'success'
					// 	});
					// 	this.getUsers();
					// });
				}).catch(() => {

				});
			},
			//显示编辑界面
			handleEdit: function (index, row) {
                console.log(this.editFormVisible);
				this.editFormVisible = true;
				this.editForm = Object.assign({}, row);
			},
			//显示新增界面
			handleAdd: function () {
				this.addFormVisible = true;
				this.addForm = {
					name: '',
					sex: -1,
					age: 0,
					birth: '',
					addr: ''
				};
			},
			//编辑
			editSubmit: function () {
				this.$refs.editForm.validate((valid) => {
					if (valid) {
						this.$confirm('确认提交吗？', '提示', {}).then(() => {
							this.editLoading = true;
							//NProgress.start();
							let para = Object.assign({}, this.editForm);
							para.birth = (!para.birth || para.birth == '') ? '' : util.formatDate.format(new Date(para.birth), 'yyyy-MM-dd');
							console.log(para)
							this.$api.post('doEditSubAccount',para,data =>{
									this.editLoading = false;
									//NProgress.done();
									this.$message({
										message: '修改成功',
										type: 'success'
									});
									this.$refs['editForm'].resetFields();
									this.editFormVisible = false;
									this.getUsers();
							});
						});
					}
				});
			},
			doAddSubAccount: function () {  //新增子账号方法
				this.$refs.addForm.validate((valid) => {
					if (valid) {
						this.$confirm('确认提交吗？', '提示', {}).then(() => {
							this.addLoading = true;
							//NProgress.start();
							let para = Object.assign({}, this.addForm);
							console.log(para)
							this.$api.post('doAddSubAccount',para,data =>{
									console.log('-------------call addSubmit Paras:'+ para.sub_account);
									this.$refs['addForm'].resetFields();
									this.addFormVisible = false;
							});
						});
					}
				});
			},
			selsChange: function (sels) {
				this.sels = sels;
			},
			//批量删除
			batchRemove: function () {
				var ids = this.sels.map(item => item.id).toString();
				this.$confirm('确认删除选中记录吗？', '提示', {
					type: 'warning'
				}).then(() => {
					this.listLoading = true;
					//NProgress.start();
					let para = { ids: ids };
					this.$api.post('doBatchRemoveSubAccount',para,data =>{
							console.log('-------------call batchRemove Paras:'+ para.sub_account);
							this.addFormVisible = false;
					});
					// // batchRemoveUser(para).then((res) => {
					// // 	this.listLoading = false;
					// // 	//NProgress.done();
					// // 	this.$message({
					// // 		message: '删除成功',
					// // 		type: 'success'
					// // 	});
					// // 	this.getUsers();
					// });
				}).catch(() => {

				});
			}
		},
		mounted() {
			//this.getUsers();
		}
	}

</script>
