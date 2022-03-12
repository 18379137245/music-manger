<template>
  <div>
    <el-row>
      <el-col :span="4">
        <el-tag>编号</el-tag>
        <el-input v-model="product_id" placeholder="请输入内容"></el-input>
      </el-col>
      <el-col :span="4">
        <el-tag>英文名称</el-tag>
        <el-input v-model="product_ename" placeholder="请输入内容"></el-input>
      </el-col>
      <el-col :span="4">
        <el-tag>中文名称</el-tag>
        <el-input v-model="product_cname" placeholder="请输入内容"></el-input>
      </el-col>
      <el-col :span="4">
        <el-tag>数量</el-tag>
        <el-input v-model="product_quantity" placeholder="请输入内容"></el-input>
      </el-col>
      <el-col :span="8">
        
      </el-col>
      <el-col :span="8">
        <el-button  @click="search">查询</el-button>
        <el-button  @click="centerDialogVisible = true">添加</el-button>
        <el-button  @click="getData">刷新</el-button>
      </el-col>
    </el-row>
  </div>
  <el-table
      :data="tableData"
      style="width: 100%"
      max-height="500">
    <el-table-column fixed prop="product_id" label="编号" width="150">
      <template v-slot="scope">
        <div>{{ scope.row.product_id }}</div>
      </template>
    </el-table-column>
    <el-table-column fixed prop="product_ename" label="英文名称" width="150">
      <template v-slot="scope">
        <div>{{ scope.row.product_ename }}</div>
      </template>
    </el-table-column>
    <el-table-column prop="product_cname" label="中文名称" width="120">
      <template v-slot="scope">
        <div>{{ scope.row.product_cname }}</div>
      </template>
    </el-table-column>
    <el-table-column prop="product_quantity" label="数量" width="120">
      <template v-slot="scope">
        <div>{{ scope.row.product_quantity }}</div>
      </template>
    </el-table-column>
        <el-table-column fixed prop="borrow_date" label="借书日期" width="150">
      <template v-slot="scope">
        <div>{{ scope.row.borrow_date }}</div>
      </template>
    </el-table-column>
    <el-table-column fixed prop="return_date" label="还书日期" width="150">
      <template v-slot="scope">
        <div>{{ scope.row.return_date }}</div>
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
            @click="handleDelete(scope.row.product_id)">删除
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
      <el-form-item label="product_id" prop="product_id">
        <el-input  v-model="ruleForm.product_id"></el-input>
      </el-form-item>
      <el-form-item label="product_ename" prop="product_ename">
        <el-input  v-model="ruleForm.product_ename"></el-input>
      </el-form-item>
      <el-form-item label="product_cname" prop="product_cname">
        <el-input v-model="ruleForm.product_cname"></el-input>
      </el-form-item>
      <el-form-item label="product_quantity" prop="product_quantity">
        <el-input v-model="ruleForm.product_quantity" ></el-input>
      </el-form-item>
       <el-form-item label="borrow_date" prop="borrow_date">
        <el-input v-model="ruleForm.borrow_date" ></el-input>
      </el-form-item>
      <el-form-item label="return_date" prop="return_date">
        <el-input v-model="ruleForm.return_date" ></el-input>
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
      <el-form-item label="product_id" prop="product_id">
        <el-input  v-model="ruleForm.product_id"></el-input>
      </el-form-item>
      <el-form-item label="product_ename" prop="product_ename">
        <el-input  v-model="ruleForm.product_ename"></el-input>
      </el-form-item>
      <el-form-item label="product_cname" prop="product_cname">
        <el-input v-model="ruleForm.product_cname"></el-input>
      </el-form-item>
      <el-form-item label="product_quantity" prop="product_quantity">
        <el-input v-model="ruleForm.product_quantity" ></el-input>
      </el-form-item>
      <el-form-item label="borrow_date" prop="borrow_date">
        <el-input v-model="ruleForm.borrow_date" ></el-input>
      </el-form-item>
      <el-form-item label="return_date" prop="return_date">
        <el-input v-model="ruleForm.return_date" ></el-input>
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
  name: "Product",
  data() {
    return {
      tableData: [],
      allTableData:[],
      currentPage:1,
      pageSize:5,
      product_id: '',
      product_ename: '',
      product_cname: '',
      product_quantity: '',
      return_date:'',
      borrow_date:'',
      // city: '',
      // site: '',
      // postcode:'',
      centerDialogVisible: false,
      editVisible: false,
      ruleForm: {
        product_id: '',
        product_ename: '',
        product_cname: '',
        product_quantity: '',
        return_date:'',
        borrow_date:'',
        // city: '',
        // site: '',
        // postcode:'',
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
    handleDelete(product_id){
      console.log(product_id)
      HttpManager.deleteProduct(product_id)
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
      params.append('product_id', this.ruleForm.product_id)
      params.append('product_ename', this.ruleForm.product_ename)
      params.append('product_cname', this.ruleForm.product_cname)
      params.append('product_quantity', this.ruleForm.product_quantity)
      params.append('return_date', this.ruleForm.return_date)
      params.append('borrow_date', this.ruleForm.borrow_date)

      // params.append('city', this.ruleForm.city)
      // params.append('site', this.ruleForm.site)
      // params.append('postcode', this.ruleForm.postcode)
      HttpManager.insertProduct(params)
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
      this.idx = row.product_id
      this.ruleForm = {
        product_id: row.product_id,
        product_ename: row.product_ename,
        product_cname: row.product_cname,
        product_quantity: row.product_quantity,
        return_date: row.return_date,
        borrow_date: row.borrow_date,
        // city: row.city,
        // site: row.site,
        // postcode: row.postcode
      }
      this.editVisible = true
    },
    saveEdit () {
      let params = new URLSearchParams()
      params.append('product_id', this.ruleForm.product_id)
      params.append('product_ename', this.ruleForm.product_ename)
      params.append('product_cname', this.ruleForm.product_cname)
      params.append('product_quantity', this.ruleForm.product_quantity)
      params.append('return_date', this.ruleForm.return_date)
      params.append('borrow_date', this.ruleForm.borrow_date)
      // params.append('city', this.ruleForm.city)
      // params.append('site', this.ruleForm.site)
      // params.append('postcode', this.ruleForm.postcode)
      HttpManager.updateProduct(params)
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
      HttpManager.getqueryAllProduct().then((res) => {
        console.log("test:",res)
        this.allTableData = res
        // this.tempDate = res
        this.currentPage = 1
        this.tableData = this.allTableData.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize)
      })
    },
    search(){
      let params = new URLSearchParams()
      params.append('product_id', this.product_id)
      params.append('product_ename', this.product_ename)
      params.append('product_cname', this.product_cname)
      params.append('product_quantity', this.product_quantity)
      params.append('return_date', this.ruleForm.return_date)
      params.append('borrow_date', this.ruleForm.borrow_date)
      console.log(this.product_id)
      console.log(this.product_ename)
      console.log(this.product_cname)
      console.log(this.product_quantity)
      // HttpManager.queryProductByProduct_Id(this.product_id).then((res) => {
      //   console.log("test:",res)
      //   this.allTableData = res
      //   // this.tempDate = res
      //   this.currentPage = 1
      //   this.tableData = this.allTableData.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize)
      HttpManager.queryProductBy(params).then((res) => {
        console.log("test:",res)
        this.allTableData = res
        // this.tempDate = res
        this.currentPage = 1
        this.tableData = this.allTableData.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize)
      })
    },
    resetData(){
      this.ruleForm.product_id = ''
      this.ruleForm.product_ename = ''
      this.ruleForm.product_cname = ''
      this.ruleForm.product_quantity= ''
      this.ruleForm.return_date=''
      this.ruleForm.borrow_date=''
      // this.ruleForm.province = ''
      // this.ruleForm.postcode = ''
      // this.ruleForm.username =''
    },

  }
}
</script>

<style scoped>

</style>