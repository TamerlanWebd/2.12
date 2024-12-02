<script setup lang="ts">
import {useFilmStore} from "~/stores/film";
import {useCategoryStore} from "~/stores/category";

const categoryStory = useCategoryStore();
const filmStore = useFilmStore();
</script>


<template>

  <div class="col-md-4">
    <select class="form-select" aria-label="Default select example">
      <option :value="null" selected>Select country</option>
      <option
          v-for="category in categoryStory.categories"
          :key="category.id"
          :value="category.id">{{ category.name }} ({{category.filmCount}}) </option>
    </select>
  </div>

  <div class="row ">
    <div class="col-md-4">
      <select class="form-select" aria-label="Default select example">
        <option selected>Выбор жанра</option>
        <option value="1">One</option>
        <option value="2">Two</option>
        <option value="3">Three</option>
      </select>
    </div>

    <div class="col-md-2">
      <select class="form-select" aria-label="Default select example">
        <option value="1">Name</option>
        <option value="2">Year</option>
        <option value="3">Rating</option>
      </select>
    </div>
    <div class="col-md-2">   <button type="button" class="btn btn-outline-info">Reset</button></div>
  </div>
  <div v-if="!filmStore.isLoading"  class="d-flex justify-content-center">
    <div  class="spinner-border" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>
  <div class="row row-cols-1 row-cols-md-3 g-4">
    <div class="col" v-for="film in filmStore.films" :key="film.id">
      <div class="card h-100">
        <img v-if="film.link_img" :src="film.link_img" class="card-img-top" alt="...">
        <img v-else="film.link_img" src="https://artgallerynsk.ru/upload/iblock/25c/25c5bfba434540925e36313a39c6864e.jpg" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title"> {{ film.name}}</h5>
          <p class="card-text"> {{ film.raringAvg}}</p>
          <p class="card-text"> {{ film.duration }} min.</p>
          <p class="card-text">
            <template v-for="(category, index) in film.categories" :key="category.id">
              {{ category.name + (index + 1 < film.categories.length ? ", ": "") }}
            </template>
          </p>

        </div>
      </div>
    </div>
  </div>

</template>