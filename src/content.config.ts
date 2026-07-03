import { z, defineCollection } from "astro:content";
import { glob } from "astro/loaders";

// Every collection must reflect Decap's config.yml collection schema
// In order to be able to optimize images with Astro built-in compoments, like <Image />, we first must use this image helper
// Doc: https://docs.astro.build/en/guides/images/#images-in-content-collections

// 1. 您的博客数据集 (完全保留原样)
const blogsCollection = defineCollection({
    loader: glob({ pattern: "**/[^_]*.{md,mdx}", base: "./src/content/blog" }),
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

// 2. 🎯 新增定义 products 数据集 (对齐您的卡片流和外链需求)
const productsCollection = defineCollection({
    loader: glob({ pattern: "**/[^_]*.{md,mdx}", base: "./src/content/products" }),
    schema: ({ image }) =>
        z.object({
            title: z.string(),
            description: z.string(),
            date: z.date().optional(),
            image: image().optional().or(z.string()), // 👈 核心：既支持本地资产，也支持外链大图
            tags: z.array(z.string()).optional(),      // 👈 支持我们卡片网格的彩色标签逻辑
        }),
});

// 3. 统一导出到 collections 中
export const collections = {
    blog: blogsCollection,
    products: productsCollection, // 👈 变量名已经正确对应，再也不会报 is not defined 了！
};