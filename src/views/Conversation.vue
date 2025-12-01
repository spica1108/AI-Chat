<script setup lang="ts">
import { ref,watch  } from 'vue';
import MessageInput from '../components/MessageInput.vue';
import MessageList from '../components/MessageList.vue';
import { useRoute } from 'vue-router';
import { MessageProps,ConversationProps } from '../types';
import { messages,conversations } from '../testData';

const route = useRoute();
const filteredMessages = ref<MessageProps[]>([]);//类型，改成响应式数据
const conversation = ref<ConversationProps>();
// 获取路由参数中的 conversationId
//转换成number类型
//as string：TypeScript 的类型断言，告诉编译器“我知道,它是字符串”
 let conversationId = parseInt(route.params.id as string);
//route 来自 useRoute()（vue-router），route.params 存放路径参数（动态路由片段）
//route.params.id 对应路由定义中的占位符，例如路由 '/conversation/:id'，
//当 URL 是 '/conversation/2' 时，route.params.id === '2'

//把 messages 中所有 conversationId 等于当前 conversationId 的消息挑出来，
// 赋值给 filteredMessages，通常用于只显示当前会话的消息列表
filteredMessages.value = messages.filter(message => message.conversationId === conversationId);
//空值检查，强制检查可能为none和undefined的值，避免报错
conversation.value = conversations.find(item => item.id === conversationId)
//route是响应式的，但是route.params.id不是响应式的，使用watch监听route.params.id的变化
watch(() => route.params.id, (newId: string) => {
  conversationId = parseInt(newId);
  filteredMessages.value = messages.filter(message => message.conversationId === conversationId);
  conversation.value = conversations.find(item => item.id === conversationId)
});
</script>

<template>
  <!-- 会话标题栏 -->
  <div class="h-[5%] bg-gray-200 border-b border-gray-300 flex items-center px-3 justify-between" v-if="conversation">
    <h3 class="font-semibold text-gray-900">{{ conversation.title }}</h3>
    <span class="text-sm text-gray-500">{{ conversation.updatedAt }}</span>
  </div>
<!-- 会发生滚动效果 -->
  <div class="w-[80%] mx-auto h-[75%] overflow-y-auto pt-2">
    <MessageList :messages="filteredMessages" />
  </div>
  <div class="w-[80%] mx-auto h-[15%] flex items-center">
    <MessageInput />
  </div>

</template>