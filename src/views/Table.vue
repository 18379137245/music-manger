<template>
  <el-table
      :data="tableData"
      style="width: 100%"
      max-height="250">
    <el-table-column fixed prop="date" label="日期" width="150">
      <template v-slot="scope">
        <div>{{ scope.row.date }}</div>
      </template>
    </el-table-column>
    <el-table-column prop="name" label="姓名" width="120">
      <template v-slot="scope">
        <div>{{ scope.row.name }}</div>
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
    <el-table-column prop="address" label="地址" width="300">
      <template v-slot="scope">
        <div>{{ scope.row.address }}</div>
      </template>
    </el-table-column>
    <el-table-column prop="zip" label="邮编" width="120">
      <template v-slot="scope">
        <div>{{ scope.row.zip }}</div>
      </template>
    </el-table-column>
    <el-table-column fixed="right" label="操作" width="120">
      <template v-slot="scope">
        <el-button
            @click.prevent="deleteRow(scope.$index, tableData)"
            type="text"
            size="small">
          移除
        </el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  name: "Table",
  data() {
    return {
      tableData: [{
        date: '2016-05-03',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-02',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-04',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-01',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-08',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-06',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-07',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }]
    }
  }
}
</script>

<style scoped>

</style>