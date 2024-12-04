<template>
  <div>
    <header>
      <nav class="navbar navbar-expand-lg bg-body-tertiary mb-3">
        <div class="container-fluid">
          <a class="navbar-brand" href="#">Navbar</a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                  aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
              <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="#">Home</a>
              </li>
            </ul>
            <div class="ms-auto d-flex">
              <button @click="$router.push('/signup')" class="btn btn-outline-success me-2" type="submit" >signUp</button>
              <button type="button" class="btn btn-outline-info">SignIn</button>
            </div>
          </div>
        </div>
      </nav>
    </header>

    <main class="main my-4 mx-5">
      <NuxtPage />
    </main>

    <footer class="bg-dark text-white p-3 mt-3">
      <div class="container text-center">
        <p class="lead">COPYRIGHT</p>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">

</script>