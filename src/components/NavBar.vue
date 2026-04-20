<template>
  <div class="NavBar" v-if="route.name !== 'login'">
    <div class="container-lg">
      <nav ref="myNavbar" class="navbar navbar-expand-md align-items-center p-3">
        <a href="#home" class="navbar-brand">
          <span class="fw-bold text-uppercase cursor-pointer" @click="router.push({ name: 'home' })"
            ><img
              class="img-fluid"
              src="/images/brandDark.png"
              style="width: 3rem"
              alt=""
              v-if="mode === 'dark'" />
            <img class="img-fluid" src="/images/brand.png" style="width: 3rem" alt="" v-else
          /></span>
        </a>

        <button
          class="navbar-toggler me-auto"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon text-light"></span>
        </button>

        <div
          class="offcanvas navbar-offcanvas offcanvas-start"
          id="navbarNav"
          style="z-index: 100000"
        >
          <div class="offcanvas-header">
            <button ref="closeBtn" class="btn-close" data-bs-dismiss="offcanvas"></button>
          </div>

          <div class="offcanvas-body justify-content-center">
            <ul
              v-if="
                route.name !== 'singleorder' &&
                route.name !== 'bestsellers' &&
                route.name !== 'checkout'
              "
              class="navbar-nav gap-2"
            >
              <li class="nav-item mb-3 mb-md-0">
                <router-link class="text-decoration-none" :to="{ name: 'home' }">Home</router-link>
              </li>

              <li class="nav-item mb-3 mb-md-0">
                <router-link class="text-decoration-none" :to="{ name: 'orders' }"
                  >Orders</router-link
                >
              </li>

              <li class="nav-item mb-3 mb-md-0">
                <router-link class="text-decoration-none" :to="{ name: 'Dashboard' }"
                  >Dashboard</router-link
                >
              </li>

              <li class="nav-item mb-3 mb-md-0">
                <router-link class="text-decoration-none" :to="{ name: 'about' }"
                  >About</router-link
                >
              </li>

              <li class="nav-item mb-3 mb-md-0">
                <router-link class="text-decoration-none" :to="{ name: 'contact' }"
                  >Contact</router-link
                >
              </li>
            </ul>
          </div>
        </div>

        <div class="input-group w-25 me-3 d-none d-md-flex">
          <span
            class="input-group-text"
            id="basic-addon1"
            v-if="
              route.name !== 'checkout' &&
              route.name !== 'singleorder' &&
              route.name !== 'profile' &&
              route.name !== 'contact' &&
              route.name !== 'about'
            "
            ><i class="bi bi-search text-muted search"></i
          ></span>

          <input
            v-if="
              route.name !== 'checkout' &&
              route.name !== 'singleorder' &&
              route.name !== 'profile' &&
              route.name !== 'contact' &&
              route.name !== 'about'
            "
            v-model="searchFilter"
            type="text"
            class="form-control"
            placeholder="Search"
            aria-label="search"
            aria-describedby="basic-addon1"
            @input="sendEmit"
          />
        </div>

        <div class="logo d-flex gap-3 align-items-center me-4">
          <div class="cart position-relative">
            <i class="bi bi-cart cursor-pointer" @click="dropdownToggle" ref="cartIcon"></i>

            <span
              class="counter position-absolute d-flex justify-content-center align-items-center bg-primary text-light"
              v-if="counter"
              >{{ counter }}</span
            >

            <transition name="fade">
              <div class="menu position-absolute rounded-5" ref="menuElement" v-if="dropdownMenu">
                <div
                  class="menu-header bg-altPrimary rounded-top-5"
                  :class="{ 'border-bottom': products.length > 0 }"
                >
                  <h2 class="title text-white m-0 d-flex p-3 gap-2 align-items-center">
                    <i class="bi bi-cart"></i> Products
                  </h2>
                </div>

                <div class="menu-body" v-if="products.length">
                  <ul class="list-unstyled m-0 bg-altSecondary">
                    <li
                      v-for="product in products"
                      :key="product.id"
                      class="p-2 d-flex flex-column flex-md-row align-items-center justify-content-between px-3 position-relative"
                    >
                      <div class="image me-3" style="width: 100px">
                        <img
                          :src="product.image"
                          :alt="product.title"
                          class="img-fluid rounded-2"
                        />
                      </div>

                      <div class="text-product me-auto">
                        <h3
                          class="title p-2 mb-2 text-altDark d-flex flex-column gap-1 text-center text-md-start"
                        >
                          {{ product.title }}

                          <small class="text-altMuted"
                            >{{ product.quantity }}X = ${{
                              product.quantity * product.price
                            }}</small
                          >
                        </h3>
                      </div>

                      <div class="delete" ref="deleteBtn">
                        <i
                          class="bi bi-trash3 cursor-pointer"
                          @click.stop="sendDeleteEmit(product.id)"
                        ></i>
                      </div>
                    </li>
                  </ul>

                  <div class="subtotal text-center text-md-end px-3 bg-altSecondary">
                    <p class="text-uppercase fw-bold fs-5 m-0 py-2">SubTotal: ${{ subtotal }}</p>
                  </div>
                </div>

                <h2
                  v-else
                  class="noProducts p-3 m-0 d-flex justify-content-center align-items-center text-altDark bg-altSecondary"
                >
                  No products available.
                </h2>

                <div class="checkout text-center" v-if="products.length > 0">
                  <router-link
                    to="/checkout"
                    class="btn btn-primary w-100 py-3 rounded-top-0 text-white shadow-none"
                    style="background-color: #003c7a"
                  >
                    Check Out
                  </router-link>
                </div>
              </div>
            </transition>
          </div>

          <div class="profile" style="width: 32px" @click="router.push({ name: 'profile' })">
            <img
              src="/images/logo.jpg"
              class="img-fluid rounded-pill border border-primary border-2 cursor-pointer"
              alt=""
            />
          </div>
        </div>

        <div class="mode" @click="changeMod">
          <div class="mode" v-if="mode">
            <i class="bi bi-sun cursor-pointer"></i>
          </div>

          <div class="mode" v-else>
            <i class="bi bi-moon cursor-pointer"></i>
          </div>
        </div>
      </nav>
    </div>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";
