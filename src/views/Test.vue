<template>
  <div>
    <el-table
        :data="tableDataTest"
        style="width: 100%"
        height="500"
    >
      <el-table-column fixed prop="introduction" label="介绍" width="150" >
        <template v-slot="scope">
          <div>{{ scope.row.introduction }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="pic" label="图片" width="120">
        <template v-slot="scope">
          <div>{{ scope.row.pic }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="style" label="风格" width="120">
        <template v-slot="scope">
          <div>{{ scope.row.style }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="title" label="标题" width="120">
        <template v-slot="scope">
          <div>{{ scope.row.title }}</div>
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
          :total="tableData.length">
      </el-pagination>
    </div>
  </div>

</template>

<script>
import {HttpManager} from "@/api";

export default {
  name: "Test",
  methods: {
    handleClick(row) {
      console.log(row);
    },
    handleCurrentChange (val) {
      this.currentPage = val
      console.log('val:',val)
      this.tableDataTest = this.tableData.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize)
    },
  },
  created () {

    HttpManager.getSongList().then((res) => {
      console.log("test:",res)
      this.tableData = res
      this.currentPage = 1
      this.tableDataTest = this.tableData.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize)
      // this.tempDate = res

    })
  },
  data() {
    return {
      tableData:[],
      tableDataTest:[],
      pageSize: 5, // 页数
      currentPage: 1, // 当前页
      // tableData: [{
      //   introduction: '爱的速递-05-02',
      //   pic: '是是是',
      //   style: '是是是',
      //   title: '是是是 ',
      // },{
      //   introduction: '爱的速递-05-02',
      //   pic: 'dasd',
      //   style: '是是是',
      //   title: '是是是 ',
      // }]
    }
  },


}
</script>

<style scoped>

</style>