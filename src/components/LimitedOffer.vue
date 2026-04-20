<template>
  <section class="limitedOffer" v-if="limitedOffer">
    <div class="container-lg">
      <div class="title mx-auto mb-5">
        <h2 class="fw-bold text-uppercase">limited offer</h2>
      </div>
      <div class="offer row my-5 justify-content-center">
        <div class="col-lg-5 p-lg-0 position-relative">
          <div class="image m-0 mb-5 mb-lg-0 p-0 bg-light">
            <img :src="limitedOffer.image" class="img-fluid w-100 rounded-start-2" alt="" />
          </div>
          <div class="discountOffer position-absolute">-{{ discount }}% OFF</div>
        </div>
        <div
          class="offerText col-lg-5 p-3 m-0 bg-light rounded-end-2 d-flex flex-column justify-content-center"
        >
          <div class="productDetails m-0">
            <h1 class="titleProduct m-0">{{ limitedOffer.title }}</h1>
            <p>{{ limitedOffer.description }}</p>
          </div>
          <div class="priceDiscount d-flex gap-3">
            <h2 class="text-success m-0 fw-bold">${{ realPriceOfferDiscount.toFixed(2) }}</h2>
            <p class="text-decoration-line-through fs-4 text-danger">
              ${{ realPriceOffer.toFixed(2) }}
            </p>
          </div>
          <div
            class="exclusive py-2 text-uppercase fs-4 bg-white rounded-2 text-center fw-bold border border-2"
          >
            exclusive offer
          </div>
          <div class="describeMsg mt-4">
            <p class="fw-bold text-uppercase">only 7 life in stock - limited availability</p>
          </div>
          <div class="added row align-items-center justify-content-evenly">
            <div class="col-lg-5">
              <div
                class="quantityLimitedOffer input-group my-3 incDecBtn justify-content-center justify-content-md-start"
              >
                <button
                  class="input-group-text plus cursor-pointer border border-2"
                  @click="increaseQuantity(limitedOffer)"
                >
                  <i class="bi bi-plus"></i>
                </button>
                <span class="quantityOffer input-group-text border border-2">{{
                  limitedOffer.quantity
                }}</span>
                <button
                  class="input-group-text minus cursor-pointer border border-2"
                  @click="decreaseQuantity(limitedOffer)"
                  :disabled="limitedOffer.quantity === 1"
                >
                  <i class="bi bi-dash"></i>
                </button>
              </div>
            </div>
            <div class="col-md-7">
              <button
                class="addToCart btn btn-primary rounded-2 w-100"
                @click="addToCart(limitedOffer)"
              >
                Add To Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from "vue";
// props
const props = defineProps({
  limitedOffer: {
    type: Object,
    required: true,
  },
  discount: {
    type: Number,
    required: true,
  },
});
// props

// Emits
const emit = defineEmits(["sendProductToHome"]);
// Emits

//Limited Offer Section
// computed to compute the price before discount
const realPriceOffer = computed(() => {
  return Number(props.limitedOffer.price * props.limitedOffer.quantity);
});

// the presentage of discount

// computed to compute the price after discount
const realPriceOfferDiscount = computed(() => {
  return Number(realPriceOffer.value * (1 - props.discount / 100));
});

function decreaseQuantity(limitedOffer) {
  if (limitedOffer.quantity === 1) {
    return;
  } else {
    limitedOffer.quantity--;
  }
}

function increaseQuantity(limitedOffer) {
  limitedOffer.quantity++;
}

function addToCart(limitedOffer) {
  emit("sendProductToHome", limitedOffer);
}
//Limited Offer Section
</script>

<style lang="scss" scoped>
// Limited Offer Section
.discountOffer {
  top: 10px;
  right: 10px;
  background: linear-gradient(to right, #770922, #9b1e26);
  padding: 0px 20px;
  border-radius: 5px;
  font-size: 20px;
  color: #ffc5a9;
  border: 2px solid #926548 !important;
  @media (max-width: 991px) {
    right: 20px;
  }
}

.limitedOffer {
  .image {
    border-top-left-radius: 7px !important;
    border-bottom-left-radius: 7px !important;
  }
  .addToCart {
    background-color: #2c3e50 !important;
    color: white !important;
    border-color: var(--border-color) !important;
  }
}
.dark-theme {
  .offerText {
    border: none !important;
    background-color: var(--accent-color) !important;
    h1 {
      color: var(--text-color) !important;
    }
    .exclusive {
      background-color: #0b0e14 !important;
      border-color: rgb(55 55 55 / 87%) !important;
    }
  }
}
.quantityLimitedOffer {
  button,
  span {
    border-color: var(--border-color) !important;
    background-color: var(--accent-color);
    color: var(--text-color);
  }
}
// Limited Offer Section
</style>
