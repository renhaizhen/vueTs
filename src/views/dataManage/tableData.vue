<template>
    <div class="table-data">
        <div class="search-box">
            <el-input size="small" v-model="searchVal" placeholder="请输入课程名称检索"></el-input>
            <el-button size="small" type="primary" icon="el-icon-search">搜索</el-button>
        </div>
        <el-table :data="tableData" border style="width:100%;" :height="tHeight" class="table-box">
            <el-table-column type="index" label="序号" width="60" align="center"></el-table-column>
            <el-table-column label="课程名称" prop="title" align="center"></el-table-column>
            <el-table-column label="课程等级" prop="level" width="120" align="center"></el-table-column>
            <el-table-column label="技术栈" prop="type" width="120" align="center"></el-table-column>
            <el-table-column label="报名人数" prop="count" width="120" align="center"></el-table-column>
            <el-table-column label="上线日期" prop="date" width="120" align="center"></el-table-column>
            <!-- 操作 -->
             <el-table-column label="操作" width="160" align="center">
                 <template>
                     <el-button size="mini">
                         编辑
                     </el-button>
                      <el-button size="mini" type="danger">
                         删除
                     </el-button>
                 </template>
             </el-table-column>
        </el-table>
             <!-- 分页 -->
        <div class="pages" ref="page-box">
            <el-pagination :page-sizes="[5,10,15]" :page-size="size" layout="total,prev,sizes,next,jumper,pager"></el-pagination>
        </div>
    </div>
</template>

<script lang="ts"> 
//装饰器对现有函数或类进行扩展或补充
import {Component,Vue,Provide} from 'vue-property-decorator'
@Component({
    components:{}
})
export default class TableData extends Vue {
    @Provide() searchVal:string = ''  //搜索框
    @Provide() tHeight:number = document.body.offsetHeight-270 //可视区域
    @Provide() tableData:any =[] //表格数据
    @Provide() page:number = 1 //当前page
    @Provide() size:number = 5 //请求数据个数 默认5
    @Provide() total:number = 0 // 总数据条数

    created(){
        this.loadData()
    }

    loadData() {
    (this as any)
      .$axios(`/api/profiles/loadMore/${this.page}/${this.size}`)
      .then((res: any) => {
        console.log(res.data);
        this.tableData = res.data.data.list;
        this.total = res.data.data.total;
      });
  }

}
</script>

<style lang="scss" scoped>
.table-data {
  height: 100%;
  .table-box {
    font-size: 14px;
  }
  .pages {
    background: #fff;
    margin-top: 10px;
    padding: 10px 10px;
    text-align: right;
    height: 55px;
    box-sizing: border-box;
  }
  .search-box {
    background: #fff;
    margin-bottom: 10px;
    padding: 10px 10px;
    border-radius: 4px;
    height: 55px;
    box-sizing: border-box;
    .el-input {
      width: 200px;
      margin-right: 10px;
    }
  }
}
</style>