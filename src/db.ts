//初始化数据库
import Dexie, { type EntityTable } from "dexie";
import { ProviderProps } from "./types";
import { provide } from "vue";

export const db = new Dexie('vChatDatabse') as Dexie & {
  providers: EntityTable<ProviderProps, 'id'>
}

//对数据库和数据结构进行升级和修改
db.version(1).stores({
  providers:'++id, name'
})
//创建完毕，插入数据学习增删改查