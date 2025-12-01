//类型文件

//和conversation相关的数据结构
export interface ConversationProps {
  id: number; //唯一标识符
  title: string; //对话标题
  selectedModel: string; //选择的模型
  createdAt: string; //创建时间
  updatedAt: string; //最后更新时间
  providedId: number; //使用哪个模型创建的conversation
}
//接下来创建对应的组件

export interface ProviderProps {
  id: number;
  name: string;
  title?: string;
  desc?: string;  //说明信息
  avatar?: string;  //图标
  createdAt: string;
  updatedAt: string;
  models: string[];  //支持的模型列表
}

export type MessageStatus = 'loading' | 'streaming' | 'finished';
export interface MessageProps {
  id: number;
  content: string; //消息内容
  type: 'question' | 'answer'; //消息类型，问题，答案
  conversationId: number; //所属对话ID
  status?: MessageStatus; //消息状态，可选，question类型没有状态
  createdAt: string;
  updatedAt: string;
}