<template>
  <Toaster-Library position="top-right" richColors closeButton expand />
  <NavBar
    @sendMode="receiveMode"
    @search-now="storageSearchVal"
    @delete-product="deleteProduct"
    :products="products"
  />
  <router-view
    v-slot="{ Component }"
    :filteringSearch="filteringSearch"
    @sendProduct="receiveProduct"
    @orderDone="SendToOrders"
    @delete-product="deleteProduct"
    @deleteOrder="deleteOrder"
    @changeState="changeState"
    @changePassword="changePassword"
    @changeEmail="changeEmail"
    :products="products"
    :newOrders="newOrders"
  >
    <transition name="fade" mode="out-in">
      <Component :is="Component" />
    </transition>
  </router-view>
  <Footer :modeNow="modeNow" />
</template>
<script setup>
import { computed, onMounted, ref } from "vue";
import NavBar from "./components/NavBar.vue";
import Footer from "./components/MyFooter.vue";
import { toast } from "vue-sonner";

// Variable To Storage Input search
const filteringSearch = ref("");

// Array To Storage The receive Products
const products = ref([]);

const modeNow = ref("");

// function to receive Mode And Storage In Variable
function receiveMode(mode) {
  modeNow.value = mode;
}

// localStorage functions
function savedInLocalStorage(name, item) {
  localStorage.setItem(name, item);
}

// Function To Storage Search Val
function storageSearchVal(searchFilter) {
  filteringSearch.value = searchFilter;
}
// Function To Storage Search Val

// computed to compute the size of products array
const sProducts = computed(() => {
  return products.value.length;
});

// Function to receive Product
function receiveProduct(productDetails) {
  const existingProduct = products.value.find((item) => item.id === productDetails.id);

  //If length of cart < 5 and the product is exist
  if (existingProduct) {
    existingProduct.quantity = Number(existingProduct.quantity) + Number(productDetails.quantity);
    toast.success("🛒 Item added to your cart!");
    savedInLocalStorage("products", JSON.stringify(products.value));
    //Else if length of cart < 5 and the product is not exist
  } else if (sProducts.value < 5) {
    products.value.push({ ...productDetails });
    toast.success("🛒 Item added to your cart!");
    savedInLocalStorage("products", JSON.stringify(products.value));
    //Else (the product is new and the cart length is 5)
  } else {
    toast.error("Can't add more products in your cart!");
    return;
  }
}

function deleteProduct(id) {
  products.value = products.value.filter((product) => product.id !== id);
  toast.error("🗑️ Item removed from your cart!");
  savedInLocalStorage("products", JSON.stringify(products.value));
}

// Array To Storage The New Orders
const newOrders = ref([]);

// Function to fetch data from local storage
function SendToOrders(completeOrder) {
  newOrders.value.push(completeOrder);
  products.value.length = 0;
  savedInLocalStorage("newOrders", JSON.stringify(newOrders.value));
  savedInLocalStorage("products", JSON.stringify(products.value));
}

// Function To Delete Order
function deleteOrder(id) {
  newOrders.value = newOrders.value.filter((order) => order.id !== id);
  savedInLocalStorage("newOrders", JSON.stringify(newOrders.value));
}

function updateLocalStorage() {
  const savedProducts = JSON.parse(localStorage.getItem("products"));
  if (savedProducts) {
    products.value = savedProducts;
  }

  const savedNewOrders = JSON.parse(localStorage.getItem("newOrders"));
  if (savedNewOrders) {
    newOrders.value = savedNewOrders;
  }
}

function changeState(id) {
  newOrders.value = newOrders.value.map((order) =>
    order.id === id ? { ...order, state: "delivered" } : order,
  );
  savedInLocalStorage("newOrders", JSON.stringify(newOrders.value));
}

// function to change password on login page
function changePassword(newPassword) {
  localStorage.setItem("newPass", newPassword);
}

function changeEmail(newEmail) {
  localStorage.setItem("newEmail", newEmail);
}

onMounted(() => {
  updateLocalStorage();
});
</script>

<style lang="scss" scoped>
body,
#app {
  background-color: #edf1f4 !important;
  margin: 0;
  padding: 0;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-from {
  transform: translateY(10px);
}
.fade-leave-to {
  transform: translateY(-10px);
}

.fade-enter-active,
.fade-leave-active {
  transition: 0.5s linear;
}
</style>
