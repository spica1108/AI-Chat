<script setup lang="ts">
import { computed } from 'vue';
import { Icon } from '@iconify/vue';
export type ButtonColor = 'green' | 'purple'
export type ButtonSize = 'small' | 'large'
//属性
export interface ButtonProps {
  color?: ButtonColor
  //根据尺寸不同，应用不同的样式，主要高度和padding
  size?: ButtonSize
  plain?: boolean//是否朴素风格
  disabled?: boolean
  loading?: boolean
  iconName?: string//图标名称
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
    plain: 'bg-emerald-50 text-green-700 hover:bg-emerald-500 border border-green-700 hover:text-white',
    normal: 'bg-emerald-500 text-white hover:bg-emerald-500/90 border border-green-700'
  },
  'purple': {
    plain: 'bg-purple-50 text-purple-700 hover:bg-purple-700 border border-purple-700 hover:text-white',
    normal: 'bg-purple-700 text-white hover:bg-purple-700/90 border border-purple-700'
  },
}
const iconWithLoading = computed(() => {
  if (props.loading) {
    return 'line-md:loading-loop'
  } else {
    return props.iconName
  }
})

//计算属性，根据 color 和 plain 生成对应的 CSS 类
//computed 是 Vue 的响应式计算属性，用于根据 props 生成动态的 CSS 类
const colorClasses = computed(() => {
  if (props.plain) {
    return colorVariants[props.color].plain
  }else{
    return colorVariants[props.color].normal
  }
})
//不存在是默认大小
const sizeClasses = computed(() => {
  //不为空是默认大小
  if (!props.size) {
    return 'h-[32px] py-[8px] px-[15px] text-sm rounded-[4px]'
  } else {
    if (props.size === 'large') {
      return 'h-[40px] py-[12px] px-[19px] text-base rounded-[4px]'
    } else {
      return 'h-[24px] py-[11px] px-[5px] text-xs rounded-[3px]'
    }
  }
})

</script>

<template>
  <!-- 对应上方的属性 -->
  <button
    class="vk-button
    shadow-sm inline-flex items-center justify-center
    disabled:opacity-50 disabled:pointer-events-none"
    :class="[colorClasses, sizeClasses]"
    :disabled="disabled || loading"
  >
    <Icon :icon="iconWithLoading" class="mr-2" v-if="iconWithLoading"></Icon>
    <slot></slot>
  </button>
</template>