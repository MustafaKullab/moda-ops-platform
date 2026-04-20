<template>
  <section class="BestsellersDetails bg-altSecondary">
    <div class="container-lg">
      <div
        class="heading text-center py-5 d-flex flex-column align-items-center justify-content-center position-relative mt-3 mt-md-0"
      >
        <button
          class="back btn btn-outline-secondary border border-secondary rounded-2 cursor-pointer position-absolute start-0"
          @click="router.go(-1)"
        >
          <i class="bi bi-caret-left-fill"></i> back
        </button>
        <div class="head">
          <h1 class="display-3 text-uppercase m-0">best sellers</h1>
          <p>A handpicked selection of our finest pieces.</p>
        </div>
      </div>
      <div
        class="cards row justify-content-center align-items-center gap-5"
        v-if="productsFilter.length > 0"
      >
        <div
          class="card col-10 col-md-3 mb-5 shadow p-0"
          v-for="product in productsFilter"
          :key="product.id"
        >
          <img :src="product.image" class="card-img-top" :alt="product.title" />
          <div class="card-body text-center">
            <h5 class="card-title">{{ product.title }}</h5>
            <div class="card-text text-center my-4">
              <div class="price">
                <div
                  class="discount d-flex justify-content-center gap-2"
                  v-if="product.limitedOffer"
                >
                  <span class="text-decoration-line-through text-danger">
                    ${{ product.price }}
                  </span>
                  <i class="bi bi-caret-right-fill text-primary"></i>
                  <span class="fw-bold text-success">${{ (product.price * 0.7).toFixed(2) }}</span>
                </div>
                <div v-else>
                  <span>${{ product.price }}</span>
                </div>
              </div>

              <div class="rating text-center" v-if="product.rating.rate >= 4.9">
                <i class="bi bi-star-fill text-warning"></i>
                <i class="bi bi-star-fill text-warning"></i>
                <i class="bi bi-star-fill text-warning"></i>
                <i class="bi bi-star-fill text-warning"></i>
                <i class="bi bi-star-fill text-warning"></i>
              </div>
              <div class="rating text-center" v-else-if="product.rating.rate == 4.8">
                <i class="bi bi-star-fill text-warning"></i>
                <i class="bi bi-star-fill text-warning"></i>
                <i class="bi bi-star-fill text-warning"></i>
                <i class="bi bi-star-fill text-warning"></i>
                <i class="bi bi-star-half text-warning"></i>
              </div>
              <div class="rating text-center" v-else-if="product.rating.rate == 4.7">
                <i class="bi bi-star-fill text-warning"></i>
                <i class="bi bi-star-fill text-warning"></i>
                <i class="bi bi-star-fill text-warning"></i>
                <i class="bi bi-star-fill text-warning"></i>
                <i class="bi bi-star text-warning"></i>
              </div>
              <div class="rating text-center" v-else-if="product.rating.rate === 4.6">
                <i class="bi bi-star-fill text-warning"></i>
                <i class="bi bi-star-fill text-warning"></i>
                <i class="bi bi-star-fill text-warning"></i>
                <i class="bi bi-star-half text-warning"></i>
                <i class="bi bi-star text-warning"></i>
              </div>
              <div class="rating text-center" v-else>
                <i class="bi bi-star-fill text-warning"></i>
                <i class="bi bi-star-fill text-warning"></i>
                <i class="bi bi-star-fill text-warning"></i>
                <i class="bi bi-star text-warning"></i>
                <i class="bi bi-star text-warning"></i>
              </div>
            </div>
            <div class="addBtn text-center">
              <button
                href="#"
                class="addToCart btn btn-outline-primary border border-primary"
                @click="addToCart(product)"
              >
                <i class="bi bi-cart-plus"></i> Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        v-else-if="bestSellers.length > 0 && productsFilter.length === 0"
        class="no-result my-5 d-flex flex-column align-items-center"
      >
        <i class="bi bi-emoji-frown fs-1 text-danger"></i>
        <h3 class="fw-bold">
          Oops! We couldn't find any Accessories matching "{{ filteringSearch }}."
        </h3>
        <p class="text-secondary">
          Try a different keyword, or check fot typos, we have plenty of other accessories to
          discover!
        </p>
      </div>
      <div v-else class="row my-5 cards-stekholder justify-content-center align-items-center gap-5">
        <div
          class="card shadow p-0 col-4"
          style="width: 24rem; height: 300px"
          v-for="n in 6"
          :key="n"
        >
          <div class="image" style="height: 200px"></div>
          <div class="header rounded-2 m-3" style="height: 20px"></div>
          <div class="body w-75 rounded-2 mx-3" style="height: 10px"></div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted, ref, computed } from "vue";
import router from "@/router";

// Array To Storage The Data
const bestSellers = ref([]);

async function getBestSellers() {
  try {
    await fetch("/product.json")
      .then((res) => res.json())
      .then(
        (data) =>
          (bestSellers.value = data
            .filter((product) => product.rating.rate > 4.5)
            .map((best) => {
              return {
                ...best,
                quantity: 1,
              };
            })),
      );
  } catch (err) {
    console.error(err);
  }
}

onMounted(() => {
  getBestSellers();
});

const emit = defineEmits(["sendProduct"]);
const props = defineProps({
  filteringSearch: {
    type: String,
    required: true,
  },
});

function addToCart(product) {
  let finalPrice = product.price;
  if (product.limitedOffer) {
    finalPrice = product.price * 0.7;
  }
  const productDetails = {
    id: product.id,
    title: product.title,
    description: product.description,
    image: product.image,
    price: finalPrice.toFixed(2),
    quantity: product.quantity,
  };
  emit("sendProduct", productDetails);
  product.quantity = 1;
}

const productsFilter = computed(() => {
  const term = props.filteringSearch.toLowerCase().trim();
  return bestSellers.value.filter((product) => {
    return product.title.toLowerCase().includes(term);
  });
});
</script>

<style lang="scss">
.heading {
  h1 {
    color: var(--text-color) !important;
  }
}
button.back {
  @media (max-width: 767px) {
    top: 0;
    left: 50% !important;
    transform: translateX(-50%);
  }
}

.cards {
  content-visibility: auto;
  contain-intrinsic-size: 500px;
  .card {
    transition: 0.3s ease;
    will-change: transform;
    backface-visibility: hidden;
    &:hover {
      box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.3) !important;
      transform: translateY(-5px);
    }
    img {
      object-fit: contain;
    }
  }
}
.cards-stekholder {
  .image {
    background-color: #eee;
    animation: placeholder 1.5s infinite;
  }
  .header,
  .body {
    padding: 10px !important;
    background-color: #eee;
    animation: placeholder 1.5s infinite linear;
  }
}

@keyframes placeholder {
  0% {
    background-color: #eee;
  }
  50% {
    background-color: #e8e8e8;
  }
  100% {
    background-color: #eee;
  }
}

.dark-theme {
  .addToCart {
    border: 2px solid var(--border-color) !important;
    color: white;
  }
  .back {
    border-color: rgb(222, 222, 222) !important;
    color: rgb(222, 222, 222) !important ;
    transition: 0.4s !important;
    &:hover {
      background-color: rgb(222, 222, 222) !important;
      color: black !important;
    }
  }
}
</style>
