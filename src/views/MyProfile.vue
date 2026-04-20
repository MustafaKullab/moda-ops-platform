<template>
  <section class="MyProfile">
    <div class="container-lg py-5">
      <div
        class="profile-box p-3 rounded-3 d-flex flex-column flex-md-row gap-3 align-items-center"
      >
        <div class="image" @click="changeShowPhoto">
          <img
            src="/images/logo.jpg"
            style="width: 150px"
            alt="Profile Image"
            class="img-fluid rounded-pill p-1 border"
          />
        </div>
        <div class="details w-100 text-center text-md-start">
          <h3 class="fw-normal">Mustafa Khalil Kullab</h3>
          <div class="member">
            <p class="m-0 mb-2 pb-2 border-bottom">Member since 2019</p>
            <div
              class="m-0 d-flex align-items-center gap-2 justify-content-center justify-content-md-start"
            >
              <p class="m-0">Verified Member</p>
              <div class="icon mt-1"><i class="bi bi-patch-check-fill text-primary"></i></div>
            </div>
          </div>
        </div>
      </div>
      <div class="quickDashboard my-5">
        <div class="title">
          <h5 class="fw-normal">Quick Dashboard Store</h5>
        </div>
        <div
          class="dashboardBox p-3 rounded-3 d-flex flex-column flex-md-row gap-3 justify-content-around align-items-center"
        >
          <div class="totalOrders border-md-end border-sm-bottom text-center" style="width: 30%">
            <span class="fs-1">125</span>
            <p>Total Orders</p>
          </div>
          <div class="activeOrders border-md-end border-sm-bottom text-center" style="width: 30%">
            <span class="fs-1">{{ activeOrders }}</span>
            <p>Active Orders</p>
          </div>
          <div class="wishlistItem text-center" style="width: 30%">
            <span class="fs-1">5 </span>
            <p>Wishlist Items</p>
          </div>
        </div>
      </div>
      <div class="recentOrders my-5">
        <div class="title">
          <h5 class="fw-normal">Recent Orders</h5>
        </div>
        <div class="latestOrders">
          <div
            class="box mb-3 p-3 d-flex align-items-center gap-3 rounded-3"
            v-for="order in latestOrders"
            :key="order.id"
          >
            <div class="images d-flex gap-2">
              <div class="img" v-for="item in order.item" :key="item.image">
                <img :src="item.image" alt="" width="60px" class="rounded-2" />
              </div>
            </div>
            <div class="details">{{ order.id }} {{ order.state }}</div>
          </div>
          <div class="button text-center">
            <button class="btn" @click="router.push({ name: 'orders' })">View All Orders</button>
          </div>
        </div>
      </div>
      <div class="savedInformation my-5">
        <div class="title">
          <h5 class="fw-normal">Saved Information</h5>
        </div>
        <div class="row justify-content-between align-items-center p-3 rounded-3">
          <div class="col-md-5 p-0 address border-sm-bottom pb-4 pb-md-0">
            <div
              class="default d-flex justify-content-between align-items-center border-bottom pb-2"
            >
              <div class="addressText p-0">Default Address</div>
              <div class="button edit" @click="changeAddressHandle">
                <button class="btn">Edit</button>
              </div>
            </div>
            <div class="addressText pt-2">{{ myAddress }}</div>
          </div>
          <div class="col-md-5 p-0 paymentMethod pt-4 pt-md-0">
            <div class="default border-bottom pb-2">Payment Method</div>
            <div class="payMethod pt-2">
              <img
                src="/images/visa.svg"
                class="img-fluid cursor-pointer"
                style="width: 2rem"
                alt=""
                data-v-inspector="src/components/MyFooter.vue:88:11"
                data-v-b7a56cbc=""
              />
              &bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull; &bull;&bull;45685
            </div>
          </div>
        </div>
      </div>
      <div class="accountSettings my-5">
        <div class="title">
          <h5 class="fw-normal">Account Settings</h5>
        </div>
        <div class="settings p-3 rounded-3 row">
          <ul class="list-group list-group-flush">
            <li class="list-group-item px-0 d-flex align-items-center gap-2">
              <i class="bi bi-chevron-right text-muted"></i>
              <a href="#" class="btn p-0" @click.prevent="changePasswordHandle">Update Password</a>
            </li>
            <li class="list-group-item px-0 d-flex align-items-center gap-2">
              <i class="bi bi-chevron-right text-muted"></i>
              <a href="#" class="btn p-0" @click.prevent="changeEmailHandle"
                >Update Email Address</a
              >
            </li>
            <li class="list-group-item px-0 d-flex align-items-center gap-2">
              <i class="bi bi-chevron-right text-muted"></i>
              <a href="#" class="btn p-0">Newsletter Preference</a>
            </li>
            <li
              class="list-group-item px-0 d-flex align-items-center gap-2"
              @click.prevent="signOut"
            >
              <i class="bi bi-chevron-right text-muted"></i>
              <a href="#" class="btn p-0 text-danger">Sign Out</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <transition name="fade">
      <div class="changeAddress overlayAddress" v-if="changeAddress">
        <div class="form position-relative">
          <div
            class="closeButton position-absolute end-0 top-0 fs-4 bg-white rounded-2 cursor-pointer"
            @click.prevent="changeAddressHandle"
          >
            X
          </div>
          <form>
            <label for="changeAddressLabel" class="form-label">New Shipping Address :</label>
            <input
              type="text"
              class="form-control mb-3"
              id="changeAddressLabel"
              placeholder="New Address"
              v-model="newAddress"
            />
            <div class="confirm text-center">
              <button class="btn btn-primary w-75 mt-3" @click.prevent="editAddress">
                Update Address
              </button>
            </div>
          </form>
        </div>
      </div>
    </transition>
    <transition name="fade">
      <div class="changePass overlayPass" v-if="changePassword">
        <div class="form position-relative">
          <div
            class="closeButton position-absolute end-0 top-0 fs-4 bg-white rounded-2 cursor-pointer"
            @click.prevent="changePasswordHandle"
          >
            X
          </div>
          <form>
            <label for="changePass" class="form-label">Current Password :</label>
            <input
              type="text"
              class="form-control mb-3"
              placeholder="Old Password"
              v-model="oldPassword"
            />
            <label for="changePass" class="form-label">New Password :</label>
            <input
              type="text"
              class="form-control"
              placeholder="New Password"
              v-model="newPassword"
            />
            <input
              type="text"
              class="form-control mt-3"
              placeholder="Confirm new password"
              v-model="newPassword2"
            />
            <div class="confirm text-center">
              <button class="btn btn-primary w-75 mt-3" @click.prevent="sendEmitChangePassword">
                Update Password
              </button>
            </div>
          </form>
        </div>
      </div>
    </transition>
    <transition name="fade">
      <div class="changeEmail overlayEmail" v-if="changeEmail">
        <div class="form position-relative">
          <div
            class="closeButton position-absolute end-0 top-0 fs-4 bg-white rounded-2 cursor-pointer"
            @click.prevent="changeEmailHandle"
          >
            X
          </div>
          <form>
            <label for="changePass" class="form-label">Enter Old Email :</label>
            <input
              type="text"
              class="form-control mb-3"
              placeholder="Old Email"
              v-model="oldEmail"
            />
            <label for="changeEmail" class="form-label">Update Email Address :</label>
            <input
              type="text"
              class="form-control"
              id="changeEmail"
              placeholder="eg. example@gmail.com"
              v-model="newEmail"
            />
            <div class="confirm text-center">
              <button class="btn btn-primary w-75 mt-3" @click.prevent="sendEmitChangeEmail">
                Update Email
              </button>
            </div>
          </form>
        </div>
      </div>
    </transition>
    <transition name="fade">
      <div class="overlayPhoto" v-if="showPhoto">
        <div class="image">
          <img src="/images/logo.jpg" alt="" class="img-fluid rounded-pill" />
        </div>
      </div>
    </transition>
  </section>
