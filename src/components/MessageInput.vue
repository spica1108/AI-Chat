<script lang="ts" setup>
import { Icon } from '@iconify/vue'

</script>

<template>
  <div class="message-input w-full shadow-sm border rounded-lg border-gray-300 py-1 px-2 focus-within:border-green-700">
    <div class="flex items-center">
      <input type="file" class="hidden">
      <Icon 
        icon="radix-icons:image" 
        width="20" 
        height="20" 
        class="mr-2 text-gray-400 cursor-pointer hover:text-gray-600"
      />
      <input class="outline-none border-0 flex-1 bg-white focus:ring-0" type="text">
      <Button icon-name="radix-icons:paper-plane" variant="primary" class="ml-2">
        Send
      </Button>
    </div>
  </div>
</template>