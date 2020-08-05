<template>
  <div class="app-container">
    <div class="filter-container">
      <el-date-picker
        v-model="listQuery.created_at"
        size="small"
        type="datetimerange"
        range-separator="-"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        value-format="yyyy-MM-dd HH:mm:ss"
        class="filter-item"
        :editable="false"
      />
      <el-select
        v-model="listQuery.level"
        size="small"
        placeholder="选择日志级别"
        clearable
        class="filter-item"
      >
        <el-option label="DEBUG" :value="'DEBUG'" />
        <el-option label="INFO" :value="'INFO'" />
        <el-option label="WARNING" :value="'WARNING'" />
        <el-option label="ERROR" :value="'ERROR'" />
      </el-select>
      <el-select
        v-model="listQuery.method"
        size="small"
        placeholder="选择请求方法"
        clearable
        class="filter-item"
      >
        <el-option label="GET" :value="'GET'" />
        <el-option label="POST" :value="'POST'" />
        <el-option label="PUT" :value="'PUT'" />
        <el-option label="PATCH" :value="'PATCH'" />
        <el-option label="DELETE" :value="'DELETE'" />
      </el-select>
      <el-input
        v-model="listQuery.keyword"
        size="small"
        placeholder="请输入关键词"
        clearable
        class="filter-item w-200"
      />
      <el-button-group class="filter-item">
        <el-button
          size="small"
          type="primary"
          icon="el-icon-search"
          @click="search"
        >
          搜索
        </el-button>
        <el-button
          size="small"
          type="primary"
          icon="el-icon-refresh"
          @click="refresh"
        >
          重置
        </el-button>
      </el-button-group>
    </div>

    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      height="100%"
      class="table-container"
      highlight-current-row
    >
      <el-table-column
        align="center"
        label="ID"
        width="95"
      >
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column
        label="行为描述"
      >
        <template slot-scope="scope">
          {{ scope.row.title }}
        </template>
      </el-table-column>
      <el-table-column
        label="日志级别"
        width="120"
        align="center"
      >
        <template slot-scope="scope">
          <el-tag :type="scope.row.level | levelFilter">{{ scope.row.level }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        label="请求方法"
        width="100"
        align="center"
      >
        <template slot-scope="scope">
          {{ scope.row.method }}
        </template>
      </el-table-column>
      <el-table-column
        label="响应时间"
        width="100"
        align="center"
      >
        <template slot-scope="scope">
          {{ scope.row.time }} ms
        </template>
      </el-table-column>
      <el-table-column
        label="IP地址"
        width="130"
        align="center"
      >
        <template slot-scope="scope">
          {{ scope.row.ip }}
        </template>
      </el-table-column>
      <el-table-column
        label="操作人"
        width="100"
        align="center"
      >
        <template slot-scope="scope">
          {{ scope.row.author }}
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="操作时间"
        width="160"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.created_at }}</span>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="fetchData"
    />
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import { getList } from '@/api/log'

export default {
  components: {
    Pagination
  },
  filters: {
    levelFilter(level) {
      const levelMap = {
        'DEBUG': 'success',
        'INFO': '',
        'WARNING': 'warning',
        'ERROR': 'danger'
      }
      return levelMap[level]
    }
  },
  data() {
    return {
      total: 0,
      list: [],
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        created_at: undefined,
        status: undefined,
        level: undefined,
        method: undefined,
        keyword: undefined
      }
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    search() {
      this.fetchData()
    },
    refresh() {
      this.listQuery = {
        page: 1,
        limit: 20,
        created_at: undefined,
        status: undefined,
        level: undefined,
        method: undefined,
        keyword: undefined
      }
      this.fetchData()
    },
    fetchData() {
      this.listLoading = true
      getList(this.listQuery).then(response => {
        this.list = response.data.items
        this.total = response.data.total
        this.listLoading = false
      })
    }
  }
}
</script>
