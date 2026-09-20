import { z, defineCollection } from "astro:content";
import { glob } from "astro/loaders";

// Every collection must reflect Decap's config.yml collection schema
// In order to be able to optimize images with Astro built-in compoments, like <Image />, we first must use this image helper
// Doc: https://docs.astro.build/en/guides/images/#images-in-content-collections

// 1. 您的新闻数据集 (对齐 src/content/news 文件夹)
const blogsCollection = defineCollection({
    // 修改 base 路径为 ./src/content/news
    loader: glob({ pattern: "**/[^_]*.{md,mdx}", base: "./src/content/news" }),
    schema: ({ image }) =>
        z.object({
            title: z.string(),
            description: z.string(),
            author: z.string(),
            date: z.date(),
            image: image(),
            imageAlt: z.string(),
            isFeatured: z.boolean().optional().default(false),
        }),
});

// 2. 新增定义 products 数据集 (对齐 src/content/product 文件夹)
const productsCollection = defineCollection({
    // 修改 base 路径为 ./src/content/product (单数)
    loader: glob({ pattern: "**/[^_]*.{md,mdx}", base: "./src/content/product" }),
    schema: ({ image }) =>
        z.object({
            title: z.string(),
            description: z.string(),
            date: z.date().optional(),
            image: image().optional().or(z.string()), 
            tags: z.array(z.string()).optional(),      
        }),
});

// 3. 统一导出到 collections 中
export const collections = {
    // 这里导出的名称 (blog 和 products) 决定了你在页面中 getCollection("xxx") 的参数。
    // 为了不改动现有的页面代码，我们保持导出的键名不变：
    blog: blogsCollection,      // 页面中依然使用 getCollection("blog")
    products: productsCollection, // 页面中依然使用 getCollection("products")
};