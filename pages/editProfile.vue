<template>
  <div class="profile-form">
    <h2>Edit My Profile</h2>
    <form @submit.prevent="submitForm">
      <div class="form-group">
        <label for="fio">FIO</label>
        <input type="text" id="fio" v-model="form.fio" required>
      </div>
      <div class="form-group">
        <label for="email">Email</label>
        <input type="email" id="email" v-model="form.email" required>
      </div>
      <div class="form-group">
        <label for="birthday">Birthday</label>
        <input type="date" id="birthday" v-model="form.birthday" required>
      </div>
      <div class="form-group">
        <label for="gender">Gender</label>
        <select id="gender" v-model="form.gender" required>
          <option value="">Select</option>
          <option v-for="gender in genderStore.genders" :key="gender.id" :value="gender.id">
            {{ gender.name }}
          </option>
        </select>
      </div>
      <button type="submit" class="save-button" :disabled="isLoading">
        Save
        <span v-if="isLoading" class="spinner-border spinner-border-sm ms-2" role="status" aria-hidden="true"></span>
      </button>
      <div class="alert alert-danger" role="alert" v-if="errorMessage">
        {{ errorMessage }}
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useAuthStore } from '~/stores/auth';
import { useGenderStore } from '~/stores/gender';
import { useRouter } from 'vue-router';
import { api } from '~/api/index.js';

const authStore = useAuthStore();
const genderStore = useGenderStore();
const router = useRouter();
const errorMessage = ref('');
const isLoading = ref(false);

const form = ref({
  fio: '',
  email: '',
  birthday: '',
  gender: ''
});

const loadUserData = async () => {
  try {
    isLoading.value = true;
    const res = await api.get(`/users/${authStore.authData.id}`, {
      headers: {
        Authorization: `Bearer ${authStore.authData.token}`,
      },
    });
    form.value = {
      fio: res.data.fio,
      email: res.data.email,
      birthday: res.data.birthday,
      gender: res.data.gender.id,
    };
  } catch (error) {
    console.error('Failed to load user data:', error);
    errorMessage.value = 'Failed to load user data';
  } finally {
    isLoading.value = false;
  }
};

const submitForm = async () => {
  try {
    isLoading.value = true;
    await api.put(`/users`, {
      fio: form.value.fio,
      email: form.value.email,
      birthday: form.value.birthday,
      gender_id: form.value.gender,
    }, {
      headers: {
        Authorization: `Bearer ${authStore.authData.token}`,
      },
    });
    alert('Profile updated successfully!');
    router.push('/profile');
  } catch (error) {
    console.error('Failed to update profile:', error);
    errorMessage.value = error.response?.data?.message || 'Failed to update profile';
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  loadUserData();
  genderStore.fetchgenders();
});
</script>

<style scoped>
.profile-form {
  max-width: 500px;
  margin: auto;
}
.form-group {
  margin-bottom: 15px;
}
.save-button {
  display: block;
  width: 100%;
}
</style>
