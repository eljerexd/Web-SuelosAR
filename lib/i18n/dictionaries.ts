export const locales = ["es-AR", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "es-AR";

const es = {
  brand: {
    name: "SuelosAR",
  },
  meta: {
    title: "SuelosAR | Mapas de suelos y GIS de Buenos Aires",
    description: "Aplicación independiente para consultar mapas y Cartas de Suelo de la Provincia de Buenos Aires, basados en cartografía publicada por el INTA, con herramientas GIS.",
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
    subtitle: "Explorá mapas de suelos, Cartas de Suelo y herramientas GIS para analizar información de la Provincia de Buenos Aires en el campo.",
    items: [
      { title: "Mapa GIS interactivo", description: "Explorá mapas de suelos de la Provincia de Buenos Aires en un entorno GIS rápido e intuitivo, diseñado para el trabajo de campo.", imageAlt: "Mapa GIS interactivo de SuelosAR con cartografía de suelos de la Provincia de Buenos Aires" },
      { title: "Cartografía oficial", description: "Consultá Cartas de Suelo con información de unidades cartográficas, series de suelo y descripciones del paisaje directamente desde el mapa.", imageAlt: "Carta de Suelo con unidades cartográficas y series de suelo en SuelosAR" },
      { title: "Visor PDF integrado", description: "Abrí informes oficiales de suelos al instante sin salir de la aplicación.", imageAlt: "Informe oficial de suelos abierto en el visor PDF integrado de SuelosAR" },
      { title: "Herramientas de medición", description: "Medí distancias y superficies directamente sobre el mapa para la planificación y el análisis a campo.", imageAlt: "Herramientas de medición de distancias y superficies sobre el mapa" },
      { title: "Marcadores personalizados", description: "Guardá observaciones y organizá ubicaciones importantes con marcadores personalizados.", imageAlt: "Marcadores personalizados organizados en SuelosAR" },
      { title: "Favoritos", description: "Accedé rápidamente a las unidades de suelo y los documentos que más usás desde una sección de favoritos.", imageAlt: "Sección de favoritos de SuelosAR con unidades de suelo y documentos guardados" },
    ],
  },
  gallery: {
    title: "SuelosAR en Android",
    subtitle: "Mapas, documentos y ajustes pensados para un flujo de trabajo móvil ágil.",
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
      { question: "¿De dónde provienen los datos?", answer: "La información proviene de Cartas de Suelo y cartografía oficial publicada por el INTA." },
      { question: "¿Es gratuita?", answer: "Sí. SuelosAR se puede descargar y utilizar de forma gratuita." },
      { question: "¿Qué dispositivos son compatibles?", answer: "SuelosAR es compatible con Android 10 o posterior y Windows 10/11." },
    ],
  },
  downloadUnavailable: {
    eyebrow: "Descarga temporalmente no disponible",
    title: "La versión para {platform} todavía no está publicada.",
    description: "Estamos preparando el instalador para su distribución pública. Volvé a intentarlo más adelante o escribinos si necesitás información sobre la próxima versión.",
    android: "Android",
    windows: "Windows",
    backHome: "Volver al inicio",
    contact: "Contactar",
  },
  notFound: {
    eyebrow: "Error 404",
    title: "No encontramos esta página.",
    description: "Es posible que el enlace haya cambiado o que la dirección no sea correcta.",
    action: "Volver al inicio",
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
      { label: "Política de privacidad", href: "/privacy" },
      { label: "Términos de uso", href: "/terms" },
      { label: "Aviso legal", href: "/disclaimer" },
      { label: "Fuentes de datos", href: "/data-sources" },
    ],
    dataSourcesTitle: "Fuentes de datos",
    dataSource: "Cartografía oficial de suelos publicada por el INTA.",
    disclaimer: "SuelosAR es un proyecto independiente y no está afiliado ni cuenta con el respaldo oficial del INTA.",
    coverageLabel: "Cobertura actual",
    coverage: "Provincia de Buenos Aires.",
    futureCoverage: "Las futuras versiones podrán incluir provincias adicionales.",
    contactTitle: "Contacto",
    github: "GitHub",
    email: "Correo electrónico",
    copyright: "© 2026 SuelosAR",
  },
  legal: {
    backHome: "Volver al inicio",
    lastUpdated: "Última actualización",
    updatedDate: "15 de julio de 2026",
    pages: {
      privacy: {
        title: "Política de privacidad",
        intro: "Esta política describe cómo el sitio web y la aplicación SuelosAR tratan la información necesaria para ofrecer sus funciones.",
        sections: [
          { heading: "Información del sitio web", paragraphs: ["El sitio no requiere crear una cuenta ni completar formularios. Las preferencias de idioma y tema se guardan localmente en el navegador para mantener la configuración elegida."] },
          { heading: "Ubicación y funciones del dispositivo", paragraphs: ["SuelosAR puede solicitar acceso a la ubicación cuando se utilizan herramientas GPS. El permiso es administrado por el sistema operativo y puede desactivarse desde la configuración del dispositivo.", "La aplicación está diseñada para funcionar localmente y sin conexión. Las funciones de ubicación se utilizan para representar la posición y asistir el trabajo cartográfico dentro de la aplicación."] },
          { heading: "Servicios de terceros", paragraphs: ["Los enlaces externos, las plataformas de distribución y los repositorios de código pueden aplicar sus propias políticas de privacidad. SuelosAR no controla las prácticas de esos servicios."] },
          { heading: "Contacto", paragraphs: ["Las consultas relacionadas con privacidad pueden enviarse al correo de contacto publicado en el pie de página."] },
        ],
      },
      terms: {
        title: "Términos de uso",
        intro: "Al utilizar SuelosAR aceptás estos términos y reconocés el alcance informativo y técnico de la aplicación.",
        sections: [
          { heading: "Uso permitido", paragraphs: ["SuelosAR puede utilizarse con fines profesionales, académicos, educativos y de consulta. El usuario es responsable de emplear la información de acuerdo con la legislación y las prácticas aplicables a su actividad."] },
          { heading: "Disponibilidad", paragraphs: ["La aplicación y sus instaladores se ofrecen según disponibilidad. Las funciones, requisitos, cobertura y contenidos pueden cambiar entre versiones para mejorar la estabilidad o actualizar la información disponible."] },
          { heading: "Decisiones profesionales", paragraphs: ["SuelosAR es una herramienta de consulta y no reemplaza relevamientos, análisis especializados, asesoramiento profesional ni verificaciones realizadas sobre el terreno."] },
          { heading: "Propiedad intelectual", paragraphs: ["La aplicación, su identidad visual y su código pertenecen a sus respectivos titulares. La información cartográfica, marcas y contenidos de terceros conservan la titularidad y las condiciones definidas por sus organizaciones de origen."] },
          { heading: "Cambios en estos términos", paragraphs: ["Estos términos pueden actualizarse cuando cambien la aplicación, sus canales de distribución o los requisitos legales. La fecha de actualización se indica al comienzo de la página."] },
        ],
      },
      dataSources: {
        title: "Fuentes de datos",
        intro: "SuelosAR organiza y presenta información cartográfica para facilitar su consulta en dispositivos Android y Windows.",
        sections: [
          { heading: "Fuente cartográfica", paragraphs: ["La información de suelos se basa en cartografía oficial publicada por el Instituto Nacional de Tecnología Agropecuaria (INTA)."] },
          { heading: "Titularidad", paragraphs: ["Los datos, documentos, denominaciones y materiales originales pertenecen a sus respectivas organizaciones y titulares. Su inclusión en SuelosAR no transfiere derechos de propiedad ni implica patrocinio."] },
          { heading: "Cobertura actual", paragraphs: ["La versión actual incluye la Provincia de Buenos Aires. La cobertura puede ampliarse en versiones futuras cuando existan fuentes adecuadas y se complete su integración técnica."] },
          { heading: "Actualización y verificación", paragraphs: ["La fecha, escala y precisión dependen de cada fuente original. Para decisiones críticas se recomienda consultar también la publicación oficial correspondiente y verificar la información sobre el terreno."] },
        ],
      },
      disclaimer: {
        title: "Aviso legal",
        intro: "SuelosAR es un proyecto independiente creado para facilitar el acceso y la consulta de cartografía de suelos.",
        sections: [
          { heading: "Independencia institucional", paragraphs: ["SuelosAR no está afiliado, administrado, patrocinado ni respaldado oficialmente por el INTA. La referencia al organismo identifica la procedencia de la información cartográfica y no implica una relación institucional."] },
          { heading: "Alcance de la información", paragraphs: ["La cartografía y los documentos se proporcionan con fines informativos. Pueden existir diferencias de escala, fecha, interpretación, precisión o actualización respecto de las condiciones actuales del terreno."] },
          { heading: "Limitación de responsabilidad", paragraphs: ["Las decisiones productivas, técnicas, académicas o económicas deben complementarse con asesoramiento profesional y verificaciones apropiadas. El uso de la aplicación y de la información consultada queda bajo responsabilidad del usuario."] },
          { heading: "Marcas y contenidos", paragraphs: ["INTA y las demás denominaciones mencionadas pertenecen a sus respectivos titulares. SuelosAR respeta la autoría, atribución y titularidad de las fuentes utilizadas."] },
        ],
      },
    },
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
    title: "SuelosAR | Buenos Aires soil maps and GIS",
    description: "An independent GIS application for Buenos Aires Province soil maps and soil surveys, based on cartography published by INTA, with offline access on Android and Windows.",
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
    subtitle: "Explore Buenos Aires soil maps, soil surveys and GIS tools for field analysis.",
    items: [
      { title: "Interactive GIS Map", description: "Explore Buenos Aires soil maps in a fast, intuitive GIS environment designed for field work.", imageAlt: "Interactive SuelosAR GIS map displaying Buenos Aires Province soil maps" },
      { title: "Official Cartography", description: "Consult soil surveys with mapping units, soil series and landscape descriptions directly from the map.", imageAlt: "SuelosAR soil survey with mapping units, soil series and landscape information" },
      { title: "Integrated PDF Viewer", description: "Open official soil reports instantly without leaving the application.", imageAlt: "Official soil report open in the integrated SuelosAR PDF viewer" },
      { title: "Measurement Tools", description: "Measure distances and areas directly on the map for planning and field analysis.", imageAlt: "Distance and area measurement tools displayed on the map" },
      { title: "Custom Markers", description: "Save observations and organize important locations with personalized markers.", imageAlt: "Personalized location markers organized in SuelosAR" },
      { title: "Favorites", description: "Quickly access frequently used soil units and documents from a dedicated favorites section.", imageAlt: "SuelosAR favorites section with saved soil units and documents" },
    ],
  },
  gallery: {
    title: "SuelosAR on Android",
    subtitle: "Maps, documents and settings for an efficient mobile workflow. Screenshots are currently shown in Spanish.",
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
      { question: "Where does the data come from?", answer: "The information comes from official INTA soil maps and soil survey publications." },
      { question: "Is it free?", answer: "Yes. SuelosAR can be downloaded and used free of charge." },
      { question: "Which devices are supported?", answer: "SuelosAR supports Android 10 or later and Windows 10/11." },
    ],
  },
  downloadUnavailable: {
    eyebrow: "Download temporarily unavailable",
    title: "The {platform} version has not been published yet.",
    description: "We are preparing the installer for public distribution. Please try again later or contact us for information about the next release.",
    android: "Android",
    windows: "Windows",
    backHome: "Back to home",
    contact: "Contact us",
  },
  notFound: {
    eyebrow: "Error 404",
    title: "We couldn’t find this page.",
    description: "The link may have changed or the address may be incorrect.",
    action: "Back to home",
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
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Use", href: "/terms" },
      { label: "Disclaimer", href: "/disclaimer" },
      { label: "Data Sources", href: "/data-sources" },
    ],
    dataSourcesTitle: "Data Sources",
    dataSource: "Official soil cartography published by INTA.",
    disclaimer: "SuelosAR is an independent project and is not affiliated with or officially endorsed by INTA.",
    coverageLabel: "Current coverage",
    coverage: "Buenos Aires Province.",
    futureCoverage: "Future versions may include additional provinces.",
    contactTitle: "Contact",
    github: "GitHub",
    email: "Email",
    copyright: "© 2026 SuelosAR",
  },
  legal: {
    backHome: "Back to home",
    lastUpdated: "Last updated",
    updatedDate: "July 15, 2026",
    pages: {
      privacy: {
        title: "Privacy Policy",
        intro: "This policy explains how the SuelosAR website and application handle the information required to provide their functions.",
        sections: [
          { heading: "Website information", paragraphs: ["The website does not require an account or forms. Language and theme preferences are stored locally in the browser to preserve the selected configuration."] },
          { heading: "Location and device features", paragraphs: ["SuelosAR may request location access when GPS tools are used. Permission is managed by the operating system and can be disabled in the device settings.", "The application is designed to work locally and offline. Location features are used to display position and support cartographic work inside the application."] },
          { heading: "Third-party services", paragraphs: ["External links, distribution platforms and code repositories may apply their own privacy policies. SuelosAR does not control the practices of those services."] },
          { heading: "Contact", paragraphs: ["Privacy-related questions can be sent to the contact email published in the footer."] },
        ],
      },
      terms: {
        title: "Terms of Use",
        intro: "By using SuelosAR, you accept these terms and acknowledge the informational and technical scope of the application.",
        sections: [
          { heading: "Permitted use", paragraphs: ["SuelosAR may be used for professional, academic, educational and consultation purposes. Users are responsible for using the information in accordance with the laws and practices applicable to their activity."] },
          { heading: "Availability", paragraphs: ["The application and its installers are provided subject to availability. Features, requirements, coverage and content may change between releases to improve stability or update available information."] },
          { heading: "Professional decisions", paragraphs: ["SuelosAR is a consultation tool and does not replace surveys, specialized analysis, professional advice or field verification."] },
          { heading: "Intellectual property", paragraphs: ["The application, its visual identity and its code belong to their respective owners. Cartographic information, trademarks and third-party content retain the ownership and conditions established by their source organizations."] },
          { heading: "Changes to these terms", paragraphs: ["These terms may be updated when the application, its distribution channels or legal requirements change. The update date is shown at the top of this page."] },
        ],
      },
      dataSources: {
        title: "Data Sources",
        intro: "SuelosAR organizes and presents cartographic information for easier consultation on Android and Windows devices.",
        sections: [
          { heading: "Cartographic source", paragraphs: ["Soil information is based on official cartography published by Argentina’s National Agricultural Technology Institute (INTA)."] },
          { heading: "Ownership", paragraphs: ["Original data, documents, names and materials belong to their respective organizations and owners. Their inclusion in SuelosAR does not transfer ownership or imply sponsorship."] },
          { heading: "Current coverage", paragraphs: ["The current version covers Buenos Aires Province. Coverage may expand in future releases when suitable sources are available and their technical integration is complete."] },
          { heading: "Updates and verification", paragraphs: ["Date, scale and accuracy depend on each original source. For critical decisions, users should also consult the corresponding official publication and verify information in the field."] },
        ],
      },
      disclaimer: {
        title: "Disclaimer",
        intro: "SuelosAR is an independent project created to make soil cartography easier to access and consult.",
        sections: [
          { heading: "Institutional independence", paragraphs: ["SuelosAR is not affiliated with, managed by, sponsored by or officially endorsed by INTA. References to the organization identify the source of cartographic information and do not imply an institutional relationship."] },
          { heading: "Scope of information", paragraphs: ["Cartography and documents are provided for informational purposes. Scale, date, interpretation, accuracy or update differences may exist compared with current field conditions."] },
          { heading: "Limitation of liability", paragraphs: ["Productive, technical, academic or economic decisions should be supported by professional advice and appropriate verification. Use of the application and consulted information remains the user’s responsibility."] },
          { heading: "Trademarks and content", paragraphs: ["INTA and all other names mentioned belong to their respective owners. SuelosAR respects the authorship, attribution and ownership of the sources it uses."] },
        ],
      },
    },
  },
};

export const dictionaries: Record<Locale, Dictionary> = { "es-AR": es, en };

export function isLocale(value: string | null): value is Locale {
  return locales.includes(value as Locale);
}
