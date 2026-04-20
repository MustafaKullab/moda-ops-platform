<template>
  <div class="BestSellers">
    <section class="bestSellers">
      <div class="container-lg">
        <div class="title mx-auto mb-5">
          <h2 class="fw-bold text-uppercase">best sellers</h2>
        </div>
        <div
          class="row my-5 justify-content-center align-items-center gap-3"
          v-if="bestSellers.length > 0"
        >
          <div
            class="card col-12 col-md-3 shadow p-0 position-relative"
            v-for="product in bestSellers"
            :key="product.id"
            style="width: 18rem; min-height: 350px"
          >
            <div class="product-badges">
              <div
                class="badges-topPick px-2 py-1 bg-primary rounded-2 position-absolute"
                v-if="product.isTopPick"
              >
                Top Pick
              </div>
              <div
                class="badge-new px-2 py-1 bg-success rounded-2 position-absolute"
                v-else-if="parseInt(product.addedDate) <= 7"
              >
                New
              </div>
              <div
                class="badges-hot px-2 py-1 bg-info rounded-2 position-absolute"
                v-else-if="product.rating.count > 100"
              >
                Hot
              </div>
            </div>
            <img :src="product.image" class="card-img-top p-2 rounded-top-4" :alt="product.title" />
            <div class="card-body">
              <h4 class="card-text fs-5 text-truncate">{{ product.title }}</h4>
              <div class="priceAdd d-flex justify-content-between align-items-center mt-3">
                <div class="price">
                  <p
                    class="fw-bold m-0"
                    :class="{
                      'text-decoration-line-through text-danger m-0 ': product.limitedOffer,
                    }"
                    :style="{ fontSize: product.limitedOffer ? '12px' : '16px' }"
                  >
                    ${{ product.price }}
                  </p>
                  <div class="product-discount fw-bold text-primary" v-if="product.limitedOffer">
                    ${{ (product.price * (1 - discount / 100)).toFixed(2) }}
                  </div>
                </div>
                <i class="bi bi-cart-plus btn btn-primary" @click="addToCart(product)"></i>
              </div>
            </div>
          </div>
        </div>
        <div v-else class="row justify-content-center align-items-center my-5 gap-3">
          <div
            class="card col-12 col-md-3 shadow p-0 skeleton-card mb-3 mb-xxl-0"
            v-for="n in 8"
            :key="n"
            style="width: 18rem; min-height: 350px"
          >
            <div class="skeleton-img"></div>
            <div class="card-body">
              <div class="skeleton-text heading"></div>
              <div class="skeleton-text price"></div>
            </div>
          </div>
        </div>
        <div class="viewAll text-center" v-if="bestSellers.length > 0">
          <button
            class="btn btn-primary text-uppercase px-3"
            @click="router.push({ name: 'bestsellers' })"
          >
            view all best sellers
          </button>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { defineEmits } from "vue";
// routers Variable
const router = useRouter();
// routers Variable

// Props
const props = defineProps({
  bestSellers: {
    type: Array,
    required: true,
  },
  discount: {
    type: Number,
    required: true,
  },
});
// Props

// Emits
const emit = defineEmits(["sendProductToHome"]);
// Emits

function addToCart(product) {
  emit("sendProductToHome", product);
}
// Props
</script>

<style lang="scss" scoped>
// Best Sellers Section
.product-badges {
  > div {
    top: 15px;
    left: 15px;
    color: white !important;
  }
}
.bestSellers {
  .card {
    transition: 0.4s ease;
    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.3) !important;
    }
  }
  // }

  .skeleton-card {
    .skeleton-img {
      background-color: #eee;
      height: 200px;
      margin: 10px;
      border-radius: 12px;
      animation: skeleton-loading 1.5s infinite;
    }
    .card-body {
      .skeleton-text {
        height: 20px;
        background-color: #eee;
        border-radius: 5px;
        margin-bottom: 10px;
        animation: skeleton-loading 1.5s infinite;
        &.heading {
          width: 100%;
        }
        &.price {
          width: 60%;
        }
      }
    }
  }
  @keyframes skeleton-loading {
    0% {
      background-color: #eee;
    }
    50% {
      background-color: #dfdfdf;
    }
    100% {
      background-color: #eee;
    }
  }
}
// Best Sellers Section
</style>
