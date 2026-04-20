<template>
  <section class="Dashboard bg-altSecondary">
    <div class="container-lg">
      <!-- Start Order Details  -->
      <div class="ordersDetails row gap-2 justify-content-center mb-3 mt-5">
        <div
          class="totalRevenue col-lg-3 p-3 rounded-3 d-flex justify-content-between"
          style="width: 20rem"
        >
          <div class="information">
            <p class="heading fs-5 m-0 mb-2">Total Revenue</p>
            <div class="amount d-flex align-items-center gap-2">
              <span class="fs-2"> ${{ totalRevenue.toLocaleString() }}</span>
              <i class="bi bi-arrow-up-right text-success fs-4"></i>
            </div>
          </div>
          <div class="arrow">
            <i
              class="arrow-icon bi bi-arrow-up-right text-primary fs-5 p-2 rounded-1 d-flex justify-content-center align-items-center cursor-pointer"
            ></i>
          </div>
        </div>
        <div
          class="currentOrders col-lg-3 p-3 rounded-3 d-flex justify-content-between"
          style="width: 20rem"
        >
          <div class="information">
            <p class="heading fs-5 m-0 mb-2">Current Orders</p>
            <div class="amount d-flex align-items-center gap-2">
              <span class="fs-2"> {{ currentOrders }}</span>
              <i class="bi bi-arrow-up-right text-success fs-4"></i>
            </div>
          </div>
          <div class="arrow">
            <i
              class="arrow-icon bi bi-arrow-up-right text-primary fs-5 p-2 rounded-1 d-flex justify-content-center align-items-center cursor-pointer"
            ></i>
          </div>
        </div>
        <div
          class="activeProducts col-lg-3 p-3 rounded-3 d-flex justify-content-between"
          style="width: 20rem"
        >
          <div class="information">
            <p class="heading fs-5 m-0 mb-2">Active Products</p>
            <div class="amount d-flex align-items-center gap-2">
              <span class="fs-2"> {{ activeProducts }}</span>
              <i class="bi bi-arrow-up-right text-success fs-4"></i>
            </div>
          </div>
          <div class="arrow">
            <i
              class="arrow-icon bi bi-arrow-up-right text-primary fs-5 p-2 rounded-1 d-flex justify-content-center align-items-center cursor-pointer"
            ></i>
          </div>
        </div>
        <div
          class="activeProducts col-lg-3 p-3 rounded-3 d-flex justify-content-between"
          style="width: 20rem"
        >
          <div class="information">
            <p class="heading fs-5 m-0 mb-2">AVG. Order Value</p>
            <div class="amount d-flex align-items-center gap-2">
              <span class="fs-2"> ${{ avgOrderValue.toFixed(2) }}</span>
              <i class="arrow bi bi-arrow-up-right text-success fs-4"></i>
            </div>
          </div>
          <div class="arrow">
            <i
              class="arrow-icon bi bi-arrow-up-right text-primary fs-5 p-2 rounded-1 d-flex justify-content-center align-items-center cursor-pointer"
            ></i>
          </div>
        </div>
      </div>
      <!-- End Order Details  -->
      <!-- Start Sales Ration  -->
      <div class="salesRation">
        <div class="row">
          <div
            class="col d-flex flex-column flex-md-row align-items-center bg-white rounded-4 p-3 my-3 mx-2"
          >
            <div class="image">
              <h4 class="title">Top Selling Categories</h4>
              <img src="/images/products.png" class="img-fluid" style="width: 70rem" alt="" />
            </div>
            <div class="ratio mt-5">
              <div class="mensRatio mb-5 position-relative p-1 rounded-2" style="height: 10px">
                <div class="ratioTitle position-absolute fw-bold">Men</div>
                <div
                  class="ratioPrecentage position-absolute text-success d-flex align-items-center gap-2"
                >
                  <i class="bi bi-arrow-up-right"></i>
                  <span>{{ mensCategoryPrecentage }}%</span>
                </div>
                <div
                  class="progress bg-primary position-absolute top-0 start-0"
                  :style="{ width: mensCategoryPrecentage + '%' }"
                  style="height: 100%"
                  :data-progress="mensCategoryPrecentage"
                ></div>
              </div>
              <div class="womensRatio mb-5 position-relative p-1 rounded-2" style="height: 10px">
                <div class="ratioTitle position-absolute fw-bold">Women</div>
                <div
                  class="ratioPrecentage position-absolute text-success d-flex align-items-center gap-2"
                >
                  <i class="bi bi-arrow-up-right"></i>
                  <span>{{ womensCategoryPrecentage }}%</span>
                </div>
                <div
                  class="progress bg-primary position-absolute top-0 start-0"
                  :style="{ width: womensCategoryPrecentage + '%' }"
                  style="height: 100%"
                  :data-progress="womensCategoryPrecentage"
                ></div>
              </div>
              <div
                class="electronicsRatio mb-5 position-relative p-1 rounded-2"
                style="height: 10px"
              >
                <div class="ratioTitle position-absolute fw-bold">Gadgets</div>
                <div
                  class="ratioPrecentage position-absolute text-success d-flex align-items-center gap-2"
                >
                  <i class="bi bi-arrow-up-right"></i>
                  <span>{{ electronicsCategoryPrecentage }}%</span>
                </div>
                <div
                  class="progress bg-primary position-absolute top-0 start-0"
                  :style="{ width: electronicsCategoryPrecentage + '%' }"
                  style="height: 100%"
                  :data-progress="electronicsCategoryPrecentage"
                ></div>
              </div>
              <div class="accessoriesRatio position-relative p-1 rounded-2" style="height: 10px">
                <div class="ratioTitle position-absolute fw-bold">Accessories</div>
                <div
                  class="ratioPrecentage position-absolute text-success d-flex align-items-center gap-2"
                >
                  <i class="bi bi-arrow-up-right"></i>
                  <span>{{ jeweleryCategoryPrecentage }}%</span>
                </div>
                <div
                  class="progress bg-primary position-absolute top-0 start-0"
                  :style="{ width: jeweleryCategoryPrecentage + '%' }"
                  style="height: 100%"
                  :data-progress="jeweleryCategoryPrecentage"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- End Sales Ration  -->
      <!-- Start Recent Orders  -->
      <div class="recentOrders rounded-4 mt-3 mb-5 p-0 overflow-hidden">
        <div class="titleRecentOrders px-3 pt-3">
          <h4>Recent Orders</h4>
        </div>
        <div class="table-responsive m-3 rounded-3" v-if="allOrders.length">
          <table class="table align-middle table-hover table-bordered">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Status</th>
                <th>Date</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="order in ordersFilter" :key="order.id" :class="order.state">
                <td>{{ order.id }}</td>
                <td>{{ order.name }}</td>
                <td
                  @click="changeState(order)"
                  class="d-flex gap-2 align-items-center justify-content-between"
                >
                  <span :class="order.state" class="state rounded-2 p-2" style="font-size: 14px">{{
                    order.state
                  }}</span>
                  <span class="icon" v-if="order.state === 'delivered'"
                    ><i class="bi bi-check-circle text-success"></i>
                  </span>
                  <span class="icon processing" v-else-if="order.state === 'Processing'"
                    ><i class="bi bi-alarm"></i
                  ></span>
                  <span class="icon sh" v-else><i class="bi bi-truck"></i></span>
                </td>
                <td>{{ new Date(order.date).toDateString() }}</td>
                <td>${{ order.totalPrice }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <h1 class="text-center py-5 fw-light" v-else>
          No order records found <i class="bi bi-clipboard-x"></i> .
        </h1>
      </div>
      <!-- End Recent Orders  -->
    </div>
  </section>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
const props = defineProps({
  newOrders: {
    type: Array,
    requried: true,
  },
  filteringSearch: {
    type: String,
    required: true,
  },
});

const allOrders = computed(() => props.newOrders);

// Calculate Total Revenue
const totalRevenue = computed(() => {
  return allOrders.value.reduce((acc, order) => acc + Number(order.totalPrice), 0);
});

// Calculate Number Of Current Orders
const currentOrders = computed(() => {
  return allOrders.value.length;
});

// Calculate Number Of Active Products
const activeProducts = ref(0);
async function getProducts() {
  try {
    await fetch("/product.json")
      .then((res) => res.json())
      .then((data) => (activeProducts.value = data.length));
  } catch (error) {
    console.error(error);
  }
}

onMounted(() => {
  getProducts();
});

// Computed To Calculate Avg Order Value
// const totalQuantity = computed(() => {
//   // عشان يرجعلي مصفوفة جديدة تحتوي المصفوفة الداخلية تبعت الايتم
//   const items = allOrders.value.flatMap((order) => order.item || []);

//   // هنا الرديوس عشان نحسب الكميات كلها
//   return items.reduce((acc, order) => acc + Number(order.quantity), 0);
// });

const avgOrderValue = computed(() => {
  return totalRevenue.value / currentOrders.value || 0;
});

// Percentage for each type
// Computed To Calculate Each order
const allCategory = computed(() => {
  const items = allOrders.value
    .flatMap((order) => order.item || [])
    .reduce((acc, ord) => acc + ord.quantity, 0);
  return items;
});

const items = computed(() => {
  return allOrders.value.flatMap((order) => order.item || []);
});

// Mens Precentage
const mensCategoryPrecentage = computed(() => {
  const mensItem = items.value.filter((order) => order.category === "men's clothing");
  const mensQuantity = mensItem.reduce((acc, order) => acc + order.quantity, 0);
  return (mensQuantity / allCategory.value) * 100 || 0;
});

//Womens Precentage
const womensCategoryPrecentage = computed(() => {
  const womensItem = items.value.filter((order) => order.category === "women's clothing");
  const womenQuantity = womensItem.reduce((acc, order) => acc + order.quantity, 0);
  return (womenQuantity / allCategory.value) * 100 || 0;
});

//Electronics Precentage
const electronicsCategoryPrecentage = computed(() => {
  const electronicsItem = items.value.filter((order) => order.category === "electronics");
  const electronicsQuantity = electronicsItem.reduce((acc, order) => acc + order.quantity, 0);
  return (electronicsQuantity / allCategory.value) * 100 || 0;
});

//jewelery Precentage
const jeweleryCategoryPrecentage = computed(() => {
  const jeweleryItem = items.value.filter((order) => order.category === "jewelery");
  const jeweleryQuantity = jeweleryItem.reduce((acc, order) => acc + order.quantity, 0);
  return (jeweleryQuantity / allCategory.value) * 100 || 0;
});
// Percentage for each type

// Arrange all data based on time
const sortedOrders = computed(() => {
  return [...allOrders.value].sort((a, b) => {
    return new Date(b.date) - new Date(a.date);
  });
});

// Function To Change State Of Order

const emit = defineEmits(["changeState"]);
function changeState(order) {
  emit("changeState", order.id);
}

// Computed To Filter The New Orders By Id
const ordersFilter = computed(() => {
  const term = props.filteringSearch.toLowerCase().trim();
  return sortedOrders.value.filter((order) => {
    return order.id.toLowerCase().includes(term);
  });
});
</script>

<style lang="scss" scoped>
.ordersDetails {
  > div {
    background-color: var(--card-bg) !important;
    border: 2px solid var(--border-color);
  }
}
.salesRation {
  .mensRatio,
  .womensRatio,
  .electronicsRatio,
  .accessoriesRatio {
    background-color: var(--bg-ratio);
  }
  .row {
    > div {
      background-color: var(--card-bg) !important;
      border: 2px solid var(--border-color) !important;
    }
  }
  .ratioTitle,
  .ratioPrecentage {
    top: -30px;
  }
  .ratioPrecentage {
    right: 0;
  }
}
.arrow-icon {
  background-color: var(--bg-arrow) !important;
}
.recentOrders {
  background-color: var(--bg-table) !important;
  border: 2px solid var(--border-color);
  table {
    tr {
      border-color: var(--border-color) !important;
    }
    thead {
      th {
        border: none !important;
        background-color: var(--bg-thead) !important;
        color: var(--text-color);
      }
    }
    td,
    th {
      white-space: nowrap;
      border-left: none !important;
      padding: 15px 20px !important;
      border-right: none !important;
    }
    td {
      padding: 25px 20px !important;
    }

    tbody {
      td:not(:first-child) {
        border-left: 1px solid var(--border-color) !important;
      }
      tr:last-child {
        border-bottom: none !important;
        td:first-child {
          border-bottom-left-radius: 0.5rem !important;
        }
        td:last-child {
          border-bottom-right-radius: 0.5rem !important;
        }
      }
      td {
        background-color: var(--bg-td) !important;
        color: var(--text-color) !important;
        .state {
          color: white !important;
          cursor: pointer;
          transition: 0.5s;
        }
        .Processing {
          background-color: #ffad32 !important;
        }
        .delivered {
          background-color: #50d782 !important;
        }
        .shipped {
          background-color: #49a7fe !important;
        }
      }
    }
  }
}
</style>
