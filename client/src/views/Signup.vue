<template>
	<div class="flex justify-center items-start min-h-screen bg-black py-24 px-4">
		<div class="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
			<!-- Google 登入 -->
			<form class="mb-4">
				<input type="hidden" name="authenticity_token" value="..." />
				<button
					type="submit"
					class="w-full flex items-center justify-center gap-2 bg-gray-700 text-white font-bold py-3 rounded-md cursor-pointer hover:bg-black transition duration-200"
				>
					<img
						src="https://img.icons8.com/color/16/000000/google-logo.png"
						alt="G"
					/>
					<span>Sign Up with Google</span>
				</button>
			</form>

			<!-- 分隔文字 -->
			<p class="text-center text-gray-600 font-bold my-4">Or,</p>

			<!-- Email Sign Up 開關 -->
			<button
				@click="showEmailForm = !showEmailForm"
				class="w-full bg-gray-700 text-white font-bold py-3 rounded-md mb-4 cursor-pointer hover:bg-black transition duration-200"
			>
				Sign Up with Email
			</button>

			<!-- Email 表單 -->
			<transition
				@before-enter="beforeEnter"
				@enter="enter"
				@leave="leave"
				:css="false"
			>
				<div v-show="showEmailForm" ref="emailSection">
					<form @submit.prevent="register">
						<input type="hidden" value="..." />

						<div class="mb-4">
							<label
								for="email"
								class="block text-sm font-bold text-gray-700 mb-1"
								>Email</label
							>
							<input
								v-model="email"
								type="email"
								id="email"
								name="user[email]"
								required
								maxlength="55"
								class="w-full border border-gray-300 rounded px-3 py-2 text-black bg-gray-200 hover:bg-white transition"
							/>
						</div>

						<div class="mb-4">
							<label
								for="password"
								class="block text-sm font-bold text-gray-700 mb-1"
								>Choose Password</label
							>
							<input
								v-model="password"
								type="password"
								id="password"
								name="user[password]"
								required
								class="w-full border border-gray-300 rounded px-3 py-2 text-black bg-gray-200 hover:bg-white transition"
							/>
							<ul class="text-xs text-gray-600 mt-2 list-disc pl-5">
								<li>Include an <strong>UPPER</strong> and lowercase letter</li>
								<li>Include a number</li>
								<li>
									Include special characters: <code>@$!%*#?&><()^+_-</code>
								</li>
								<li>8–100 characters</li>
							</ul>
						</div>

						<button
							type="submit"
							class="w-full bg-green-500 text-white font-bold py-3 rounded-md mt-4 cursor-pointer hover:bg-gray-600 transition duration-200"
						>
							Submit
						</button>
					</form>
				</div>
			</transition>
		</div>
	</div>
</template>

<!-- 顯示與動畫 -->
<script setup>
import { ref } from "vue";
import { auth } from "../config/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "vue-router";
const router = useRouter();

const showEmailForm = ref(false);
const email = ref("");
const password = ref("");
const error = ref("");
const success = ref("");

async function register() {
	error.value = "";
	success.value = "";

	try {
		const userCredential = await createUserWithEmailAndPassword(
			auth,
			email.value,
			password.value
		);

		success.value = "註冊成功！";
		alert(success.value); //alert最後可以再調整美觀的樣式
		router.push("/login");
	} catch (e) {
		let msg = "";
		switch (e.code) {
			case "auth/email-already-in-use":
				msg = "這個 Email 已經被註冊了";
				break;
			case "auth/invalid-email":
				msg = "Email 格式不正確";
				break;
			case "auth/password-does-not-meet-requirements":
				msg = "密碼太弱，請使用至少 8 個字元";
				break;
			default:
				msg = "註冊失敗：" + e.message;
		}
		alert(msg);
	}
}

function beforeEnter(el) {
	el.style.height = "0";
	el.style.opacity = "0";
}

function enter(el, done) {
	el.style.transition = "all 0.3s ease";
	const height = el.scrollHeight;
	el.style.height = height + "px";
	el.style.opacity = "1";
	setTimeout(() => {
		el.style.height = "auto";
		done();
	}, 300);
}

function leave(el, done) {
	el.style.transition = "all 0.3s ease";
	el.style.height = el.scrollHeight + "px";
	requestAnimationFrame(() => {
		el.style.height = "0";
		el.style.opacity = "0";
	});
	setTimeout(done, 300);
}
</script>
