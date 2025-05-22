import { defineStore } from "pinia";
import { ref } from "vue";
import { onIdTokenChanged } from "firebase/auth";
import { auth } from "../config/firebase"; //

export const useAuthStore = defineStore("auth", () => {
	const idToken = ref(localStorage.getItem("idToken") || "");
	const user = ref(null);
	function setToken(token) {
		idToken.value = token;
		localStorage.setItem("idToken", token);
	}

	function clearToken() {
		idToken.value = "";
		localStorage.removeItem("idToken");
	}
	// 🔁 自動監聽並更新 token  測試中
	onIdTokenChanged(auth, async (firebaseUser) => {
		if (firebaseUser) {
			user.value = firebaseUser;
			const token = await firebaseUser.getIdToken(true); // 取得新 token
			setToken(token);
		} else {
			clearToken();
		}
	});

	return { idToken, user, setToken, clearToken };
});
