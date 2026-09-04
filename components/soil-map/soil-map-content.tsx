"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, FileText, Layers, Tag } from "lucide-react";
import Link from "next/link";

import { SOIL_MAP_FAQ_ITEMS } from "@/components/soil-map/soil-map-data";
import { ImageLightbox } from "@/components/ui/image-lightbox";
import { LaptopMockup } from "@/components/ui/laptop-mockup";
import { PlatformIcon } from "@/components/ui/platform-icon";
import { ANDROID_DOWNLOAD_URL, WINDOWS_DOWNLOAD_URL } from "@/lib/downloads";

const downloadButtonClass = "inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[var(--primary)] py-3 pl-4 pr-6 text-sm font-semibold text-[var(--on-primary)] shadow-[0_8px_22px_rgb(47_104_66/0.13)] transition-[box-shadow,filter] duration-300 hover:brightness-105 hover:shadow-[0_12px_28px_rgb(47_104_66/0.18)]";
const cardClass = "rounded-[2rem] border border-[var(--outline-variant)] bg-[var(--surface-container)]/72 shadow-[var(--shadow-soft)]";
const h2Class = "text-2xl font-bold tracking-[-0.035em] text-[var(--on-surface)] sm:text-3xl";
const paragraphClass = "text-base leading-7 text-[var(--on-surface-variant)] sm:text-lg sm:leading-8";
const linkClass = "font-medium text-[var(--primary)] underline decoration-[var(--outline-variant)] underline-offset-4 transition-colors hover:decoration-[var(--primary)]";

/** Same easing curve and reveal rhythm used across the home (hero, features, platforms, faq). */
const easing = [0.22, 1, 0.36, 1] as const;
const textItem = { hidden: { opacity: 1, y: 18 }, visible: { opacity: 1, y: 0 } };

const glosario = [
  { icon: Layers, term: "Unidad cartográfica", description: "Cada zona delimitada en el mapa según sus características de suelo." },
  { icon: Tag, term: "Serie de suelo", description: "Clasifica el tipo de suelo y sus propiedades dentro de una unidad." },
  { icon: FileText, term: "Carta de Suelo", description: "El informe oficial que documenta una unidad y sus series." },
] as const;

const stats = [
  { value: "386", label: "Cartas de Suelo" },
  { value: "407", label: "Series de suelo" },
  { value: "2.274", label: "Unidades" },
] as const;

const usoList = [
  "Interpretar el territorio y sus características de suelo.",
  "Planificar decisiones agrícolas y productivas.",
  "Dar apoyo al trabajo de campo.",
  "Habilitar análisis territoriales con GIS.",
];

