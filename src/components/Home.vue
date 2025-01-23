<template>
  <div class="container mx-auto p-4">
    <div class="py-8">
      <h2
        class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-yellow-400 text-center tracking-wide"
      >
        HARRY POTTER
      </h2>
    </div>
    <div
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
    >
      <div
        v-for="product in products"
        :key="product.id"
        class="bg-black bg-opacity-75 border border-gray-700 rounded-lg shadow-md hover:shadow-2xl transition duration-300 ease-in-out flex flex-col items-center p-4 hover:bg-opacity-50"
      >
        <img
          :src="product.image"
          :alt="product.name"
          class="w-48 h-48 object-cover rounded-lg hover:scale-105 transition duration-300 ease-in-out"
        />
        <div class="p-4 text-center flex-grow flex flex-col">
          <div class="flex-grow">
            <h2 class="text-xl font-semibold text-yellow-300 mt-2">
              {{ product.name }}
            </h2>
            <p class="text-gray-400">ราคา: {{ product.price }} บาท</p>
          </div>
          <div class="flex items-center justify-center mt-2">
            <button
              @click="decreaseQuantity(product)"
              class="bg-gray-700 hover:bg-gray-600 text-white font-bold py-1 px-2 rounded-l"
            >
              -
            </button>
            <span class="mx-2 text-yellow-300">{{
              selectedQuantities[product.id] || 0
            }}</span>
            <button
              @click="increaseQuantity(product)"
              class="bg-gray-700 hover:bg-gray-600 text-white font-bold py-1 px-2 rounded-r"
            >
              +
            </button>
          </div>
          <button
            @click="addToCart(product)"
            class="bg-yellow-500 hover:bg-yellow-700 text-gray-900 font-bold py-2 px-4 rounded mt-4 w-full"
          >
            เพิ่มลงตะกร้า
          </button>
        </div>
      </div>
    </div>
    <div class="mt-8 flex justify-center">
      <router-link
        to="/cart"
        class="bg-yellow-600 hover:bg-yellow-800 text-white font-bold py-3 px-8 rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out"
      >
        ดูตะกร้าสินค้า
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { Product, CartItem } from "../types";

const products = ref<Product[]>([
{
  id: 1,
  name: "แฮร์รี่ พอตเตอร์กับศิลาอาถรรพ์",
  price: 100,
  image: "/images/sira.jpg",
},
{
  id: 2,
  name: "แฮร์รี่ พอตเตอร์กับห้องแห่งความลับ",
  price: 100,
  image: "/images/secret.jpg",
},
{
  id: 3,
  name: "แฮร์รี่ พอตเตอร์กับถ้วยอัคนี",
  price: 100,
  image: "/images/tuay.jpg",
},
{
  id: 4,
  name: "แฮร์รี่ พอตเตอร์กับนักโทษแห่งอัซคาบัน",
  price: 100,
  image: "/images/ascabun.jpg",
},
{
  id: 5,
  name: "แฮร์รี่ พอตเตอร์กับภาคีนกฟีนิกซ์",
  price: 100,
  image: "/images/phoenix.jpg",
},
{
  id: 6,
  name: "แฮร์รี่ พอตเตอร์กับเจ้าชายเลือดผสม",
  price: 100,
  image: "/images/boyblood.jpg",
},
{
  id: 7,
  name: "แฮร์รี่ พอตเตอร์กับเครื่องรางยมทูต",
  price: 100,
  image: "/images/devil.jpg",
},
]);

const selectedQuantities = ref<{ [key: number]: number }>({});

const increaseQuantity = (product: Product) => {
if (!selectedQuantities.value[product.id]) {
  selectedQuantities.value[product.id] = 0;
}
selectedQuantities.value[product.id]++;
};

const decreaseQuantity = (product: Product) => {
if (selectedQuantities.value[product.id] > 0) {
  selectedQuantities.value[product.id]--;
}
};

const addToCart = (product: Product) => {
const quantity = selectedQuantities.value[product.id] || 1;
const cartItems: CartItem[] = JSON.parse(
  localStorage.getItem("cart") || "[]"
);
const existingItem = cartItems.find(
  (item) => item.product.id === product.id
);

if (existingItem) {
  existingItem.quantity += quantity;
} else {
  cartItems.push({ product, quantity });
}

localStorage.setItem("cart", JSON.stringify(cartItems));
selectedQuantities.value[product.id] = 0; // Reset quantity after adding to cart
alert(`เพิ่ม ${product.name} จำนวน ${quantity} เล่ม ลงในตะกร้าแล้ว`);
};
</script>