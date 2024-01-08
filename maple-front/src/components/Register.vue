<template>
  <el-dialog v-model="isRegisterShow" title="注册" width="50%" align-center>
    <!-- <span>Open the dialog from the center from the screen</span> -->
    <template #footer>
      <el-form ref="ruleFormRef" :model="userdata" status-icon :rules="rules" label-width="100px" class="demo-ruleForm">
        <el-form-item label="用户名" prop="name">
          <el-input v-model="userdata.name" />
        </el-form-item>

        <el-form-item label="手机号" prop="phone">
          <el-input v-model="userdata.phone" />
        </el-form-item>

        <el-form-item label="验证码" prop="code">
          <el-input v-model="userdata.code" style="width: 25%;">
            <template #append>
              <el-button>发送验证码</el-button>
            </template>
          </el-input>
        </el-form-item>

        <el-form-item label="性别" prop="sex">
          <el-radio-group v-model="userdata.sex">
            <el-radio :label="0">女</el-radio>
            <el-radio :label="1">男</el-radio>
            <el-radio :label="2">其他</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="头像" prop="icon">
          <el-upload class="avatar-uploader" :action="uploadUrl" :show-file-list="false" :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <img v-if="imageUrl.data" :src="imageUrl.data" class="avatar" />
            <el-icon v-else class="avatar-uploader-icon">
              <Plus />
            </el-icon>
          </el-upload>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm(ruleFormRef)">Submit</el-button>
          <el-button @click="resetForm(ruleFormRef)">Reset</el-button>
        </el-form-item>
      </el-form>
    </template>
  </el-dialog>
</template>
  
<script setup lang="ts">

import { reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import emitter from '../utils/emitter' //绑定事件
import { ElMessage } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'
import type { UploadProps } from 'element-plus'

//表单数据
let userdata = reactive({
  name: '',
  phone: '',
  sex: 2,
  icon: '',
  code: ''
})



//图像上传
let imageUrl = reactive({
  code: '',
  msg: '',
  data: ''
})
let uploadUrl = ref('http://localhost:8080/fileUpload') //文件上传的接口
//上传图片成功的回调函数
const handleAvatarSuccess = (
  response
) => {
  imageUrl.data = response.data  //上传图片成功后端将响应该图片的URL
}

const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  // if (rawFile.type !== 'image/jpeg') {
  //   ElMessage.error('Avatar picture must be JPG format!')
  //   return false
  // } else 
  if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error('Avatar picture size can not exceed 2MB!')
    return false
  }
  return true
}


let isRegisterShow = ref(false) //控制注册窗口的显示
//绑定一个显示注册窗口的事件
emitter.on('show-register', (value: boolean) => {
  isRegisterShow.value = value
})


const ruleFormRef = ref<FormInstance>()

const checkAge = (rule: any, value: any, callback: any) => {
  if (!value) {
    return callback(new Error('Please input the age'))
  }
  setTimeout(() => {
    if (!Number.isInteger(value)) {
      callback(new Error('Please input digits'))
    } else {
      if (value < 18) {
        callback(new Error('Age must be greater than 18'))
      } else {
        callback()
      }
    }
  }, 1000)
}

const validatePass = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('Please input the password'))
  } else {
    if (userdata.checkPass !== '') {
      if (!ruleFormRef.value) return
      ruleFormRef.value.validateField('checkPass', () => null)
    }
    callback()
  }
}
const validatePass2 = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('Please input the password again'))
  } else if (value !== userdata.pass) {
    callback(new Error("Two inputs don't match!"))
  } else {
    callback()
  }
}



//定义表单校验规则
const rules = reactive<FormRules<typeof userdata>>({
  // pass: [{ validator: validatePass, trigger: 'blur' }],
  // checkPass: [{ validator: validatePass2, trigger: 'blur' }],
  // age: [{ validator: checkAge, trigger: 'blur' }],
})

const submitForm = (formEl) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      console.log('submit!')
    } else {
      console.log('error submit!')
      return false
    }
  })
}

const resetForm = (formEl) => {
  if (!formEl) return
  formEl.resetFields()
}


function switchToLogin() {
  //关闭注册窗口
  isRegisterShow.value = false
  // 触发登录窗口的事件,切换到登录窗口
  emitter.emit('show-login', true)
}



// import { ref, reactive } from 'vue';
// import emitter from '../utils/emitter'  //绑定事件

// let isRegisterShow = ref(false) //控制注册窗口的显示
// //绑定一个显示注册窗口的事件
// emitter.on('show-register', (value) => {
//   isRegisterShow.value = value
// })

// let registerForm = reactive({
//   username: '',
//   phone: '',
//   gender: '',
//   avatar: '',
//   code: ''
// })

// let registerRules = {
//   username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
//   phone: [{ required: true, message: '请输入手机号', trigger: 'blur' }, { pattern: /^1[3456789]\d{9}$/, message: '手机号格式不正确', trigger: 'blur' }],
//   gender: [{ required: true, message: '请选择性别', trigger: 'blur' }],
//   avatar: [{ required: true, message: '请上传头像', trigger: 'blur' }],
//   code: [{ required: true, message: '请输入验证码', trigger: 'blur' }, { pattern: /^\d{5}$/, message: '验证码格式不正确', trigger: 'blur' }]
// }


// let codeSending = ref(false)



// function closeRegisterDialog() {
//   // 对话框关闭时的处理逻辑
//   this.$refs.registerForm.resetFields(); // 重置表单
// }

// function sendCode() {
//   // 模拟发送验证码的操作
//   this.codeSending = true;
//   setTimeout(() => {
//     this.codeSending = false;
//     this.$message.success('验证码发送成功');
//   }, 2000);
// }

// function handleAvatarUploadSuccess(response, file, fileList) {
//   // 上传成功的处理逻辑
//   this.registerForm.avatar = response.url; // 假设服务端返回头像的 URL
// }

// function beforeAvatarUpload(file) {
//   // 上传前的处理逻辑，比如检查文件类型和大小
//   const isJPG = file.type === 'image/jpeg' || file.type === 'image/png';
//   if (!isJPG) {
//     this.$message.error('上传头像图片只能是 JPG 或 PNG 格式');
//   }
//   const isLt2M = file.size / 1024 / 1024 < 2;
//   if (!isLt2M) {
//     this.$message.error('上传头像图片大小不能超过 2MB');
//   }
//   return isJPG && isLt2M;
// }

// function register() {
//   // 注册逻辑，可以根据实际情况处理
//   this.$message.success('注册成功');
//   this.closeRegisterDialog();
// }

// function switchToLogin() {
//   //关闭注册窗口
//   isRegisterShow.value=false
//   // 触发登录窗口的事件,切换到登录窗口
//   emitter.emit('show-login',true)
// }

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