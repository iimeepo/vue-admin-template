<template>
  <div class="app-container">
    <div class="filter-container">
      <el-button
        size="small"
        class="filter-item"
        type="primary"
        icon="el-icon-plus"
        @click="add"
      >
        新增
      </el-button>
    </div>

    <el-table
      ref="tree"
      v-loading="listLoading"
      element-loading-text="Loading"
      border
      fit
      height="100%"
      class="table-container"
      highlight-current-row
      :data="list"
      row-key="id"
      default-expand-all
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
    >
      <el-table-column
        fixed
        label="ID"
        width="120"
      >
        <template slot-scope="scope">{{ scope.row.id }}</template>
      </el-table-column>
      <el-table-column
        align="center"
        label="排序"
        width="80"
      >
        <template slot-scope="scope">{{ scope.row.sort }}</template>
      </el-table-column>
      <el-table-column
        label="菜单名称"
      >
        <template slot-scope="scope">{{ scope.row.title }}</template>
      </el-table-column>
      <el-table-column
        label="菜单标识"
      >
        <template slot-scope="scope">{{ scope.row.name }}</template>
      </el-table-column>
      <el-table-column
        label="菜单路径"
      >
        <template slot-scope="scope">{{ scope.row.path }}</template>
      </el-table-column>
      <el-table-column
        align="center"
        label="状态"
        width="100"
      >
        <template slot-scope="scope">
          <el-switch :value="scope.row.status" :active-value="1" :inactive-value="0" @change="handleUpdateStatus(scope)" />
        </template>
      </el-table-column>
      <el-table-column
        fixed="right"
        align="center"
        label="操作"
        width="270"
      >
        <template slot-scope="scope">
          <el-button-group>
            <el-button
              type="primary"
              icon="el-icon-plus"
              size="mini"
              @click="append(scope)"
            >
              新增
            </el-button>
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
        <el-form-item label="菜单排序">
          <el-input-number v-model="temp.sort" :precision="0" :min="0" />
        </el-form-item>
        <el-form-item label="所属上级">
          <el-cascader
            v-model="temp.pid"
            :options="parents"
            :props="{ checkStrictly: true, emitPath: false, expandTrigger: 'hover', value: 'id', label: 'title' }"
            :show-all-levels="false"
            clearable
          />
        </el-form-item>
        <el-form-item label="菜单名称">
          <el-input v-model="temp.title" placeholder="请输入菜单名称" />
        </el-form-item>
        <el-form-item label="菜单标识">
          <el-input v-model="temp.name" placeholder="请输入菜单标识" />
        </el-form-item>
        <el-form-item label="菜单图标">
          <el-input v-model="temp.icon" placeholder="请输入菜单图标" />
        </el-form-item>
        <el-form-item label="菜单路径">
          <el-input v-model="temp.path" placeholder="请输入菜单路径" />
        </el-form-item>
        <el-form-item label="菜单状态">
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
import { getList } from '@/api/menu'
import { deepClone } from '@/utils'

const _temp = {
  id: '',
  pid: '',
  sort: 0,
  title: '',
  name: '',
  status: 1
}

export default {

  data() {
    return {
      filterText: '',
      list: [],
      parents: [],
      defaultProps: {
        children: 'children',
        label: 'title'
      },
      listLoading: true,
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
    fetchData() {
      this.listLoading = true
      getList().then(response => {
        this.list = response.data.list
        this.parents = [...[{
          id: '',
          title: '根目录'
        }], ...response.data.list]
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
    append(scope) {
      this.resetTemp()
      this.dialogVisible = true
      this.dialogType = 'append'
      const temp = deepClone(scope.row)
      this.temp.pid = temp.id
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