</template>

<script setup>
import Swal from "sweetalert2";
import { computed, onMounted, onUnmounted, ref } from "vue";
import { useRouter } from "vue-router";
import { toast } from "vue-sonner";

const router = useRouter();
const props = defineProps({
  newOrders: {
    type: Array,
    required: true,
  },
});
const showPhoto = ref(false);
const myAddress = ref("Gaza, Al-Shati Camp");
const changeAddress = ref(false);
const newAddress = ref("");
const changePassword = ref(false);
const changeEmail = ref(false);
const oldPassword = ref("");
const newPassword2 = ref("");
const newPassword = ref("");
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
const oldEmail = ref("");
const newEmail = ref("");
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const emit = defineEmits(["changePassword", "changeEmail"]);

// Computed to Calculate The Current Orders
const activeOrders = computed(() => {
  return props.newOrders.length;
});

const latestOrders = computed(() => {
  return props.newOrders.slice(-2).reverse();
});

function changeAddressHandle() {
  changeAddress.value = !changeAddress.value;
}

function editAddress() {
  if (!newAddress.value.trim()) {
    toast.warning("Please provide a valid shipping address to update your profile.");
    return;
  } else if (newAddress.value === myAddress.value) {
    toast.info("No changes were made to your address.");
    changeAddressHandle();
    return;
  }
  myAddress.value = newAddress.value;
  toast.success("Default address updated successfully.");
  localStorage.setItem("newAddress", newAddress.value);
  changeAddressHandle();
}

onMounted(() => {
  if (localStorage.getItem("newAddress")) {
    myAddress.value = localStorage.getItem("newAddress");
  }
});

function changePasswordHandle() {
  changePassword.value = !changePassword.value;
}
function changeEmailHandle() {
  changeEmail.value = !changeEmail.value;
}

// Function To display the photo on screen
function changeShowPhoto() {
  showPhoto.value = !showPhoto.value;
}