export function SoilMapContent() {
  const reducedMotion = useReducedMotion();

  return (
    <main id="contenido" tabIndex={-1} className="outline-none">
      {/* 1. Hero */}
      <section className="relative isolate overflow-hidden px-5 pb-14 pt-14 sm:px-8 sm:pb-16 sm:pt-16 lg:pt-20">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_0%,var(--hero-glow)_0%,transparent_46%)] opacity-70 dark:opacity-40" aria-hidden="true" />
        <motion.div
          className="mx-auto w-full max-w-3xl text-center"
          initial={reducedMotion ? false : "hidden"}
          animate="visible"
          variants={{ hidden: {}, visible: { transition: { staggerChildren: reducedMotion ? 0 : 0.085, delayChildren: reducedMotion ? 0 : 0.08 } } }}
        >
          <motion.p variants={textItem} transition={{ duration: reducedMotion ? 0 : 0.5, ease: easing }} className="inline-flex items-center gap-2 rounded-full border border-[var(--outline-variant)] bg-[var(--surface-container)]/72 px-3.5 py-1.5 text-xs font-semibold tracking-[0.04em] text-[var(--on-surface-variant)] shadow-sm backdrop-blur-md">
            <span className="size-1.5 rounded-full bg-[var(--primary)]" aria-hidden="true" />
            Provincia de Buenos Aires
          </motion.p>
          <motion.h1 variants={textItem} transition={{ duration: reducedMotion ? 0 : 0.62, ease: easing }} className="mt-7 text-4xl font-bold tracking-[-0.05em] text-[var(--on-surface)] sm:text-5xl lg:text-6xl">Mapa de Suelos de la Provincia de Buenos Aires</motion.h1>
          <motion.p variants={textItem} transition={{ duration: reducedMotion ? 0 : 0.56, ease: easing }} className={`mx-auto mt-6 max-w-2xl ${paragraphClass}`}>Qué es, cómo se organiza y cómo consultarla con SuelosAR.</motion.p>
          <motion.div variants={textItem} transition={{ duration: reducedMotion ? 0 : 0.56, ease: easing }} className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
            <motion.a href={ANDROID_DOWNLOAD_URL} className={downloadButtonClass} whileHover={reducedMotion ? undefined : { y: -2, transition: { duration: 0.28, ease: easing } }} whileTap={reducedMotion ? undefined : { scale: 0.99 }}>
              <span className="grid size-6 -translate-x-[5px] shrink-0 place-items-center" aria-hidden="true"><PlatformIcon platform="android" size={20} /></span>
              <span>Descargar para Android</span>
            </motion.a>
            <motion.a href={WINDOWS_DOWNLOAD_URL} className={downloadButtonClass} whileHover={reducedMotion ? undefined : { y: -2, transition: { duration: 0.28, ease: easing } }} whileTap={reducedMotion ? undefined : { scale: 0.99 }}>
              <span className="grid size-6 -translate-x-[5px] shrink-0 place-items-center" aria-hidden="true"><PlatformIcon platform="windows" size={19} /></span>
              <span>Descargar para Windows</span>
            </motion.a>
          </motion.div>
          <motion.div variants={textItem} transition={{ duration: reducedMotion ? 0 : 0.5, ease: easing }}>
            <Link href="/" className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-full px-3 text-sm font-semibold text-[var(--primary)] transition-colors duration-200 hover:bg-[var(--primary-container)] hover:text-[var(--on-primary-container)]">
              <ArrowLeft aria-hidden="true" size={18} /> Volver al inicio
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Qué es + INTA: bloque informativo principal, con glosario visual, stats y una captura */}
      <section className="px-5 pb-14 sm:px-8 sm:pb-16">
        <motion.article
          className={`relative isolate mx-auto w-full max-w-5xl overflow-hidden ${cardClass} p-6 sm:p-10 lg:p-12`}
          initial={reducedMotion ? false : { opacity: 1, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: reducedMotion ? 0 : 0.65, ease: easing }}
        >
          <div className="pointer-events-none absolute -right-16 -top-16 -z-10 size-72 rounded-full bg-[var(--primary-container)] opacity-25 blur-[90px] dark:opacity-15" aria-hidden="true" />
          <div className="grid gap-10 lg:grid-cols-[0.72fr_1fr] lg:items-center lg:gap-8">
            <div>
              <h2 id="que-es-un-mapa-de-suelos-title" className={h2Class}>¿Qué es un mapa de suelos?</h2>
              <p className={`mt-3 ${paragraphClass}`}>Organiza el territorio en unidades según sus características de suelo — una referencia para la agronomía, la planificación y el trabajo de campo.</p>

              <motion.dl
                className="mt-7 space-y-4"
                initial={reducedMotion ? false : "hidden"}
                whileInView="visible"
                viewport={{ once: true, amount: 0.4 }}
                variants={{ hidden: {}, visible: { transition: { staggerChildren: reducedMotion ? 0 : 0.09 } } }}
              >
                {glosario.map(({ icon: Icon, term, description }) => (
                  <motion.div key={term} variants={textItem} transition={{ duration: reducedMotion ? 0 : 0.48, ease: easing }} className="flex items-start gap-3">
                    <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-[var(--primary-container)] text-[var(--on-primary-container)]" aria-hidden="true"><Icon size={17} strokeWidth={1.8} /></span>
                    <div>
                      <dt className="text-sm font-semibold text-[var(--on-surface)]">{term}</dt>
                      <dd className="text-sm leading-6 text-[var(--on-surface-variant)]">{description}</dd>
                    </div>
                  </motion.div>
                ))}
              </motion.dl>
            </div>

            <motion.div
              className="relative"
              initial={reducedMotion ? false : { opacity: 1, y: 18, scale: 0.98 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: reducedMotion ? 0 : 0.7, ease: easing }}
              whileHover={reducedMotion ? undefined : { y: -4, transition: { duration: 0.22, ease: easing } }}
            >
              <div className="pointer-events-none absolute inset-x-6 -bottom-4 -z-10 h-16 rounded-full bg-[var(--primary)] opacity-[0.14] blur-[42px] dark:opacity-[0.1]" aria-hidden="true" />
              <ImageLightbox src="/images/screenshots/feature-cartography.png" alt="Carta de Suelo con unidades cartográficas y series de suelo consultada en SuelosAR">
                <LaptopMockup screenSrc="/images/screenshots/feature-cartography.png" screenAlt="Carta de Suelo con unidades cartográficas y series de suelo consultada en SuelosAR" deviceLabel="Ejemplo de una Carta de Suelo" className="w-full" />
              </ImageLightbox>
            </motion.div>
          </div>

          <motion.div
            className="mt-10 border-t border-[var(--outline-variant)] pt-8"
            initial={reducedMotion ? false : { opacity: 1, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: reducedMotion ? 0 : 0.55, ease: easing }}
          >
            <h2 id="suelosar-y-inta-title" className={h2Class}>Mapa de suelos de Buenos Aires e INTA</h2>
            <p className={`mt-3 max-w-2xl ${paragraphClass}`}>La cartografía se basa en fuentes oficiales del INTA, sin implicar afiliación con el organismo.{" "}
              <Link href="/data-sources" className={linkClass}>Conocé las fuentes de datos.</Link>
            </p>
            <dl className="mt-6 grid max-w-md grid-cols-3">
              {stats.map((stat) => (
                <div key={stat.label} className="flex min-w-0 flex-col border-l border-[var(--outline-variant)] px-3 first:border-l-0 sm:px-4">
                  <dd className="text-2xl font-semibold tracking-[-0.035em] text-[var(--on-surface)] sm:text-3xl">{stat.value}</dd>
                  <dt className="mt-1 text-xs font-medium text-[var(--on-surface-variant)]">{stat.label}</dt>
                </div>
              ))}
            </dl>
          </motion.div>
        </motion.article>
      </section>

      {/* Para qué sirve + cómo consultar + cobertura: franja compacta de tres columnas */}
      <section className="px-5 pb-14 sm:px-8 sm:pb-16">
        <motion.div
          className="mx-auto grid w-full max-w-5xl gap-8 sm:grid-cols-3"
          initial={reducedMotion ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: reducedMotion ? 0 : 0.1 } } }}
        >
          <motion.div variants={textItem} transition={{ duration: reducedMotion ? 0 : 0.55, ease: easing }}>
            <h2 id="para-que-sirve-title" className="text-lg font-bold tracking-[-0.025em] text-[var(--on-surface)]">¿Para qué sirve?</h2>
            <ul className="mt-4 space-y-2.5">
              {usoList.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm leading-6 text-[var(--on-surface-variant)]">
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-[var(--primary)]" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={textItem} transition={{ duration: reducedMotion ? 0 : 0.55, ease: easing }}>
            <h2 id="como-consultar-title" className="text-lg font-bold tracking-[-0.025em] text-[var(--on-surface)]">¿Cómo consultarla?</h2>
            <p className="mt-4 text-sm leading-6 text-[var(--on-surface-variant)]">Buscá una localidad, unidad o serie en SuelosAR para abrir su Carta de Suelo.{" "}
              <Link href="/#features" className={linkClass}>Ver todas las funcionalidades.</Link>
            </p>
          </motion.div>

          <motion.div variants={textItem} transition={{ duration: reducedMotion ? 0 : 0.55, ease: easing }}>
            <h2 id="cobertura-title" className="text-lg font-bold tracking-[-0.025em] text-[var(--on-surface)]">Cobertura actual</h2>
            <p className="mt-4 inline-flex items-center gap-2 rounded-full border border-[var(--outline-variant)] bg-[var(--surface-container)]/72 px-3 py-1 text-xs font-semibold text-[var(--on-surface)]">
              <span className="size-1.5 rounded-full bg-[var(--primary)]" aria-hidden="true" />
              Provincia de Buenos Aires
            </p>
            <p className="mt-3 text-sm leading-6 text-[var(--on-surface-variant)]">Otras provincias se sumarán si existen fuentes oficiales disponibles.</p>
          </motion.div>
        </motion.div>
      </section>

      {/* FAQ — siempre presente en el HTML, sin depender de interacción JS */}
      <section id="preguntas-frecuentes" className="px-5 pb-14 sm:px-8 sm:pb-16" aria-labelledby="preguntas-frecuentes-title">
        <div className="mx-auto w-full max-w-4xl">
          <motion.h2
            id="preguntas-frecuentes-title"
            className={`text-center ${h2Class}`}
            initial={reducedMotion ? false : { opacity: 1, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: reducedMotion ? 0 : 0.55, ease: easing }}
          >
            Preguntas frecuentes
          </motion.h2>
          <motion.div
            className="mt-8 grid gap-3"
            initial={reducedMotion ? false : "hidden"}
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={{ hidden: {}, visible: { transition: { staggerChildren: reducedMotion ? 0 : 0.07 } } }}
          >
            {SOIL_MAP_FAQ_ITEMS.map((item) => (
              <motion.div key={item.question} variants={textItem} transition={{ duration: reducedMotion ? 0 : 0.48, ease: easing }} className={`${cardClass} p-5 transition-[background-color,box-shadow] duration-300 hover:bg-[var(--surface-container-high)] hover:shadow-md sm:p-7`}>
                <h3 className="text-base font-semibold tracking-[-0.02em] text-[var(--on-surface)] sm:text-lg">{item.question}</h3>
                <p className="mt-2 text-sm leading-6 text-[var(--on-surface-variant)] sm:text-base sm:leading-7">{item.answer}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Cierre con CTA de descarga y enlaces internos */}
      <section className="px-5 pb-20 sm:px-8 sm:pb-24">
        <motion.div
          className={`relative isolate mx-auto w-full max-w-6xl overflow-hidden ${cardClass} px-6 py-14 text-center sm:px-10 sm:py-16`}
          initial={reducedMotion ? false : { opacity: 1, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: reducedMotion ? 0 : 0.65, ease: easing }}
        >
          <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--primary-container)] opacity-35 blur-[100px] dark:opacity-20" aria-hidden="true" />
          <h2 className="mx-auto max-w-3xl text-3xl font-bold tracking-[-0.045em] text-[var(--on-surface)] sm:text-4xl">¿Querés explorar esta cartografía vos mismo?</h2>
          <p className={`mx-auto mt-5 max-w-2xl ${paragraphClass}`}>Descargá SuelosAR para Android o Windows.</p>
          <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
            <motion.a href={ANDROID_DOWNLOAD_URL} className={downloadButtonClass} whileHover={reducedMotion ? undefined : { y: -2, transition: { duration: 0.28, ease: easing } }} whileTap={reducedMotion ? undefined : { scale: 0.99 }}>
              <span className="grid size-6 -translate-x-[5px] shrink-0 place-items-center" aria-hidden="true"><PlatformIcon platform="android" size={20} /></span>
              <span>Descargar para Android</span>
            </motion.a>
            <motion.a href={WINDOWS_DOWNLOAD_URL} className={downloadButtonClass} whileHover={reducedMotion ? undefined : { y: -2, transition: { duration: 0.28, ease: easing } }} whileTap={reducedMotion ? undefined : { scale: 0.99 }}>
              <span className="grid size-6 -translate-x-[5px] shrink-0 place-items-center" aria-hidden="true"><PlatformIcon platform="windows" size={19} /></span>
              <span>Descargar para Windows</span>
            </motion.a>
          </div>
          <p className="mt-7 text-sm text-[var(--on-surface-variant)]">
            <Link href="/" className={linkClass}>Volver al inicio</Link>
            {" · "}
            <Link href="/data-sources" className={linkClass}>Fuentes de datos</Link>
          </p>
        </motion.div>
      </section>
    </main>
  );
}
