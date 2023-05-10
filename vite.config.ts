import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";

import Icons from "unplugin-icons/vite";
import IconsResolver from "unplugin-icons/resolver";

import { resolve } from "path";

// 优化打包
import { autoComplete, Plugin as importToCDN } from "vite-plugin-cdn-import";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: [
      { find: "@", replacement: resolve(__dirname, "src") },
      { find: "~", replacement: resolve(__dirname, "src/assets") },
      { find: "comps", replacement: resolve(__dirname, "src/components") },
      { find: "views", replacement: resolve(__dirname, "src/views") },
      { find: "api", replacement: resolve(__dirname, "src/api") },
      { find: "router", replacement: resolve(__dirname, "src/router") },
    ],
  },
  plugins: [
    vue(),
    AutoImport({
      imports: ["vue", "vue-router"],
      resolvers: [
        ElementPlusResolver(),
        // 自动导入图标组件
        IconsResolver({
          prefix: "Icon",
        }),
      ],
    }),
    Components({
      resolvers: [
        ElementPlusResolver(),
        // 自动注册图标组件
        IconsResolver({
          enabledCollections: ["ep"],
        }),
      ],
    }),
    Icons({
      autoInstall: true,
    }),
    // importToCDN({
    //   modules: [
    //     autoComplete("vue"),
    //     {
    //       name: "element-plus",
    //       var: "ELementPlus",
    //       path: "https://cdn.bootcdn.net/ajax/libs/element-plus/2.2.31/index.full.min.js",
    //       css: "https://cdn.bootcdn.net/ajax/libs/element-plus/2.2.31/index.min.css",
    //     },
    //   ],
    // }),
  ],
  server: {
    proxy: {
      // 带选项写法：http://localhost:5173/api/bar -> http://jsonplaceholder.typicode.com/bar
      "/api": {
        target: "www.thenewstep.cn/backend/8013/api/",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
