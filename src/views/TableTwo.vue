<template>
  <div>
    <el-col :span="16">
      <el-input v-model="userid" placeholder="请输入内容"></el-input>
    </el-col>
    <el-col :span="4">
      <el-button  @click="search">查询</el-button>
    </el-col>
    <el-col :span="4">
      <el-button  @click="centerDialogVisible = true">添加</el-button>
    </el-col>
  </div>
  <el-table
      :data="tableData"
      style="width: 100%"
      max-height="500">
    <el-table-column fixed prop="userid" label="编号" width="150">
      <template v-slot="scope">
        <div>{{ scope.row.userid }}</div>
      </template>
    </el-table-column>
    <el-table-column fixed prop="date" label="日期" width="150">
      <template v-slot="scope">
        <div>{{ scope.row.date }}</div>
      </template>
    </el-table-column>
    <el-table-column prop="username" label="姓名" width="120">
      <template v-slot="scope">
        <div>{{ scope.row.username }}</div>
      </template>
    </el-table-column>
    <el-table-column prop="province" label="省份" width="120">
      <template v-slot="scope">
        <div>{{ scope.row.province }}</div>
      </template>
    </el-table-column>
    <el-table-column prop="city" label="市区" width="120">
      <template v-slot="scope">
        <div>{{ scope.row.city }}</div>
      </template>
    </el-table-column>
    <el-table-column prop="site" label="地址" width="300">
      <template v-slot="scope">
        <div>{{ scope.row.site}}</div>
      </template>
    </el-table-column>
    <el-table-column prop="postcode" label="邮编" width="120">
      <template v-slot="scope">
        <div>{{ scope.row.postcode }}</div>
      </template>
    </el-table-column>
    <el-table-column fixed="right" label="操作" width="120">
      <template v-slot="scope">
<!--        <el-button-->
<!--            @click.prevent="deleteRow(scope.$index, tableData)"-->
<!--            type="text"-->
<!--            size="small">-->
<!--          移除-->
<!--        </el-button>-->
        <el-button
            size="small"
            type="danger"
            @click="handleDelete(scope.row.userid)">删除
        </el-button>
        <el-button
            size="small"
            type="danger"
            @click="handleEdit(scope.row)">编辑
        </el-button>
      </template>
      <template #footer>
        <span class="dialog-footer">
          <el-button size="small" @click="centerDialogVisible = false">取 消</el-button>
          <el-button type="primary" size="small" @click="addPeople">确 定</el-button>
        </span>
      </template>
    </el-table-column>
  </el-table>
  <div class="pagination">
    <el-pagination
        @current-change="handleCurrentChange"
        background
        layout="total, prev, pager, next"
        :current-page="currentPage"
        :page-size="pageSize"
        :total="allTableData.length">
    </el-pagination>
  </div>
  <!-- 添加表单弹出框 -->
  <el-dialog title="添加表单" v-model="centerDialogVisible" width="400px" center>
    <el-form :model="ruleForm" status-icon ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="userid" prop="userid">
        <el-input  v-model="ruleForm.userid"></el-input>
      </el-form-item>
      <el-form-item label="username" prop="username">
        <el-input  v-model="ruleForm.username"></el-input>
      </el-form-item>
      <el-form-item label="date" prop="date">
        <el-input v-model="ruleForm.date"></el-input>
      </el-form-item>
      <el-form-item label="province" prop="province">
        <el-input v-model="ruleForm.province" ></el-input>
      </el-form-item>
      <el-form-item label="city" prop="city">
        <el-input  v-model="ruleForm.city"></el-input>
      </el-form-item>
      <el-form-item label="site" prop="site">
        <el-input v-model="ruleForm.site"></el-input>
      </el-form-item>
      <el-form-item label="postcode" prop="postcode">
        <el-input v-model="ruleForm.postcode"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="addPeople()">提交</el-button>
        <el-button @click="resetData()">重置</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
  <!-- 添加修改表单弹出框 -->
  <el-dialog title="修改表单" v-model="editVisible" width="400px" center>
    <el-form :model="ruleForm" status-icon ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="userid" prop="userid">
        <el-input  v-model="ruleForm.userid"></el-input>
      </el-form-item>
      <el-form-item label="username" prop="username">
        <el-input  v-model="ruleForm.username"></el-input>
      </el-form-item>
      <el-form-item label="date" prop="date">
        <el-input v-model="ruleForm.date"></el-input>
      </el-form-item>
      <el-form-item label="province" prop="province">
        <el-input v-model="ruleForm.province" ></el-input>
      </el-form-item>
      <el-form-item label="city" prop="city">
        <el-input  v-model="ruleForm.city"></el-input>
      </el-form-item>
      <el-form-item label="site" prop="site">
        <el-input v-model="ruleForm.site"></el-input>
      </el-form-item>
      <el-form-item label="postcode" prop="postcode">
        <el-input v-model="ruleForm.postcode"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="saveEdit()">修改</el-button>
        <el-button @click="editVisible">重置</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import {HttpManager} from "@/api";
