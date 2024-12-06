import { defineStore } from "pinia";
import { api } from "~/api/index.js";

export const useAuthStore = defineStore("auth", () => {
    const authData = ref(null);
    const authCookie = useCookie("auth");

    const signup = async (data) => {
        try {
            console.log("Sending data:", data);
            const res = await api.post("/auth/signup", data);
            authData.value = res.data;
            saveAuthData();
        } catch (e) {
            throw new Error(e.response.data.message);
        }
    };

    const signin = async (data) => {
        try {
            const res = await api.post('/auth/signin', data);
            authData.value = res.data;
            saveAuthData();
        } catch (e) {
            throw new Error(e.response.data.message);
        }
    };

    const signout = async () => {
        try {
            await api.post("/auth/signout", null, {
                headers: {
                    Authorization: `Bearer ${authData.value.token}`,
                }
            });
            removeAuthData();
        } catch (error) {
            console.error('Sign out failed:', error);
        }
    };

    const updateUser = async (data) => {
        try {
            const res = await api.put(`/users/${authData.value.id}`, data, {
                headers: {
                    Authorization: `Bearer ${authData.value.token}`,
                }
            });
            authData.value = { ...authData.value, ...res.data };
            saveAuthData();
        } catch (e) {
            console.error('Failed to update user data:', e.response ? e.response.data : e.message);
        }
    };

    const saveAuthData = () => {
        if (authData.value) {
            authCookie.value = btoa(JSON.stringify(authData.value));
        }
    };

    const removeAuthData = () => {
        authData.value = null;
        authCookie.value = null;
    };

    const deleteAccount = async () => {
        try {
            await api.delete('/users', {
                headers: {
                    Authorization: `Bearer ${authData.value.token}`,
                }
            });
            removeAuthData();
        } catch (e) {
            console.error("Ошибка при удалении аккаунта:", e.response ? e.response.data : e.message);
        }
    };

    const readAuthData = () => {
        if (authCookie.value) {
            authData.value = JSON.parse(atob(authCookie.value));
        }
    };

    readAuthData();

    return {
        deleteAccount,
        updateUser,
        authData,
        signup,
        signin,
        signout,
    };
});
