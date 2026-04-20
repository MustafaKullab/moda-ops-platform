<template>
  <section class="ContactUs">
    <div class="container-lg">
      <div class="title text-center py-5">
        <h1 class="display-3 mx-auto text-uppercase m-0 mb-2">Contact us</h1>
      </div>
      <div class="row justify-content-center gap-3 mx-2 pb-3">
        <div class="box col-md-3 text-center p-2 rounded-2 shadow-sm">
          <div class="icon"><i class="bi bi-envelope fs-2"></i></div>
          <div class="details">
            <p class="fs-4 text-uppercase m-0">Email:</p>
            <p class="contactWay">Support@MODAOPS.com</p>
          </div>
        </div>
        <div class="box col-md-3 text-center p-2 rounded-2 shadow-sm">
          <div class="icon"><i class="bi bi-telephone fs-2"></i></div>
          <div class="details">
            <p class="fs-4 text-uppercase m-0">Phone:</p>
            <p class="contactWay">+970-59-7116801</p>
          </div>
        </div>
        <div class="box col-md-3 text-center p-2 rounded-2 shadow-sm">
          <div class="icon"><i class="bi bi-geo-alt fs-2"></i></div>
          <div class="details">
            <p class="fs-4 text-uppercase m-0">Location:</p>
            <p class="contactWay">MODA OPS HQ, El-shatia Camp</p>
          </div>
        </div>
      </div>
      <div class="row justify-content-center">
        <div class="col-md-5">
          <div class="subtitle text-center mb-4">
            <div class="icon"><i class="bi bi-compass fs-2"></i></div>
            <h2 class="text-uppercase">get in touch</h2>
          </div>
          <form class="pb-5">
            <div class="input-group mb-3">
              <input type="text" class="form-control rounded-2" placeholder="Your Name" />
              <input type="text" class="form-control ms-2 rounded-2" placeholder="Your Email" />
            </div>
            <textarea class="form-control mb-3" rows="4" placeholder="Your Message"></textarea>
            <button
              class="btn btn-lg btn-primary w-100 d-flex align-items-center gap-2 justify-content-center"
            >
              Send Message<i class="bi bi-arrow-right mt-1"></i>
            </button>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.ContactUs {
  .title {
    color: var(--text-color) !important;
  }
  form {
    input,
    textarea {
      background-color: var(--bg-orders);
      color: rgb(200, 200, 200);
      box-shadow: none !important;
      border: none !important;
      resize: none;
      &::placeholder {
        color: var(--text-color);
      }
    }
  }
  .contactWay {
    @media (max-width: 991px) {
      font-size: 14px !important;
    }
  }
  .box {
    background-color: var(--bg-orders) !important;
    transition: 0.4s !important;
    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 6px 6px #0000002e !important;
    }
  }
}
.dark-theme {
  button {
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
</style>
