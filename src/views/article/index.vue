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
        v-model="listQuery.category"
        size="small"
        placeholder="选择分类"
        clearable
        class="filter-item"
      >
        <el-option label="新闻" :value="'新闻'" />
        <el-option label="公告" :value="'公告'" />
        <el-option label="动态" :value="'动态'" />
      </el-select>
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
        align="center"
        width="150"
        label="文章封面"
      >
        <template slot-scope="scope">
          <img :src="scope.row.icon" height="50">
        </template>
      </el-table-column>
      <el-table-column
        label="文章名称"
        align="center"
      >
        <template slot-scope="scope">
          {{ scope.row.title }}
        </template>
      </el-table-column>
      <el-table-column
        label="文章分类"
        width="120"
        align="center"
      >
        <template slot-scope="scope">
          {{ scope.row.category }}
        </template>
      </el-table-column>
      <el-table-column
        label="阅读量"
        width="120"
        align="center"
      >
        <template slot-scope="scope">
          {{ scope.row.read }}
        </template>
      </el-table-column>
      <el-table-column
        label="评论量"
        width="120"
        align="center"
      >
        <template slot-scope="scope">
          {{ scope.row.comment }}
        </template>
      </el-table-column>
      <el-table-column
        label="发布时间"
        width="160"
        align="center"
      >
        <template slot-scope="scope">
          {{ scope.row.created_at }}
        </template>
      </el-table-column>
      <el-table-column
        label="作者"
        width="120"
        align="center"
      >
        <template slot-scope="scope">
          {{ scope.row.author }}
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
      destroy-on-close
      :title="dialogType === 'modify' ? '修改' : '新增'"
    >
      <el-form
        ref="dataForm"
        :model="temp"
        label-width="120px"
        label-position="right"
      >
        <el-form-item label="文章封面">
          <el-upload
            class="avatar-uploader"
            :action="uploadUrl"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="temp.icon" :src="temp.icon" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon" />
          </el-upload>
        </el-form-item>
        <el-form-item label="文章名称">
          <el-input v-model="temp.title" placeholder="请输入文章名称" />
        </el-form-item>
        <el-form-item label="文章分类">
          <el-radio-group v-model="temp.category">
            <el-radio label="新闻" />
            <el-radio label="公告" />
            <el-radio label="动态" />
          </el-radio-group>
        </el-form-item>
        <el-form-item label="文章正文">
          <tinymce v-model="temp.content" :height="300" />
        </el-form-item>
        <el-form-item label="阅读量">
          <el-input-number v-model="temp.read" :precision="0" :min="0" />
        </el-form-item>
        <el-form-item label="评论量">
          <el-input-number v-model="temp.comment" :precision="0" :min="0" />
        </el-form-item>
        <el-form-item label="作者">
          <el-input v-model="temp.author" placeholder="请输入作者" />
        </el-form-item>
        <el-form-item label="用户组状态">
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
import Tinymce from '@/components/Tinymce'
import { getList } from '@/api/article'
import { deepClone } from '@/utils'

const _temp = {
  id: '',
  icon: '',
  title: '',
  category: [],
  content: '',
  read: '',
  comment: '',
  created_at: '',
  author: '',
  status: 1
}

export default {
  components: {
    Pagination,
    Tinymce
  },
  data() {
    return {
      total: 0,
      list: [],
      menus: [],
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        created_at: undefined,
        category: undefined,
        status: undefined,
        keyword: undefined
      },
      uploadUrl: '',
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
    handleAvatarSuccess(res, file) {
      this.temp.site_logo = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload(file) {
      if (!this.uploadUrl) {
        this.$message.error('请设置正确的图片上传地址!')
        return false
      }
      const isJPG = file.type === 'image/*'
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isJPG) {
        this.$message.error('只能上传图片格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    search() {
      this.fetchData()
    },
    refresh() {
      this.listQuery = {
        page: 1,
        limit: 20,
        created_at: undefined,
        category: undefined,
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

<style lang="scss" scoped>
.el-upload {
  border: 1px dashed #d9d9d9 !important;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;

  .el-icon-plus.avatar-uploader-icon {
    border: 1px dashed #d9d9d9 !important;
    border-radius: 6px;
    font-size: 28px;
    color: #8c939d;
    width: 128px;
    height: 128px;
    line-height: 128px;
    text-align: center;
  }
}
.avatar-uploader {
  height: 128px;

  img {
    width: 128px;
    height: 128px;
  }
}
</style>
