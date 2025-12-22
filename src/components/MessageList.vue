<script lang="ts" setup>
import { Icon } from '@iconify/vue'
import VueMarkdown from 'vue-markdown-render'
import { MessageProps } from '../types'
import markdownItHighlightjs from 'markdown-it-highlightjs'
defineProps<{ messages: MessageProps[] }>()
const plugins = [markdownItHighlightjs]
</script>

<template>
  <div class="message-list" >
    <div class="message-item mb-3" v-for="message in messages" :key="message.id">
      <div class="flex" :class="{'justify-end': message.type === 'question'}">
        <div>
          
          <!-- 提问 -->
          <div class="text-sm text-gray-500 mb-2" :class="{'text-right': message.type === 'question'}">
            {{message.createdAt}}
          </div>
          <div class="message-question bg-emerald-500 text-white p-2 rounded-md" v-if="message.type === 'question'">
            {{message.content}}
          </div>

          <div class="message-question bg-gray-200 text-gray-700 p-2 rounded-md" v-else>
            <template v-if="message.status === 'loading'">
              <Icon icon="eos-icons:three-dots-loading"></Icon>
            </template>
            <div v-else class="prose prose-slate max-w-none prose-headings:my-3 prose-p:my-2 prose-li:my-1 prose-ul:my-2 prose-ol:my-2 prose-blockquote:my-3 prose-code:my-0 prose-pre:my-3 prose-hr:my-4 prose-pre:p-0">
              <!-- 使用markdown渲染 -->
             <vue-markdown :source="message.content" :plugins="plugins" />
              <!-- 有语义化样式,
               Tailwind CSS 默认对所有 HTML 元素应用了一个非常激进的 reset，移除了几乎所有的默认样式
               插件为这些被 reset 的元素重新引入了合理的默认样式 -->
            </div>
          </div>

        </div>
      </div>
    </div>    
  </div>
</template>
