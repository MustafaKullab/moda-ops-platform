<template>
  <section class="SingleOrder bg-altSecondary">
    <div class="container-lg py-5">
      <button
        class="back btn btn-outline-secondary border border-secondary rounded-2 cursor-pointer"
        @click="router.go(-1)"
      >
        <i class="bi bi-caret-left-fill"></i> back
      </button>
      <div class="title">
        <h1 class="m-0 text-center">
          Order <span class="text-primary">{{ thisOrder[0].name }}</span>
        </h1>
      </div>
      <div
        class="order-details row justify-content-between align-items-center my-5 mx-2 p-3 rounded-2"
      >
        <div class="title col-md-3 fw-bold fs-4 text-center text-md-start mb-3 mb-md-0">
          Order Meta Summary
        </div>
        <div class="details col-md-9 row">
          <div class="col-md-4 text-center d-flex flex-column gap-2 mb-3 mb-md-0">
            <span class="text-uppercase">Order Status : </span>
            <span
              class="state m-0 mb-2 px-2 py-1 rounded-2 text-muted fw-bold"
              :class="
                thisOrder[0].state === 'Processing'
                  ? 'bg-warning'
                  : thisOrder[0].state === 'delivered'
                    ? 'bg-success'
                    : thisOrder[0].state === 'shipped'
                      ? 'bg-info'
                      : 'bg-secondary'
              "
            >
              {{ thisOrder[0].state }}
            </span>
          </div>
          <div class="totalPrice col-md-4 text-center d-flex flex-column gap-2 mb-3 mb-md-0">
            <span class="text-uppercase">Total Amount : </span>
            <span class="fw-bold fs-4">${{ thisOrder[0].totalPrice }}</span>
          </div>
          <div class="date col-md-4 text-center d-flex flex-column gap-2 mb-3 mb-md-0">
            <span class="text-uppercase">Date of Order : </span>
            <span class="fw-bold">{{ new Date(thisOrder[0].date).toDateString() }}</span>
          </div>
        </div>
      </div>
      <div class="row gap-3 justify-content-center my-5">
        <div
          class="card bg-light p-0 rounded-2 overflow-hidden shadow-sm mb-3"
          style="width: 18rem"
          :class="`col-md-${12 / thisOrder[0].item.length}`"
          v-for="product in thisOrder[0].item"
          :key="product.id"
        >
          <img :src="product.image" class="img-fluid" :alt="product.title" />
          <div class="card-body">
            <h5 class="title">{{ product.title }}</h5>
            <p>{{ product.description }}</p>
            <div class="quantity">You Pay {{ product.quantity }}X</div>
            <div class="totlaPrice">
              Total: <strong>${{ product.quantity * product.price }}</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import router from "@/router";
import { ref } from "vue";
import { useRoute } from "vue-router";
const route = useRoute();
const props = defineProps({
  newOrders: {
    type: Array,
    required: true,
  },
});

const thisOrder = ref([]);
thisOrder.value.push(props.newOrders.filter((order) => order.id === route.params.id)[0]);
</script>

<style lang="scss">
.state {
  color: white !important;
}
.order-details {
  background: var(--bg-orders);
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
}
</style>
