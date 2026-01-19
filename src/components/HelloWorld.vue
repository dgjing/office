<template>
  <div>ddd
    <div id="test">

    </div>
  </div>
</template>
<script setup>
import { ref ,onMounted} from 'vue'
import * as wpsUtils from './wps'


defineProps({
  msg: String,
})

// 获取当前编辑器工具
const getCurrentUtils = () => {
  return wpsUtils
}

const count = ref(0)

onMounted(async () => {
  try {
    const utils = getCurrentUtils()
    await utils.loadWpsSdk();
    utils.wpsRender({containerId: 'test'})
  } catch (error) {
  }
})
</script>
<style scoped>
.read-the-docs {
  color: #888;
}
</style>
