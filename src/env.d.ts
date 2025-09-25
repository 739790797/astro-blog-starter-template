// src/env.d.ts

type ENV = {
  // 在这里添加你的 R2 绑定
  BLOG_ASSETS: R2Bucket;
};

type Runtime = import('@astrojs/cloudflare').Runtime<ENV>;

declare namespace App {
  interface Locals extends Runtime {}
}