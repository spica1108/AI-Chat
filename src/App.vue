<script setup lang="ts">

import { ref } from 'vue';
import { Icon } from '@iconify/vue';
import ConversationList from './components/ConversationList.vue';
import ProviderSelect from './components/ProviderSelect.vue';
import MessageInput from './components/MessageInput.vue';
const selectedModel = ref();
import { conversations } from './testData'
console.log('This message is being logged by "App.vue", included via Vite');

</script>


<template>
  <!-- 整体布局，左侧是对话列表，右侧是聊天内容区域 -->
  <div class=" flex items-center justify-between h-screen">
    <div class=" w-[300px] bg-gray-200 h-full border-r border-gray-300">

      <RouterLink to="/conversation">
      <!-- 底部按钮固定，超过多少会向下滑动 -->
      <div class="h-[90%] overflow-y-auto">
        <ConversationList :items="conversations" />
      </div>
      </RouterLink>

      <div class="h-[10%] grid grid-cols-2 gap-2 p-2">
        <!-- 路由跳转 -->
        <RouterLink to="/">
        <button
          class="shadow-sm inline-flex items-center justify-center bg-emerald-600 text-white hover:bg-emerald-700 border border-emerald-600 h-[32px] py-[8px] px-[15px] text-sm rounded-[4px] transition-colors">
          <!-- 这是图标 -->
          <Icon icon="radix-icons:chat-bubble" class="mr-2"></Icon>
          新建聊天
        </button>
        </RouterLink>

        <!-- 路由跳转 -->
        <RouterLink to="/settings">
        <button
          class="shadow-sm inline-flex items-center justify-center bg-emerald-50 text-emerald-700 hover:bg-emerald-600 hover:text-white border border-emerald-600 h-[32px] py-[8px] px-[15px] text-sm rounded-[4px] transition-colors">
        <Icon icon="radix-icons:gear" class="mr-2"></Icon>
          应用设置
        </button>
        </RouterLink>
      </div>

    </div>
    <!-- 设置高度 -->
    <div class="h-full flex-1">
      <RouterView/>
    </div>
  </div>

</template>

