<script setup lang="ts">
import { useRouter } from 'vue-router'//引入路由,钩子函数
import { ConversationProps } from '../types'
import dayjs from 'dayjs'

//传入ts类型，怎样的数据
defineProps<{ items: ConversationProps[] }>()
const router = useRouter();//获取路由实例
const goToConversation = (id: number) => {
  //导航到指定会话页面
  //把应用的地址变成 /conversation/{id}?name=viking#foo 并触发路由跳转
  router.push({ path: `/conversation/${id}`,query: { name:'viking' },hash: '#foo' });
  //跳转到指定路径
};
</script>

<template>
  <div class="conversation-list">
    <!-- 鼠标点击有箭头效果 -->
    <div 
      class="item border-gray-300 border-t cursor-pointer bg-white hover:bg-gray-200 p-2"
      v-for="item in items"
      :key="item.id"
    >
      <a href="" @click.prevent="goToConversation(item.id)">
        <div class="flex justify-between items-center text-sm leading-5 text-gray-500">
          <span>{{ item.selectedModel }}</span>
          <span>{{ dayjs(item.updatedAt).format('YYYY-MM-DD') }}</span>
        </div>
        <h2 class=" font-semibold leading-6 text-gray-900 truncate">{{ item.title }}</h2>
      </a>
    </div>
  </div>
</template>