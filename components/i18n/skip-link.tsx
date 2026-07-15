"use client";

import { useI18n } from "./i18n-provider";

export function SkipLink() {
  const { dictionary } = useI18n();
  return <a className="skip-link" href="#contenido">{dictionary.accessibility.skipToContent}</a>;
}
