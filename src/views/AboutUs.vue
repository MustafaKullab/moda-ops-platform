<template>
  <section class="AboutUs bg-altSecondary">
    <div class="container-lg">
      <div class="title text-center py-5">
        <h1 class="display-3 mx-auto text-uppercase m-0 mb-1">About Moda Ops</h1>
        <p class="lead fs-6">Curators of Timeless Elegance and the old Money Aesthetic</p>
      </div>
      <div class="row justify-content-center align-items-center gap-3 pb-5">
        <div class="image col-8 col-lg-5 mb-5 mb-lg-0">
          <img src="/images/clothese.png" alt="Clothese" class="img-fluid" />
        </div>
        <div class="features col-11 col-lg-6">
          <div class="boxes pb-3 mb-3 mb-lg-0">
            <div class="box d-md-flex gap-3 mb-3 text-center text-md-start d-block">
              <div class="icon mb-3 mb-md-0">
                <i class="bi bi-pencil text-primary fs-2"></i>
              </div>
              <div class="details">
                <h2 class="fs-3">Our Philosophy</h2>
                <span class="fs-6"
                  >We at MODA OPS are the essential curators of "Old Money" and the curated,
                  classic, fit-focused style. We are dedicated to providing you with our curated
                  classic fits.</span
                >
              </div>
            </div>
            <div class="box d-md-flex gap-3 mb-3 text-center text-md-start d-block">
              <div class="icon mb-3 mb-md-0">
                <i class="bi bi-gem text-primary fs-2"></i>
              </div>
              <div class="details">
                <h2 class="fs-3">Quality Assured</h2>
                <span class="fs-6"
                  >We at MODA OPS are the essential curators of "Old Money" and the curated,
                  classic, fit-focused style. We are dedicated to providing you with our curated
                  classic fits.</span
                >
              </div>
            </div>
            <div class="box d-md-flex gap-3 text-center text-md-start d-block">
              <div class="icon mb-3 mb-md-0">
                <i class="bi bi-book text-primary fs-2"></i>
              </div>
              <div class="details">
                <h2 class="fs-3">Our Story</h2>
                <span class="fs-6"
                  >We at MODA OPS are the essential curators of "Old Money" and the curated,
                  classic, fit-focused style. We are dedicated to providing you with our curated
                  classic fits.</span
                >
              </div>
            </div>
          </div>
        </div>
        <div
          class="personSection col-7 col-md-6 person-box shadow-sm pt-3 mx-auto text-center text-md-start mt-3 rounded-3"
        >
          <div class="image text-center mb-3">
            <img
              src="/images/myPhoto.JPG"
              class="img-fluid rounded-2"
              style="width: 300px"
              alt=""
            />
          </div>
          <div class="details text-center">
            <h2 class="fs-3 text-uppercase">Meet Mustafa Kullab</h2>
            <p class="fs-6 m-0 lead">
              Mustafa Kullab, a web developer with a passion for creating inspiring, high-quality,
              and trustworthy digital experiences.
            </p>
            <div class="link my-2">
              <a href="https://www.instagram.com/l2rw4/" target="_blank"
                ><i class="bi bi-instagram fs-4 cursor-pointer"></i
              ></a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.AboutUs {
  .title {
    color: var(--text-color) !important;
  }
  .details {
    .link {
      i {
        color: var(--text-color) !important;
        transition: 0.4s;
        &:hover {
          color: #0d6efd !important;
        }
      }
    }
  }
}
.personSection {
  border-top: 2px solid var(--border-color);
}

@media (max-width: 991px) {
  .features {
    .boxes {
      .box {
        border: 2px solid var(--border-color) !important;
        border-radius: 6px !important;
        padding: 20px;
      }
    }
  }
}
</style>
