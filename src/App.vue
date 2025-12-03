<script setup lang="ts">

import { ref } from 'vue';
import { Icon } from '@iconify/vue';
import Button from './components/Button.vue';
import ConversationList from './components/ConversationList.vue';
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
        <Button icon-name="radix-icons:chat-bubble" class="w-full">
          <!-- 这是图标 -->
          新建聊天
        </Button>
        </RouterLink>

        <!-- 路由跳转 -->
        <RouterLink to="/settings">
          <Button icon-name="radix-icons:gear" plain class="w-full">
            应用设置
          </Button>
        </RouterLink>
      </div>

    </div>
    <!-- 设置高度 -->
    <div class="h-full flex-1">
      <!-- <Button color="green" plain loading icon-name="radix-icons:gear">
        Test Button
      </Button> -->
      <RouterView/>
    </div>
  </div>

</template>

