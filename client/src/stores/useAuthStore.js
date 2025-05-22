import { defineStore } from "pinia";
import { ref } from "vue";

export const useAuthStore = defineStore("auth", () => {
	const idToken = ref(localStorage.getItem("idToken") || "");

	function setToken(token) {
		idToken.value = token;
		localStorage.setItem("idToken", token);
	}

	function clearToken() {
		idToken.value = "";
		localStorage.removeItem("idToken");
	}

	return { idToken, setToken, clearToken };
});
