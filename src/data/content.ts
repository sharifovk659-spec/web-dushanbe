export type ThemeColor = "primary" | "accent" | "lime";

export type ServiceTag = {
  label: string;
  icon: string;
};

export const siteConfig = {
  name: "WEB DUSHANBE",
  tagline: "Создаём цифровые продукты, которые приносят результат",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://dushanbe.inovaauto.com",
  phone: "+992 90 123 45 67",
  email: "hello@webdushanbe.tj",
  address: "г. Душанбе, пр. Рудаки 95",
  locale: "ru",
};

export const navLinks = [
  { label: "Главная", href: "#hero" },
  { label: "Услуги", href: "#services" },
  { label: "Кейсы", href: "#projects" },
  { label: "О нас", href: "#about" },
  { label: "Блог", href: "#blog" },
  { label: "Контакты", href: "#contacts" },
];

export const stats = [
  {
    value: 25,
    suffix: "+",
    label: "Завершенных проектов",
    color: "primary" as const,
  },
  {
    value: 50,
    suffix: "+",
    label: "Довольных клиентов",
    color: "lime" as const,
  },
  {
    value: 7,
    suffix: " лет",
    label: "Опыта",
    color: "accent" as const,
  },
  {
    value: 99,
    suffix: "%",
    label: "Положительных отзывов",
    color: "primary" as const,
  },
];

export const partners = [
  { name: "InovaAuto", id: "inovaauto" },
  { name: "SIYOMA", id: "siyoma" },
  { name: "Somon.tj", id: "somon" },
  { name: "MegaFood", id: "megafood" },
  { name: "TajPay", id: "tajpay" },
  { name: "Dushanbe Plaza", id: "plaza" },
];

export const projects = [
  {
    id: "inovaauto",
    title: "InovaAuto",
    category: "Marketplace",
    image: "/images/projects/inovaauto.webp",
    features: [
      "Авто маркетплейс",
      "Поиск",
      "Фильтр",
      "Личный кабинет",
    ],
    url: "https://inovaauto.tj",
  },
  {
    id: "cargo",
    title: "Cargo System",
    category: "CRM",
    image: "/images/projects/cargo.webp",
    features: [
      "Отслеживание заказов",
      "Статусы",
      "Уведомления",
      "Отчеты",
    ],
    url: "#",
  },
  {
    id: "masterok",
    title: "MasterOK",
    category: "Интернет-магазин",
    image: "/images/projects/masterok.webp",
    features: [
      "Каталог",
      "Корзина",
      "Оплата",
      "SMS",
    ],
    url: "#",
  },
];

export const services = [
  {
    id: "web",
    title: "Веб-разработка",
    description:
      "Сайты, лендинги и веб-платформы на React, Next.js и Laravel с фокусом на конверсию.",
    icon: "code",
    color: "primary" as const,
    tags: [
      { label: "WEB APPS & DASHBOARDS", icon: "layout" },
      { label: "API & BACKEND", icon: "api" },
      { label: "E-COMMERCE", icon: "cart" },
    ],
  },
  {
    id: "mobile",
    title: "Мобильные приложения",
    description:
      "Нативные и кроссплатформенные приложения на Flutter для iOS и Android.",
    icon: "mobile",
    color: "accent" as const,
    tags: [
      { label: "iOS & ANDROID", icon: "mobile" },
      { label: "FLUTTER", icon: "flutter" },
      { label: "APP STORE", icon: "store" },
    ],
  },
  {
    id: "crm",
    title: "CRM системы",
    description:
      "Автоматизация бизнес-процессов, управление клиентами и аналитика в одном решении.",
    icon: "crm",
    color: "primary" as const,
    tags: [
      { label: "AUTOMATION", icon: "automation" },
      { label: "ANALYTICS", icon: "chart" },
      { label: "INTEGRATIONS", icon: "link" },
    ],
  },
  {
    id: "design",
    title: "UI/UX дизайн",
    description:
      "Исследование, прототипирование и визуальный дизайн интерфейсов премиум-класса.",
    icon: "design",
    color: "accent" as const,
    tags: [
      { label: "UI/UX", icon: "design" },
      { label: "PROTOTYPING", icon: "prototype" },
      { label: "DESIGN SYSTEMS", icon: "system" },
    ],
  },
];

export const processSteps = [
  {
    step: 1,
    title: "Обсуждение",
    description: "Изучаем ваш бизнес, цели и требования к проекту.",
    color: "primary" as const,
  },
  {
    step: 2,
    title: "Планирование",
    description: "Составляем ТЗ, прототипы и согласовываем сроки.",
    color: "lime" as const,
  },
  {
    step: 3,
    title: "Разработка",
    description: "Создаём продукт с регулярными демонстрациями прогресса.",
    color: "accent" as const,
  },
  {
    step: 4,
    title: "Запуск",
    description: "Тестируем, деплоим и обучаем вашу команду.",
    color: "primary" as const,
  },
  {
    step: 5,
    title: "Поддержка",
    description: "Сопровождаем проект и помогаем масштабировать.",
    color: "lime" as const,
  },
];

export const testimonials = [
  {
    id: 1,
    quote:
      "WEB DUSHANBE создали для нас платформу InovaAuto, которая увеличила количество заявок на 40%. Профессиональная команда с глубоким пониманием бизнеса.",
    name: "Алишер Рахимов",
    company: "InovaAuto",
    initials: "АР",
    gradient: "from-primary to-accent",
  },
  {
    id: 2,
    quote:
      "CRM-система для логистики полностью автоматизировала наши процессы. Теперь мы обрабатываем в 3 раза больше заказов с той же командой.",
    name: "Фаррух Назаров",
    company: "Cargo System",
    initials: "ФН",
    gradient: "from-accent to-lime",
  },
  {
    id: 3,
    quote:
      "Интернет-магазин MasterOK работает безупречно. Красивый дизайн, быстрая загрузка и удобная админ-панель. Рекомендую!",
    name: "Мадина Саидова",
    company: "MasterOK",
    initials: "МС",
    gradient: "from-lime to-primary",
  },
];

export const footerLinks = {
  services: [
    { label: "Веб-разработка", href: "#services" },
    { label: "Мобильные приложения", href: "#services" },
    { label: "CRM системы", href: "#services" },
    { label: "UI/UX дизайн", href: "#services" },
  ],
  company: [
    { label: "О нас", href: "#about" },
    { label: "Кейсы", href: "#projects" },
    { label: "Блог", href: "#blog" },
    { label: "Карьера", href: "#contacts" },
    { label: "Контакты", href: "#contacts" },
  ],
};
