// Ambient type augmentation for custom Cloudflare Worker bindings declared
// in wrangler.jsonc. @opennextjs/cloudflare provides the base CloudflareEnv
// interface; this extends it with bindings specific to this project.

declare global {
  interface CloudflareEnv {
    LISTINGS_KV: KVNamespace;
  }
}

export {};
