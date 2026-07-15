export const locales = ["es-AR", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "es-AR";

const es = {
  brand: {
    name: "SuelosAR",
  },
  meta: {
    title: "SuelosAR | Cartografía digital de suelos",
    description: "Cartografía oficial de suelos del INTA para la provincia de Buenos Aires, disponible sin conexión.",
  },
  language: {
    selectorLabel: "Seleccionar idioma",
    spanish: "Español",
    english: "English",
  },
  accessibility: {
    skipToContent: "Saltar al contenido",
    siteHeader: "Encabezado del sitio",
    mainNavigation: "Navegación principal",
    homeLink: "SuelosAR, inicio",
    logoPlaceholder: "Logo de SuelosAR",
    footer: "Pie de página",
    deviceMockup: "Dispositivo Android",
    androidDevice: "SuelosAR en un teléfono Android",
    windowsDevice: "SuelosAR en una notebook con Windows",
    applicationCapabilities: "Funciones de la aplicación",
  },
  theme: {
    activateLight: "Activar tema claro",
    activateDark: "Activar tema oscuro",
  },
  hero: {
    label: "Disponible para Android y Windows",
    titleLineOne: "Cartografía oficial de suelos de la Provincia de Buenos Aires.",
    titleLineTwo: "En cualquier lugar. Incluso sin conexión.",
    description: "Consultá mapas, documentos PDF y herramientas GPS desde una aplicación independiente diseñada para trabajar completamente offline.",
    downloadAndroid: "Descargar para Android",
    downloadWindows: "Descargar para Windows",
    compatibility: "Compatible con Android 10+ y Windows 10/11",
    badges: ["Gratis", "Sin conexión", "Fuentes cartográficas del INTA", "Proyecto independiente"],
    androidScreenAlt: "Mapa de suelos abierto en SuelosAR para Android",
    windowsScreenAlt: "Mapa de suelos y búsqueda cartográfica en SuelosAR para Windows",
  },
  platforms: {
    title: "Plataformas compatibles",
    subtitle: "Elegí la versión compatible con tu dispositivo.",
    cards: [
      { title: "Android", description: "Para teléfonos y tablets Android.", versionLabel: "Versión compatible", version: "Android 10 o posterior", requirementsLabel: "Requisitos", requirements: "Dispositivo Android con espacio disponible para la cartografía offline." },
      { title: "Windows", description: "Para computadoras de escritorio y notebooks.", versionLabel: "Versión compatible", version: "Windows 10 u 11", requirementsLabel: "Requisitos", requirements: "Equipo con Windows y espacio disponible para la cartografía offline." },
    ],
  },
  features: {
    title: "Todo lo que necesitás para el trabajo de campo",
    subtitle: "Pensada para profesionales de la agronomía, estudiantes e investigadores que necesitan acceder rápidamente y sin conexión a información oficial de suelos.",
    items: [
      { title: "Mapa GIS interactivo", description: "Explorá la cartografía oficial de suelos con un mapa GIS rápido e intuitivo, diseñado para el trabajo de campo.", imageAlt: "Mapa GIS interactivo de SuelosAR con cartografía oficial de suelos" },
      { title: "Cartografía oficial", description: "Accedé a información detallada sobre unidades cartográficas, series de suelo y descripciones del paisaje directamente desde el mapa.", imageAlt: "Detalle de una unidad cartográfica y sus series de suelo en SuelosAR" },
      { title: "Visor PDF integrado", description: "Abrí informes oficiales de suelos al instante sin salir de la aplicación.", imageAlt: "Informe oficial de suelos abierto en el visor PDF integrado de SuelosAR" },
      { title: "Herramientas de medición", description: "Medí distancias y superficies directamente sobre el mapa para la planificación y el análisis a campo.", imageAlt: "Herramientas de medición de distancias y superficies sobre el mapa" },
      { title: "Marcadores personalizados", description: "Guardá observaciones y organizá ubicaciones importantes con marcadores personalizados.", imageAlt: "Marcadores personalizados organizados en SuelosAR" },
      { title: "Favoritos", description: "Accedé rápidamente a las unidades de suelo y los documentos que más usás desde una sección de favoritos.", imageAlt: "Sección de favoritos de SuelosAR con unidades de suelo y documentos guardados" },
    ],
  },
  gallery: {
    title: "SuelosAR en Android",
    subtitle: "La experiencia completa de SuelosAR, optimizada para Android y disponible sin conexión.",
    screenAltSuffix: "en SuelosAR",
    items: [
      { src: "/images/screenshots/gis.jpg", title: "Flujo de trabajo móvil", description: "Accedé rápidamente a mapas, documentos y herramientas desde tu teléfono.", screenPosition: "50% 0%" },
      { src: "/images/screenshots/configuracion.jpg", title: "Configuración", description: "Personalizá la experiencia según tu dispositivo y forma de trabajo.", screenPosition: "50% 0%" },
    ],
  },
  faq: {
    title: "Preguntas frecuentes",
    subtitle: "Todo lo esencial sobre SuelosAR, su cobertura y su funcionamiento.",
    items: [
      { question: "¿Qué es SuelosAR?", answer: "SuelosAR es una aplicación independiente para Android y Windows que permite consultar cartografía de suelos y utilizar herramientas GIS." },
      { question: "¿Funciona sin internet?", answer: "Sí. La cartografía y las herramientas principales siguen disponibles sin conexión." },
      { question: "¿Qué provincias incluye actualmente?", answer: "La versión actual incluye exclusivamente la Provincia de Buenos Aires." },
      { question: "¿De dónde provienen los datos?", answer: "La información se basa en cartografía oficial de suelos publicada por el INTA." },
      { question: "¿Es gratuita?", answer: "Sí. SuelosAR se puede descargar y utilizar de forma gratuita." },
      { question: "¿Qué dispositivos son compatibles?", answer: "SuelosAR es compatible con Android 10 o posterior y Windows 10/11." },
    ],
  },
  cta: {
    title: "Llevá la cartografía oficial al campo.",
    description: "Descargá SuelosAR y accedé a la cartografía oficial de suelos de la Provincia de Buenos Aires, incluso sin conexión.",
    downloadAndroid: "Descargar para Android (.apk)",
    downloadWindows: "Descargar para Windows (.exe)",
    trustLabel: "Información de confianza",
    badges: ["Provincia de Buenos Aires", "Basado en cartografía oficial del INTA", "Funciona sin conexión"],
  },
  footer: {
    description: "Proyecto independiente de cartografía digital de suelos para el trabajo profesional y académico en el campo.",
    quickLinksTitle: "Enlaces rápidos",
    quickLinks: [
      { label: "Inicio", href: "#contenido" },
      { label: "Características", href: "#features" },
      { label: "Plataformas", href: "#platforms" },
      { label: "Galería", href: "#screenshots" },
      { label: "Preguntas frecuentes", href: "#faq" },
      { label: "Descargar", href: "#download" },
    ],
    legalTitle: "Legal",
    legalItems: [
      { label: "Política de privacidad (próximamente)", href: "" },
      { label: "Términos de uso (próximamente)", href: "" },
      { label: "Aviso legal", href: "#data-sources" },
      { label: "Fuentes de datos", href: "#data-sources" },
    ],
    dataSourcesTitle: "Fuentes de datos",
    dataSource: "Cartografía oficial de suelos publicada por el INTA.",
    disclaimer: "SuelosAR es un proyecto independiente y no está afiliado ni cuenta con el respaldo oficial del INTA.",
    coverageLabel: "Cobertura actual",
    coverage: "Provincia de Buenos Aires.",
    futureCoverage: "Las futuras versiones podrán incluir provincias adicionales.",
    contactTitle: "Contacto",
    github: "GitHub (próximamente)",
    email: "Correo electrónico (próximamente)",
    copyright: "© 2026 SuelosAR",
  },
} as const;

type DeepString<T> = T extends string
  ? string
  : T extends readonly (infer Item)[]
    ? readonly DeepString<Item>[]
    : T extends object
      ? { [Key in keyof T]: DeepString<T[Key]> }
      : T;

export type Dictionary = DeepString<typeof es>;

const en: Dictionary = {
  brand: {
    name: "SuelosAR",
  },
  meta: {
    title: "SuelosAR | Offline soil cartography",
    description: "Official INTA soil cartography for Buenos Aires Province, available offline.",
  },
  language: {
    selectorLabel: "Select language",
    spanish: "Español",
    english: "English",
  },
  accessibility: {
    skipToContent: "Skip to content",
    siteHeader: "Site header",
    mainNavigation: "Main navigation",
    homeLink: "SuelosAR, home",
    logoPlaceholder: "SuelosAR logo",
    footer: "Footer",
    deviceMockup: "Android device",
    androidDevice: "SuelosAR on an Android phone",
    windowsDevice: "SuelosAR on a Windows laptop",
    applicationCapabilities: "Application capabilities",
  },
  theme: {
    activateLight: "Activate light theme",
    activateDark: "Activate dark theme",
  },
  hero: {
    label: "Available for Android and Windows",
    titleLineOne: "Official soil cartography of Buenos Aires Province.",
    titleLineTwo: "Anywhere. Even Offline.",
    description: "Consult maps, PDF documents and GPS tools in an independent application designed to work completely offline.",
    downloadAndroid: "Download for Android",
    downloadWindows: "Download for Windows",
    compatibility: "Compatible with Android 10+ and Windows 10/11",
    badges: ["Free", "Offline", "INTA cartographic sources", "Independent project"],
    androidScreenAlt: "Soil map open in SuelosAR for Android",
    windowsScreenAlt: "Soil map and cartography search in SuelosAR for Windows",
  },
  platforms: {
    title: "Supported Platforms",
    subtitle: "Choose the version compatible with your device.",
    cards: [
      { title: "Android", description: "For Android phones and tablets.", versionLabel: "Supported version", version: "Android 10 or later", requirementsLabel: "Requirements", requirements: "Android device with available storage for offline cartography." },
      { title: "Windows", description: "For desktop and laptop computers.", versionLabel: "Supported version", version: "Windows 10 or 11", requirementsLabel: "Requirements", requirements: "Windows computer with available storage for offline cartography." },
    ],
  },
  features: {
    title: "Everything you need in the field",
    subtitle: "Designed for agronomists, students and researchers who need fast offline access to official soil information.",
    items: [
      { title: "Interactive GIS Map", description: "Explore official soil cartography with a fast and intuitive GIS map designed for field work.", imageAlt: "Interactive SuelosAR GIS map displaying official soil cartography" },
      { title: "Official Cartography", description: "Access detailed information for mapping units, soil series and landscape descriptions directly from the map.", imageAlt: "SuelosAR mapping unit details with soil series and landscape information" },
      { title: "Integrated PDF Viewer", description: "Open official soil reports instantly without leaving the application.", imageAlt: "Official soil report open in the integrated SuelosAR PDF viewer" },
      { title: "Measurement Tools", description: "Measure distances and areas directly on the map for planning and field analysis.", imageAlt: "Distance and area measurement tools displayed on the map" },
      { title: "Custom Markers", description: "Save observations and organize important locations with personalized markers.", imageAlt: "Personalized location markers organized in SuelosAR" },
      { title: "Favorites", description: "Quickly access frequently used soil units and documents from a dedicated favorites section.", imageAlt: "SuelosAR favorites section with saved soil units and documents" },
    ],
  },
  gallery: {
    title: "SuelosAR on Android",
    subtitle: "The complete SuelosAR experience, optimized for Android and fully available offline.",
    screenAltSuffix: "in SuelosAR",
    items: [
      { src: "/images/screenshots/gis.jpg", title: "Mobile workflow", description: "Quickly access maps, documents and tools directly from your phone.", screenPosition: "50% 0%" },
      { src: "/images/screenshots/configuracion.jpg", title: "Settings", description: "Personalize the experience for your device and the way you work.", screenPosition: "50% 0%" },
    ],
  },
  faq: {
    title: "Frequently asked questions",
    subtitle: "Essential information about SuelosAR, its coverage and how it works.",
    items: [
      { question: "What is SuelosAR?", answer: "SuelosAR is an independent Android and Windows application for consulting soil cartography and using GIS tools." },
      { question: "Does it work without internet?", answer: "Yes. The cartography and core tools remain available without a connection." },
      { question: "Which provinces are currently included?", answer: "The current version exclusively covers Buenos Aires Province." },
      { question: "Where does the data come from?", answer: "The information is based on official soil cartography published by INTA." },
      { question: "Is it free?", answer: "Yes. SuelosAR can be downloaded and used free of charge." },
      { question: "Which devices are supported?", answer: "SuelosAR supports Android 10 or later and Windows 10/11." },
    ],
  },
  cta: {
    title: "Take official soil cartography into the field.",
    description: "Download SuelosAR and access official soil maps of Buenos Aires Province, even offline.",
    downloadAndroid: "Download for Android (.apk)",
    downloadWindows: "Download for Windows (.exe)",
    trustLabel: "Trusted information",
    badges: ["Buenos Aires Province", "Based on official INTA soil cartography", "Works offline"],
  },
  footer: {
    description: "An independent digital soil cartography project for professional and academic field work.",
    quickLinksTitle: "Quick Links",
    quickLinks: [
      { label: "Home", href: "#contenido" },
      { label: "Features", href: "#features" },
      { label: "Platforms", href: "#platforms" },
      { label: "Gallery", href: "#screenshots" },
      { label: "FAQ", href: "#faq" },
      { label: "Download", href: "#download" },
    ],
    legalTitle: "Legal",
    legalItems: [
      { label: "Privacy Policy (coming soon)", href: "" },
      { label: "Terms of Use (coming soon)", href: "" },
      { label: "Disclaimer", href: "#data-sources" },
      { label: "Data Sources", href: "#data-sources" },
    ],
    dataSourcesTitle: "Data Sources",
    dataSource: "Official soil cartography published by INTA.",
    disclaimer: "SuelosAR is an independent project and is not affiliated with or officially endorsed by INTA.",
    coverageLabel: "Current coverage",
    coverage: "Buenos Aires Province.",
    futureCoverage: "Future versions may include additional provinces.",
    contactTitle: "Contact",
    github: "GitHub (coming soon)",
    email: "Email (coming soon)",
    copyright: "© 2026 SuelosAR",
  },
};

export const dictionaries: Record<Locale, Dictionary> = { "es-AR": es, en };

export function isLocale(value: string | null): value is Locale {
  return locales.includes(value as Locale);
}
