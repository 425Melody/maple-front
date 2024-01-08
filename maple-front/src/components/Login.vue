<template>
    <el-dialog v-model="isLoginShow" :show-close="false">
        <template #header="{ close, titleId, titleClass }">
            <div class="my-header">
                <h4 :id="titleId" :class="titleClass">登录</h4>
                <el-button type="danger" @click="close">
                    <el-icon class="el-icon--left">
                        <CircleCloseFilled />
                    </el-icon>
                    关闭
                </el-button>
            </div>
        </template>


        <!-- 表单 -->
        <el-form ref="ruleFormRef" :model="loginArgs" :rules="rules" label-width="120px" class="demo-ruleForm"
            :size="formSize" status-icon>
            <el-form-item label="手机号" prop="phone">
                <el-input v-model="loginArgs.phone" />
            </el-form-item>
            <el-form-item label="验证码" prop="code">
                <el-input v-model="loginArgs.code">
                    <template #append>
                        <el-button @click="sendcode">发送验证码</el-button>
                    </template>
                </el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm(ruleFormRef)">
                    登录
                </el-button>
                <el-button type="info" @click="register">
                    注册
                </el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>
  
<script lang="ts" setup>
import { reactive, ref } from 'vue'
import type { ElButton, ElDialog, FormInstance, FormRules } from 'element-plus'
import { ElMessage } from 'element-plus'
import { CircleCloseFilled } from '@element-plus/icons-vue'
import LoginAPI from '../api/loginAPI'
import jwt from 'jsonwebtoken';
// import 'es6-promise/auto';

// const visible = ref(false)  //控制窗口是否显示

//父组件（App.vue）将visible传给子组件（本组件）
//接收父组件的参数
// let props = defineProps(['Visible'])  //数组写法（简单）
// let props = defineProps({
//     visible:{
//         type:Boolean,
//         default: false  //默认值
//     }
// })
// let visible = ref(props.visible)  //接收父组件的参数
// import {watch} from '@vue/runtime-core'  
// //定义监听函数，监听父组件对于visible的改变
// watch(props,(newValue,oldValue)=>{ 
//     visible.value = newValue.visible
// })


//发送验证码
import SC from '../api/sendcodeAPI'
const sendcode = async () => {
    let reponse = await SC(loginArgs.phone)
    if (reponse.data.code == 200) {
        ElMessage({
            message: reponse.data.msg,
            type: 'success',
        })
    } else {
        ElMessage.error(reponse.data.msg)
    }
}

//使用mitt进行组件通信
import emitter from '../utils/emitter'
let isLoginShow = ref(false)  //控制登录窗口的显示
//绑定事件
emitter.on('show-login', (value: boolean) => {
    isLoginShow.value = value
})

//窗口关闭触发的函数
const close = () => {
    isLoginShow.value = false
}

//一个TypeScript接口类型用于规范表单参数
interface RuleForm {
    phone: string
    code: string
}

const formSize = ref('default')
const ruleFormRef = ref<FormInstance>()
//表单参数
let loginArgs = reactive<RuleForm>({
    phone: '',
    code: ''
})

//表单校验规则
const rules = reactive<FormRules<RuleForm>>({
    phone: [
        { required: true, message: '请输入手机号', trigger: 'blur' },
        { min: 11, max: 11, message: '请输入有效手机号', trigger: 'blur' },
    ],
    code: [
        {
            required: true,
            message: '请输入验证码',
            trigger: 'blur',
        },
        {
            min: 5,
            max: 5,
            message: '请输入有效验证码',
            trigger: 'blur'
        }
    ],
})


let result = reactive({
    code: '',
    msg: '',
    data: {
        icon:'',
        id:'',
        jwt:'',
        name:'',
        phone:'',
        sex:''
    }
})

const submitForm = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    await formEl.validate((valid, fields) => {
        if (valid) {
            //表单校验通过的逻辑
            //调用登录接口
            LoginAPI(loginArgs.phone, loginArgs.code).then(function (response) {
                //处理响应结果
                result = response.data
                //根据响应代码判断是否登陆成功
                if (parseInt(result.code) == 200) {
                    ElMessage.success(result.msg)
                    // 使用localStorage存储令牌
                    localStorage.setItem('Token', result.data.jwt);
                    // console.log(response)
                    isLoginShow.value = false
                    
                    //调用浏览器页面刷新函数
                    window.location.reload();
                    
                } else {
                    ElMessage.error(result.msg)
                }
            })
        } else {
            console.log('表单校验失败', fields)
        }
    })


}

function register() {
    //触发打开注册窗口的事件
    emitter.emit('show-register', true)
    //将登录窗口关闭
    isLoginShow.value = false
}

// const resetForm = (formEl: FormInstance | undefined) => {
//     if (!formEl) return
//     formEl.resetFields()
// }
</script>
  
<style scoped>
.my-header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}
</style>