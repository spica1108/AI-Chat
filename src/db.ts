//初始化数据库
import Dexie, { type EntityTable } from "dexie";
import { providers , conversations, messages } from "./testData";
import { ProviderProps ,ConversationProps, MessageProps } from "./types";


export const db = new Dexie('vChatDatabse') as Dexie & {
  providers: EntityTable<ProviderProps, 'id'>
  conversations: EntityTable<ConversationProps, 'id'>
  messages:  EntityTable<MessageProps, 'id'>
}

//对数据库和数据结构进行升级和修改
db.version(1).stores({
  providers:'++id, name',
  conversations: '++id, providerId',
  messages: '++id, conversationId'
})

//provider数据要进行初始添加
export const initProviders = async() => {
  const count = await db.providers.count()
  if (count === 0){
    //bulkAdd可添加多条数据
    db.providers.bulkAdd(providers)
  }
}