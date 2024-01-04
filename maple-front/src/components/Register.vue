<template>
    <el-dialog v-model="registerDialogVisible" title="注册" width="30%" @close="closeRegisterDialog">
      <el-form :model="registerForm" :rules="registerRules" ref="registerForm" label-width="80px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="registerForm.username" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="registerForm.phone" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="gender">
          <el-radio-group v-model="registerForm.gender">
            <el-radio label="male">男性</el-radio>
            <el-radio label="female">女性</el-radio>
            <el-radio label="other">其他</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="头像" prop="avatar">
          <el-upload
            action="/upload"
            :on-success="handleAvatarUploadSuccess"
            :before-upload="beforeAvatarUpload"
            show-file-list="false"
          >
            <el-button type="primary">点击上传</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item label="验证码" prop="code">
          <el-input v-model="registerForm.code" placeholder="请输入验证码"></el-input>
          <el-button @click="sendCode" :disabled="codeSending" type="primary">{{ codeSending ? '发送中...' : '发送验证码' }}</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="register">注册</el-button>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="switchToLogin">返回登录</el-button>
      </div>
    </el-dialog>
  </template>
  
  <script>
  export default {
    data() {
      return {
        registerDialogVisible: false,
        registerForm: {
          username: '',
          phone: '',
          gender: 'male',
          avatar: '',
          code: ''
        },
        registerRules: {
          username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
          phone: [{ required: true, message: '请输入手机号', trigger: 'blur' }, { pattern: /^1[3456789]\d{9}$/, message: '手机号格式不正确', trigger: 'blur' }],
          gender: [{ required: true, message: '请选择性别', trigger: 'blur' }],
          avatar: [{ required: true, message: '请上传头像', trigger: 'blur' }],
          code: [{ required: true, message: '请输入验证码', trigger: 'blur' }, { pattern: /^\d{5}$/, message: '验证码格式不正确', trigger: 'blur' }]
        },
        codeSending: false
      };
    },
    methods: {
      closeRegisterDialog() {
        // 对话框关闭时的处理逻辑
        this.$refs.registerForm.resetFields(); // 重置表单
      },
      sendCode() {
        // 模拟发送验证码的操作
        this.codeSending = true;
        setTimeout(() => {
          this.codeSending = false;
          this.$message.success('验证码发送成功');
        }, 2000);
      },
      handleAvatarUploadSuccess(response, file, fileList) {
        // 上传成功的处理逻辑
        this.registerForm.avatar = response.url; // 假设服务端返回头像的 URL
      },
      beforeAvatarUpload(file) {
        // 上传前的处理逻辑，比如检查文件类型和大小
        const isJPG = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 或 PNG 格式');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB');
        }
        return isJPG && isLt2M;
      },
      register() {
        // 注册逻辑，可以根据实际情况处理
        this.$message.success('注册成功');
        this.closeRegisterDialog();
      },
      switchToLogin() {
        // 切换到登录窗口
        this.$emit('switchToLogin');
      }
    }
  };
  </script>
  