// Function To Change Password
function sendEmitChangePassword() {
  if (!oldPassword.value || !newPassword.value) {
    toast.warning("Please complete all required fields to proceed.");
    return;
  } else if (oldPassword.value !== localStorage.getItem("oldPassword")) {
    toast.warning("The current password you entered is incorrect.");
    return;
  } else if (!passwordRegex.test(newPassword.value)) {
    toast.warning("Password must include uppercase, lowercase, and a number.");
    return;
  } else if (newPassword.value === oldPassword.value) {
    toast.warning("Your new password cannot be the same as your current one.");
    return;
  } else if (newPassword.value !== newPassword2.value) {
    toast.warning("Your new password must be the same password in each fealid");
    return;
  }
  localStorage.setItem("oldPassword", newPassword.value);
  toast.success("Your password has been successfully updated.");
  changePasswordHandle();
  emit("changePassword", newPassword.value);
}

// Function To Change Email Address
function sendEmitChangeEmail() {
  const newEmailVal = newEmail.value.toLowerCase();
  const oldEmailVal = oldEmail.value.toLowerCase();

  if (!oldEmailVal || !newEmailVal) {
    toast.warning("Please complete all required fields to proceed.");
    return;
  } else if (!emailRegex.test(newEmailVal)) {
    toast.warning("Please enter a valid email address.");
    return;
  } else if (oldEmailVal !== localStorage.getItem("oldEmail")) {
    toast.warning("The current email address you entered is incorrect.");
    return;
  } else if (newEmailVal === oldEmailVal) {
    toast.warning("The new email cannot be the same as your current one.");
    return;
  }
  localStorage.setItem("oldEmail", newEmailVal);
  toast.success("Your email address has been successfully updated.");
  changeEmailHandle();
  emit("changeEmail", newEmailVal);
}

// Function To Sign Out
function signOut() {
  Swal.fire({
    title: "Sign Out?",
    text: "Are you sure you want to log out of your account?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Sign Out",
    confirmButtonColor: "#071349",
    cancelButtonText: "Cancle",
    cancelButtonColor: "#d33",
    reverseButtons: true,
  }).then((result) => {
    if (result.isConfirmed) {
      localStorage.setItem("isLogin", "false");
      router.push({ name: "login" });
      toast.success("Successfully logged out");
    }
  });
}

const handleOverlayClick = (e) => {
  if (e.target.classList.contains("overlayPass")) {
    changePasswordHandle();
  } else if (e.target.classList.contains("overlayEmail")) {
    changeEmailHandle();
  } else if (e.target.classList.contains("overlayAddress")) {
    changeAddressHandle();
  } else if (e.target.classList.contains("overlayPhoto")) {
    changeShowPhoto();
  }
};

onMounted(() => {
  window.addEventListener("click", handleOverlayClick);
});

onUnmounted(() => {
  window.removeEventListener("click", handleOverlayClick);
});
</script>

<style lang="scss" scoped>
.MyProfile {
  .profile-box,
  .dashboardBox {
    background-color: var(--bg-orders);
    border: 2px solid var(--border-color) !important;
  }
  .latestOrders {
    .box {
      background-color: var(--bg-orders);
      border: 2px solid var(--border-color) !important;
    }
  }
  .savedInformation {
    .row {
      background-color: var(--bg-orders);
      border: 2px solid var(--border-color) !important;
    }
  }
  .settings {
    background-color: var(--bg-orders);
    border: 2px solid var(--border-color) !important;
  }
}
* input {
  box-shadow: none !important;
  border: 2px solid #cacaca !important;
}
@media (min-width: 768px) {
  .border-md-end {
    border-right: 2px solid var(--border-color);
  }
}
@media (max-width: 767px) {
  .border-sm-bottom {
    border-bottom: 2px solid var(--border-color) !important;
    width: 100% !important;
  }
}
.button {
  button {
    background-color: #faf9fb;
    border: 1px solid #dee2e6 !important;
  }
}

.accountSettings {
  ul {
    li {
      a {
        border: none !important;
      }
    }
  }
}

.changePass,
.changeEmail,
.changeAddress,
.overlayPhoto {
  position: fixed;
  z-index: 10000;
  top: 50%;
  left: 50%;
  width: 100% !important;
  height: 100% !important;
  background-color: rgba(0, 0, 0, 0.338) !important;
  backdrop-filter: 20px;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;
  align-items: center;
  backdrop-filter: blur(1.5px);
  .form {
    padding: 20px;
    width: 500px;
    height: fit-content;
    background-color: var(--card-bg);
    border-radius: 5px;
    .closeButton {
      width: 30px;
      height: 30px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-weight: bold;
      cursor: pointer;
      color: var(--text-color) !important;
      background-color: var(--card-bg) !important;
    }
  }
}

// .overlayPhoto {
//   .image{
//     img:
//   }
// }

.dark-theme {
  .settings {
    ul {
      li {
        background-color: var(--bg-border);
        i,
        a {
          color: var(--text-color) !important;
        }
      }
      li:last-of-type {
        a {
          color: rgb(220, 53, 69) !important;
        }
      }
    }
  }
  .edit {
    .btn {
      background-color: var(--accent-color) !important;
      color: var(--text-color);
      border: 1px solid rgb(163, 163, 163) !important;
    }
  }
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-active,
.fade-leave-active {
  transition: 0.6s ease;
}
</style>
