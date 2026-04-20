<template>
  <div class="CategorieCards">
    <section class="categories">
      <div class="container-lg">
        <div class="typesCategorise">
          <ul class="list-unstyled d-flex justify-content-center gap-2 gap-md-4">
            <li>
              <a
                href="#"
                :class="{ 'btn-primary': categorieFilter === 'men' }"
                class="text-decoration-none btn"
                @click.prevent="categorieFilter = 'men'"
                >Men</a
              >
            </li>
            <li>
              <a
                href="#"
                :class="{ 'btn-primary': categorieFilter === 'women' }"
                class="text-decoration-none btn"
                @click.prevent="categorieFilter = 'women'"
                >Women</a
              >
            </li>
            <li>
              <a
                href="#"
                :class="{ 'btn-primary': categorieFilter === 'electronics' }"
                class="text-decoration-none btn"
                @click.prevent="categorieFilter = 'electronics'"
                >Gadgets</a
              >
            </li>
            <li>
              <a
                href="#"
                :class="{ 'btn-primary': categorieFilter === 'jewelery' }"
                class="text-decoration-none btn"
                @click.prevent="categorieFilter = 'jewelery'"
                >Accessories</a
              >
            </li>
          </ul>
        </div>
        <div class="contain-portfolio position-relative">
          <i
            class="bi bi-arrow-right right position-absolute top-50"
            @click="slider(200)"
            v-if="filterCategories.length > 0"
          ></i>
          <i
            class="bi bi-arrow-left left position-absolute top-50"
            @click="slider(-200)"
            v-if="filterCategories.length > 0"
          ></i>
          <div
            ref="sliderEle"
            class="show-categories d-flex justify-content-start gap-3 my-3 py-5 position-relative"
            v-if="filterCategories.length > 0"
          >
            <div v-for="category in filterCategories" :key="category.id">
              <div class="portfolio-categories">
                <div class="card p-3" style="width: 18rem; height: 560px">
                  <img :src="category.image" class="card-img-top rounded-4" :alt="category.title" />
                  <div class="card-body">
                    <h5 class="card-title">{{ category.title }}</h5>
                    <p class="card-text">
                      {{ category.description }}
                    </p>
                  </div>
                  <div
                    class="price-rate d-flex align-items-center justify-content-between px-3 my-3"
                  >
                    <div class="price">
                      Price :
                      <strong
                        class="fw-bold"
                        :class="{
                          'text-decoration-line-through text-danger m-0 ': category.limitedOffer,
                        }"
                        :style="{ fontSize: category.limitedOffer ? '12px' : '16px' }"
                      >
                        ${{ (category.price * category.quantity).toFixed(2) }}
                      </strong>
                      <div
                        class="product-discount fw-bold text-success"
                        v-if="category.limitedOffer"
                      >
                        ${{
                          (category.price * category.quantity * (1 - discount / 100)).toFixed(2)
                        }}
                      </div>
                    </div>
                    <div class="rating" v-if="category.rating.rate > 4.5">
                      <i class="bi bi-star-fill text-warning"></i>
                      <i class="bi bi-star-fill text-warning"></i>
                      <i class="bi bi-star-fill text-warning"></i>
                      <i class="bi bi-star-fill text-warning"></i>
                      <i class="bi bi-star-fill text-warning"></i>
                    </div>
                    <div class="rating" v-else-if="category.rating.rate == 4.5">
                      <i class="bi bi-star-fill text-warning"></i>
                      <i class="bi bi-star-fill text-warning"></i>
                      <i class="bi bi-star-fill text-warning"></i>
                      <i class="bi bi-star-fill text-warning"></i>
                      <i class="bi bi-star-half text-warning"></i>
                    </div>
                    <div
                      class="rating"
                      v-else-if="category.rating.rate <= 4.5 && category.rating.rate > 3"
                    >
                      <i class="bi bi-star-fill text-warning"></i>
                      <i class="bi bi-star-fill text-warning"></i>
                      <i class="bi bi-star-fill text-warning"></i>
                      <i class="bi bi-star-fill text-warning"></i>
                      <i class="bi bi-star text-warning"></i>
                    </div>
                    <div
                      class="rating"
                      v-else-if="category.rating.rate <= 3 && category.rating.rate > 2"
                    >
                      <i class="bi bi-star-fill text-warning"></i>
                      <i class="bi bi-star-fill text-warning"></i>
                      <i class="bi bi-star-half text-warning"></i>
                      <i class="bi bi-star text-warning"></i>
                      <i class="bi bi-star text-warning"></i>
                    </div>
                    <div
                      class="rating"
                      v-else-if="category.rating.rate <= 2 && category.rating.rate > 1"
                    >
                      <i class="bi bi-star-fill text-warning"></i>
                      <i class="bi bi-star-half text-warning"></i>
                      <i class="bi bi-star text-warning"></i>
                      <i class="bi bi-star text-warning"></i>
                      <i class="bi bi-star text-warning"></i>
                    </div>

                    <div class="rating" v-else>
                      <i class="bi bi-star-fill text-warning"></i>
                      <i class="bi bi-star text-warning"></i>
                      <i class="bi bi-star text-warning"></i>
                      <i class="bi bi-star text-warning"></i>
                      <i class="bi bi-star text-warning"></i>
                    </div>
                  </div>
                  <div class="quantityControl input-group my-3 justify-content-center">
                    <button
                      class="input-group-text plus cursor-pointer"
                      @click="category.quantity++"
                    >
                      <i class="bi bi-plus"></i>
                    </button>
                    <span class="quantitySpan input-group-text">{{ category.quantity }}</span>
                    <button
                      class="input-group-text minus cursor-pointer"
                      @click="decreaseQuantity(category)"
                      :disabled="category.quantity === 1"
                    >
                      <i class="bi bi-dash"></i>
                    </button>
                  </div>

                  <div class="addToCartCategories text-center">
                    <a
                      href="#"
                      class="btn btn-primary w-100 d-block shadow-sm"
                      @click.prevent="addToCart(category)"
                      ><i class="bi bi-cart-plus"></i> Add to Cart</a
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- اذا كان هناك عناصر بس عملية البحث فشلت  -->
          <div
            v-else-if="allCategories.length > 0 && filterCategories.length === 0"
            class="no-result my-5 d-flex flex-column align-items-center"
          >
            <i class="bi bi-emoji-frown fs-1 text-danger"></i>
            <h3 class="fw-bold">
              Oops! We couldn't find any Products matching "{{ filteringSearch }}."
            </h3>
            <p class="text-secondary">
              Try a different keyword, or check fot typos, we have plenty of other accessories to
              discover!
            </p>
          </div>
          <!-- اذا قطع النت او لم يكون هناك منتجات من المصدر -->
          <div v-else class="noProducts row justify-content-center align-items-center my-5">
            <div
              class="cont col-12 col-md-3 mb-4 mb-xxl-0"
              style="width: 18rem"
              v-for="n in 4"
              :key="n"
            >
              <div class="card bg-white shadow p-0">
                <div class="card-header m-2 rounded-2">
                  <div class="image" style="height: 200px"></div>
                </div>
                <div class="card-body">
                  <div
                    class="title-placeholder w-100 bg-light rounded-2 mb-2"
                    style="height: 20px"
                  ></div>
                  <div class="price-placeholder w-75 bg-light rounded-2" style="height: 20px"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

