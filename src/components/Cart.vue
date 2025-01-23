<template>
  <div class="container mx-auto p-4">
    <h1 class="text-3xl font-bold text-yellow-400 text-center mb-8">
      ตะกร้าสินค้า
      <img
        src="/images/cart.png"
        alt="Cart"
        class="w-8 h-8 inline-block ml-4"
      />
    </h1>
    <div
      v-if="cartItems.length > 0"
      class="bg-black bg-opacity-75 p-6 rounded-lg shadow-lg"
    >
      <div
        v-for="item in cartItems"
        :key="item.product.id"
        class="border-b border-gray-700 p-4 flex items-center"
      >
        <img
          :src="item.product.image"
          :alt="item.product.name"
          class="w-24 h-24 object-cover rounded-lg mr-4"
        />
        <div class="flex-grow">
          <h2 class="text-xl font-semibold text-yellow-300">
            {{ item.product.name }}
          </h2>
          <p class="text-gray-400">ราคา: {{ item.product.price }} บาท</p>
          <p class="text-gray-400">จำนวน: {{ item.quantity }} เล่ม</p>
          <div class="flex items-center mt-2">
            <button
              @click="decreaseQuantity(item)"
              class="bg-gray-700 hover:bg-gray-600 text-white font-bold py-1 px-2 rounded-l"
            >
              -
            </button>
            <span class="mx-2 text-yellow-300 font-number">{{
              item.quantity
            }}</span>
            <button
              @click="increaseQuantity(item)"
              class="bg-gray-700 hover:bg-gray-600 text-white font-bold py-1 px-2 rounded-r"
            >
              +
            </button>
          </div>
          <button
            @click="removeFromCart(item)"
            class="text-red-500 hover:text-red-700 mt-2"
          >
            ลบ
          </button>
        </div>
      </div>
      <div class="mt-6">
        <p class="text-lg font-semibold text-gray-400">
          ราคาก่อนลด: {{ totalPriceBeforeDiscount }} บาท
        </p>
        <p class="text-lg font-semibold text-red-500">
          ส่วนลด: {{ totalDiscount }} บาท
        </p>
        <p class="text-xl font-bold text-yellow-400">
          ราคาสุทธิ: {{ totalPrice }} บาท
        </p>
      </div>
    </div>
    <div v-else>
      <p class="text-gray-400">ไม่มีสินค้าในตะกร้า</p>
    </div>
    <div class="mt-8 flex justify-center">
      <router-link
        to="/"
        class="bg-yellow-600 hover:bg-yellow-800 text-white font-bold py-3 px-8 rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out"
      >
        กลับไปหน้าหลัก
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { CartItem } from "../types";
import { calculateTotalPrice } from "../utils";

const cartItems = ref<CartItem[]>([]);

const totalPriceBeforeDiscount = computed(() => {
  return cartItems.value.reduce((total, item) => {
    return total + item.product.price * item.quantity;
  }, 0);
});

const totalDiscount = computed(() => {
  return totalPriceBeforeDiscount.value - calculateTotalPrice(cartItems.value);
});

const totalPrice = computed(() => calculateTotalPrice(cartItems.value));

onMounted(() => {
  cartItems.value = JSON.parse(localStorage.getItem("cart") || "[]");
});

const increaseQuantity = (item: CartItem) => {
  item.quantity++;
  updateLocalStorage();
};

const decreaseQuantity = (item: CartItem) => {
  if (item.quantity > 1) {
    item.quantity--;
    updateLocalStorage();
  }
};

const removeFromCart = (item: CartItem) => {
  cartItems.value = cartItems.value.filter(
    (cartItem) => cartItem.product.id !== item.product.id
  );
  updateLocalStorage();
};

const updateLocalStorage = () => {
  localStorage.setItem("cart", JSON.stringify(cartItems.value));
};
</script>

<style scoped>
.font-number {
  font-family: 'Sarabun', sans-serif;
}
</style>