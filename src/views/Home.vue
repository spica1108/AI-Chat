<!-- 对话列表 -->

<script setup lang="ts">
import { onMounted,ref,computed } from 'vue'
import { useRouter } from 'vue-router'
import { db } from '../db'
import { ProviderProps } from '../types'
import ProviderSelect from '../components/ProviderSelect.vue'
import MessageInput from '../components/MessageInput.vue'

const router = useRouter()
const currentProvider = ref('')
//动态数据
const providers = ref<ProviderProps[]>([])
onMounted(async() =>{
  providers.value = await db.providers.toArray()
})
//做分割获取对应的值，因为 provider.id 和 model 是连一起的
const modelInfo = computed(()=>{
  const [ providerId, selectedModel ] = currentProvider.value.split('/')
  return{
    //number类型
    providerId: parseInt(providerId),
    selectedModel
  }
})

const createConversation = async(question: string) => {
  const { providerId, selectedModel } = modelInfo.value
  //转换成和时间相关的字符串
  const currentDate = new Date().toISOString()

  //conversation创建
  const conversationId = await db.conversations.add({
    title: question,
    providerId,
    selectedModel,
    createdAt: currentDate,
    updatedAt: currentDate
  })
  //message创建
  const newMessageId = await db.messages.add({
    content: question,
    conversationId,
    createdAt: currentDate,
    updatedAt: currentDate,
    type: 'question'
  })
  //第一次创建对话，自动进行回复的message创建
  router.push(`/conversation/${conversationId}?init=${newMessageId}`)
}

</script>

<template>
<div class="w-[80%] mx-auto h-full">
  <div class="flex items-center h-[85%]">
    <ProviderSelect :items="providers" v-model="currentProvider"></ProviderSelect>
  </div>
  <div class="flex items-center h-[15%]">
    <MessageInput @create="createConversation" />
  </div>
</div>
</template>