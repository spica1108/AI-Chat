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