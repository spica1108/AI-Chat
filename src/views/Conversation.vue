<script lang="ts" setup>
import { ref, watch, onMounted, computed, nextTick } from 'vue'
import { useRoute } from 'vue-router'
import MessageInput from '../components/MessageInput.vue'
import MessageList from '../components/MessageList.vue'
import { useConversationStore } from '../stores/conversation'
import { useMessageStore } from '../stores/message'
import { useProviderStore } from '../stores/provider'
import { MessageProps, MessageListInstance } from '../types'
import { db } from '../db'

const inputValue = ref('')
const messageListRef = ref<MessageListInstance>()
const route = useRoute()
const conversationStore = useConversationStore()
const messageStore = useMessageStore()
const provdierStore = useProviderStore()
const filteredMessages = computed(() => messageStore.items)
const sendedMessages = computed(() => filteredMessages.value
  .filter(message => message.status!== 'loading')
  .map(message => {
    return {
      role: message.type === 'question' ? 'user' : 'assistant',
      content: message.content
    }
  })
)
let conversationId = ref(parseInt(route.params.id as string))
const initMessageId = parseInt(route.query.init as string)
//获取conversation信息
const convsersation = computed(() => conversationStore.getConversationById(conversationId.value))
const lastQuestion = computed(() => messageStore.getLastQuestion(conversationId.value))
//创建初始信息
const sendNewMessage = async (question: string) => {
  if (question) {
    const date = new Date().toISOString()
    await messageStore.createMessage({
			content: question,
			conversationId: conversationId.value,
			createdAt: date,
      updatedAt: date,
			type: 'question',
    })
    inputValue.value = ''
    creatingInitialMessage()
  }
}
//滚动到最下方的方法
const messageScrollToBottom = async () => {
  //确保dom节点加载完毕,拿到dom节点
  await nextTick()
  //位置，动态
  if(messageListRef.value) {
    messageListRef.value._ref.scrollIntoView({ block: 'end', behavior: 'smooth' })
  }
}

//创建最新的消息
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
  if (convsersation.value) {
    const provider = provdierStore.getProviderById(convsersation.value.providerId)
    //发送消息
    if (provider) {
      console.log('provider', provider)
      // 映射中文名称到英文标识（兼容旧数据）
      const providerNameMap: Record<string, string> = {
        '通义千问': 'dashscope',
        '百度千帆': 'qianfan',
        '文心一言': 'qianfan'
      }
      const mappedProviderName = providerNameMap[provider.name] || provider.name
      await window.electronAPI.startChat({
        messageId: newMessageId,
        providerName: mappedProviderName,
        selectedModel: convsersation.value.selectedModel,
        messages: sendedMessages.value
      })
    }
  }
}
watch(() => route.params.id, async (newId: string) => {
  conversationId.value = parseInt(newId)
  await messageStore.fetchMessagesByConversation(conversationId.value)
  await messageScrollToBottom()
})
onMounted(async () => {
  await messageStore.fetchMessagesByConversation(conversationId.value)
  await messageScrollToBottom()

  if (initMessageId) {
    await creatingInitialMessage()
  }
  window.electronAPI.onUpdateMessage(async (streamData) => {
    console.log('stream', streamData)
    // update database
    // update filteredMessages
    messageStore.updateMessage(streamData)
  })
})
</script>

<template>
  <!-- 对话标题 -->
<div class="h-[5%] bg-gray-200 border-b border-gray-300 flex items-center px-3 justify-between" v-if="convsersation">
  <h3 class="font-semibold  text-gray-900">{{convsersation.title}}</h3>
  <span class="text-sm text-gray-500">{{convsersation.updatedAt}}</span>
</div>
<!-- 消息列表 -->
<div class="w-full h-[85%] overflow-y-auto pt-2">
  <div class="w-[80%] mx-auto">
    <MessageList :messages="filteredMessages" ref="messageListRef"/>
  </div>
</div>
<!-- 消息输入 -->
<div class="w-[80%] mx-auto h-[10%] flex items-center">
  <MessageInput  @create="sendNewMessage" v-model="inputValue" :disabled="messageStore.isMessageLoading"/>
</div>
</template>