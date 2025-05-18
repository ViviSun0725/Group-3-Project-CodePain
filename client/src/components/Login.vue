<template>
  <div class="login-wrapper">
    <div class="logo">CODEPEN</div>
    <div class="header">Log In</div>
    <div class="container">

      <div class="left">
        <button class="social-btn">
      
          <svg width="20" height="20" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill="#EA4335" d="M24 9.5c3.54 0 6.1 1.52 7.5 2.79l5.56-5.56C33.32 3.53 28.98 2 24 2 14.73 2 6.96 7.87 4 16.26l6.64 5.15C11.67 14.88 17.3 9.5 24 9.5z"/>
            <path fill="#4285F4" d="M46.14 24.63c0-1.55-.13-2.71-.39-3.88H24v7.35h12.44c-.25 2.17-1.6 5.44-4.6 7.63l7.09 5.5c4.1-3.8 6.45-9.43 6.45-16.6z"/>
            <path fill="#FBBC05" d="M10.64 28.41C9.9 26.84 9.5 25.09 9.5 23.25s.4-3.59 1.14-5.16l-6.63-5.15C2.65 16.41 1 19.63 1 23.25s1.65 6.84 4.5 10.31l6.64-5.15z"/>
            <path fill="#34A853" d="M24 44c5.9 0 10.85-1.94 14.47-5.27l-7.09-5.5c-1.9 1.28-4.43 2.04-7.38 2.04-6.7 0-12.33-5.38-13.36-12.41l-6.64 5.15C6.96 40.13 14.73 46 24 46z"/>
          </svg>
          Log In with Google
        </button>

    
        <button class="social-btn">
          <svg viewBox="0 0 16 16" fill="#fff" xmlns="http://www.w3.org/2000/svg" width="20" height="20">
            <path d="..." />
          </svg>
          Log In with GitHub
        </button>

        <details class="info">
          <summary>How social log in works</summary>
          <p>
            If the email address associated with your social account matches the email address of your CodePen account, you'll be logged in.
            Questions? <a href="#">contact support</a>.
          </p>
        </details>
      </div>

   
      <div class="divider"><span>OR</span></div>

      
      <div class="right">
        <form @submit.prevent="handleLogin">
          <div class="form-group">
            <label for="username">Username or Email</label>
            <input id="username" v-model="form.username" type="text" />
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input id="password" v-model="form.password" type="password" />
          </div>
          <button type="submit" class="btn-primary">Log In</button>
        </form>

        <div class="forgot">
          <a href="#" @click.prevent="toggleReset">Forgot Password?</a>
        </div>

        <div id="reset-box" v-show="showReset">
          <h2>Reset Your Password</h2>
          <form @submit.prevent="sendResetEmail">
            <div class="form-group">
              <label for="reset-email">Username or Email</label>
              <input id="reset-email" v-model="resetEmail" type="text" />
            </div>
            <button class="btn-secondary">Send Password Reset Email</button>
          </form>
        </div>
      </div>
    </div>

    <footer class="signup-footer">
      <div class="signup">
        Need an account? <a href="#">Sign up now!</a>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const form = ref({ username: '', password: '' })
const showReset = ref(false)
const resetEmail = ref('')

function handleLogin() {
  console.log('Logging in with', form.value)
}

function toggleReset() {
  showReset.value = !showReset.value
}

function sendResetEmail() {
  console.log('Sending reset to', resetEmail.value)
}
</script>

