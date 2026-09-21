import { defineConfig, fontProviders } from "astro/config";
import sitemap from "@astrojs/sitemap";
import icon from "astro-icon";
import fs from "node:fs";
import path from "node:path";

// 🎯 动态自动扫描 public 目录下的所有 .html 文件
const domain = "https://www.bambooindustry.com";
const publicDir = "./public";

function getHtmlFiles(dir, base = "") {
    let results = [];
    if (!fs.existsSync(dir)) return results;
    
    const list = fs.readdirSync(dir);
    list.forEach((file) => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        if (stat && stat.isDirectory()) {
            results = results.concat(getHtmlFiles(filePath, path.join(base, file)));
        } else if (file.endsWith(".html") && file !== "index.html") {
            // 排除 index.html 避免与 Astro 根目录首页冲突
            const urlPath = path.join(base, file).replace(/\\/g, "/");
            results.push(`${domain}/${urlPath}`);
        }
    });
    return results;
}

const autoPublicHtmlPages = getHtmlFiles(publicDir);

export default defineConfig({
    site: domain,
    integrations: [
        icon(),
        sitemap({
            filter: (page) => !page.includes("/admin"),
            changefreq: "weekly",
            priority: 0.7,
            // 自动注入所有扫描到的 public HTML 页面
            customPages: autoPublicHtmlPages,
        }),
    ],
    image: {
        layout: "constrained",
        service: { entrypoint: 'astro/assets/services/noop' },
    },
    fonts: [
        {
            provider: fontProviders.google(),
            name: "Roboto",
            cssVariable: "--font-primary",
            fallbacks: ["Arial", "sans-serif"],
            weights: [400, 700, 900],
            styles: ["normal"],
        },
    ],
});