<template>
  <section class="MyOrders bg-altSecondary">
    <div class="title text-center py-5">
      <h1 class="heading display-3 mx-auto">My Orders</h1>
      <p class="text-uppercase m-0">track and manage your recent purchases</p>
    </div>
    <div class="container-xl">
      <ul class="list-unstyled pb-5 m-5 m-xl-0" v-if="or !== 0">
        <li
          class="row align-items-center justify-content-between mb-4 shadow-sm rounded-3 py-2 px-4"
          v-for="order in ordersFilter"
          :key="order.id"
        >
          <span class="col-xl-2 mb-3 text-center text-xl-start fw-bold mb-xl-0 name"
            >Order {{ order.name }}</span
          >
          <span class="col-xl-2 mb-3 text-center text-xl-start mb-xl-0 date">
            {{ new Date(order.date).toDateString() }}</span
          >
          <span
            class="state col-1 col-xl-1 mb-3 mx-auto mx-xl-start mb-xl-0 state py-2 rounded-2 text-muted fw-bold text-center"
            style="width: 120px"
            :class="
              order.state === 'Processing'
                ? 'bg-warning'
                : order.state === 'delivered'
                  ? 'bg-success'
                  : order.state === 'shipped'
                    ? 'bg-info'
                    : 'bg-secondary'
            "
          >
            {{ order.state }}</span
          >
          <span
            class="col-xl-3 mb-3 text-center text-xl-start mb-xl-0 image d-flex gap-2 justify-content-center justify-content-xl-start"
            ><img
              v-for="img in order.item"
              :key="img"
              :src="img.image"
              class="img-fluid rounded-2"
              style="width: 3rem"
              alt="image"
          /></span>
          <span class="col-xl-1 mb-3 text-center text-xl-start mb-xl-0 price"
            >Total: <strong>${{ order.totalPrice }}</strong></span
          >
          <button
            class="col-2 col-xl-2 text-center text-xl-start mb-xl-0 btn btn-primary w-auto mx-auto mb-3 mb-xl-0"
            @click="router.push({ name: 'singleorder', params: { id: order.id } })"
          >
            View Details
          </button>
          <div class="col-xl-1 delete text-center text-xl-end">
            <i class="bi bi-trash3 cursor-pointer" @click.stop="sendDelete(order.id)"></i>
          </div>
        </li>
      </ul>
      <div v-else class="msg text-center">
        <img src="/images/noOrder.png" class="img-fluid me-5" style="width: 32rem" alt="" />
        <div class="goHome py-3">
          <router-link class="btn btn-primary" :to="{ name: 'home' }"
            >Explore Collection</router-link
          >
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useRouter } from "vue-router";
import Swal from "sweetalert2";
import { computed } from "vue";
const router = useRouter();

const props = defineProps({
  newOrders: {
    type: Array,
    required: true,
  },
  filteringSearch: {
    type: String,
    required: true,
  },
});

const or = computed(() => {
  return props.newOrders.length;
});

const emit = defineEmits(["deleteOrder"]);

function sendDelete(id) {
  // تاكيد جميلة popups مكتبة جديدة تعلمتها لاعطاء
  Swal.fire({
    title: "Delete Order?",
    text: "This action cannot be undone. Are you sure you want to remove this order from your history?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#003c7a",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, Delete",
    cancelButtonText: "Cancle",
  }).then((result) => {
    if (result.isConfirmed) {
      emit("deleteOrder", id);
      Swal.fire({
        title: "Removed!",
        text: "The order has been successfully deleted.",
        icon: "success",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });
    }
  });
}

// computed to Filter My Orders
const ordersFilter = computed(() => {
  const term = props.filteringSearch.toLowerCase().trim();
  return props.newOrders.filter((order) => {
    return order.name.toLowerCase().includes(term);
  });
});
</script>

<style lang="scss" scoped>
.title {
  color: var(--text-color) !important;
  h1 {
    width: fit-content;
    position: relative;
  }
}
.delete {
  i {
    cursor: pointer;
    transition: 0.3s;
    &:hover {
      color: red !important;
    }
  }
}

.state {
  color: white !important;
}

ul {
  > li {
    background-color: var(--bg-orders) !important;
  }
}
</style>
