<script setup lang="ts">
import { MessageProps } from '../types';
import MessageInput from '../components/MessageInput.vue';
import MessageList from '../components/MessageList.vue';
import { useRoute } from 'vue-router';

const route = useRoute();
// 获取路由参数中的 conversationId
//转换成number类型
//as string：TypeScript 的类型断言，告诉编译器“我知道它是字符串”
const conversationId = parseInt(route.params.id as string);
//route 来自 useRoute()（vue-router），route.params 存放路径参数（动态路由片段）
//route.params.id 对应路由定义中的占位符，例如路由 '/conversation/:id'，
//当 URL 是 '/conversation/2' 时，route.params.id === '2'

const messages: MessageProps[] = [
  { id: 1, content: '什么是光合作用', createdAt: '2024-07-03', updatedAt: '2024-07-03', type: 'question', conversationId: 1 },
  { id: 2, content: '你的说法很请正确，理解的很不错,你的说法很请正确，理解的很不错', createdAt: '2024-07-03', updatedAt: '2024-07-03', type: 'answer', conversationId: 1 },
  { id: 3, content: '请告诉我更多', createdAt: '2024-07-03',updatedAt: '2024-07-03',  type: 'question', conversationId: 1 },
  { id: 4, content: '你的说法很请正确，理解的很不错,你的说法很请正确，理解的很不错', createdAt: '2024-07-03', updatedAt: '2024-07-03', type: 'answer', conversationId: 1 },
  { id: 5, content: '还有更多的信息吗', createdAt: '2024-07-03', type: 'question', updatedAt: '2024-07-03', conversationId: 1 },
  { id: 6, content: '', createdAt: '2024-07-03', updatedAt: '2024-07-03', type: 'answer', status: 'loading', conversationId: 1 },
  { id: 7, content: '什么是光合作用', createdAt: '2024-07-03', updatedAt: '2024-07-03', type: 'question', conversationId: 2 },
  { id: 8, content: '你的说法很请正确，理解的很不错,你的说法很请正确，理解的很不错', createdAt: '2024-07-03', updatedAt: '2024-07-03', type: 'answer', conversationId: 2 },
  { id: 9, content: '请告诉我更多', createdAt: '2024-07-03',updatedAt: '2024-07-03',  type: 'question', conversationId: 2 },
  { id: 10, content: '你的说法很请正确，理解的很不错,你的说法很请正确，理解的很不错', createdAt: '2024-07-03', updatedAt: '2024-07-03', type: 'answer', conversationId: 2 },
  { id: 11, content: '还有更多的信息吗', createdAt: '2024-07-03', type: 'question', updatedAt: '2024-07-03', conversationId: 3 },
  { id: 12, content: '', createdAt: '2024-07-03', updatedAt: '2024-07-03', type: 'answer', status: 'loading', conversationId: 3 },
];
//把 messages 中所有 conversationId 等于当前 conversationId 的消息挑出来，
// 赋值给 filteredMessages，通常用于只显示当前会话的消息列表
const filteredMessages = messages.filter(message => message.conversationId === conversationId);
</script>


<template>
<!-- 会发生滚动效果 -->
  <div class="w-[80%] mx-auto h-[85%] overflow-y-auto pt-2">
    <MessageList :messages="filteredMessages" />
  </div>
  <div class="w-[80%] mx-auto h-[15%] flex items-center">
    <MessageInput />
  </div>

</template>