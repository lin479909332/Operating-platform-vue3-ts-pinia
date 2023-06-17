<template>
  <el-card class="box-card">
    <!-- 卡片顶部添加品牌按钮 -->
    <el-button type="primary" icon="Plus" @click="addTrademark">添加品牌</el-button>
    <!-- 表格组件 -->
    <el-table border style="margin: 10px 0" :data="trademarkArr">
      <el-table-column label="序号" width="80px" align="center" type="index"></el-table-column>
      <el-table-column label="品牌名称" prop="tmName"></el-table-column>
      <el-table-column label="品牌LOGO">
        <template #="{ row }">
          <img :src="row.logoUrl" style="width: 100px; height: 100px" />
        </template>
      </el-table-column>
      <el-table-column label="品牌操作">
        <template #="{ row }">
          <el-button
            type="warning"
            size="small"
            icon="edit"
            @click="updateTrademark(row)"
          ></el-button>
          <el-popconfirm
            :title="`您确定要删除${row.tmName}吗？`"
            width="250px"
            icon="Delete"
            icon-color="#FF0000"
            @confirm="removeTradeMark(row.id)"
          >
            <template #reference>
              <el-button type="danger" size="small" icon="delete"></el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页器组件
        pagination
          v-model:current-page:设置分页器当前页码
          v-model:page-size:设置每一个展示数据条数
          page-sizes:用于设置下拉菜单数据
          background:设置分页器按钮的背景颜色
          layout:可以设置分页器六个子组件布局调整
     -->
    <el-pagination
      v-model:current-page="pageNo"
      v-model:page-size="limit"
      :page-sizes="[3, 5, 7, 9]"
      :background="true"
      layout="prev, pager, next, jumper, ->, total, sizes"
      :total="total"
    />
  </el-card>
  <!-- 对话框组件 添加/修改品牌 -->
  <el-dialog
    v-model="dialogFormVisible"
    :title="trademarkParams.id ? '修改品牌' : '添加品牌'"
    @close="dialogClose"
  >
    <el-form style="width: 80%" :model="trademarkParams" :rules="rules" ref="formRef">
      <el-form-item label="品牌名称" label-width="100px" prop="tmName">
        <el-input placeholder="请输入品牌名称" v-model="trademarkParams.tmName"></el-input>
      </el-form-item>
      <el-form-item label="品牌LOGO" label-width="100px" prop="logoUrl">
        <!-- upload组件属性:action图片上传路径书写/api,代理服务器不发送这次post请求 -->
        <el-upload
          class="avatar-uploader"
          action="/api/admin/product/fileUpload"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="trademarkParams.logoUrl" :src="trademarkParams.logoUrl" class="avatar" />
          <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
        </el-upload>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="cancel">取消</el-button>
      <el-button type="primary" @click="confirm">确定</el-button>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref, onMounted, watch, reactive } from 'vue'
import {
  reqHasTrademark,
  reqAddOrUpdateTrademark,
  reqDeleteTrademark,
} from '@/api/product/trademark/index'
import type { Records, TrademarkResponseData, Trademark } from '@/api/product/trademark/type'
import { ElMessage, UploadProps } from 'element-plus'

// 当前页面
let pageNo = ref<number>(1)

// 每页展示多少条数据
let limit = ref<number>(3)

// 存储已有品牌数据总数
let total = ref<number>(0)

// 存储已有品牌的数据
let trademarkArr = ref<Records>([])

// 控制对话框的显示与隐藏
let dialogFormVisible = ref<boolean>(false)

// 获取表单组件实例
const formRef = ref()

// 收集新增品牌的数据
let trademarkParams = reactive<Trademark>({
  tmName: '',
  logoUrl: '',
})

// 获取已有品牌的接口 这个接口需要多次调用，这里封装成函数(默认传参返回第一页的结果)
const getHasTrademark = async (pager = 1) => {
  pageNo.value = pager
  let result: TrademarkResponseData = await reqHasTrademark(pageNo.value, limit.value)
  if (result.code === 200) {
    // 存储数据
    total.value = result.data.total
    trademarkArr.value = result.data.records
    // 接口返回的图片出错了 自己处理了一下
    if (result.data.records[0].id === 1) {
      trademarkArr.value[0].logoUrl =
        'http://39.98.123.211/group1/M00/03/D9/rBHu8mHmKC6AQ-j2AAAb72A3EO0942.jpg'
    }
  }
}

// 组件加载完毕时调用获取品牌的接口
onMounted(() => {
  getHasTrademark()
})

