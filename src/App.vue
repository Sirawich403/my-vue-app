<template>
  <div class="bg-gray-900 text-white min-h-screen font-serif" style="background-image: url('/images/background.jpg'); background-size: cover; background-attachment: fixed;">
    <header class="p-4 bg-black bg-opacity-75 backdrop-blur-md sticky top-0 z-50">
      <div class="container mx-auto flex justify-between items-center">
        <h1 class="text-5xl font-bold text-yellow-400 tracking-wider text-center flex-grow">
          <router-link to="/" class="hover:text-yellow-300">บ้านนายดิน</router-link>
        </h1>
        <nav>
          <router-link to="/" class="text-yellow-300 hover:text-yellow-500 mx-4 font-semibold text-lg transition duration-300 ease-in-out"
            >หน้าหลัก</router-link>
          <router-link to="/cart" class="text-yellow-300 hover:text-yellow-500 mx-4 font-semibold text-lg transition duration-300 ease-in-out flex items-center"
            >ตะกร้าสินค้า</router-link>
        </nav>
      </div>
    </header>
    <main class="p-4">
      <router-view />
    </main>
    <footer class="p-4 bg-black bg-opacity-75 mt-8">
      <p class="text-center text-gray-300">
        &copy; 2024 บ้านนายดิน. All rights reserved.
      </p>
    </footer>
  </div>
</template>

<script setup lang="ts">
</script>