<template>
	<div class="min-h-screen flex items-center justify-center bg-gray-100">
		<div class="w-full max-w-md bg-white p-6 rounded shadow-md">
			<h2 class="text-2xl font-bold mb-4 text-center">登入</h2>

			<form @submit.prevent="login" class="text-black">
				<div class="mb-4">
					<label class="block font-bold mb-2">Email</label>
					<input
						v-model="email"
						type="email"
						class="w-full border px-3 py-2 rounded"
						required
					/>
				</div>

				<div class="mb-4 text-black-700">
					<label class="block text-black-700 font-bold mb-2">Password</label>
					<input
						v-model="password"
						type="password"
						class="w-full border px-3 py-2 rounded"
						required
					/>
				</div>

				<button
					type="submit"
					class="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
				>
					登入
				</button>
			</form>

			<div v-if="idToken" class="mt-6 bg-gray-100 p-4 rounded text-sm">
				<h3 class="font-semibold mb-2 text-black">JWT Token:</h3>
				<pre class="overflow-x-auto text-black">{{ idToken }}</pre>
			</div>
			<div
				class="mt-6 bg-gray-100 p-4 rounded text-sm text-black"
				v-if="idToken"
			>
				已登錄
			</div>

			<p v-if="error" class="text-red-500 mt-4">{{ error }}</p>
		</div>
	</div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";
import { useAuthStore } from "../stores/useAuthStore";

const email = ref("");
const password = ref("");
const idToken = ref("");
const error = ref("");
const authStore = useAuthStore();

onMounted(() => {
	const savedToken = localStorage.getItem("idToken");
	if (savedToken) {
		idToken.value = savedToken;
	}
});

async function login() {
	error.value = "";
	idToken.value = "";

	try {
		const userCredential = await signInWithEmailAndPassword(
			auth,
			email.value,
			password.value
		);

		const user = userCredential.user;
		const token = await user.getIdToken(); // 拿到 JWT
		idToken.value = token;
		authStore.setToken(token);
		console.log("登入成功，JWT:", token);
	} catch (e) {
		error.value = `登入失敗：${e.message}`;
		console.error(e);
	}
}
</script>
