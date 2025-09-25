import type { APIRoute } from 'astro';
export const prerender = false;

export const GET: APIRoute = async ({ params, locals }) => {
  // 从 locals 中获取 R2 绑定的对象
  const R2 = locals.runtime.env.BLOG_ASSETS;
  const { key } = params;

  if (!key) {
    return new Response('Not found', { status: 404 });
  }

  // 从 R2 中获取对象
  const object = await R2.get(key);

  if (object === null) {
    return new Response(`Object with key '${key}' not found`, { status: 404 });
  }

  // 设置响应头，特别是缓存策略
  const headers = new Headers();
  object.writeHttpMetadata(headers);
  headers.set('etag', object.httpEtag);
  // 缓存 1 天
  headers.set('cache-control', 'public, max-age=86400'); 

  return new Response(object.body, {
    headers,
  });
};