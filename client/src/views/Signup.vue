<template>
  <div class="flex justify-center items-start min-h-screen bg-black py-24 px-4">
    <div class="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
      
      <!-- Google 登入 -->
      <form action="/auth/google_oauth2" method="post" class="mb-4">
        <input type="hidden" name="authenticity_token" value="..." />
        <button type="submit" class="w-full flex items-center justify-center gap-2 bg-gray-800 text-white font-bold py-3 rounded-md">
          <img src="https://img.icons8.com/color/16/000000/google-logo.png" alt="G" />
          <span>Sign Up with Google</span>
        </button>
      </form>

      <!-- 分隔文字 -->
      <p class="text-center text-gray-600 font-bold my-4">Or,</p>

      <!-- Email Sign Up 開關 -->
      <button @click="showEmailForm = !showEmailForm" class="w-full bg-gray-700 text-white font-bold py-3 rounded-md mb-4">
        Sign Up with Email
      </button>

      <!-- Email 表單 -->
      <transition @before-enter="beforeEnter" @enter="enter" @leave="leave" :css="false">
        <div v-show="showEmailForm" ref="emailSection">
          <form method="post" action="/accounts/signup/user/free/year">
            <input type="hidden" name="authenticity_token" value="..." />

            <div class="mb-4">
              <label for="name" class="block text-sm font-bold text-gray-700 mb-1">Your Name</label>
              <input type="text" id="name" name="user[name]" required maxlength="75" class="w-full border border-gray-300 rounded px-3 py-2" />
            </div>

            <div class="mb-4">
              <label for="username" class="block text-sm font-bold text-gray-700 mb-1">Choose a username</label>
              <input type="text" id="username" name="user[username]" required maxlength="50" pattern="[a-zA-Z0-9-]{2,50}" class="w-full border border-gray-300 rounded px-3 py-2" />
              <small class="text-gray-500">codepen.io/<span id="signup-username-preview">username</span></small>
            </div>

            <div class="mb-4">
              <label for="email" class="block text-sm font-bold text-gray-700 mb-1">Email</label>
              <input type="email" id="email" name="user[email]" required maxlength="55" class="w-full border border-gray-300 rounded px-3 py-2" />
            </div>

            <div class="mb-4">
              <label for="password" class="block text-sm font-bold text-gray-700 mb-1">Choose Password</label>
              <input type="password" id="password" name="user[password]" required class="w-full border border-gray-300 rounded px-3 py-2" />
              <ul class="text-xs text-gray-600 mt-2 list-disc pl-5">
                <li>Include an <strong>UPPER</strong> and lowercase letter</li>
                <li>Include a number</li>
                <li>Include special characters: <code>@$!%*#?&><()^+_-</code></li>
                <li>8–100 characters</li>
              </ul>
            </div>

            <button type="submit" class="w-full bg-green-500 text-white font-bold py-3 rounded-md mt-4">
              Submit
            </button>
          </form>
        </div>
      </transition>

      
    </div>
  </div>
</template>

<!-- 顯示與動畫 -->
<script>
export default {
  name: "Signup",
  data() {
    return {
      showEmailForm: false,
    };
  },
  methods: {
    beforeEnter(el) {
      el.style.height = "0";
      el.style.opacity = "0";
    },
    enter(el, done) {
      el.style.transition = "all 0.3s ease";
      const height = el.scrollHeight;
      el.style.height = height + "px";
      el.style.opacity = "1";
      setTimeout(() => {
        el.style.height = "auto";
        done();
      }, 300);
    },
    leave(el, done) {
      el.style.transition = "all 0.3s ease";
      el.style.height = el.scrollHeight + "px";
      requestAnimationFrame(() => {
        el.style.height = "0";
        el.style.opacity = "0";
      });
      setTimeout(done, 300);
    },
  },
};
</script>
