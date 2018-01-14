<template>
	<div>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters">
				<el-form-item>
					<el-input v-model="filters.bet_account" placeholder="投注账号"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="getSystemReport">查询</el-button>
				</el-form-item>
			</el-form>
		</el-col>
		<!--列表-->
		<el-table :data="reports" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">
			<el-table-column type="selection"></el-table-column>
			<el-table-column prop="bet_id" label="投注记录/ID"  sortable></el-table-column>
			<el-table-column prop="bet_time" label="投注时间"  sortable></el-table-column>
			<el-table-column prop="bet_account" label="投注账号" sortable></el-table-column>
			<el-table-column prop="bet_site" label="投注网站"  sortable>
                <template slot-scope="scope">
                    <el-tag :type="success" close-transition >
                      {{scope.row.bet_site}}
                    </el-tag>
                </template>
            </el-table-column>
			<el-table-column prop="bet_match" label="投注赛事" sortable></el-table-column>
			<el-table-column prop="bet_match_rate" label="投注赔率" sortable></el-table-column>
			<el-table-column prop="bet_money" label="投注金额" sortable></el-table-column>
			<el-table-column prop="bet_profit" label="输赢" sortable></el-table-column>
			<el-table-column label="操作" width="250">
				<template scope="scope">
					<el-button size="small" type="primary" @click="showDetail(scope.$index, scope.row)">详情</el-button>
					<el-button size="small" type="primary" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
					<el-button type="danger" size="small"  @click="handleDel(scope.$index, scope.row)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		<!--工具条-->
		<el-col :span="24" class="toolbar">
	         <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="20" :total="total" style="float:right;">
			</el-pagination>
		</el-col>

		<!--编辑界面-->
		<el-dialog title="投注记录编辑" :visible.sync="editFormVisible" :close-on-click-modal="false">
			<el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
				<el-form-item label="姓名" prop="name">
					<el-input v-model="editForm.name" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="性别">
					<el-radio-group v-model="editForm.sex">
						<el-radio class="radio" :label="1">男</el-radio>
						<el-radio class="radio" :label="0">女</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="年龄">
					<el-input-number v-model="editForm.age" :min="0" :max="200"></el-input-number>
				</el-form-item>
				<el-form-item label="生日">
					<el-date-picker type="date" placeholder="选择日期" v-model="editForm.birth"></el-date-picker>
				</el-form-item>
				<el-form-item label="地址">
					<el-input type="textarea" v-model="editForm.addr"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="editFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>

	export default {
		data() {
			return {
				filters: {
					bet_account: ''
				},
				reports: [
                            {
                                bet_id: 1,
                                bet_time: '2018-01-12 10:00:00',
                                bet_match: '阿森纳vs切尔西(英超)',
                                bet_match_rate: 1.01,
                                bet_account: 'dawei0937',
                                bet_money: 100,
                                bet_profit: 60,
                                bet_site: 'bet365'
                            }
                ],
				total: 0,
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
					name: '',
					sex: -1,
					age: 0,
					birth: '',
					addr: ''
				},
                //显示详情界面
				showFormVisible: false,
				showLoading: false,
				//新增界面数据
				showForm: {
					name: '',
					sex: -1,
					age: 0,
					birth: '',
					addr: ''
				}

			}
		},
		methods: {

			handleCurrentChange(val) {
				this.page = val;
				this.getSystemReport();
			},
			//获取用户列表
			getSystemReport() {
				let para = {
					page: this.page,
					bet_account: this.filters.bet_account
				};
				this.listLoading = true;
				//NProgress.start();
                this.$api.get('systemReport',para,res=>{
                    this.total = res.data.total;
                    this.reports = res.data.reports;
                });
                this.listLoading = false;
			},
			//删除
			handleDel: function (index, row) {
				this.$confirm('确认删除该记录吗?', '提示', {
					type: 'warning'
				}).then(() => {
					this.listLoading = true;
					//NProgress.start();
					let para = { id: row.bet_id };
                    this.$api.get('removeBetRecord',para,res=>{
                        this.$message({
                            message: '删除成功',
                            type: 'success'
                        });
                        this.getSystemReport()
                    });
                    this.listLoading = false;
				}).catch(() => {

				});
			},
			//显示编辑界面
			handleEdit: function (index, row) {
                console.log(this.editFormVisible);
				this.editFormVisible = true;
				this.editForm = Object.assign({}, row);
			},
			//显示投注详情页面
			showDetail: function (index, row) {
                console.log(this.showFormVisible);
				this.showFormVisible = true;
				this.showForm = Object.assign({}, row);
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
                            this.$api.post('editBetRecord',para,res=>{
                                    this.$message({
                                        message: '提交成功',
                                        type: 'success'
                                    });
                            });
                            this.$refs['editForm'].resetFields();
                            this.editLoading = false;
                            this.getSystemReport();
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
                    this.$api.post('batchRemoveRecords',para,res=>{
                            this.$message({
                                message: '删除成功',
                                type: 'success'
                            });
                            this.getSystemReport();
                    });

				}).catch(() => {

				});
			}
		},
		mounted() {
			this.getSystemReport();
		}
	}

</script>
