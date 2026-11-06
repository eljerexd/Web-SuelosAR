import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { signOut } from "@/auth";
import { getGitHubReportedWindowsInstallerDownloads } from "@/lib/downloads";
import { hasAdminSession } from "@/lib/admin-session";
import { getAndroidPlayClickCount } from "@/lib/metrics";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "Métricas privadas | SuelosAR",
  robots: { index: false, follow: false, noarchive: true },
};

function formattedCount(value: number | null) {
  return value === null ? "No disponible" : new Intl.NumberFormat("es-AR").format(value);
}

export default async function PrivateMetricsPage() {
  if (!await hasAdminSession()) notFound();

  const [androidClicks, githubInstallerDownloads] = await Promise.all([
    getAndroidPlayClickCount().catch(() => null),
    getGitHubReportedWindowsInstallerDownloads(),
  ]);

  return (
    <main className="mx-auto min-h-[60vh] w-full max-w-5xl px-5 py-16 sm:px-8 lg:py-24">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--primary)]">Administración privada</p>
      <h1 className="mt-3 text-4xl font-bold tracking-[-0.045em] text-[var(--on-surface)] sm:text-5xl">Métricas de SuelosAR</h1>
      <p className="mt-4 max-w-3xl text-sm leading-6 text-[var(--on-surface-variant)]">Solo se muestran contadores agregados. Los clics de Google Play son acciones del botón, no instalaciones.</p>

      <form action={async () => {
        "use server";
        await signOut({ redirectTo: "/" });
      }} className="mt-5">
        <button type="submit" className="min-h-11 rounded-full border border-[var(--outline)] px-4 text-sm font-medium text-[var(--on-surface)] transition-colors hover:bg-[var(--surface-container-high)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)]">Cerrar sesión</button>
      </form>

      <dl className="mt-10 grid gap-4 sm:grid-cols-2">
        <div className="rounded-3xl border border-[var(--outline-variant)] bg-[var(--surface-container)] p-6 sm:p-8">
          <dt className="text-sm font-medium text-[var(--on-surface-variant)]">Clics en el botón de Google Play</dt>
          <dd className="mt-4 text-4xl font-semibold tabular-nums tracking-tight text-[var(--on-surface)]">{formattedCount(androidClicks)}</dd>
        </div>
        <div className="rounded-3xl border border-[var(--outline-variant)] bg-[var(--surface-container)] p-6 sm:p-8">
          <dt className="text-sm font-medium text-[var(--on-surface-variant)]">Descargas del instalador reportadas por GitHub</dt>
          <dd className="mt-4 text-4xl font-semibold tabular-nums tracking-tight text-[var(--on-surface)]">{formattedCount(githubInstallerDownloads)}</dd>
          <p className="mt-3 text-xs leading-5 text-[var(--on-surface-variant)]">Suma del contador de assets .exe de releases publicadas de la aplicación; incluye descargas desde cualquier origen y no confirma instalaciones ni transferencias completas.</p>
        </div>
      </dl>
    </main>
  );
}
