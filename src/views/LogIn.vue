<template>
  <div class="LogIn d-flex justify-content-center align-items-center">
    <div class="container-lg py-5">
      <div class="row justify-content-center m-0 m-md-2">
        <div
          class="welcomeLogin d-flex justify-content-center flex-column col-md-5 text-light text-center p-4 p-md-5 rounded-start-3 shadow"
        >
          <div class="title">
            <h2 class="fw-light" style="letter-spacing: 1px">Welcome Back!</h2>
            <p>Login to access your account</p>
          </div>
          <div class="image">
            <img
              src="/images/bigLogo.png"
              class="img-fluid rounded-pill"
              style="width: 500px"
              alt=""
            />
          </div>
        </div>
        <div
          class="loginDetails col-md-5 bg-white rounded-end-2 text-center p-4 p-md-5 shadow position-relative"
        >
          <div class="title">
            <h2 class="fw-light mb-5" style="letter-spacing: 1px">Log In</h2>
          </div>
          <form>
            <input
              type="email"
              class="form-control mb-3"
              placeholder="Enter Your Email "
              v-model="email"
            />
            <div class="position-relative">
              <input
                type="password"
                class="form-control mb-3"
                placeholder="Enter Your Password "
                v-model="password"
                ref="inputPassword"
              />
              <button
                class="show btn border-0 position-absolute top-0 end-0"
                @click.prevent="showPassword()"
              >
                <i class="bi bi-eye-slash text-muted" v-if="isShow"></i>
                <i class="bi bi-eye text-muted" v-else></i>
              </button>
            </div>
            <button
              class="btn-login btn w-100 btn-lg"
              style="text-transform: uppercase; letter-spacing: 1px"
              @click.prevent="login"
            >
              Log In
            </button>
          </form>
          <span class="or d-block my-3">Or continue with</span>
          <div class="social d-flex justify-content-center align-items-center gap-1">
            <div class="facebook cursor-pointer">
              <img src="/images/facebook.png" style="width: 35px" alt="" />
            </div>
            <div class="google cursor-pointer">
              <img src="/images/google.png" style="width: 22px" alt="" />
            </div>
          </div>
          <div class="dontHaveAccount mt-2">
            Don't have an account? <a class="text-decoration-none cursor-pointer">Sign Up</a>
          </div>
          <div class="iconMode position-absolute cursor-pointer" v-if="mode" @click="changeMode">
            <i class="bi bi-sun cursor-pointer"></i>
          </div>
          <div class="iconMode position-absolute cursor-pointer" v-else @click="changeMode">
            <i class="bi bi-moon"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { onMounted, ref } from "vue";
import { toast } from "vue-sonner";

const router = useRouter();

// Variable For Mode
const mode = ref("");
onMounted(() => {
  if (localStorage.getItem("mode")) {
    mode.value = localStorage.getItem("mode");
  }
});

const email = ref("");
const password = ref("");
const myPassword = ref("admin");
const myEmail = ref("admin");
const inputPassword = ref(null);
const isShow = ref(false);

// Check If There Is New password And Update it
onMounted(() => {
  if (localStorage.getItem("newPass")) {
    myPassword.value = localStorage.getItem("newPass");
  }
  if (localStorage.getItem("newEmail")) {
    myEmail.value = localStorage.getItem("newEmail");
  }
});

function login() {
  const inputEmail = email.value.toLowerCase().trim();
  const inputPassword = password.value;
  if (!inputEmail && !inputPassword) {
    toast.warning("Email and password are required.");
    return;
  } else if (!inputEmail) {
    toast.warning("Please enter your email address.");
    return;
  } else if (!inputPassword) {
    toast.warning("Please enter your password.");
  } else if (inputEmail !== myEmail.value.toLowerCase() && inputPassword !== myPassword.value) {
    toast.warning("Invalid credentials. Please check your email and password and try again.");
    return;
  } else if (inputEmail !== myEmail.value.toLowerCase()) {
    toast.warning("The email address you entered does not match our records.");
    return;
  } else if (inputPassword !== myPassword.value) {
    toast.warning("The password you entered is incorrect. Please try again.");
    return;
  } else if (inputEmail === myEmail.value.toLowerCase() && inputPassword === myPassword.value) {
    localStorage.setItem("isLogin", "true");
    router.push({ name: "home" });

    toast.success("Successfully logged in");
  }
}

function showPassword() {
  if (inputPassword.value.type === "password") {
    inputPassword.value.type = "text";
    isShow.value = true;
  } else {
    inputPassword.value.type = "password";
    isShow.value = false;
  }
}

function changeMode() {
  if (mode.value === "") {
    mode.value = "dark";
    localStorage.setItem("mode", mode.value);
    document.body.classList.add("dark-theme");
  } else {
    mode.value = "";
    localStorage.setItem("mode", "");
    document.body.classList.remove("dark-theme");
  }
}
</script>

<style lang="scss" scoped>
.cursor-pointer {
  cursor: pointer;
}
.LogIn {
  min-height: 100vh;
  padding: 20px 0;
  .welcomeLogin {
    background: linear-gradient(to top, black, #0f111a) !important;
  }
  @media (max-width: 767px) {
    .welcomeLogin {
      border-radius: 0px !important;
      border-top-left-radius: 0.5rem !important;
      border-top-right-radius: 0.5rem !important;
    }
    .loginDetails {
      border-radius: 0px !important;
      border-bottom-left-radius: 0.5rem !important;
      border-bottom-right-radius: 0.5rem !important;
    }
  }
  .image {
    img {
      border-radius: 50% !important;
    }
  }
  input {
    box-shadow: none !important;
    border: none !important;
    border: 1px solid #e9ecef !important;
    transition: 0.4s;
    &:focus {
      transform: scale(1.05) translateX(-2%);
      box-shadow: 3px 3px 2px rgba(0, 0, 0, 0.067) !important;
    }
  }
  .google {
    margin-bottom: 3px !important;
  }
}

.dark-theme {
  .LogIn {
    background-color: #0b0e14 !important;
    .loginDetails {
      background-color: #1a1d23 !important;
      input {
        background-color: #242830 !important;
        border: 2px solid var(--border-color) !important;
        color: #a4a4a4 !important;
        &::placeholder {
          color: #a4a4a4;
        }
      }
      button {
        background-color: var(--border-color);
        color: var(--text-color) !important;
        border: none !important;
        transition: 0.3s;
        &:hover {
          border: none !important;
          transform: translateY(-1px) scale(1.01);
          box-shadow: 0px 0px 4px #e9ecef08;
          background-color: #1d2129 !important;
        }
      }
    }
  }
  .show {
    i {
      color: #a4a4a4 !important;
    }
  }
}

.iconMode {
  right: 10px;
  top: 10px;
}
.btn-login {
  background-color: #0d6efd;
  color: white !important;
  transition: 0.4s;
  &:hover {
    background-color: #0951be !important;
    transform: translateY(-1px) scale(1.01);
  }
}
</style>
