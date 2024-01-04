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
                        <el-button>发送验证码</el-button>
                    </template>
                </el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm(ruleFormRef)">
                    登录
                </el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>
  
<script lang="ts" setup>
import { reactive, ref } from 'vue'
import type { ElButton, ElDialog, FormInstance, FormRules } from 'element-plus'
import { CircleCloseFilled } from '@element-plus/icons-vue'
import LoginAPI from '../api/loginAPI'
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


//使用mitt进行组件通信
import emitter from '../utils/emitter'
let isLoginShow = ref(false)
//绑定事件
emitter.on('show-login',(value : boolean)=>{
    isLoginShow.value = value
})

const close = () => {
    isLoginShow.value = false
}

interface RuleForm {
    phone: string
    code: string
}

const formSize = ref('default')
const ruleFormRef = ref<FormInstance>()
const loginArgs = reactive<RuleForm>({
    phone: '',
    code: ''
})

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
    code:'',
    msg:'',
    data:''
})

const submitForm = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    await formEl.validate((valid, fields) => {
        if (valid) {
            LoginAPI(loginArgs.phone,loginArgs.code).then(function (response){
                result = response.data
            })
            console.log(result)
        } else {
            console.log('error submit!', fields)
        }
    })
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