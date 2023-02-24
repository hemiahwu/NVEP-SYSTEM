import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

// 引入组件
import Login from "../views/Login.vue";
import Layout from "../views/layout/Layout.vue";
import Home from "../views/Home.vue";
import Order from "../views/Order.vue";
import GoodsList from "../views/goods/GoodsList.vue";
import GoodsAdd from "../views/goods/GoodsAdd.vue";
import GoodsCategory from "../views/goods/GoodsCategory.vue";
import Shop from "../views/Shop.vue";
import AccountList from "../views/account/AccountList.vue";
import AccountAdd from "../views/account/AccountAdd.vue";
import PasswordModify from "../views/account/PasswordModify.vue";
import Personal from "../views/account/Personal.vue";
import GoodsTotal from "../views/total/GoodsTotal.vue";
import OrderTotal from "../views/total/OrderTotal.vue";

// 静态路由
const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  {
    path: "/home",

    component: Layout,
    children: [{ path: "", name: "home", component: Home }],
  },
];
// 动态路由
const dynamicRoutes: Array<RouteRecordRaw> = [
  // 订单管理
  {
    path: "/order",
    component: Layout,
    meta: { title: "订单管理" },
    children: [{ path: "", name: "order", component: Order }],
  },

  // 商品管理
  {
    path: "/goods",
    name: "goods",
    component: Layout,
    redirect: "/goods/list",
    meta: { title: "商品管理", roles: ["super", "normal"] },
    children: [
      {
        path: "/goods/list",
        name: "list",
        component: GoodsList,
        meta: { title: "商品列表", roles: ["super", "normal"] },
      },
      {
        path: "/goods/add",
        component: GoodsAdd,
        meta: { title: "商品添加", roles: ["super", "normal"] },
      },
      {
        path: "/goods/category",
        component: GoodsCategory,
        meta: { title: "商品分类", roles: ["super"] },
      },
    ],
  },

  // 店铺管理
  {
    path: "/shop",
    component: Layout,
    meta: { title: "店铺管理", roles: ["super"] },
    children: [{ path: "", component: Shop }],
  },

  // 账号管理
  {
    path: "/account",
    component: Layout,
    name: "account",
    redirect: "/account/list",
    meta: { title: "账号管理", roles: ["super", "normal"] },
    children: [
      {
        path: "/account/list",
        name: "accountList",
        component: AccountList,
        meta: { title: "账号列表", roles: ["super", "normal"] },
      },
      {
        path: "/account/add",
        name: "accountAdd",
        component: AccountAdd,
        meta: { title: "账号添加", roles: ["super"] },
      },
      {
        path: "/account/passwordmodify",
        name: "passwordmodify",
        component: PasswordModify,
        meta: { title: "修改密码", roles: ["super", "normal"] },
      },
      {
        path: "/account/personal",
        name: "personal",
        component: Personal,
        meta: { title: "个人中心", roles: ["super", "normal"] },
      },
    ],
  },

  // 销售统计
  {
    path: "/total",
    name: "total",
    component: Layout,
    redirect: "/total/goods",
    meta: { title: "销售统计", roles: ["super"] },
    children: [
      {
        path: "/total/goods",
        component: GoodsTotal,
        meta: { title: "商品统计" },
      },
      {
        path: "/total/order",
        component: OrderTotal,
        meta: { title: "订单统计" },
      },
    ],
  },
];

const router = createRouter({
  // history: createWebHistory("/frontend/vue/5005/"),
  history: createWebHistory("/frontend/vue/8013/"),
  routes, // 假设 routes 是你定义的路由数组
});

// 校验角色是否被包含在路由的meta.roles里
const hasPermission = (router: any, role: any) => {
  if (router.meta && router.meta.roles) {
    return router.meta.roles.includes(role);
  } else {
    return true;
  }
};

const filterRoutes = (dynamicRoutes: any, role: any) => {
  return dynamicRoutes.filter((router: any) => {
    if (hasPermission(router, role)) {
      // 递归子级是否拥有权限
      if (router.children) {
        router.children = filterRoutes(router.children, role);
      }

      return true;
    } else {
      return false;
    }
  });
};

const dynamicMenus = (accessRoutes: any) => {
  // 整合路由
  return [
    {
      path: "/home",
      meta: { title: "后台首页" },
      component: Layout,
      children: [{ path: "", component: Home }],
    },
    ...accessRoutes,
  ];
};

export const makeRouter = () => {
  const role = localStorage.getItem("role");
  if (!role) return;

  // 过滤当前角色可以访问的路由
  const accessRoutes = filterRoutes(dynamicRoutes, role);
  // 拿到对应权限的路由,动态追加到router中
  accessRoutes.forEach((ar: any) => router.addRoute(ar));

  // 动态渲染路由
  const menus = dynamicMenus(accessRoutes);
  localStorage.setItem("menus", JSON.stringify(menus));
};

makeRouter();

// 路由守卫
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("token");

  if (!to.path.includes("/login") && !token) {
    next("login");
  } else {
    next();
  }
});

export default router;