import { computed, onMounted, onUnmounted, ref } from "vue";

const route = useRoute();
const router = useRouter();

// Emits To Send
const emit = defineEmits(["searchNow", "deleteProduct", "sendMode"]);

// Data
const myNavbar = ref(null);

const closeBtn = ref(null);

const searchFilter = ref("");

const mode = ref("");

const dropdownMenu = ref(false);

const menuElement = ref(null);

const cartIcon = ref(null);

// Products Array From Vue

const props = defineProps({
  products: {
    type: Array,
    required: true,
  },
});

// Counter To Cart

const counter = computed(() => {
  return props.products.length;
});

// Computed Sub Total

const subtotal = computed(() => {
  return props.products
    .reduce((acc, product) => acc + product.price * product.quantity, 0)
    .toFixed(2);
});

// Add To Local Storage Functions
function addToLocalStorage(key, value) {
  localStorage.setItem(key, value);
}

// Change The Mode And Save In Local Storage

function changeMod() {
  if (mode.value === "") {
    mode.value = "dark";
    emit("sendMode", mode.value);
  } else {
    mode.value = "";
    emit("sendMode", mode.value);
  }

  if (mode.value == "dark") {
    document.body.classList = "dark-theme";
    myNavbar.value.classList.add("navbar-dark");
    closeBtn.value.classList.add("btn-close-white");
  } else {
    document.body.classList.remove("dark-theme");
    myNavbar.value.classList.remove("navbar-dark");
    closeBtn.value.classList.remove("btn-close-white");
  }

  addToLocalStorage("mode", mode.value);
}

//Call The Mode From Local Storage
onMounted(() => {
  if (localStorage.getItem("mode")) {
    mode.value = localStorage.getItem("mode");
  }

  if (mode.value == "dark") {
    document.body.classList = "dark-theme";
  } else {
    document.body.classList.remove("dark-theme");
  }
});

// Send Emit On Search
function sendEmit() {
  emit("searchNow", searchFilter.value);
}

// Toggle Dropdown
function dropdownToggle() {
  dropdownMenu.value = !dropdownMenu.value;
}
onMounted(() => {
  const handleDropDown = (e) => {
    if (
      menuElement.value &&
      cartIcon.value &&
      !menuElement.value.contains(e.target) &&
      !cartIcon.value.contains(e.target)
    ) {
      dropdownToggle();
    }
  };

  window.addEventListener("click", handleDropDown);

  onUnmounted(() => {
    window.removeEventListener("click", handleDropDown);
  });
});

