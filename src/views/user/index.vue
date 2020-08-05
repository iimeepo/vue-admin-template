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
        v-model="listQuery.status"
        size="small"
        placeholder="选择状态"
        clearable
        class="filter-item"
      >
        <el-option label="正常" :value="1" />
        <el-option label="禁用" :value="0" />
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
        <el-button
          size="small"
          type="primary"
          icon="el-icon-plus"
          @click="add"
        >
          新增
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
        fixed
        label="ID"
        width="80"
        align="center"
      >
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column
        label="用户名"
        width="150"
        align="center"
      >
        <template slot-scope="scope">
          {{ scope.row.username }}
        </template>
      </el-table-column>
      <el-table-column
        label="真实姓名"
        width="150"
        align="center"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.truename }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="用户类型"
        width="100"
        align="center"
      >
        <template slot-scope="scope">
          {{ scope.row.type }}
        </template>
      </el-table-column>
      <el-table-column
        label="邮箱"
        align="center"
      >
        <template slot-scope="scope">
          {{ scope.row.email }}
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
        label="上次登录"
        width="160"
        align="center"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.last_time }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="注册时间"
        width="160"
        align="center"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.created_at }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="状态"
        width="80"
        align="center"
      >
        <template slot-scope="scope">
          <el-switch
            :value="scope.row.status"
            :active-value="1"
            :inactive-value="0"
            @change="changeStatus($event, scope)"
          />
        </template>
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="200"
        align="center"
      >
        <template slot-scope="scope">
          <el-button-group>
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
              @click="edit(scope)"
            >
              修改
            </el-button>
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              @click="del(scope)"
            >
              删除
            </el-button>
          </el-button-group>
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

    <el-dialog
      :visible.sync="dialogVisible"
      :title="dialogType === 'modify' ? '修改' : '新增'"
    >
      <el-form
        ref="dataForm"
        :model="temp"
        label-width="120px"
        label-position="right"
      >
        <el-form-item label="用户名">
          <el-input v-model="temp.username" placeholder="请输入用户名" />
        </el-form-item>
        <el-form-item label="真实姓名">
          <el-input v-model="temp.truename" placeholder="请输入真实姓名" />
        </el-form-item>
        <el-form-item label="电子邮箱">
          <el-input v-model="temp.email" placeholder="请输入电子邮箱" />
        </el-form-item>
        <el-form-item label="用户类型">
          <el-radio-group v-model="temp.type">
            <el-radio label="管理员">管理员</el-radio>
            <el-radio label="编辑">编辑</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="用户角色">
          <el-checkbox-group v-model="temp.role">
            <el-checkbox label="超级管理员" />
            <el-checkbox label="编辑人员" />
            <el-checkbox label="审核人员" />
            <el-checkbox label="客服人员" />
            <el-checkbox label="普通用户" />
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="用户状态">
          <el-radio-group v-model="temp.status">
            <el-radio :label="0">禁用</el-radio>
            <el-radio :label="1">正常</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div class="text-right">
        <el-button type="danger" @click="dialogVisible = false">
          取消
        </el-button>
        <el-button type="primary" @click="submit">
          确定
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import { getList } from '@/api/user'
import { deepClone } from '@/utils'

const _temp = {
  id: '',
  username: '',
  truename: '',
  role: [],
  type: '管理员',
  email: '',
  status: 1
}

export default {
  components: {
    Pagination
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
        keyword: undefined
      },
      temp: Object.assign({}, _temp),
      dialogVisible: false,
      dialogType: 'create',
      loading: false
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
    },
    resetTemp() {
      this.temp = Object.assign({}, _temp)
    },
    add() {
      this.resetTemp()
      this.dialogVisible = true
      this.dialogType = 'create'
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    edit(scope) {
      this.resetTemp()
      this.dialogVisible = true
      this.dialogType = 'modify'
      this.temp = deepClone(scope.row)
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    changeStatus(value, scope) {
      setTimeout(() => {
        this.list[scope.$index].status = value
        this.$message({
          message: '更新成功',
          type: 'success'
        })
      }, 300)
    },
    del(scope) {
      this.$confirm('确认删除该条数据吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        setTimeout(() => {
          this.list.splice(scope.$index, 1)
          this.$message({
            message: '删除成功',
            type: 'success'
          })
        }, 300)
      })
    },
    submit() {
      if (this.loading) {
        return
      }
      this.loading = true
      setTimeout(() => {
        this.$message({
          message: '提交成功',
          type: 'success'
        })
        this.dialogVisible = false
        this.loading = false
      }, 300)
    }
  }
}
</script>
