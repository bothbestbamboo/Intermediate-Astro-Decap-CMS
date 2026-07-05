// ===== SITE CONSTANTS =====
export const SITE = {
	title: "Bamboo Flooring | Decking | Plywood",
	tagline: "bamboo factory since 2001",
	description: "Bothbest is a premier factory of bamboo products in China, specializing in manufacturing high-quality, sustainable bamboo flooring, bamboo decking and bamboo plywood for global markets.",
	url: "https://www.bambooflooring.net",
	author: "bothbest",
	locale: "en",
};

// ===== BUSINESS INFO =====
export const BUSINESS = {
    name: SITE.title,
    email: "info@bambooflooring.net",
    phoneForTel: "563-303-2211",
    phoneFormatted: "(563) 303-2211",
    // 🌟 新增 WhatsApp 全局配置
    whatsAppForLink: "008615005820528", // 纯数字，方便后续拼接 api.whatsapp.com 链接
    whatsAppFormatted: "+86 150 0582 0528", // 格式化显示，国际买家看起来更专业清晰
    logo: "https://img.bambooflooring.net/file/1782802571919.png",
    address: {
        lineOne: "Bamboo Industry Zone",
        lineTwo: "Xiaofeng",
        city: "Anji,",
        state: "China,",
        zip: "313300",
        mapLink: "#",
    },
    socials: {
        facebook: "#",
        instagram: "#",
        // 或者是您也可以选择塞在 socials 社交矩阵里（根据您的底层组件调用习惯二选一即可）
        whatsapp: "https://wa.me/8615005820528", 
    },
};

// ===== SEO DEFAULTS =====
export const SEO = {
	title: SITE.title,
	description: SITE.description,
};

// ===== OPEN GRAPH DEFAULTS =====
export const OG = {
	locale: "en_US",
	image: "/assets/social.jpg", // Default fallback social image located in public/
};
