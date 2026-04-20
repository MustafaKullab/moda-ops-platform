<template>
  <section class="HomePage">
    <!-- Hero Slider  -->
    <section class="home pb-0">
      <div class="slider container-fluid">
        <div class="row justify-content-evenly align-items-center">
          <div class="col-md-4">
            <div class="image position-relative mb-5">
              <i class="bi bi-arrow-left left position-absolute top-50" @click="decreaseIndex"></i>
              <i
                class="bi bi-arrow-right right position-absolute top-50"
                @click="increaseIndex"
              ></i>

              <transition name="fade" mode="out-in">
                <div :key="currentIndex">
                  <img
                    :src="currentItem.img"
                    class="rounded-3 img-fluid"
                    :alt="currentItem.title"
                  />
                </div>
              </transition>
            </div>
          </div>
          <div class="col-md-6 mb-5 text-center text-md-start">
            <div class="title">
              <h1 class="display-3">{{ currentItem.title }}</h1>
            </div>
            <div class="subtitle">
              <p class="lead">{{ currentItem.subTitle }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- Hero Slider  -->

    <!-- Categories Section  -->
    <CategoriesCards
      :allCategories="allCategories"
      :discount="discount"
      :filteringSearch="filteringSearch"
      @sendProductToHome="addToCart"
    />
    <!-- Categories Section  -->

    <!-- Best Sellers Section  -->
    <BestSellers :bestSellers="bestSellers" :discount="discount" @sendProductToHome="addToCart" />
    <!-- Best Sellers Section  -->

    <!-- LIMITED OFFER Section -->
    <LimitedOffer
      :limitedOffer="limitedOffer"
      :discount="discount"
      @sendProductToHome="addToCart"
      v-if="limitedOffer"
    />
    <!-- LIMITED OFFER Section -->
  </section>
</template>

<script setup>
import CategoriesCards from "@/components/CategoriesCards.vue";
import BestSellers from "@/components/BestSellers.vue";
import LimitedOffer from "@/components/LimitedOffer.vue";
import { computed, onMounted, ref } from "vue";
import { toast } from "vue-sonner";

// Hero Section
const imgSlider = ref([
  {
    img: "/images/img1.jpg",
    title: "Timeless Elegance",
    subTitle: 'Discover the essence of the "Old Money" aesthetic with our curated classic fits.',
  },
  {
    img: "/images/img2.jpg",
    title: "Urban Edge",
    subTitle: "Make a statement with bold graphics and oversized fits designed for the streets.",
  },
  {
    img: "/images/img3.jpg",
    title: "The Daily Essentials",
    subTitle: "Premium quality basics in every shade you need to complete your wardrobe",
  },
]);
const currentIndex = ref(0);

// Props To Fetch Filtering Search
const props = defineProps({
  // Search Filter
  filteringSearch: {
    type: String,
    required: true,
  },
});

// Computed
const currentItem = computed(() => {
  return imgSlider.value[currentIndex.value];
});

// Functions
// Decrease Index
const decreaseIndex = function () {
  currentIndex.value > 0 ? currentIndex.value-- : (currentIndex.value = imgSlider.value.length - 1);
};

// Increase Index
const increaseIndex = function () {
  currentIndex.value === imgSlider.value.length - 1
    ? (currentIndex.value = 0)
    : currentIndex.value++;
};
// Hero Section

// categories Section
const allCategories = ref([]);
const bestSellers = ref([]);
const limitedOffer = ref(null);

async function getData() {
  try {
    await fetch("/product.json")
      .then((res) => res.json())
      .then(
        (data) =>
          (allCategories.value = data.map((product) => {
            return {
              ...product,
              quantity: 1,
            };
          })),
      );

    // Filter to call all products equal or greather 4 rate For Best Sellers Section
    bestSellers.value = allCategories.value
      .filter((product) => product.rating.rate >= 4.5)
      .slice(0, 8); // عشان يجيب بس 8 منتجات

    //Filter To Call The Limited Offer Product
    limitedOffer.value = allCategories.value.filter((product) => product.limitedOffer)[0];
  } catch (err) {
    console.error("Faild to fetch data ", err);
    toast.warning("Please Check Your Network!");
    allCategories.value = [];
  }
}

// Slider Function

onMounted(() => {
  getData();
});

// add to cart function
const emit = defineEmits(["sendProduct"]);

function addToCart(product) {
  let finalPrice = product.price;

  if (product.limitedOffer) {
    let discountAmount = 1 - discount.value / 100;

    finalPrice = Number((finalPrice * discountAmount).toFixed(2));
  }

  //ارسال المنتج
  const productDetails = {
    id: product.id,
    title: product.title,
    description: product.description,
    image: product.image,
    price: Number(finalPrice),
    quantity: product.quantity,
    category: product.category,
  };
  emit("sendProduct", productDetails);
  product.quantity = 1;
}
// add to cart function

// categories Section

// Limited Offer
const discount = ref(30);
// Limited Offer
</script>

<style lang="scss">
section:not(.home) {
  .title {
    color: var(--text-color) !important;
    h2 {
      width: fit-content;
      margin: 0 auto;
      position: relative;
      &:before {
        content: "";
        position: absolute;
        bottom: -10px;
        left: 50%;
        transform: translateX(-50%);
        width: 40%;
        height: 4px;
        border-radius: 2px;
        background-color: #0d6efd;
      }
    }
  }
}
// Hero Section

.image.position-relative img {
  width: 100%;
  aspect-ratio: 4 / 4;
  object-fit: cover;
  object-position: center;
  border-radius: 12px;
}
.left,
.right {
  transform: translateY(-50%) !important;
  font-size: 28px !important;
  background: rgba(0, 0, 0, 0.3);
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  opacity: 0.7;
  color: white;
  z-index: 1000;
  cursor: pointer;
  transition: 0.4s;
  &:hover {
    opacity: 1;
  }
}
.left {
  left: 10px;
}
.right {
  right: 10px;
}

.categories {
  ul {
    li {
      a {
        border: none !important;
        transition: 0.4s !important;
        &:hover {
          background-color: #0d6dfd !important;
          color: white !important;
        }
      }
    }
  }
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: scale(0.95);
}

.fade-enter-active,
.fade-leave-active {
  transition: 0.4s ease;
}
// Hero Section
</style>
