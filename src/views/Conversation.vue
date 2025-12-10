<script setup lang="ts">
import { ref, watch, onMounted, computed  } from 'vue';
import MessageInput from '../components/MessageInput.vue';
import MessageList from '../components/MessageList.vue';
import { useConversationStore } from '../stores/conversation';
import { useMessageStore } from '../stores/message';
import { useRoute } from 'vue-router';
import { MessageProps,ConversationProps, MessageStatus } from '../types';
// import { messages,conversations } from '../testData';
import { db } from '../db'

const route = useRoute();
const conversationStore = useConversationStore()
const messageStore = useMessageStore()
const filteredMessages = computed(()=>messageStore.items)

// 获取路由参数中的 conversationId
//转换成number类型
//as string：TypeScript 的类型断言，告诉编译器“我知道,它是字符串”
//响应式对象
let conversationId = ref(parseInt(route.params.id as string));
//route 来自 useRoute()（vue-router），route.params 存放路径参数（动态路由片段）
//route.params.id 对应路由定义中的占位符，例如路由 '/conversation/:id'，
//当 URL 是 '/conversation/2' 时，route.params.id === '2'

//把 messages 中所有 conversationId 等于当前 conversationId 的消息挑出来，
// 赋值给 filteredMessages，通常用于只显示当前会话的消息列表
// filteredMessages.value = messages.filter(message => message.conversationId === conversationId);
//空值检查，强制检查可能为none和undefined的值，避免报错
// conversation.value = conversations.find(item => item.id === conversationId)
//route是响应式的，但是route.params.id不是响应式的，使用watch监听route.params.id的变化
const initMessageId = parseInt(route.query.init as string)//转换成数字
//获取conversation信息
const conversation = computed(() => conversationStore.getConversationById(conversationId.value))
//拿到数据
let lastQuestion = computed(() => messageStore.getLastQuestion(conversationId.value))
//创建一个最新的message
const creatingInitialMessage = async () => {
  //忽略id
  const createdData: Omit<MessageProps, 'id'> = {
    content: '',
    conversationId: conversationId.value,
    type: 'answer',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    status: 'loading'
  }
  const newMessageId = await messageStore.createMessage(createdData)
  if(conversation.value){
    const provider = await db.providers.where({ id: conversation.value.providerId }).first()
    //发送信息
    if (provider){
      await window.electronAPI.startChat({
        messageId: newMessageId,
        providerName: provider.name,
        selectedModel: conversation.value.selectedModel,
        content: lastQuestion.value?.content || ''
      })
    }
  }
}


watch(() => route.params.id, async (newId: string) => {
  if (!newId) return;
  conversationId.value = parseInt(newId);
  if (Number.isNaN(conversationId)) return;
  // conversation.value = await db.conversations.where({id: conversationId}).first()
  await messageStore.fetchMessagesByConversation(conversationId.value)
});

onMounted(async()=> {
  //返回查询后的第一条数据
  // conversation.value = await db.conversations.where({id: conversationId}).first()
  //转换成数组
  await messageStore.fetchMessagesByConversation(conversationId.value)
  //判断当初始化conversation时进行创建
  if (initMessageId){
    await creatingInitialMessage()
  }
  window.electronAPI.onUpdateMessaage(async (streamData)=>{
    console.log('steam', streamData)
    messageStore.updateMessage(streamData)
  })
})

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