import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: "/login",
    },
    {
      name: "login",
      path: "/login",
      component: () => import("@/views/LogIn.vue"),
      meta: {
        title: "Log In",
      },
    },
    {
      path: "/",
      name: "home",
      component: () => import("@/views/HomeView.vue"),
      meta: {
        title: "Home Page",
      },
    },
    {
      name: "checkout",
      path: "/checkout",
      component: () => import("@/views/CheckOut.vue"),
      meta: {
        title: "Check Out",
      },
    },
    {
      name: "orders",
      path: "/orders",
      component: () => import("@/views/MyOrders.vue"),
      meta: {
        title: "Orders",
      },
    },
    {
      name: "Dashboard",
      path: "/dashboard",
      component: () => import("@/views/DashBoard.vue"),
      meta: {
        title: "Dashboard",
      },
    },
    {
      name: "about",
      path: "/about",
      component: () => import("@/views/AboutUs.vue"),
      meta: {
        title: "About Us",
      },
    },
    {
      name: "contact",
      path: "/contact",
      component: () => import("@/views/ContactUs.vue"),
      meta: {
        title: "Contact",
      },
    },
    {
      name: "singleorder",
      path: "/orders/:id",
      component: () => import("@/views/SingleOrder.vue"),
      meta: {
        title: "Order",
      },
    },
    {
      name: "bestsellers",
      path: "/bestsellers",
      component: () => import("@/views/BestsellersDetails.vue"),
      meta: {
        title: "Best Sellers",
      },
    },
    {
      name: "profile",
      path: "/profile",
      component: () => import("@/views/MyProfile.vue"),
      meta: {
        title: "Profile",
      },
    },
  ],
  // دالة جديدة وظيفتها تسال عند الانتقال من صفحة لاخرى او الضغط على زر يرجعك خطوة هل في مكان محفوظ ؟ (المكان بحفظ فقط اذا انتقلنا لصفحة اخرى عن طريق زر) بالتالي اذا في مكان محفوظ يرجعك له اذا ما في يوديك لاعلى الصفحة
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0, behavior: "smooth" };
    }
  },
});

router.afterEach((to) => {
  document.title = to.meta.title;
});

router.beforeEach((to) => {
  const isLogin = localStorage.getItem("isLogin") === "true";

  if (to.name === "login" && isLogin) {
    return router.push({ name: "home" });
  } else if (to.name !== "login" && !isLogin) {
    return router.push({ name: "login" });
  } else {
    return;
  }
});
export default router;
