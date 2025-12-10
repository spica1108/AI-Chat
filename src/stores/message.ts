import { defineStore } from "pinia";
import { db } from "../db";
import { MessageProps, MessageStatus, UpdatgedStreamData } from "../types";

export interface MessageStore {
  items: MessageProps[]
}

export const useMessageStore = defineStore('message',{
  state: (): MessageStore => {
    return{
      items:[]
    }
  },
  actions:{
    //获取message
    async fetchMessagesByConversation(conversationId: number){
      const items = await db.messages.where({ conversationId }).toArray()
      this.items = items
    },
    //新建
    //去除id
    async createMessage(createdData: Omit<MessageProps, 'id'>){
      const newMesssgeId = await db.messages.add(createdData)
      this.items.push({ id: newMesssgeId, ...createdData })
      return newMesssgeId
    },
    //更新数据
    async updateMessage (streamData: UpdatgedStreamData){
      const { messageId, data } = streamData
      const currentMessage = this.items.find(item => item.id === messageId)
      if(currentMessage){
        const updatedData = {
          content: currentMessage.content + data.result,
          status: data.is_end ? 'finished' : 'streaming' as MessageStatus,
          updateAt: new Date().toISOString(),
        }
        await db.messages.update(messageId,updatedData)
        //更新响应式数据 filteredMessages
        const index = this.items.findIndex(item => item.id === messageId)
        if (index !== -1) {
        //展开之前的信息
        this.items[index] = { ...this.items[index], ...updatedData }
        }
      }
    },
  },
  getters: {
    getLastQuestion: (state) => (conversationId: number) => {
      return state.items.findLast(item => item.conversationId === conversationId && item.type === 'question')
    }
  }
})