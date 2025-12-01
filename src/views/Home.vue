<!-- 对话列表 -->

<script setup lang="ts">
import { ref } from 'vue'
import { ProviderProps } from '../types'
import ProviderSelect from '../components/ProviderSelect.vue'
import MessageInput from '../components/MessageInput.vue'
const selectedModel = ref('')

const providers: ProviderProps[] = [
  {
  id: 1,
  name: '文心一言',
  desc: '文心一言 百度出品的大模型',
  models: ['ERNIE-4.0-8K', 'ERNIE-3.5-8K', 'ERNIE-Speed-8K'], 
  avatar: 'https://img.alicdn.com/imgextra/i4/O1CN01RyvC8Z1sUKjO6NtNl_!!6000000005765-2-tps-200-200.png',
  createdAt: '2024-07-03',
  updatedAt: '2024-07-03'
  },
  {
    id: 2,
    name: '通义千问',
    desc: '通义千问',
    // https://help.aliyun.com/zh/dashscope/developer-reference/api-details?spm=a2c4g.11186623.0.
    models: ['qwen-turbo', 'qwen-plus', 'qwen-max'],
    avatar: 'https://img.alicdn.com/imgextra/i4/O1CN01RyvC8Z1sUKjO6NtNl_!!6000000005765-2-tps-200-200.png',
    createdAt: '2024-07-03',
    updatedAt: '2024-07-03'
  }
]
</script>

<template>
<div class="w-[80%] mx-auto h-full">
  <div class="flex items-center h-[85%]">
    <ProviderSelect :items="providers" v-model="selectedModel"></ProviderSelect>
  </div>
  <div class="flex items-center h-[15%]">
    <MessageInput/>
  </div>
</div>
</template>