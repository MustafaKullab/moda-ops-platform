<template>
  <section class="Checkout">
    <div class="container-lg">
      <div class="heading mb-5 pt-3 d-flex justify-content-between align-items-center">
        <button
          class="back btn btn-outline-secondary border border-secondary rounded-2 cursor-pointer"
          @click="router.go(-1)"
        >
          <i class="bi bi-caret-left-fill"></i> back
        </button>
        <h1 class="uppercase m-0">Checkout</h1>
        <div class="p-2" style="width: 46px"></div>
      </div>
      <div class="row justify-content-center">
        <div class="col-lg-8 mb-5 mb-lg-0">
          <div class="paymentMethod row gap-3 justify-content-center m-3 m-md-0">
            <div class="col-md-6 rounded-2 shadow p-3">
              <div class="subtitle mb-3">
                <h3 class="fs-4">1. shipping & Payment Details</h3>
              </div>
              <form action="">
                <div class="input-group mb-3">
                  <input
                    type="text"
                    class="form-control me-2"
                    placeholder="First Name"
                    v-model="userInfo.firstName"
                    required
                  />
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Last Name"
                    v-model="userInfo.lastName"
                    required
                  />
                </div>
                <div class="input-group mb-3">
                  <input
                    type="email"
                    class="form-control"
                    placeholder="Email"
                    v-model="userInfo.email"
                    required
                  />
                </div>
                <div class="input-group mb-3">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Address"
                    v-model="userInfo.address"
                    required
                  />
                </div>
                <div class="countries input-group mb-3 d-flex align-items-center">
                  <a-select
                    v-model:value="userInfo.country"
                    style="width: 100px"
                    show-search
                    placeholder="Select Country"
                    :options="options"
                    class="specialSelect me-2 bg-altSecondary"
                  ></a-select>
                  <input
                    type="text"
                    class="form-control me-2"
                    placeholder="State"
                    v-model="userInfo.state"
                    required
                  />
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Zip"
                    maxlength="4"
                    v-model="userInfo.zip"
                    required
                  />
                </div>
                <div class="subtitle mb-3">
                  <h3 class="fs-4">2. Payment Method</h3>
                </div>
                <div class="input-group mb-3">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Cardholder Name"
                    v-model="userInfo.cardholder"
                    required
                  />
                </div>
                <div class="input-group mb-3">
                  <input
                    type="tel"
                    class="form-control"
                    placeholder="Card Number"
                    maxlength="16"
                    v-model="userInfo.cardNum"
                    required
                  />
                </div>
                <div class="input-group mb-3">
                  <input
                    type="tel"
                    class="form-control me-2"
                    placeholder="MM / YY"
                    maxlength="5"
                    inputmode="numeric"
                    v-model="userInfo.expiry"
                    required
                  />
                  <input
                    type="tel"
                    class="form-control"
                    placeholder="CVV"
                    maxlength="4"
                    v-model="userInfo.cvv"
                  />
                </div>
              </form>
            </div>
            <div class="img-col col-md-5 rounded-2 shadow">
              <div class="image">
                <img src="/images/card.png" class="img-fluid w-100 rounded-3" alt="" />
              </div>
            </div>
          </div>
          <div class="checkoutButton mt-5 text-center">
            <button class="placeOrders btn btn-primary rounded-pill w-75" @click="sendOrder">
              Place Order (${{ finalPrice }})
            </button>
          </div>
        </div>
        <div class="products-details col-lg-4 shadow rounded-2 p-3">
          <div class="subtitle mb-3 border-bottom">
            <h3 class="fs-4">Order Summery</h3>
          </div>
          <ul class="list-unstyled">
            <li
              v-for="product in products"
              :key="product.id"
              class="mb-2 pb-2 border-bottom d-flex align-items-center justify-content-start gap-3"
            >
              <div class="image">
                <img :src="product.image" class="img-fluid rounded-2" style="width: 3rem" alt="" />
              </div>
              <div class="details m-0 me-auto">
                <div class="title m-0">
                  <h5 class="m-0">{{ product.title }}</h5>
                </div>
                <div class="price m-0">
                  <span>{{ product.quantity }}</span
                  >X = $<span>{{ product.price }}</span>
                </div>
              </div>
              <div class="totalPrice d-flex align-items-center gap-2">
                <strong>${{ product.quantity * product.price }}</strong>
                <div class="delete" ref="deleteBtn">
                  <i
                    class="bi bi-trash3 cursor-pointer"
                    @click.stop="sendDeleteEmit(product.id)"
                  ></i>
                </div>
              </div>
            </li>
          </ul>
          <div class="payDetails">
            <div class="subtotal d-flex justify-content-between">
              <strong>Subtotal:</strong>
              <span>${{ subtotal }}</span>
            </div>
            <div class="shipping subtotal d-flex justify-content-between">
              <strong>Shipping:</strong>
              <span>${{ shipping }}</span>
            </div>
            <div class="tax subtotal d-flex justify-content-between">
              <strong>Tax:</strong>
              <span>${{ tax }}</span>
            </div>
          </div>
          <div class="finalPrice d-flex justify-content-between fs-3 mt-3 pt-3 pb-2 border-top">
            <strong>Total (USD)</strong>
            <span>(${{ finalPrice }})</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from "vue";