// Function Send Delete Emit
function sendDeleteEmit(id) {
  emit("deleteProduct", id);
}
</script>

<style lang="scss" scoped>
.NavBar {
  position: fixed;
  top: 0;
  width: 100%;
  background-color: var(--card-bg) !important;
  border-bottom: 1px solid var(--border-color);
  z-index: 1002;
  .navbar-toggler {
    color: var(--text-color) !important;
  }
}

.NavBar input {
  box-shadow: none !important;

  outline: none !important;

  border: none !important;
}

.cursor-pointer {
  cursor: pointer;
}

.offcanvas.show:not(.hiding),
.offcanvas.showing {
  width: 250px;
}

body.dark-theme {
  .NavBar {
    nav {
      .navbar-brand {
        span {
          color: #ffffff !important;
        }
      }

      .offcanvas {
        background-color: var(--bg-color);
        a {
          color: #ffffff !important;
        }
      }

      i {
        color: #ffffff !important;
      }

      .input-group {
        > span,
        input {
          color: #fff !important;

          background-color: #1e1e1e !important;

          border: 1px solid #333 !important;

          &::placeholder {
            color: #fff !important;
          }
        }
      }
    }
  }
}

.input-group {
  > span,
  input {
    background-color: #ffffff !important;

    border: 1px solid #ced4da !important;
  }
}

.offcanvas {
  a.router-link-active {
    color: #0d6efd !important;
  }

  a {
    position: relative;
    color: black;
    padding: 15px 10px;
    @media (max-width: 767px) {
      padding: 10px;
    }
    &:before {
      content: "";

      position: absolute;

      bottom: 0;

      left: 0;

      width: 0%;

      background: #0d6efd;

      height: 4px;

      border-radius: 2px;

      transition: 0.5s;
    }

    &.router-link-active:before,
    &:hover:before {
      width: 100%;
    }
  }
}

.dark-theme {
  .cart {
    .menu {
      &:before {
        border-color: transparent transparent #222a35 transparent !important;
      }
      .menu-header {
        background-color: #222a35 !important;
        color: #f0f6fc !important;
        border-bottom: 2px solid var(--border-color) !important;
      }
      .menu-body {
        ul {
          li {
            background-color: #343d49 !important;
            border-bottom: 2px solid var(--border-color);
            .text-product {
              h3 {
                color: #c9d1d9 !important;
              }
            }
          }
        }
        .subtotal {
          background-color: #222a35 !important;
          border-bottom: 2px solid #38404b !important;
        }
      }
      .checkout {
        a {
          background-color: #222a35 !important;
          border: none !important;
        }
      }
      .noProducts {
        background-color: #343d49 !important;
        color: var(--text-color) !important;
        border-bottom-left-radius: 4px !important;
        border-bottom-right-radius: 4px !important;
      }
    }
  }
}

.cart {
  .menu {
    min-width: 600px;

    z-index: 10000;

    top: 50px;

    z-index: 1050;

    right: -33px !important;

    @media (max-width: 767px) {
      min-width: 300px;
    }

    .menu-body {
      ul {
        li {
          border-bottom: 2px solid #dbe0e4;
        }
      }
    }

    &::before {
      content: "";

      position: absolute;

      border-width: 20px;

      border-style: solid;

      border-color: transparent transparent #003c7a transparent;

      right: 4px;

      top: -33px;

      border-radius: 20px;
    }

    .text-product {
      .title {
        small {
          opacity: 0.8;

          font-size: 14px;
        }
      }
    }

    .delete {
      i {
        transition: 0.5s;
        &:hover {
          color: red !important;
        }
      }
    }
  }
}
.cart {
  .counter {
    top: -8px;
    right: -10px;
    min-width: 18px;
    height: 18px;
    font-size: 11px;
    font-weight: bold;
    border-radius: 50%;
    padding: 2px;
    line-height: 1;
    z-index: 2;
    background-color: #0d6efd !important;
    color: white !important;
  }
}

.cart .menu {
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1) !important;
  border: 1px solid rgba(0, 0, 0, 0.05) !important;
  position: relative;
  &::before {
    content: "";
    position: absolute;
    border-width: 20px;
    border-style: solid;
    border-color: transparent transparent #003c7a transparent;
    top: -33px;
    right: 20px;
  }
  .menu-header {
    background-color: #003c7a !important;
  }

  .menu-body {
    max-height: 400px;
    overflow-y: auto;
  }
}
</style>