//import {getDateTime} from "@/utils";

export default {
  name: "Table",
  data() {
    return {
      tableData: [],
      allTableData:[],
      currentPage:1,
      pageSize:5,
      userid: '',
      date: '',
      username: '',
      province: '',
      city: '',
      site: '',
      postcode:'',
      centerDialogVisible: false,
      editVisible: false,
      ruleForm: {
        userid: '',
        username: '',
        date: '',
        province: '',
        city: '',
        site: '',
        postcode:'',
      }
    }
  },
  created() {
    this.getData()
    // console.log(this.tableData)
  },
  methods: {
    handleCurrentChange (val) {
      this.currentPage = val
      this.tableData = this.allTableData.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize)
    },
    handleDelete(userid){
      console.log(userid)
      HttpManager.deleteTableTwoList(userid)
          .then(res => {
            if (res) {
              console.log(res)
              this.getData()
              this.$notify({
                title: '删除成功',
                type: 'success'
              })
            } else {
              this.$notify({
                title: '删除失败',
                type: 'error'
              })
            }
          })
          .catch(err => {
            console.error(err)
          })
    },
    addPeople () {

      console.log(this.ruleForm)
      // //let datetime = getDateTime(this.registerForm.birth)
      let params = new URLSearchParams()
      params.append('userid', this.ruleForm.userid)
      params.append('date', this.ruleForm.date)
      params.append('username', this.ruleForm.username)
      params.append('province', this.ruleForm.province)
      params.append('city', this.ruleForm.city)
      params.append('site', this.ruleForm.site)
      params.append('postcode', this.ruleForm.postcode)
      HttpManager.addTableTwo(params)
          .then(res => {
            if (res.code === 1) {
              this.getData()
              this.registerForm = {}
              this.$notify({
                title: '添加成功',
                type: 'success'
              })
            } else {
              this.$notify({
                title: '添加失败',
                type: 'error'
              })
            }
          })
          .catch(err => {
            console.error(err)
          }),
          this.resetData()
      this.centerDialogVisible = false
    },
    // 编辑啊
    handleEdit (row) {
      this.idx = row.userid
      this.ruleForm = {
        userid: row.userid,
        date: row.date,
        username: row.username,
        province: row.province,
        city: row.city,
        site: row.site,
        postcode: row.postcode
      }
      this.editVisible = true
    },
    saveEdit () {
      let params = new URLSearchParams()
      params.append('userid', this.ruleForm.userid)
      params.append('date', this.ruleForm.date)
      params.append('username', this.ruleForm.username)
      params.append('province', this.ruleForm.province)
      params.append('city', this.ruleForm.city)
      params.append('site', this.ruleForm.site)
      params.append('postcode', this.ruleForm.postcode)
      HttpManager.updateTableTwoMsg(params)
          .then(res => {
            if (res.code === 1) {
              this.$notify({
                title: '编辑成功',
                type: 'success'
              })
              this.getData()
            } else {
              this.$notify({
                title: '编辑失败',
                type: 'error'
              })
            }
          })
          .catch(err => {
            console.error(err)
          })
      this.editVisible = false
    },
    getData(){
      HttpManager.getTableList().then((res) => {
        console.log("test:",res)
        this.allTableData = res
        // this.tempDate = res
        this.currentPage = 1
        this.tableData = this.allTableData.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize)
      })
    },
    search(){
      console.log(this.userid)
      HttpManager.TableList2(this.userid).then((res) => {
        console.log("test:",res)
        this.allTableData = res
        // this.tempDate = res
        this.currentPage = 1
        this.tableData = this.allTableData.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize)
      })
    },
    resetData(){
      this.ruleForm.userid = ''
      this.ruleForm.date = ''
      this.ruleForm.city = ''
      this.ruleForm.site= ''
      this.ruleForm.province = ''
      this.ruleForm.postcode = ''
      this.ruleForm.username =''
    },

  }
}
</script>

<style scoped>

</style>