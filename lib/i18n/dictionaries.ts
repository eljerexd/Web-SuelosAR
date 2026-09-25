export const locales = ["es-AR", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "es-AR";

const es = {
  brand: {
    name: "SuelosAR",
  },
  meta: {
    title: "SuelosAR | Mapas de Suelos de Buenos Aires y Santa Fe",
description: "Mapas de suelos de Buenos Aires y Santa Fe: Cartas de Suelo, series de suelo y herramientas GIS, también sin conexión. Para Android y Windows.",  },
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
    expandImage: "Ampliar imagen: {alt}",
    closeImage: "Cerrar imagen ampliada",
  },
  theme: {
    activateLight: "Activar tema claro",
    activateDark: "Activar tema oscuro",
  },
  hero: {
    label: "Disponible para Android y Windows",
    titleLineOne: "Mapas de suelos y cartografía oficial de la Provincia de Buenos Aires.",
    titleLineTwo: "En cualquier lugar. Incluso sin conexión.",
    description: "Consultá mapas y cartografía de suelos, Cartas de Suelo en PDF y herramientas GPS desde una aplicación independiente diseñada para trabajar completamente offline.",
    downloadAndroid: "Descargar para Android",
    downloadWindows: "Descargar para Windows",
    compatibility: "Compatible con Android 10+ y Windows 10/11",
    badges: ["Gratis", "Sin conexión", "Fuentes cartográficas del INTA", "Proyecto independiente"],
    androidScreenAlt: "Mapa de suelos abierto en SuelosAR para Android",
    windowsScreenAlt: "Mapa de suelos y búsqueda cartográfica en SuelosAR para Windows",
  },
  features: {
    title: "Mapas de suelos y herramientas GIS para el campo",
    subtitle: "Mapas de suelos, Cartas de Suelo y herramientas GIS para la agronomía y la planificación agrícola en Buenos Aires y Santa Fe, Argentina. Pensado para productores agropecuarios, consultores, investigadores y estudiantes.",
    statisticsIntro: "SuelosAR actualmente cuenta con",
    statistics: [
      { label: "Cartas y series de suelo", shortLabel: "Cartas" },
      { label: "Provincias disponibles", shortLabel: "Provincias" },
      { label: "Funciones principales", shortLabel: "Funciones" },
    ],
    roadmap: {
      buenosAires: "Buenos Aires",
      santaFe: "Santa Fe",
      cordoba: "Córdoba",
      next: "Próxima expansión",
      buenosAiresMilestone: "Vinculación entre dispositivos",
      santaFeMilestone: "Descarga bajo demanda",
    },
    deviceLinking: {
      title: "Vinculación entre dispositivos",
      subtitle: "Conservá tus mediciones, marcadores y favoritos entre Windows y Android.",
      windowsLabel: "SuelosAR en Windows",
      androidLabel: "SuelosAR en Android",
      linkedLabel: "Vinculados",
      measurements: "Mediciones",
      markers: "Marcadores",
      favorites: "Favoritos",
    },
    items: [
      { title: "Mapa GIS interactivo", description: "Explorá mapas de suelos de las Provincias de Buenos Aires y Santa Fe en un entorno GIS rápido e intuitivo, diseñado para el trabajo de campo.", imageAlt: "Mapa GIS interactivo de SuelosAR con cartografía de suelos de Buenos Aires y Santa Fe" },
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
      { src: "/images/screenshots/gis.jpg", title: "Flujo de trabajo móvil", description: "Accedé rápidamente a mapas, documentos y herramientas desde tu teléfono.", imageAlt: "Mapa GIS y accesos a documentos y herramientas en SuelosAR para Android", screenPosition: "50% 0%" },
      { src: "/images/screenshots/configuracion.jpg", title: "Configuración", description: "Personalizá la experiencia según tu dispositivo y forma de trabajo.", imageAlt: "Opciones de configuración de SuelosAR para Android", screenPosition: "50% 0%" },
    ],
  },
  faq: {
    title: "Preguntas frecuentes",
    subtitle: "Todo lo esencial sobre SuelosAR, su cobertura y su funcionamiento.",
    items: [
      { question: "¿Qué es SuelosAR?", answer: "SuelosAR es una aplicación independiente para Android y Windows que permite consultar cartografía de suelos y trabajar con herramientas GIS." },
      { question: "¿Funciona sin internet?", answer: "Sí. La cartografía y las herramientas principales siguen disponibles sin conexión." },
      { question: "¿Qué provincias incluye actualmente?", answer: "La versión actual incluye información de las Provincias de Buenos Aires y Santa Fe." },
      { question: "¿Dónde puedo ver el mapa de suelos de la Provincia de Buenos Aires?", answer: "Podés explorarlo directamente desde SuelosAR, o conocer en detalle qué representa y cómo consultarlo.", link: { href: "/mapa-suelos-buenos-aires", label: "Mapa de suelos de la Provincia de Buenos Aires." } },
      { question: "¿Dónde puedo ver el mapa de suelos de la Provincia de Santa Fe?", answer: "Podés explorarlo directamente desde SuelosAR, o conocer en detalle qué representa y cómo consultarlo.", link: { href: "/mapa-suelos-santa-fe", label: "Mapa de suelos de la Provincia de Santa Fe." } },
      { question: "¿De dónde provienen los datos?", answer: "La información proviene de Cartas de Suelo y cartografía oficial publicada por el INTA.", link: { href: "/data-sources", label: "Consultá las fuentes de cartografía de suelos." } },
      { question: "¿Es gratuita?", answer: "Sí. SuelosAR se puede descargar y utilizar de forma gratuita." },
      { question: "¿Qué dispositivos son compatibles?", answer: "SuelosAR es compatible con Android 10 o posterior y Windows 10/11." },
    ],
  },
  soilMap: {
    badge: "Provincia de Buenos Aires",
    title: "Mapa de Suelos de la Provincia de Buenos Aires",
    subtitle: "Qué es, cómo se organiza y cómo consultarla con SuelosAR.",
    intro: {
      title: "¿Qué es un mapa de suelos?",
      paragraph: "Organiza el territorio en unidades según sus características de suelo — una referencia para la agronomía, la planificación y el trabajo de campo.",
    },
    glossary: [
      { term: "Unidad cartográfica", description: "Cada zona delimitada en el mapa según sus características de suelo." },
      { term: "Serie de suelo", description: "Clasifica el tipo de suelo y sus propiedades dentro de una unidad." },
      { term: "Carta de Suelo", description: "El informe oficial que documenta una unidad y sus series." },
    ],
    inta: {
      title: "Mapa de suelos de Buenos Aires e INTA",
      paragraph: "La cartografía se basa en fuentes oficiales del INTA, sin implicar afiliación con el organismo.",
      linkLabel: "Conocé las fuentes de datos.",
    },
    stats: [
      { value: "386", label: "Cartas de Suelo" },
      { value: "407", label: "Series de suelo" },
      { value: "2.274", label: "Unidades" },
    ],
    usage: {
      title: "¿Para qué sirve?",
      items: [
        "Interpretar el territorio y sus características de suelo.",
        "Planificar decisiones agrícolas y productivas.",
        "Dar apoyo al trabajo de campo.",
        "Habilitar análisis territoriales con GIS.",
      ],
    },
    howTo: {
      title: "¿Cómo consultarla?",
      text: "Buscá una localidad, unidad o serie en SuelosAR para abrir su Carta de Suelo.",
      linkLabel: "Ver todas las funcionalidades.",
    },
    coverage: {
      title: "Cobertura actual",
      text: "Otras provincias se sumarán si existen fuentes oficiales disponibles.",
    },
    faq: {
      title: "Preguntas frecuentes",
      items: [
        { question: "¿Qué es un mapa de suelos?", answer: "Representación cartográfica que organiza el territorio en unidades según sus características de suelo." },
        { question: "¿Qué es una Carta de Suelo?", answer: "El informe oficial que describe una unidad cartográfica y sus series de suelo asociadas." },
        { question: "¿Qué diferencia hay entre un mapa de suelos y una Carta de Suelo?", answer: "El mapa muestra la ubicación de cada unidad; la Carta de Suelo la describe en detalle." },
        { question: "¿Qué información puedo consultar en la cartografía?", answer: "Unidades cartográficas, series de suelo, descripciones del paisaje y Cartas de Suelo en PDF." },
      ],
    },
    closing: {
      title: "¿Querés explorar esta cartografía vos mismo?",
      text: "Descargá SuelosAR para Android o Windows.",
      crossLinkLabel: "Conocé el mapa de suelos de Santa Fe.",
    },
    imageAlt: "Carta de Suelo con unidades cartográficas y series de suelo consultada en SuelosAR",
    deviceLabel: "Ejemplo de una Carta de Suelo",
    showcase: {
      headline: "386 Cartas de Suelo.",
      supporting: "Cartografía oficial del INTA para toda la Provincia de Buenos Aires.",
    },
  },
  soilMapSantaFe: {
    badge: "Provincia de Santa Fe",
    title: "Mapa de Suelos de la Provincia de Santa Fe",
    subtitle: "213 series de suelo de Santa Fe, reunidas en un documento consolidado del INTA EEA Rafaela.",
    intro: {
      title: "¿Qué cubre SuelosAR en Santa Fe?",
      paragraph: "SuelosAR reúne la información de suelos de la Provincia de Santa Fe en un documento consolidado de 640 páginas que describe sus 213 series de suelo, elaborado por el INTA EEA Rafaela.",
    },
    glossary: [
      { term: "Serie de suelo", description: "Clasifica el tipo de suelo y sus propiedades dentro de una zona de la provincia." },
      { term: "Documento consolidado", description: "El informe único que reúne la descripción de todas las series de suelo de Santa Fe." },
      { term: "INTA EEA Rafaela", description: "La Estación Experimental Agropecuaria del INTA que elaboró el relevamiento utilizado como fuente." },
    ],
    inta: {
      title: "Mapa de suelos de Santa Fe e INTA",
      paragraph: "La información se basa en el relevamiento de suelos del INTA EEA Rafaela, sin implicar afiliación con el organismo.",
      linkLabel: "Conocé las fuentes de datos.",
    },
    stats: [
      { value: "213", label: "Series de suelo" },
      { value: "1", label: "Documento consolidado" },
      { value: "640", label: "Páginas" },
    ],
    usage: {
      title: "¿Para qué sirve?",
      items: [
        "Consultar las series de suelo presentes en cada zona de la provincia.",
        "Planificar decisiones agrícolas y productivas.",
        "Dar apoyo al trabajo de campo.",
        "Complementar el análisis territorial con GIS.",
      ],
    },
    howTo: {
      title: "¿Cómo consultarla?",
      text: "Buscá tu zona o serie de suelo en SuelosAR para abrirla dentro del documento consolidado de Santa Fe, disponible también sin conexión.",
      linkLabel: "Ver todas las funcionalidades.",
    },
    coverage: {
      title: "Cobertura actual",
      text: "Disponible para Android y Windows, con uso offline, junto a la cobertura de la Provincia de Buenos Aires.",
    },
    faq: {
      title: "Preguntas frecuentes",
      items: [
        { question: "¿Cuántas series de suelo de Santa Fe están disponibles en SuelosAR?", answer: "SuelosAR incluye las 213 series de suelo relevadas por el INTA EEA Rafaela para la Provincia de Santa Fe." },
        { question: "¿SuelosAR tiene cartas de suelo de Santa Fe?", answer: "No como documentos individuales por localidad. A diferencia de Buenos Aires, que sí cuenta con Cartas de Suelo por localidad, Santa Fe se consulta a través de un único documento consolidado de 640 páginas que reúne sus 213 series de suelo, elaborado por el INTA EEA Rafaela." },
        { question: "¿Cuál es la fuente de la información de suelos de Santa Fe?", answer: "La fuente es el relevamiento de suelos del INTA EEA Rafaela." },
        { question: "¿SuelosAR funciona sin conexión en Santa Fe?", answer: "Sí. La documentación de suelos de Santa Fe, igual que la de Buenos Aires, está disponible sin conexión dentro de SuelosAR." },
        { question: "¿SuelosAR es un producto oficial del INTA?", answer: "No. SuelosAR es un proyecto independiente que utiliza fuentes públicas del INTA, sin afiliación ni respaldo oficial del organismo." },
      ],
    },
    closing: {
      title: "¿Querés consultar las series de suelo de Santa Fe?",
      text: "Descargá SuelosAR para Android o Windows.",
      crossLinkLabel: "Conocé el mapa de suelos de Buenos Aires.",
    },
    imageAlt: "Entorno GIS de SuelosAR utilizado para consultar cartografía de suelos",
    deviceLabel: "Ejemplo del entorno GIS de SuelosAR",
    showcase: {
      headline: "213 series de suelo.",
      supporting: "Una fuente consolidada de 640 páginas del INTA EEA Rafaela.",
    },
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
    description: "Descargá SuelosAR y accedé a la cartografía oficial de suelos de Buenos Aires y Santa Fe, incluso sin conexión.",
    downloadAndroid: "Descargar para Android",
    downloadWindows: "Descargar para Windows",
    trustLabel: "Información de confianza",
    badges: ["Buenos Aires y Santa Fe", "Basado en cartografía oficial del INTA", "Funciona sin conexión"],
    santaFeLinkLabel: "Conocé el mapa de suelos de Santa Fe.",
  },
  footer: {
    description: "Proyecto independiente de cartografía digital de suelos para el trabajo profesional y académico en el campo.",
    quickLinksTitle: "Enlaces rápidos",
    quickLinks: [
      { label: "Inicio", href: "#contenido" },
      { label: "Características", href: "#features" },
      { label: "Galería", href: "#screenshots" },
      { label: "Preguntas frecuentes", href: "#faq" },
      { label: "Descargar", href: "#download" },
    ],
    legalTitle: "Legal",
    legalItems: [
      { label: "Mapa de suelos de Buenos Aires", href: "/mapa-suelos-buenos-aires" },
      { label: "Política de privacidad", href: "/privacy" },
      { label: "Términos de uso", href: "/terms" },
      { label: "Aviso legal", href: "/disclaimer" },
      { label: "Fuentes de datos", href: "/data-sources" },
    ],
    dataSourcesTitle: "Fuentes de datos",
    dataSource: "Cartografía oficial de suelos publicada por el INTA.",
    disclaimer: "SuelosAR es un proyecto independiente y no está afiliado ni cuenta con el respaldo oficial del INTA.",
    coverageLabel: "Cobertura actual",
    coverage: "Provincias de Buenos Aires y Santa Fe.",
    futureCoverage: "Las futuras versiones podrán incluir provincias adicionales.",
    contactTitle: "Contacto",
    github: "GitHub",
    email: "Correo electrónico",
    copyright: "© 2026 SuelosAR",
    social: {
      youtube: "SuelosAR en YouTube",
      tiktok: "SuelosAR en TikTok",
      instagram: "SuelosAR en Instagram",
      facebook: "SuelosAR en Facebook",
    },
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
        title: "Fuentes de cartografía de suelos",
        intro: "SuelosAR organiza y presenta cartografía de suelos de las Provincias de Buenos Aires y Santa Fe para facilitar su consulta en dispositivos Android y Windows.",
        sections: [
          { heading: "Fuente cartográfica", paragraphs: ["La información de suelos de la Provincia de Buenos Aires se basa en cartografía oficial publicada por el Instituto Nacional de Tecnología Agropecuaria (INTA).", "La información de suelos de la Provincia de Santa Fe proviene del documento consolidado de series de suelo elaborado por el INTA EEA Rafaela."] },
          { heading: "Titularidad", paragraphs: ["Los datos, documentos, denominaciones y materiales originales pertenecen a sus respectivas organizaciones y titulares. Su inclusión en SuelosAR no transfiere derechos de propiedad ni implica patrocinio."] },
          { heading: "Cobertura actual", paragraphs: ["La versión actual incluye las Provincias de Buenos Aires y Santa Fe. La cobertura puede ampliarse en versiones futuras cuando existan fuentes adecuadas y se complete su integración técnica."] },
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
    title: "Buenos Aires and Santa Fe Soil Maps | SuelosAR",
    description: "Soil maps and official cartography for Buenos Aires and Santa Fe Provinces: soil surveys, soil series and GIS tools, also offline. Available for Android and Windows.",
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
    expandImage: "Expand image: {alt}",
    closeImage: "Close expanded image",
  },
  theme: {
    activateLight: "Activate light theme",
    activateDark: "Activate dark theme",
  },
  hero: {
    label: "Available for Android and Windows",
    titleLineOne: "Official soil cartography of Buenos Aires Province.",
    titleLineTwo: "Anywhere. Even Offline.",
    description: "Consult soil maps, PDF soil surveys and GPS tools in an independent application designed to work completely offline.",
    downloadAndroid: "Download for Android",
    downloadWindows: "Download for Windows",
    compatibility: "Compatible with Android 10+ and Windows 10/11",
    badges: ["Free", "Offline", "INTA cartographic sources", "Independent project"],
    androidScreenAlt: "Soil map open in SuelosAR for Android",
    windowsScreenAlt: "Soil map and cartography search in SuelosAR for Windows",
  },
  features: {
    title: "Soil maps and GIS tools for field work",
    subtitle: "Soil maps, soil surveys and GIS tools for agronomy and agricultural planning in Buenos Aires and Santa Fe, Argentina. Built for agricultural producers, consultants, researchers and students.",
    statisticsIntro: "SuelosAR currently includes",
    statistics: [
      { label: "Soil maps & series", shortLabel: "Maps" },
      { label: "Available provinces", shortLabel: "Provinces" },
      { label: "Main features", shortLabel: "Features" },
    ],
    roadmap: {
      buenosAires: "Buenos Aires",
      santaFe: "Santa Fe",
      cordoba: "Córdoba",
      next: "Next expansion",
      buenosAiresMilestone: "Cross-device sync",
      santaFeMilestone: "On-demand download",
    },
    deviceLinking: {
      title: "Cross-device linking",
      subtitle: "Keep your measurements, markers and favorites in sync between Windows and Android.",
      windowsLabel: "SuelosAR on Windows",
      androidLabel: "SuelosAR on Android",
      linkedLabel: "Linked",
      measurements: "Measurements",
      markers: "Markers",
      favorites: "Favorites",
    },
    items: [
      { title: "Interactive GIS Map", description: "Explore Buenos Aires and Santa Fe soil maps in a fast, intuitive GIS environment designed for field work.", imageAlt: "Interactive SuelosAR GIS map displaying Buenos Aires and Santa Fe soil maps" },
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
      { src: "/images/screenshots/gis.jpg", title: "Mobile workflow", description: "Quickly access maps, documents and tools directly from your phone.", imageAlt: "GIS map with document and tool access in SuelosAR for Android", screenPosition: "50% 0%" },
      { src: "/images/screenshots/configuracion.jpg", title: "Settings", description: "Personalize the experience for your device and the way you work.", imageAlt: "SuelosAR configuration options on Android", screenPosition: "50% 0%" },
    ],
  },
  faq: {
    title: "Frequently asked questions",
    subtitle: "Essential information about SuelosAR, its coverage and how it works.",
    items: [
      { question: "What is SuelosAR?", answer: "SuelosAR is an independent Android and Windows application for consulting soil cartography and working with GIS tools." },
      { question: "Does it work without internet?", answer: "Yes. The cartography and core tools remain available without a connection." },
      { question: "Which provinces are currently included?", answer: "The current version includes information for Buenos Aires and Santa Fe Provinces." },
      { question: "Where can I see the Santa Fe Province soil map?", answer: "You can explore it directly from SuelosAR, or learn in detail what it covers and how to consult it.", link: { href: "/mapa-suelos-santa-fe", label: "Santa Fe Province soil map." } },
      { question: "Where does the data come from?", answer: "The information comes from official INTA soil maps and soil survey publications.", link: { href: "/data-sources", label: "Review the soil cartography sources." } },
      { question: "Is it free?", answer: "Yes. SuelosAR can be downloaded and used free of charge." },
      { question: "Which devices are supported?", answer: "SuelosAR supports Android 10 or later and Windows 10/11." },
    ],
  },
  soilMap: {
    badge: "Buenos Aires Province",
    title: "Soil Map of Buenos Aires Province",
    subtitle: "What it is, how it's organized and how to consult it with SuelosAR.",
    intro: {
      title: "What is a soil map?",
      paragraph: "It organizes the territory into units based on soil characteristics — a reference for agronomy, planning and field work.",
    },
    glossary: [
      { term: "Mapping unit", description: "Each area delimited on the map according to its soil characteristics." },
      { term: "Soil series", description: "Classifies the soil type and its properties within a unit." },
      { term: "Soil survey", description: "The official report documenting a unit and its series." },
    ],
    inta: {
      title: "Buenos Aires Soil Map and INTA",
      paragraph: "The cartography is based on official INTA sources, without implying affiliation with the organization.",
      linkLabel: "Learn about the data sources.",
    },
    stats: [
      { value: "386", label: "Soil Maps" },
      { value: "407", label: "Soil Series" },
      { value: "2,274", label: "Units" },
    ],
    usage: {
      title: "What is a soil map used for?",
      items: [
        "Interpret the territory and its soil characteristics.",
        "Plan agricultural and production decisions.",
        "Support field work.",
        "Enable land analysis with GIS.",
      ],
    },
    howTo: {
      title: "How to consult it?",
      text: "Search for a locality, unit or series in SuelosAR to open its soil survey.",
      linkLabel: "See all SuelosAR features.",
    },
    coverage: {
      title: "Current coverage",
      text: "Other provinces will be added if official sources become available.",
    },
    faq: {
      title: "Frequently asked questions",
      items: [
        { question: "What is a soil map?", answer: "A cartographic representation that organizes the territory into units based on soil characteristics." },
        { question: "What is a soil survey?", answer: "The official report that describes a mapping unit and its associated soil series." },
        { question: "What's the difference between a soil map and a soil survey?", answer: "The map shows the location of each unit; the soil survey describes it in detail." },
        { question: "What information can I consult in the cartography?", answer: "Mapping units, soil series, landscape descriptions and soil surveys in PDF." },
      ],
    },
    closing: {
      title: "Want to explore this cartography yourself?",
      text: "Download SuelosAR for Android or Windows.",
      crossLinkLabel: "Check out the Santa Fe soil map.",
    },
    imageAlt: "Soil survey with mapping units and soil series consulted in SuelosAR",
    deviceLabel: "Example of a soil survey",
    showcase: {
      headline: "386 Soil Maps.",
      supporting: "Official INTA cartography for the entire Buenos Aires Province.",
    },
  },
  soilMapSantaFe: {
    badge: "Santa Fe Province",
    title: "Soil Map of Santa Fe Province",
    subtitle: "213 soil series for Santa Fe, brought together in a consolidated document from INTA EEA Rafaela.",
    intro: {
      title: "What does SuelosAR cover in Santa Fe?",
      paragraph: "SuelosAR brings together Santa Fe Province's soil information in a 640-page consolidated document describing its 213 soil series, prepared by INTA EEA Rafaela.",
    },
    glossary: [
      { term: "Soil series", description: "Classifies the soil type and its properties within an area of the province." },
      { term: "Consolidated document", description: "The single report that brings together the description of all of Santa Fe's soil series." },
      { term: "INTA EEA Rafaela", description: "The INTA experimental station that prepared the survey used as a source." },
    ],
    inta: {
      title: "Santa Fe Soil Map and INTA",
      paragraph: "The information is based on the soil survey from INTA EEA Rafaela, without implying affiliation with the organization.",
      linkLabel: "Learn about the data sources.",
    },
    stats: [
      { value: "213", label: "Soil series" },
      { value: "1", label: "Consolidated document" },
      { value: "640", label: "Pages" },
    ],
    usage: {
      title: "What is it used for?",
      items: [
        "Look up the soil series present in each area of the province.",
        "Plan agricultural and production decisions.",
        "Support field work.",
        "Complement land analysis with GIS.",
      ],
    },
    howTo: {
      title: "How to consult it?",
      text: "Search for your area or soil series in SuelosAR to open it within Santa Fe's consolidated document, also available offline.",
      linkLabel: "See all SuelosAR features.",
    },
    coverage: {
      title: "Current coverage",
      text: "Available for Android and Windows, with offline use, alongside coverage of Buenos Aires Province.",
    },
    faq: {
      title: "Frequently asked questions",
      items: [
        { question: "How many Santa Fe soil series are available in SuelosAR?", answer: "SuelosAR includes the 213 soil series surveyed by INTA EEA Rafaela for Santa Fe Province." },
        { question: "Does SuelosAR have Santa Fe soil surveys?", answer: "Not as individual documents per locality. Unlike Buenos Aires, which does have individual soil surveys per locality, Santa Fe is consulted through a single 640-page consolidated document that brings together its 213 soil series, prepared by INTA EEA Rafaela." },
        { question: "What is the source of the Santa Fe soil information?", answer: "The source is the soil survey from INTA EEA Rafaela." },
        { question: "Does SuelosAR work offline in Santa Fe?", answer: "Yes. Santa Fe's soil documentation, like Buenos Aires', is available offline within SuelosAR." },
        { question: "Is SuelosAR an official INTA product?", answer: "No. SuelosAR is an independent project that uses public INTA sources, without affiliation or official endorsement from the organization." },
      ],
    },
    closing: {
      title: "Want to consult Santa Fe's soil series?",
      text: "Download SuelosAR for Android or Windows.",
      crossLinkLabel: "Check out the Buenos Aires soil map.",
    },
    imageAlt: "SuelosAR GIS environment used to consult soil cartography",
    deviceLabel: "Example of the SuelosAR GIS environment",
    showcase: {
      headline: "213 soil series.",
      supporting: "A consolidated 640-page source from INTA EEA Rafaela.",
    },
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
    description: "Download SuelosAR and access official soil maps of Buenos Aires and Santa Fe, even offline.",
    downloadAndroid: "Download for Android",
    downloadWindows: "Download for Windows",
    trustLabel: "Trusted information",
    badges: ["Buenos Aires and Santa Fe", "Based on official INTA soil cartography", "Works offline"],
    santaFeLinkLabel: "Check out the Santa Fe soil map.",
  },
  footer: {
    description: "An independent digital soil cartography project for professional and academic field work.",
    quickLinksTitle: "Quick Links",
    quickLinks: [
      { label: "Home", href: "#contenido" },
      { label: "Features", href: "#features" },
      { label: "Gallery", href: "#screenshots" },
      { label: "FAQ", href: "#faq" },
      { label: "Download", href: "#download" },
    ],
    legalTitle: "Legal",
    legalItems: [
      { label: "Buenos Aires Soil Map", href: "/mapa-suelos-buenos-aires" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Use", href: "/terms" },
      { label: "Disclaimer", href: "/disclaimer" },
      { label: "Data Sources", href: "/data-sources" },
    ],
    dataSourcesTitle: "Data Sources",
    dataSource: "Official soil cartography published by INTA.",
    disclaimer: "SuelosAR is an independent project and is not affiliated with or officially endorsed by INTA.",
    coverageLabel: "Current coverage",
    coverage: "Buenos Aires and Santa Fe Provinces.",
    futureCoverage: "Future versions may include additional provinces.",
    contactTitle: "Contact",
    github: "GitHub",
    email: "Email",
    copyright: "© 2026 SuelosAR",
    social: {
      youtube: "SuelosAR on YouTube",
      tiktok: "SuelosAR on TikTok",
      instagram: "SuelosAR on Instagram",
      facebook: "SuelosAR on Facebook",
    },
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
        title: "Soil Cartography Sources",
        intro: "SuelosAR organizes and presents soil cartography for Buenos Aires and Santa Fe Provinces for easier consultation on Android and Windows devices.",
        sections: [
          { heading: "Cartographic source", paragraphs: ["Soil information for Buenos Aires Province is based on official cartography published by Argentina’s National Agricultural Technology Institute (INTA).", "Soil information for Santa Fe Province comes from the consolidated soil series document prepared by INTA EEA Rafaela."] },
          { heading: "Ownership", paragraphs: ["Original data, documents, names and materials belong to their respective organizations and owners. Their inclusion in SuelosAR does not transfer ownership or imply sponsorship."] },
          { heading: "Current coverage", paragraphs: ["The current version covers Buenos Aires and Santa Fe Provinces. Coverage may expand in future releases when suitable sources are available and their technical integration is complete."] },
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
