//定义store
import { defineStore } from "pinia";
import { db } from '../db'
import { ConversationProps } from "../types";

export interface ConversationStore {
  items: ConversationProps[];
}

export const useConversationStore = defineStore('conversation', {
  //设定类型
  //定义store
  state: (): ConversationStore => {
    return {
      items: []
    }
  },
  actions: {
    async fetchConversations() {
      const items = await db.conversations.toArray()
      //访问store实例
      this.items = items
    },
    //创建对话
    async createConversation(createdData: Omit<ConversationProps, 'id'>) {
      const newCId = await db.conversations.add(createdData)
      this.items.push({
        id: newCId,
        ...createdData
      })
      return newCId
    }
  },
  getters: {
    totalNumber: (state) => state.items.length,
    //通过id获取conversation的值
    //这里使用的是state，区别于actions使用this
    getConversationById: (state) => (id: number) => {
      return state.items.find(item => item.id === id)
    }
  }
})