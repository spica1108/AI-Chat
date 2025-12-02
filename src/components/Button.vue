<script setup lang="ts">
import { computed } from 'vue';
export type ButtonColor = 'green' | 'purple'
export type ButtonSize = 'small' | 'large'
//属性
export interface ButtonProps {
  color?: ButtonColor
  size?: ButtonSize
  plain?: boolean//是否朴素风格
  disabled?: boolean
  loading?: boolean
}
//名称
defineOptions({
  name: 'VkButton'
})
//withDefaults 设置默认属性值
const props = withDefaults(defineProps<ButtonProps>(), {
  color: 'green',
})

//根据tailwindcss的颜色命名规则，生成对应的颜色类名
//例如：color="green" => bg-emerald-600 text-white hover:bg-
const colorVariants: Record<ButtonColor,any> = {
  'green': {
    plain: 'bg-emerald-50 text-emerald-700 hover:bg-emerald-600 hover:text-white border border-emerald-600',
    normal: 'bg-emerald-600 text-white hover:bg-emerald-700/90 border border-emerald-600'
  },
  'purple': {
    plain: 'bg-purple-50 text-purple-700 hover:bg-purple-600 hover:text-white border border-purple-600',
    normal: 'bg-purple-600 text-white hover:bg-purple-700/90 border border-purple-600'
  },
}

//计算属性，根据 color 和 plain 生成对应的 CSS 类
//computed 是 Vue 的响应式计算属性，用于根据 props 生成动态的 CSS 类
const colorClasses = computed(() => {
  if (props.plain) {
    return colorVariants[props.color].plain
  }else{
    return colorVariants[props.color].normal
  }
})
</script>

<template>
  <button
    class="vk-button
    shadow-sm inline-flex items-center justify-center"
    :class="[colorClasses]"
  >
    <slot></slot>
  </button>
</template>