const emit = defineEmits(["sendProductToHome"]);
const sliderEle = ref(null);
const categorieFilter = ref("men");
const props = defineProps({
  discount: {
    type: Number,
    required: true,
  },
  allCategories: {
    type: Array,
    required: true,
  },
  filteringSearch: {
    type: String,
    required: true,
  },
});

function slider(to) {
  sliderEle.value.scrollBy({
    left: to,
    behavior: "smooth",
  });
}

// Function to decrease quantity
function decreaseQuantity(category) {
  if (category.quantity > 1) {
    category.quantity--;
  }
}

// Filter Categories
const filterCategories = computed(() => {
  const term = categorieFilter.value.toLowerCase().trim();
  const search = props.filteringSearch.toLowerCase().trim();
  return props.allCategories
    .filter((categoryT) => {
      return categoryT.category.toLowerCase().trim().startsWith(term);
    })
    .filter((searchSec) => {
      return (
        searchSec.title.toLowerCase().trim().includes(search) ||
        searchSec.description.toLowerCase().trim().includes(search)
      );
    });
});

function addToCart(category) {
  emit("sendProductToHome", category);
}
// Filter Categories
</script>

<style lang="scss" scoped>
// categories Section

.show-categories {
  overflow-x: auto;
  &::-webkit-scrollbar {
    width: 0;
  }
}

.quantityControl {
  .quantitySpan,
  button {
    background-color: var(--accent-color) !important;
    color: var(--text-color) !important;
    border-color: var(--border-color) !important;
  }
}

.show-categories .card {
  min-height: 550px;
  box-shadow: 0px 4px 5px 0px rgba(0, 0, 0, 0.242) !important;
  transition: all 0.3s ease;
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 5px rgba(0, 0, 0, 0.4) !important;
  }
}

.card-text {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}
.show-categories .card img {
  object-fit: contain;
  height: 250px;
}

.noProducts {
  .card {
    transition: 0.3s ease;
    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.3) !important;
    }
  }
  .card-header {
    background-color: #eee !important;
    animation: loading-products 1.5s ease infinite;
  }
  .card-body {
    .title,
    .price {
      background-color: #eee !important;
      animation: loading-products 1.5s ease infinite;
    }
  }
}

@keyframes loading-products {
  0% {
    opacity: 0.7;
    background-color: #eee !important;
  }
  50% {
    opacity: 1;
    background-color: #dfdfdf !important;
  }
  100% {
    opacity: 0.7;
    background-color: #eee !important;
  }
}

.typesCategorise {
  ul {
    li {
      a {
        color: var(--text-color);
        font-size: 19px !important;
        @media (max-width: 767px) {
          font-size: 16px !important;
        }
        &.btn-primary {
          background-color: #0d6efd !important;
          color: white;
        }
      }
    }
  }
}

// categories Section
</style>
