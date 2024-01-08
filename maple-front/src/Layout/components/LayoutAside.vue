<template>
  <el-row class="tac">
    <el-col :span="19">
      <el-menu default-active="1" class="el-menu-vertical-demo" @close="handleClose">
        <el-menu-item index="1" @click="() => handleOpen('1')">
          <el-icon>
            <House />
          </el-icon>
          <span>发现</span>
        </el-menu-item>
        <el-menu-item index="2" @click="() => handleOpen('2')">
          <el-icon>
            <Plus />
          </el-icon>
          <span>发布</span>
        </el-menu-item>
        <div>
          <el-menu-item index="3" @click="() => handleOpen('3')">
            <div class="demo-type">
              <el-avatar :src="icon" id="icon">

              </el-avatar>
            </div>
            <span id="span">我</span>
          </el-menu-item>
        </div>

      </el-menu>
    </el-col>

  </el-row>
</template>

<script lang="ts" setup>
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
} from '@element-plus/icons-vue'
// 在组件中导入 Router 实例
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import emitter from '../../utils/emitter'
import { onMounted } from 'vue';  //钩子函数
import getUserIcon from '../../api/getUserIcon'
import { ElMessage } from 'element-plus';


const router = useRouter();  //使用路由

//头像
let icon = ref('')

//调用钩子函数
onMounted(async () => {
  // let response = getUserIcon()
  //  if()
  let response = await getUserIcon()
  if (response.data.code == 200) {
    icon.value = response.data.data
    ElMessage.success(response.data.msg)
  } else {
    ElMessage.error(response.data.msg)
  }
})




//菜单点击函数
const handleOpen = (key: string) => {

  //跳转到笔记页面
  if (key == "1") {
    router.push('/note');
  }


  //跳转到发布页面
  if (key == "2") {
    router.push('/publish');
  }

  if (key == "3") {
    //触发事件
    emitter.emit('show-login', true)
  }
}

//菜单关闭函数（暂时用不到）
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
</script>


<style scoped>
#icon {
  width: 30px;
  height: auto;
  position: relative;
  top: -12px;
  /* 负值表示向上移动 */
  left: 0%;
}

#span {
  position: relative;
  left: 5%;
}
</style>