import router from "@/router";
import { toast } from "vue-sonner";
const countries = ref([
  { code: "DF", name: "Country" },
  { code: "PS", name: "Palestine" },
  { code: "SA", name: "Saudi Arabia" },
  { code: "AE", name: "United Arab Emirates" },
  { code: "JO", name: "Jordan" },
  { code: "EG", name: "Egypt" },
  { code: "KW", name: "Kuwait" },
  { code: "QA", name: "Qatar" },
  { code: "BH", name: "Bahrain" },
  { code: "OM", name: "Oman" },
  { code: "LB", name: "Lebanon" },
  { code: "IQ", name: "Iraq" },
  { code: "AF", name: "Afghanistan" },
  { code: "AL", name: "Albania" },
  { code: "DZ", name: "Algeria" },
  { code: "AS", name: "American Samoa" },
  { code: "AD", name: "Andorra" },
  { code: "AO", name: "Angola" },
  { code: "AI", name: "Anguilla" },
  { code: "AQ", name: "Antarctica" },
  { code: "AG", name: "Antigua and Barbuda" },
  { code: "AR", name: "Argentina" },
  { code: "AM", name: "Armenia" },
  { code: "AW", name: "Aruba" },
  { code: "AU", name: "Australia" },
  { code: "AT", name: "Austria" },
  { code: "AZ", name: "Azerbaijan" },
  { code: "BS", name: "Bahamas" },
  { code: "BD", name: "Bangladesh" },
  { code: "BB", name: "Barbados" },
  { code: "BY", name: "Belarus" },
  { code: "BE", name: "Belgium" },
  { code: "BZ", name: "Belize" },
  { code: "BJ", name: "Benin" },
  { code: "BM", name: "Bermuda" },
  { code: "BT", name: "Bhutan" },
  { code: "BO", name: "Bolivia" },
  { code: "BA", name: "Bosnia and Herzegovina" },
  { code: "BW", name: "Botswana" },
  { code: "BR", name: "Brazil" },
  { code: "BN", name: "Brunei Darussalam" },
  { code: "BG", name: "Bulgaria" },
  { code: "BF", name: "Burkina Faso" },
  { code: "BI", name: "Burundi" },
  { code: "KH", name: "Cambodia" },
  { code: "CM", name: "Cameroon" },
  { code: "CA", name: "Canada" },
  { code: "CV", name: "Cape Verde" },
  { code: "KY", name: "Cayman Islands" },
  { code: "CF", name: "Central African Republic" },
  { code: "TD", name: "Chad" },
  { code: "CL", name: "Chile" },
  { code: "CN", name: "China" },
  { code: "CO", name: "Colombia" },
  { code: "KM", name: "Comoros" },
  { code: "CG", name: "Congo" },
  { code: "CR", name: "Costa Rica" },
  { code: "HR", name: "Croatia" },
  { code: "CU", name: "Cuba" },
  { code: "CY", name: "Cyprus" },
  { code: "CZ", name: "Czech Republic" },
  { code: "DK", name: "Denmark" },
  { code: "DJ", name: "Djibouti" },
  { code: "DM", name: "Dominica" },
  { code: "DO", name: "Dominican Republic" },
  { code: "EC", name: "Ecuador" },
  { code: "SV", name: "El Salvador" },
  { code: "GQ", name: "Equatorial Guinea" },
  { code: "ER", name: "Eritrea" },
  { code: "EE", name: "Estonia" },
  { code: "ET", name: "Ethiopia" },
  { code: "FJ", name: "Fiji" },
  { code: "FI", name: "Finland" },
  { code: "FR", name: "France" },
  { code: "GA", name: "Gabon" },
  { code: "GM", name: "Gambia" },
  { code: "GE", name: "Georgia" },
  { code: "DE", name: "Germany" },
  { code: "GH", name: "Ghana" },
  { code: "GR", name: "Greece" },
  { code: "GD", name: "Grenada" },
  { code: "GT", name: "Guatemala" },
  { code: "GN", name: "Guinea" },
  { code: "GW", name: "Guinea-Bissau" },
  { code: "GY", name: "Guyana" },
  { code: "HT", name: "Haiti" },
  { code: "HN", name: "Honduras" },
  { code: "HK", name: "Hong Kong" },
  { code: "HU", name: "Hungary" },
  { code: "IS", name: "Iceland" },
  { code: "IN", name: "India" },
  { code: "ID", name: "Indonesia" },
  { code: "IR", name: "Iran" },
  { code: "IE", name: "Ireland" },
  { code: "IT", name: "Italy" },
  { code: "JM", name: "Jamaica" },
  { code: "JP", name: "Japan" },
  { code: "KZ", name: "Kazakhstan" },
  { code: "KE", name: "Kenya" },
  { code: "KI", name: "Kiribati" },
  { code: "KP", name: "Korea, North" },
  { code: "KR", name: "Korea, South" },
  { code: "LY", name: "Libya" },
  { code: "MA", name: "Morocco" },
  { code: "MR", name: "Mauritania" },
  { code: "MY", name: "Malaysia" },
  { code: "MV", name: "Maldives" },
  { code: "ML", name: "Mali" },
  { code: "MT", name: "Malta" },
  { code: "MX", name: "Mexico" },
  { code: "MC", name: "Monaco" },
  { code: "MN", name: "Mongolia" },
  { code: "ME", name: "Montenegro" },
  { code: "MZ", name: "Mozambique" },
  { code: "MM", name: "Myanmar" },
  { code: "NA", name: "Namibia" },
  { code: "NP", name: "Nepal" },
  { code: "NL", name: "Netherlands" },
  { code: "NZ", name: "New Zealand" },
  { code: "NI", name: "Nicaragua" },
  { code: "NE", name: "Niger" },
  { code: "NG", name: "Nigeria" },
  { code: "NO", name: "Norway" },
  { code: "PK", name: "Pakistan" },
  { code: "PA", name: "Panama" },
  { code: "PY", name: "Paraguay" },
  { code: "PE", name: "Peru" },
  { code: "PH", name: "Philippines" },
  { code: "PL", name: "Poland" },
  { code: "PT", name: "Portugal" },
  { code: "RO", name: "Romania" },
  { code: "RU", name: "Russian Federation" },
  { code: "RW", name: "Rwanda" },
  { code: "SN", name: "Senegal" },
  { code: "RS", name: "Serbia" },
  { code: "SG", name: "Singapore" },
  { code: "SK", name: "Slovakia" },
  { code: "SI", name: "Slovenia" },
  { code: "ZA", name: "South Africa" },
  { code: "ES", name: "Spain" },
  { code: "LK", name: "Sri Lanka" },
  { code: "SD", name: "Sudan" },
  { code: "SE", name: "Sweden" },
  { code: "CH", name: "Switzerland" },
  { code: "SY", name: "Syrian Arab Republic" },
  { code: "TW", name: "Taiwan" },
  { code: "TJ", name: "Tajikistan" },
  { code: "TZ", name: "Tanzania" },
  { code: "TH", name: "Thailand" },
  { code: "TN", name: "Tunisia" },
  { code: "TR", name: "Turkey" },
  { code: "TM", name: "Turkmenistan" },
  { code: "UG", name: "Uganda" },
  { code: "UA", name: "Ukraine" },
  { code: "GB", name: "United Kingdom" },
  { code: "US", name: "United States" },
  { code: "UY", name: "Uruguay" },
  { code: "UZ", name: "Uzbekistan" },
  { code: "VE", name: "Venezuela" },
  { code: "VN", name: "Vietnam" },
  { code: "YE", name: "Yemen" },
  { code: "ZM", name: "Zambia" },
  { code: "ZW", name: "Zimbabwe" },
]);

