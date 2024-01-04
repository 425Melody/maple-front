<!-- <template>
    <el-row class="demo-autocomplete">
      <el-col :span="12">
        <el-autocomplete
          v-model="state1"
          :fetch-suggestions="querySearch"
          clearable
          class="inline-input w-50"
          placeholder="搜索"
          @select="handleSelect"
        />
      </el-col>
    </el-row>
  </template>
  
  <script lang="ts" setup>
  import { onMounted, ref } from 'vue'
  
  interface RestaurantItem {
    value: string
    link: string
  }
  
  const state1 = ref('')
  const state2 = ref('')
  
  const restaurants = ref<RestaurantItem[]>([])
  const querySearch = (queryString: string, cb: any) => {
    const results = queryString
      ? restaurants.value.filter(createFilter(queryString))
      : restaurants.value
    // call callback function to return suggestions
    cb(results)
  }
  const createFilter = (queryString: string) => {
    return (restaurant: RestaurantItem) => {
      return (
        restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
      )
    }
  }
  const loadAll = () => {
    return [
      { value: 'vue', link: 'https://github.com/vuejs/vue' },
      { value: 'element', link: 'https://github.com/ElemeFE/element' },
      { value: 'cooking', link: 'https://github.com/ElemeFE/cooking' },
      { value: 'mint-ui', link: 'https://github.com/ElemeFE/mint-ui' },
      { value: 'vuex', link: 'https://github.com/vuejs/vuex' },
      { value: 'vue-router', link: 'https://github.com/vuejs/vue-router' },
      { value: 'babel', link: 'https://github.com/babel/babel' },
    ]
  }
  
  const handleSelect = (item: RestaurantItem) => {
    console.log(item)
  }
  
  onMounted(() => {
    restaurants.value = loadAll()
  })
  </script>
   -->


<template>
  <div>
    <el-input v-model="search" class="input-size" size="large" placeholder="搜索">
      <template #append>
        <el-button :icon="Search" circle />
      </template>
    </el-input>

  </div>
</template>
  
<script lang="ts" setup>
import { ref } from 'vue'
import { Search } from '@element-plus/icons-vue'
const search = ref('')
</script>

<style scoped>
.input-size {
  width: 700px;
}
</style>
  
  