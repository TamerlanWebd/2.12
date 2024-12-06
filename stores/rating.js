import {defineStore} from "pinia";
import {api} from "~/api/index.js";
export const useRatingStore = defineStore('rating', () => {
    const authStore = useAuthStore();
    const ratings = ref([]);

    const UserRatingByFilmId = computed(() => {
        return (filmId) => {
            return ratings.value.find((item) => item.film.id === filmId);
        }
    });
    const addRating = async (rating) => {
        await api.post(`/users/${authStore.authData.id}/ratings`, rating, {
            headers: {
                Authorization: `Bearer ${authStore.authData.token}`,
            }
        });
        await fethRatingByUserId();
    }
    const fethRatingByUserId = async () => {
        const res = await api.get(`/users/${authStore.authData.id}/ratings`, {
            headers: {
                Authorization: `Bearer ${authStore.authData.token}`,
            }
        });
        ratings.value = res.data.ratings;
    }
    return{
        addRating,
        ratings,
        fethRatingByUserId,
        UserRatingByFilmId,
    }
});