const userInfo = ref({
  firstName: "",
  lastName: "",
  email: "",
  address: "",
  country: "DF",
  state: "",
  zip: "",
  cardholder: "",
  cardNum: "",
  expiry: "",
  cvv: "",
});

const options = countries.value.map((country) => ({
  value: country.code,
  label: country.name,
}));

const props = defineProps({
  products: {
    type: Array,
    required: true,
  },
});

const emit = defineEmits(["orderDone", "deleteProduct"]);

// computed to compute price before tax and shipping
const subtotal = computed(() => {
  return props.products.reduce((acc, product) => acc + product.price * product.quantity, 0);
});

// computed to compute shipping
const shipping = computed(() => {
  if (subtotal.value === 0) {
    return 0;
  } else {
    return 20;
  }
});

// computed to compute tax
const tax = computed(() => {
  if (subtotal.value === 0) {
    return 0;
  } else if (subtotal.value < 250) {
    return 10;
  } else {
    return 20;
  }
});
const finalPrice = computed(() => {
  return (subtotal.value + shipping.value + tax.value).toFixed(2);
});

function sendOrder() {
  if (
    !userInfo.value.firstName ||
    !userInfo.value.lastName ||
    !userInfo.value.address ||
    !userInfo.value.email ||
    !userInfo.value.country ||
    !userInfo.value.state ||
    !userInfo.value.zip ||
    !userInfo.value.cardholder ||
    !userInfo.value.cardNum ||
    !userInfo.value.expiry ||
    !userInfo.value.cvv ||
    !finalPrice.value
  ) {
    toast.warning("Complete your details and add items to place your order.");
    return;
  }

  const completeOrder = {
    name: userInfo.value.firstName + " " + userInfo.value.lastName,
    date: Date.now(),
    state: "Processing",
    item: [...props.products],
    totalPrice: finalPrice.value,
    id: "MO-" + Date.now(),
  };

  emit("orderDone", completeOrder);
  userInfo.value = {
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    country: "",
    state: "",
    zip: "",
    cardholder: "",
    cardNum: "",
    expiry: "",
    cvv: "",
  };
  toast.success("Order placed successfully! We've sent a confirmation to your email.");
}

