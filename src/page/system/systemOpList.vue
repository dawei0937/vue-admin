<template>
	<div>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters">
                <el-date-picker
                      v-model="filters.op_time"
                      type="daterange"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期"
                      default-value="2018-01-12">
                </el-date-picker>
				<el-form-item>
					<el-button type="primary" @click="getSysOpList">查询</el-button>
				</el-form-item>
			</el-form>
		</el-col>
		<!--列表-->
		<el-table :data="ops" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">
			<el-table-column type="selection"></el-table-column>
			<el-table-column prop="op_time" label="操作时间"  sortable></el-table-column>
			<el-table-column prop="op_ip" label="操作所在IP" sortable>
			</el-table-column>
			<el-table-column prop="op_url" label=" 操作接口"  sortable></el-table-column>
			<el-table-column prop="op_desc" label="操作描述"></el-table-column>
		</el-table>
        <!--工具条-->
        <el-col :span="24" class="toolbar">
            <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="20" :total="total" style="float:right;">
            </el-pagination>
        </el-col>
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
					op_time: ''
				},
				ops: [
					{op_time:'2018-01-12 10:10:10',op_ip:'192.168.0.99',op_url:'/member/edit',op_desc:'change user name [123] to [234]'}
				],
				total: 10,
				page: 1,
				listLoading: false,

			}
		},
		methods: {
			handleCurrentChange(val) {
				this.page = val;
				this.getSysOpList();
			},

			getSysOpList() { //获取子账户列表
				let para = {
					page: this.page,
					searchDates: this.filters.op_time
				};
				this.listLoading = true;
				//NProgress.start();
				console.log(para)
				this.$api.get('system/ops',para,data =>{
						console.log(data);
				});
				this.listLoading = false;
			},

			selsChange: function (sels) {
				this.sels = sels;
			},
		},
		mounted() {
			this.getSysOpList();
		}
	}

</script>