/* 使用事件监听 官方不推荐

// 页码发生变化 可以用参数接收一个回传，回传结果是跳转的页码(官方不推荐这么搞改成监听了)
// const changePageNo = () => {
//   getHasTrademark()
// }
// 官方不推荐这么搞改成监听了
// const sizeChange = () => {
//   getHasTrademark()
// }

*/

// pageNo 已被双向绑定所以这里监听 pageNo 变化发请求即可 limit 同理
watch([pageNo, limit], () => {
  getHasTrademark(pageNo.value)
})

// 添加品牌
const addTrademark = () => {
  // 显示对话框
  dialogFormVisible.value = true
}

// 修改品牌
const updateTrademark = (row: Trademark) => {
  // 显示对话框
  dialogFormVisible.value = true
  // 展示已有品牌数据（附加上id）
  // trademarkParams.id = row.id
  // trademarkParams.tmName = row.tmName
  // trademarkParams.logoUrl = row.logoUrl
  // ES6合并语法对象 与上面的等价
  Object.assign(trademarkParams, row)
}

// 点击对话框的取消按钮
const cancel = () => {
  // 隐藏对话框
  dialogFormVisible.value = false
}

// 点击对话框的确定按钮
const confirm = async () => {
  // 等待校验通过后再执行后面的代码
  await formRef.value.validate()
  // 添加/修改品牌
  let result: any = await reqAddOrUpdateTrademark(trademarkParams)
  if (result.code == 200) {
    ElMessage({
      type: 'success',
      message: trademarkParams.id ? '修改品牌成功' : '添加品牌成功',
    })
    // 上传成功后重新刷新数据
    getHasTrademark(trademarkParams.id ? pageNo.value : 1)
  } else {
    ElMessage({
      type: 'error',
      message: trademarkParams.id ? '修改品牌失败' : '添加品牌失败',
    })
  }
  // 隐藏对话框
  dialogFormVisible.value = false
}

// 图片上传之前的钩子
const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  if (
    rawFile.type === 'image/png' ||
    rawFile.type === 'image/jpeg' ||
    rawFile.type === 'image/gif'
  ) {
    if (rawFile.size / 1024 / 1024 < 4) {
    } else {
      ElMessage({
        type: 'error',
        message: '图片大小应小于4MB！',
      })
      return false
    }
  } else {
    ElMessage({
      type: 'error',
      message: '只支持png、jpg、jpeg、gif格式的图片！',
    })
    return false
  }
}

// 图片上传成功后的钩子
const handleAvatarSuccess: UploadProps['onSuccess'] = (response, _uploadFile) => {
  //response:即为当前这次上传图片post请求服务器返回的数据
  //收集上传图片的地址,添加一个新的品牌的时候带给服务器
  trademarkParams.logoUrl = response.data
  //图片上传成功,清除掉对应图片校验结果
  formRef.value.clearValidate('logoUrl')
}

// 对话框关闭
const dialogClose = () => {
  // 关闭时清空数据
  trademarkParams.id = undefined
  trademarkParams.tmName = ''
  trademarkParams.logoUrl = ''
  // formRef.value.clearValidate('tmName')
  // formRef.value.clearValidate('logoUrl')
  // 重置该表单项，将其值重置为初始值，并移除校验结果(和上面的等价)
  formRef.value.resetFields()
}

// 针对品牌名的校验规则
const validateTmName = (_rule: any, value: any, callBack: any) => {
  if (value.trim().length >= 2) {
    callBack()
  } else {
    callBack(new Error('品牌名称长度不能小于2位'))
  }
}

// 针对品牌图片的校验规则
const validateLogoUrl = (_rule: any, value: any, callBack: any) => {
  if (value) {
    callBack()
  } else {
    callBack(new Error('品牌图片不能为空'))
  }
}

// 表单校验规则
const rules = {
  tmName: [{ required: true, trigger: 'blur', validator: validateTmName }],
  logoUrl: [{ required: true, validator: validateLogoUrl }],
}

// 删除品牌
const removeTradeMark = async (id: number) => {
  let result = await reqDeleteTrademark(id)
  if (result.code === 200) {
    ElMessage({
      type: 'success',
      message: '删除品牌成功',
    })
    getHasTrademark(trademarkArr.value.length > 1 ? pageNo.value : pageNo.value - 1)
  } else {
    ElMessage({
      type: 'error',
      message: '删除品牌失败',
    })
  }
}
</script>

<style scoped>
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
