<template>
  <div class=" flex items-center justify-between h-screen">
    <div class=" w-[300px] bg-gray-200 h-full border-r border-gray-300">
      <ConversationList :items="items" />
    </div>
    <div class="h-full flex-1">
      content
    </div>
  </div>

</template>

<script setup lang="ts">
import { ConversationProps } from './types';
import ConversationList from './components/ConversationList.vue';
const items: ConversationProps[] = [
  { id: 1, selectedModel: 'gpt-3.5-turbo', title: 'Conversation 1', createdAt: '2024-06-01 10:00',updatedAt: '2024-06-01 10:00' },
  { id: 2, selectedModel: 'gpt-4', title: 'Conversation 2', createdAt: '2024-06-02 11:30',updatedAt: '2024-06-02 11:30' },
  { id: 3, selectedModel: 'gpt-3.5-turbo', title: 'Conversation 3667788899933333333222222', createdAt: '2024-06-03 14:15', updatedAt: '2024-06-03 14:15' },
];
console.log('This message is being logged by "App.vue", included via Vite');
</script>