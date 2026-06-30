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

export const founder = {
  eyebrow: "Наш основатель",
  name: "Акбар Ядгаров",
  image: "/images/founder.svg",
  instagram: {
    label: "Мой Instagram",
    handle: "webdushanbe",
    url: "https://instagram.com/webdushanbe",
  },
  quote:
    "Начать цифровую трансформацию бизнеса никогда не поздно. Мы создаём решения, которые помогают компаниям расти в Таджикистане и за его пределами. Наши клиенты получают полный цикл разработки — от идеи до запуска и поддержки.",
  achievements: [
    { highlight: "7 ЛЕТ", text: "опыта в веб-разработке и цифровых продуктах" },
    { highlight: "25+", text: "завершённых проектов для бизнеса" },
    { highlight: "50+", text: "клиентов доверяют нашей команде" },
    { highlight: "99%", text: "положительных отзывов от партнёров" },
    { highlight: "10+", text: "долгосрочных контрактов с клиентами" },
    { highlight: "CRM, E-COMMERCE", text: "и мобильные приложения под ключ" },
    { highlight: "СОБСТВЕННЫЕ", text: "продукты для автоматизации бизнеса" },
    { highlight: "МАСШТАБИРУЕМ", text: "продажи через цифровые решения" },
    { highlight: "СНИЖАЕМ", text: "затраты на маркетинг через автоматизацию" },
  ],
  cta: "Начать работу с нами",
};

export const partners = [
  { name: "Choice", id: "choice" },
  { name: "Deliveroo", id: "deliveroo" },
  { name: "Grove", id: "grove" },
  { name: "Hermes", id: "hermes" },
  { name: "Iland", id: "iland" },
  { name: "Min", id: "min" },
  { name: "OFCO", id: "ofco" },
  { name: "Sharjah", id: "sharjah" },
  { name: "White", id: "white" },
  { name: "Душанбе Водоканал", id: "vodokanal" },
];

export type PortfolioItem = {
  id: string;
  title: string;
  category: string;
  image: string;
  features: string[];
  url: string;
};

export const projects: PortfolioItem[] = [
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

export const products: PortfolioItem[] = [
  {
    id: "crm-pro",
    title: "WEB CRM Pro",
    category: "SaaS",
    image: "/images/products/crm-pro.webp",
    features: [
      "Воронка продаж",
      "Управление клиентами",
      "Аналитика и отчёты",
      "Интеграции",
    ],
    url: "#contacts",
  },
  {
    id: "shopkit",
    title: "ShopKit",
    category: "E-commerce",
    image: "/images/products/shopkit.webp",
    features: [
      "Каталог товаров",
      "Корзина и оплата",
      "Админ-панель",
      "SMS-уведомления",
    ],
    url: "#contacts",
  },
  {
    id: "delivery-app",
    title: "Delivery Hub",
    category: "Мобильное приложение",
    image: "/images/products/delivery-app.webp",
    features: [
      "Отслеживание заказов",
      "Карта доставки",
      "Push-уведомления",
      "iOS и Android",
    ],
    url: "#contacts",
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
  {
    id: 4,
    quote:
      "Команда WEB DUSHANBE разработала для SIYOMA современный интернет-магазин с удобным каталогом и быстрым оформлением заказов. Продажи выросли уже в первый месяц после запуска.",
    name: "Джамшед Каримов",
    company: "SIYOMA",
    initials: "ДК",
    gradient: "from-primary to-accent",
  },
  {
    id: 5,
    quote:
      "Платформа Somon.tj получилась стабильной и масштабируемой. Особенно понравился продуманный UX и оперативная техническая поддержка на всех этапах проекта.",
    name: "Рустам Юсупов",
    company: "Somon.tj",
    initials: "РЮ",
    gradient: "from-accent to-lime",
  },
  {
    id: 6,
    quote:
      "Для MegaFood мы получили удобное мобильное решение с онлайн-заказом и отслеживанием доставки. Клиенты отмечают простоту интерфейса и высокую скорость работы сервиса.",
    name: "Нигина Алиева",
    company: "MegaFood",
    initials: "НА",
    gradient: "from-lime to-primary",
  },
  {
    id: 7,
    quote:
      "WEB DUSHANBE внедрили для TajPay надёжную платёжную инфраструктуру с акцентом на безопасность и стабильность транзакций. Проект был сдан в срок и полностью соответствовал ТЗ.",
    name: "Шахриёр Мирзоев",
    company: "TajPay",
    initials: "ШМ",
    gradient: "from-primary to-accent",
  },
  {
    id: 8,
    quote:
      "Сайт Dushanbe Plaza выглядит премиально и отражает уровень нашего бренда. Команда грамотно выстроила структуру, адаптив и контентные блоки под наши бизнес-задачи.",
    name: "Зарина Назарова",
    company: "Dushanbe Plaza",
    initials: "ЗН",
    gradient: "from-accent to-lime",
  },
  {
    id: 9,
    quote:
      "Сотрудничество с WEB DUSHANBE — это прозрачные сроки, понятная коммуникация и сильная техническая экспертиза. Результат превзошёл наши ожидания по качеству и удобству продукта.",
    name: "Ибодат Рахмонова",
    company: "AsiaMed Clinic",
    initials: "ИР",
    gradient: "from-lime to-primary",
  },
  {
    id: 10,
    quote:
      "Заказывали корпоративный портал с личными кабинетами и аналитикой. Команда предложила оптимальную архитектуру, всё работает быстро и без сбоев. Однозначно рекомендуем!",
    name: "Саид Ибрагимов",
    company: "LogiPro Group",
    initials: "СИ",
    gradient: "from-primary to-accent",
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
