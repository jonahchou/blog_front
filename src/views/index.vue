<template>
  <div class="box">
    <div class="search_detail">
      <el-row :gutter="20" style="padding-left: 20px">
        <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="4">
          <el-form-item label="问题：">
            <el-input
                class="search_input"
                v-model="wenTi"
                @keyup.enter.native="getData"
            />
          </el-form-item>
        </el-col>
        <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="4">
          <el-form-item label="卦象：">
            <el-input
                class="search_input"
                v-model="guaMing"
                @keyup.enter.native="getData"
            />
          </el-form-item>
        </el-col>
        <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="6">
          <el-form-item label="起卦时间：">
            <el-date-picker
                @change="getData"
                style="width: 332px"
                v-model="searchTime"
                type="daterange"
                range-separator="-"
                start-placeholder="开始时间"
                end-placeholder="结束时间"
                format="YYYY 年 MM 月 DD 日"
                value-format="YYYY-MM-DD"
            >
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="6">
          <el-button size="small" type="primary" @click="getData">
            <el-icon style="margin-right: 5px"><Search /></el-icon> 搜索
          </el-button>
          <el-button size="small" @click="reset">
            <el-icon style="margin-right: 5px"><Refresh /></el-icon> 重置
          </el-button>
        </el-col>
      </el-row>
    </div>
    <div>
      <el-row>
        <el-col
            v-for="(o, index) in this.cardData"
            :key="o"
            :span="3"
            :offset="index > 0 ? 1 : 0"
        >
          <el-card class="card" :body-style="{ padding: '0px' }">
            <img
                :src="this.imgUrl+o.paiPan"
                class="image"
            />
            <div style="padding: 14px">
              <p>{{o.guaXiang}}</p><br/>
              <p>{{o.wenTi}}</p><br/>
              <p>{{o.createTime}}</p>
              <el-button type="primary" @click="xiangQing(index,o)">详情</el-button>
            </div>
          </el-card>
        </el-col>
      </el-row>
      <div class="page_and_button">
        <el-pagination
            style="margin-right: 25px; float: right"
            small
            background
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="pageSizes"
            :page-size="PageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="totalCount"
        >
          hide-on-single-page
        </el-pagination>
      </div>
    </div>

  </div>
</template>

<script>
import request from "../../../blog_back/src/utils/request";
import router from "@/router";
export default {
  name: "index",
  data() {
    return{
      // 总数据
      cardData: [],
      // 默认显示第几页
      currentPage: 1,
      // 总条数，根据接口获取数据长度(注意：这里不能为空)
      totalCount: 1,
      // 个数选择器（可修改）
      pageSizes: [10, 20, 30],
      // 默认每页显示的条数（可修改）
      PageSize: 20,

      //搜索参数
      wenTi: "",
      guaMing: "",
      searchTime: "",

      ipUrl: "",
      imgUrl: "",
    }
  },
  created() {
    this.getData()
    this.ipUrl=window.location.host
    this.imgUrl = "http://" + this.ipUrl.replace(/8809/g, "8088")
  },
  methods:{
    getData() {
      return request(
          {
            method: 'get',
            url: '/liuYao/findLiuYaoPage', // 目标地址
            params: {
              wenTi: this.wenTi,
              guaMing: this.guaMing,
              startTime: this.searchTime[0],
              endTime: this.searchTime[1],
              pageSize: this.PageSize,
              pageNum: this.currentPage
            }
          }
      ).then(res => {
        if (res.code == 'success') {
          this.cardData = [];
          for (let i = 0; i < res.data.records.length; i++) {
            this.cardData.push(res.data.records[i])
          }
          this.pageNum = res.data.pages
          this.totalCount = res.data.total
          console.log(this.cardData.length)
        }
      })
    },
    reset() {
      this.wenTi = "";
      this.guaMing = "";
      this.searchTime = "";
      this.getData()
    },
    // 每页显示的条数
    handleSizeChange(val) {
      // 改变每页显示的条数
      this.PageSize = val
      // 点击每页显示的条数时，显示第一页
      this.getData(val, 1)
      // 注意：在改变每页显示的条数时，要将页码显示到第一页
      this.currentPage = 1
    },
    // 显示第几页
    handleCurrentChange(val) {
      // 改变默认的页数
      this.currentPage = val
      // 切换页码时，要获取每页显示的条数
      this.getData(this.PageSize, (val) * (this.pageSize))
    },
    xiangQing(index,o) {
      console.log(o)
      this.$router.push({
        path: '/XiangQing',
        query: {
          wenTi: o.wenTi,
          createTime: o.createTime,
          guaXiang: o.guaXiang,
          paiPan: this.imgUrl+o.paiPan,
          duanGua: o.duanGua,
          beiZhu: o.beiZhu
        }
      });
    }
  }
}
</script>

<style scoped>
.card {
  width: 250px;
  height: 350px;
}
.time {
  font-size: 12px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.button {
  padding: 0;
  min-height: auto;
}

.image {
  width: 100%;
  height: 200px;
  display: block;
}
</style>