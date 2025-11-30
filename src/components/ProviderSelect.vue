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
</script>

<template>
  <div class="provider-select">
    <SelectRoot>
      <!-- 触发区域，即点击后触发对应选项的区域 -->
       <SelectTrigger>
        <SelectValue placeholder="Select a model..."  />
       </SelectTrigger>
       <SelectPortal>
          <SelectContent>

            <SelectViewport>
                <SelectItem value="gpt-3.5-turbo">
                  <SelectItemText>gpt-3.5-turbo</SelectItemText>
                </SelectItem>

                <SelectItem value="gpt-4">
                  <SelectItemText>gpt-4</SelectItemText>
                </SelectItem>

                <SelectItem value="gpt-4-turbo">
                  <SelectItemText>gpt-4-turbo</SelectItemText>
                </SelectItem>
            </SelectViewport>

          </SelectContent>
       </SelectPortal>

    </SelectRoot>
  </div>
</template>
