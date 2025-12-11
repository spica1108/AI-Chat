/**
 * This file will automatically be loaded by vite and run in the "renderer" context.
 * To learn more about the differences between the "main" and the "renderer" context in
 * Electron, visit:
 *
 * https://electronjs.org/docs/tutorial/process-model
 *
 * By default, Node.js integration in this file is disabled. When enabling Node.js integration
 * in a renderer process, please be aware of potential security implications. You can read
 * more about security risks here:
 *
 * https://electronjs.org/docs/tutorial/security
 *
 * To enable Node.js integration in this file, open up `main.ts` and enable the `nodeIntegration`
 * flag:
 *
 * ```
 *  // Create the browser window.
 *  mainWindow = new BrowserWindow({
 *    width: 800,
 *    height: 600,
 *    webPreferences: {
 *      nodeIntegration: true
 *    }
 *  });
 * ```
 */
import { createApp } from 'vue';
import { createPinia } from 'pinia'
// Memory路由模式，路由不会同步到URL，仅在内存管理路由状态
import { createRouter, createMemoryHistory } from 'vue-router';
import { Icon } from '@iconify/vue';
import App from './App.vue';
import Home from './views/Home.vue';
import Conversation from './views/Conversation.vue';
import Settings from './views/Settings.vue';
import './index.css';
import { useConversationStore } from './stores/conversation';

//路由规则
const routes = [
  { path: '/', component: Home },
  { path: '/conversation/:id?', component: Conversation },
  { path: '/settings', component: Settings }
];

const router = createRouter({
  history: createMemoryHistory(),
  routes
});
//to到哪里去
router.beforeEach((to) =>{
  const store = useConversationStore()
  console.log('path', to.path);
  // 不符合条件，内容就清空
  if(!to.path.startsWith('/conversation/')){
    store.selectedId = -1
  }
})
const pinia = createPinia()
const app = createApp(App);
app.component('Icon', Icon);//全局注册Icon组件
app.use(router);
app.use(pinia)
app.mount('#app');

console.log(
  '👋 This message is being logged by "renderer.ts", included via Vite',
);