function sendDeleteEmit(id) {
  emit("deleteProduct", id);
}
</script>

<style lang="scss" scoped>
.Checkout input {
  box-shadow: none !important;

  outline: none !important;
}
.dark-theme {
  .back {
    border-color: rgb(222, 222, 222) !important;
    color: rgb(222, 222, 222) !important ;
    transition: 0.4s !important;
    &:hover {
      background-color: rgb(222, 222, 222) !important;
      color: black !important;
    }
  }

  .placeOrders {
    background: linear-gradient(135deg, #3b82f6 0%, #114ae7 100%) !important;
    border: none !important;
    color: #ffffff !important;
    box-shadow: 0 4px 12px rgba(59, 130, 246, 0.25);
    transition: all 0.3s ease;
    &:hover {
      box-shadow: 0 6px 18px rgba(59, 130, 246, 0.4);
      transform: translateY(-1px);
    }
  }
}
.paymentMethod {
  > div {
    background-color: var(--bg-orders) !important;
    input {
      background-color: var(--bg-ratio);
      border-color: var(--border-color) !important;
    }
    .countries {
      select {
        background-color: var(--bg-ratio);
        border-color: var(--border-color) !important;
      }
    }
  }
}
.Checkout .heading {
  margin: 0 auto;
}
.products-details {
  height: fit-content;
  background-color: var(--bg-orders);
}
.delete {
  i {
    transition: 0.5s;
    cursor: pointer;
    &:hover {
      color: red !important;
    }
  }
}
@media (max-width: 991px) {
  .products-details {
    width: 91% !important;
  }
}
.specialSelect {
  border-radius: 8px !important;
  :deep(.ant-select-selector) {
    background-color: var(--bg-ratio) !important;
    border: 1px solid var(--border-color) !important;
    border-radius: 8px !important;
    height: 38px !important;
    display: flex;
    align-items: center;
  }
}
</style>
