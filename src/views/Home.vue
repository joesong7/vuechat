<template>

  <div class="view login"  v-if="state.username === '' || state.username === null">
    <form class="login-form" @submit.prevent="Login">
      <div class="form-inner">
        <h1>請登入聊天室</h1>
        <label for="username">使用者名稱</label>
        <input 
          type="text" 
          v-model="inputUsername" 
          placeholder="請輸入使用者名稱" />
        <input 
          type="submit" 
          value="登入" />
      </div>
    </form>
  </div>
  <div class="view chat" v-else> 
     <header>
     <button class="logout">登出</button>
     <h2>歡迎,{{state.username}}</h2>
    </header>
    <section class="chat-box">
      
      <div 
        v-for="message in state.messages" 
        :key="message.key" 
        :class="(message.username == state.username ? 'message current-user' : 'message')">
        <div class="message-inner">
          <div class="username">{{ message.username }}</div>
          <div class="content">{{ message.content }}</div>
        </div>
      </div>
    </section>
    <footer>
      <form @submit.prevent="SendMessage">
        <input type="text" placeholder="write a message.... " v-model="inputMessage" >
        <input type="submit" value="輸入">
      </form>
    </footer>
  </div>
</template>

<script>
   import db from '../db';
   import {reactive,onMounted,ref} from 'vue'; 

export default {
 
  setup(){
    const inputUsername =ref("");
    const inputMessage =ref("");
    const state = reactive({
         username:"",
         messages:[]
    });
  const Login = () => {
      if (inputUsername.value != "" || inputUsername.value != null) {
        state.username = inputUsername.value;
        inputUsername.value = "";
      }
    }
  const SendMessage = () => {
      const messagesRef = db.database().ref("messages");
      if (inputMessage.value === "" || inputMessage.value === null) {
        return;
      }
      const message = {
        username: state.username,
        content: inputMessage.value
      }
      messagesRef.push(message);
      inputMessage.value = "";
    }
  onMounted(()=>{
        const messagesRef = db.database().ref("messages");
        messagesRef.on('value',snapshot=>{
          const data =  snapshot.val();
          let  messages =[]; //儲存臨時消息
          Object.keys(data).forEach(key => {
          messages.push({
            id: key,
            username: data[key].username,
            content: data[key].content
          });
        });
        state.messages = messages;
        })
  }); 
    return {
      inputUsername,
      Login,
      state,
      SendMessage,
      inputMessage
     
    }
  }
}
</script>
<style lang="scss">
@import "../assets/scss/home.scss";
</style>
