<template>
  <div class="MyFooter border-top border-3 border-primary" v-if="route.name !== 'login'">
    <div class="container-fluid">
      <div class="row py-5">
        <div class="main-logo col-md-3 text-center text-md-start mb-3 mb-md-0">
          <img
            src="/images/brandFooterDark.png"
            class="img-fluid mb-4"
            style="width: 8rem"
            alt=""
            v-if="modeNow === 'dark'"
          />
          <img
            src="/images/brandFooter.png"
            class="img-fluid mb-4"
            style="width: 8rem"
            alt=""
            v-else
          />
          <div class="links d-flex justify-content-center justify-content-md-start gap-2 ms-2">
            <i class="bi bi-instagram cursor-pointer"></i>
            <i class="bi bi-pinterest cursor-pointer"></i>
            <i class="bi bi-linkedin cursor-pointer"></i>
          </div>
        </div>
        <div class="col-md-3 text-center text-md-start mb-3 mb-md-0">
          <h4 class="text-uppercase m-0">Navigation</h4>
          <ul class="links list-unstyled">
            <li>
              <router-link class="text-decoration-none" :to="{ name: 'home' }">Home</router-link>
            </li>
            <li>
              <router-link class="text-decoration-none" :to="{ name: 'bestsellers' }"
                >Best Sellers</router-link
              >
            </li>
            <li>
              <router-link class="text-decoration-none" :to="{ name: 'about' }"
                >About Us</router-link
              >
            </li>
          </ul>
        </div>
        <div class="col-md-3 text-center text-md-start mb-3 mb-md-0">
          <h4 class="text-uppercase m-0">Account</h4>
          <ul class="links list-unstyled">
            <li>
              <router-link class="text-decoration-none" :to="{ name: 'Dashboard' }"
                >Dashboard</router-link
              >
            </li>
            <li>
              <router-link class="text-decoration-none" :to="{ name: 'orders' }"
                >orders</router-link
              >
            </li>
            <li>
              <router-link class="text-decoration-none" :to="{ name: 'checkout' }"
                >checkout</router-link
              >
            </li>
          </ul>
        </div>
        <div class="col-md-3 text-center text-md-start mb-3 mb-md-0">
          <h4 class="text-uppercase m-0 mb-3">newsletter</h4>
          <div class="msg">
            <p class="text-uppercase">subscribe for special offers & limited edition updates.</p>
          </div>
          <div class="sendMsg input-group mb-3">
            <input
              type="text"
              class="form-control"
              placeholder="ENTER YOUR EMAIL"
              aria-label="Recipient’s username"
              aria-describedby="email-subscribe"
            />
            <button class="btn btn-primary" type="button" id="email-subscribe">Button</button>
          </div>
        </div>
      </div>
      <div
        class="footer d-flex justify-content-center align-items-center flex-column flex-md-row p-2"
      >
        <div class="copyright text-uppercase text-center text-md-start ms-auto mb-3 mb-md-0">
          &copy;{{ new Date().getFullYear() }} <strong>Mustafa K. Kullab</strong> For Moda Ops. All
          right reserved.
        </div>
        <div class="icons d-flex align-items-center gap-3 ms-0 ms-md-auto">
          <img
            src="/images/master.svg"
            class="img-fluid cursor-pointer"
            style="width: 2rem"
            alt=""
          />
          <img
            src="/images/paypal.svg"
            class="img-fluid cursor-pointer"
            style="width: 2rem"
            alt=""
          />
          <img src="/images/visa.svg" class="img-fluid cursor-pointer" style="width: 2rem" alt="" />
          <img src="/images/amex.svg" class="img-fluid cursor-pointer" style="width: 2rem" alt="" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
const route = useRoute();
// const currentMode = ref(false);
const props = defineProps({
  modeNow: {
    type: String,
    required: true,
  },
});
</script>

<style lang="scss" scoped>
.MyFooter {
  background-color: var(--bg-color);
  color: var(--text-color) !important;
}
input {
  box-shadow: none !important;
}
.cursor-pointer {
  cursor: pointer;
}
.links {
  li {
    a {
      color: var(--text-color) !important;
    }
  }
}

.main-logo {
  .links {
    i {
      transition: 0.3s;
      font-size: 20px;
      &:hover {
        color: black !important;
      }
    }
  }
}
.sendMsg {
  input {
    background-color: var(--orders-color);
    border: 2px solid var(--border-color);
    color: var(--text-color);
    &::placeholder {
      color: var(--text-color);
    }
  }
}
.footer {
  border-top: 3px solid var(--border-color);
}
</style>