<style scoped>
* { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: 'Segoe UI', Tahoma, sans-serif;
      background-color: #1e1f26;
      color: #ececf1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      padding: 1rem;
    }


    .main-wrapper {
  max-width: 960px;
  width: 100%;
  padding-left: 64px; 
  padding-right: 0;
  margin-bottom: 1.5rem;
}


    
    .logo {
      font-size: 1.5rem;
      font-weight: bold;
      color: #fff;
      letter-spacing: 1px;
      user-select: none;
      margin-bottom: 0.25rem;
      text-align: left;
    }
    .header {
      font-size: 4.5rem;
      font-weight: 700;
      user-select: none;
      text-align: left;
      margin-bottom: 0;
    }

    .container {
      display: flex;
      max-width: 960px;
      width: 100%;
      border-radius: 8px;
      overflow: hidden;
      padding-left: 32px;
      padding-right: 32px;
    }
    .left, .divider, .right { padding: 2rem; }
    .left { flex: 1; }
    .social-btn {
      width: 75%;         
      display: flex;
      align-items: center;
      padding: 0.75rem 1rem;
      margin-bottom: 1rem; 
      background: #b3b4ba;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      transition: background 0.2s;
    }
    .social-btn svg { width: 20px; height: 20px; margin-right: 0.75rem; }
    

    .social-btn:hover { background: #4b4e5a; }
    .info {
      border-radius: 4px;
      font-size: 0.9rem;
      line-height: 1.4;
      padding: 0;
    }
    .info[open] {
      background: #323444;
      padding: 1rem;
      width: 75%;
    }
    .info summary { cursor: pointer; font-weight: 500; margin-bottom: 0.5rem; }
    .divider {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      align-self: stretch;
      width: 2rem;
      background: #1e1f26;
    }
    .divider::before {
      content: '';
      position: absolute;
      top: 0;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
      width: 1px;
      background: #444;
    }
    .divider span {
      position: absolute;
      width: 46px;
      height: 18%;
      left: calc(50% - 23px);
      top: 41%;
      border: 2px solid #444;
      text-align: center;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 10px;
      font-size: 1.2rem;
      line-height: 30px;
      background: #1e1f26;
      color: #ccc;
    }
    .right {
      flex: 1;
      display: flex;
      flex-direction: column;
      padding: 2rem;
    }
    .right h2 { font-size: 2rem; font-weight: 600; margin-bottom: 1rem; }
    .form-group { margin-bottom: 1.25rem; }
    .form-group label { display: block; margin-bottom: 0.25rem; font-size: 0.9rem; }
    .form-group input { width: 100%; padding: 0.75rem; border: none; border-radius: 4px; background: #b3b4ba; color: #fff; font-size: 1rem; }
    .btn-primary { width: 100%; padding: 0.75rem; background: #38c172; border: none; border-radius: 4px; color: #1e1f26; font-size: 1rem; cursor: pointer; transition: background 0.2s; }
    .btn-primary:hover { background: #2fa055; }
    .forgot { text-align: center; margin: 0.75rem 0; font-size: 0.9rem; }
    .forgot a { color: #38c172; text-decoration: none; cursor: pointer; }
    #reset-box { display: none; background: #323444; border-radius: 4px; padding: 1.5rem; margin-top: 1.5rem; }
    #reset-box h2 { margin-top: 0; }
    .btn-secondary { width: 100%; padding: 0.75rem; background: #3a3c46; color: #ececf1; border: none; border-radius: 4px; font-size: 1rem; cursor: pointer; transition: background 0.2s; }
    .btn-secondary:hover { background: #4b4e5a; }
    .signup-footer {
      max-width: 960px;
      width: 100%;
      padding: 1rem 32px;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 1rem; 
    }
    .signup-footer .signup {
      font-size: 0.9rem;
      color: #ececf1;
    }
    .signup-footer .signup a {
      color: #38c172;
      text-decoration: none;
      font-weight: 500;
    }
    .info a {
      color: lightblue;       
      text-decoration: underline;
    }
    .info a:hover {
      color: #ffffff;
    }
    .signup a{
      color: lightblue !important;  
    }
    .signup a:hover{
      color: #ffffff !important;
    }
    .forgot a{
      color: lightblue !important;
    }
    .forgot a:hover{
      color: #ffffff !important;
    }

</style>
