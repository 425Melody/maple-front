<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="200px">
        <img src="./assets/img/maple.png" id="logo">

        <Aside />
      </el-aside>
      <el-container>
        <el-header>
          <Header />
        </el-header>
        <el-main id="main">
          <Main />
        </el-main>
      </el-container>
    </el-container>
    <!-- <Login :visible="Visible" /> -->
    <Login />
    <Register />


    <!-- <button @click="test">点击弹出登录</button>
    <button @click="test1">点击关闭登录</button> -->
  </div>
</template>

<script setup>
import Aside from './Layout/components/LayoutAside.vue'
import Header from './Layout/components/LayoutHeader.vue'
import Main from './Layout/components/LayoutMain.vue'
import Login from './components/Login.vue'
import Register from './components/Register.vue'
import { ref } from 'vue';  // 引入 ref
// import emitter from './utils/emitter'


// let Visible = ref(false)

// const test = ()=>{
//   Visible.value = true
//   //触发事件
//   emitter.emit('show-login',Visible.value)
// }

// const test1 = ()=>{
//   Visible.value = false
//    //触发事件
//    emitter.emit('show-login',Visible.value)
// }
</script>

<style scoped>
#logo {
  width: 50px;
  /* position: absolute;
  left: 20px; */
}

#main {
  padding: 0px;
}
</style>