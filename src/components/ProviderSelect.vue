<script lang="ts" setup>
import {
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectItemIndicator,
    SelectItemText,
    SelectLabel,
    SelectPortal,
    SelectRoot,
    SelectSeparator,
    SelectTrigger,
    SelectValue,
    SelectViewport,
} from 'radix-vue'
import { Icon } from '@iconify/vue';
import { ProviderProps } from '../types';
defineProps<{ items: ProviderProps[] }>()
// 使组件支持v-model
const currentModel = defineModel<string>()

</script>

<template>
  <div class="provider-select w-full">
    <!-- 支持v-model -->
    <SelectRoot v-model="currentModel" >
      <!-- 下拉菜单，触发区域，即点击后触发对应选项的区域 -->
       <SelectTrigger class="flex w-full items-center justify-between 
       data-[placeholder]:text-gray-400 rounded-md py-1.5 px-3 shadow-sm border outline-none">
        <SelectValue placeholder="Select a model..."  />
        <Icon 
          icon="radix-icons:chevron-down" 
          class="w-5 h-5" 
        />
       </SelectTrigger>
       <SelectPortal>
        <!-- 下拉菜单显示菜单部分 -->
          <SelectContent class="bg-white rounded-md shadow-lg border border-gray-300 mt-1">

            <SelectViewport class="p-2">
              <div v-for="provider in items">
                <!-- 名称头像 -->
                <SelectLabel class="flex items-center font-semibold text-gray-700">
                  <img :src="provider.avatar" alt="provider.name" class="h-5 w-5 mr-2 rounded"/>
                  {{ provider.name }}
                </SelectLabel>
                <!-- 循环渲染 -->
                 <SelectGroup>
                  <SelectItem 
                    v-for="(model, index) in provider.models" :key="index" :value="`${provider.id}/${model}`"
                    class="flex items-center rounded px-6 h-7 outline-none relative select-none
                      text-green-700 cursor-pointer
                      data-[highlighted]:bg-green-100 data-[highlighted]:text-green-900
                      data-[highlighted]:outline-none
                      "
                  >
                    <SelectItemIndicator class="absolute left-2 inline-flex items-center">
                      <Icon 
                        icon="radix-icons:check" 
                        class="w-4 h-4"
                      />
                    </SelectItemIndicator>
                    <SelectItemText>{{ model }}</SelectItemText>
                  </SelectItem>
                 </SelectGroup>
                <SelectSeparator class="my-2 h-px bg-gray-200" />
              </div>
            </SelectViewport>

          </SelectContent>
       </SelectPortal>

    </SelectRoot>
  </div>
</template>
