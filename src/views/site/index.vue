<template>
  <div class="app-container">
    <el-form
      ref="dataForm"
      v-loading="listLoading"
      :model="temp"
      label-width="120px"
      :label-position="labelObj"
    >
      <div class="form-container">
        <div class="form-container-body">
          <el-row>
            <el-col :md="18" :lg="18" :xl="18">
              <el-form-item label="关闭站点">
                <el-radio-group v-model="temp.is_close">
                  <el-radio :label="0">开启</el-radio>
                  <el-radio :label="1">关闭</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="开启验证码">
                <el-radio-group v-model="temp.enable_captcha">
                  <el-radio :label="1">开启</el-radio>
                  <el-radio :label="0">关闭</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="站点名称" prop="site_name">
                <el-input v-model="temp.site_name" placeholder="请输入站点名称" @keyup.enter.native="submit" />
              </el-form-item>
              <el-form-item label="站点logo">
                <el-upload
                  class="avatar-uploader"
                  :action="uploadUrl"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess"
                  :before-upload="beforeAvatarUpload"
                >
                  <img v-if="temp.site_logo" :src="temp.site_logo" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon" />
                </el-upload>
              </el-form-item>
              <el-form-item label="SEO关键词">
                <el-input v-model="temp.keywords" placeholder="请输入SEO关键词" @keyup.enter.native="submit" />
              </el-form-item>
              <el-form-item label="SEO描述">
                <el-input v-model="temp.description" placeholder="请输入SEO描述" type="textarea" />
              </el-form-item>
              <el-form-item label="版权所有">
                <el-input v-model="temp.copyright" placeholder="请输入版权所有" @keyup.enter.native="submit" />
              </el-form-item>
              <el-form-item label="公司名称">
                <el-input v-model="temp.company" placeholder="请输入公司名称" @keyup.enter.native="submit" />
              </el-form-item>
              <el-form-item label="联系人">
                <el-input v-model="temp.contact" placeholder="请输入联系人" @keyup.enter.native="submit">
                  <i slot="append" class="el-icon-user" />
                </el-input>
              </el-form-item>
              <el-form-item label="联系QQ">
                <el-input v-model="temp.qq" placeholder="请输入联系电话" @keyup.enter.native="submit">
                  <i slot="append" class="el-icon-phone-outline" />
                </el-input>
              </el-form-item>
              <el-form-item label="电子邮件">
                <el-input v-model="temp.email" placeholder="请输入电子邮件" @keyup.enter.native="submit">
                  <i slot="append" class="el-icon-document-copy" />
                </el-input>
              </el-form-item>
              <el-form-item label="联系地址">
                <el-input v-model="temp.address" placeholder="请输入联系地址" @keyup.enter.native="submit">
                  <i slot="append" class="el-icon-location" />
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
        <div class="form-container-footer">
          <el-button type="primary" size="small" @click="submit">提交</el-button>
        </div>
      </div>
    </el-form>
  </div>
</template>

<script>

const _temp = {
  is_close: 0,
  enable_captcha: 0,
  site_name: '逐影未来',
  site_logo: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/146/h/146',
  keywords: '逐影未来',
  description: '逐影未来',
  copyright: '逐影未来',
  contact: '逐影未来',
  qq: '2264535745',
  email: '2264535745@qq.com',
  company: '逐影未来',
  address: ''
}

export default {
  data() {
    return {
      listLoading: false,
      loading: false,
      uploadUrl: '',
      temp: Object.assign({}, _temp)
    }
  },
  computed: {
    labelObj() {
      return this.$store.state.app.device === 'mobile' ? 'top' : 'right'
    }
  },
  created() {
    this.getInfo()
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
    getInfo() {
      if (this.listLoading) {
        return false
      }
      this.listLoading = true
      setTimeout(() => {
        this.listLoading = false
      }, 100)
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
        this.loading = false
      }, 300)
    }
  }
}
</script>
