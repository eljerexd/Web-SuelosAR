"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";

const easing = [0.22, 1, 0.36, 1] as const;

interface ProvinceRoadmapProps {
  labels: {
    buenosAires: string;
    santaFe: string;
    cordoba: string;
    next: string;
    buenosAiresMilestone: string;
    santaFeMilestone: string;
  };
  /** 0 → 1, fills the thin Buenos Aires → Santa Fe connector. Every other segment stays neutral. */
  progress: number;
  /** True once Santa Fe's check should appear — flips a short beat after `progress` reaches 1, not exactly at it, so the check reads as its own deliberate step. */
  santaFeActive: boolean;
  /** True once Buenos Aires' product milestone note should fade in — a beat after mount, not simultaneous with its check. */
  buenosAiresMilestoneVisible: boolean;
  /** True once Santa Fe's product milestone note should fade in — a beat after `santaFeActive`. */
  santaFeMilestoneVisible: boolean;
  reducedMotion: boolean;
}

/**
 * Thin horizontal coverage timeline: Buenos Aires → Santa Fe → Córdoba → next expansion.
 * The connector line is the protagonist; nodes stay small and refined, not a corporate roadmap.
 * A much quieter second layer under Buenos Aires/Santa Fe notes one product milestone shipped
 * alongside that province's coverage — deliberately far less prominent than the province itself.
 */
export function ProvinceRoadmap({ labels, progress, santaFeActive, buenosAiresMilestoneVisible, santaFeMilestoneVisible, reducedMotion }: ProvinceRoadmapProps) {
  return (
    <div className="mx-auto mt-10 flex items-start justify-center sm:mt-12">
      <Milestone
        label={labels.buenosAires}
        status="Disponible"
        state="active"
        note={labels.buenosAiresMilestone}
        noteVisible={buenosAiresMilestoneVisible}
        reducedMotion={reducedMotion}
      />
      <Connector filled={progress} />
      <Milestone
        label={labels.santaFe}
        status="Disponible"
        state={santaFeActive ? "active" : "pending"}
        note={labels.santaFeMilestone}
        noteVisible={santaFeMilestoneVisible}
        reducedMotion={reducedMotion}
      />
      <Connector filled={0} />
      <Milestone label={labels.cordoba} status="Próximo objetivo" state="next" reducedMotion={reducedMotion} />
      <Connector filled={0} faint />
      <FutureNode label={labels.next} />
    </div>
  );
}

function Connector({ filled, faint = false }: { filled: number; faint?: boolean }) {
  return (
    <div className={`relative mt-[15px] h-px w-4 shrink-0 overflow-hidden bg-[var(--outline-variant)] min-[375px]:w-6 sm:mt-[17px] sm:w-14 lg:w-20 ${faint ? "opacity-50" : ""}`}>
      {filled > 0 ? (
        <div className="absolute inset-y-0 left-0 bg-[var(--primary)]" style={{ width: `${Math.min(filled, 1) * 100}%` }} />
      ) : null}
    </div>
  );
}

type MilestoneState = "active" | "pending" | "next";

function Milestone({ label, status, state, note, noteVisible, reducedMotion }: {
  label: string;
  status: string;
  state: MilestoneState;
  note?: string;
  noteVisible?: boolean;
  reducedMotion: boolean;
}) {
  const isActive = state === "active";

  return (
    <div className="flex w-14 shrink-0 flex-col items-center gap-1.5 min-[375px]:w-16 sm:w-24">
      <span className={`grid size-[30px] shrink-0 place-items-center rounded-full sm:size-9 ${isActive ? "bg-[var(--primary)]/15 text-[var(--primary)]" : "bg-[var(--surface-container-high)] text-[var(--on-surface-variant)]"}`}>
        <AnimatePresence mode="wait" initial={false}>
          {isActive ? (
            <motion.span
              key="check"
              initial={reducedMotion ? false : { opacity: 0, scale: 0.55 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: reducedMotion ? 0 : 0.45, ease: easing }}
              className="grid place-items-center"
            >
              <Check size={15} strokeWidth={3} />
            </motion.span>
          ) : state === "next" ? (
            <motion.span key="next" className="grid place-items-center">
              <ArrowRight size={14} strokeWidth={2.25} />
            </motion.span>
          ) : (
            <motion.span key="pending" className="grid place-items-center">
              <span className="size-1.5 rounded-full bg-[var(--on-surface-variant)]/50" aria-hidden="true" />
            </motion.span>
          )}
        </AnimatePresence>
      </span>
      <span className={`text-center text-xs font-semibold leading-tight sm:text-base ${isActive ? "text-[var(--on-surface)]" : "text-[var(--on-surface-variant)]"}`}>{label}</span>
      <span className={`text-center text-[0.6rem] leading-tight sm:text-xs ${isActive ? "text-[var(--primary)]" : "text-[var(--on-surface-variant)] opacity-70"}`}>{status}</span>

      {note ? (
        <span className="mt-2.5 grid min-h-[1.4em] place-items-center sm:mt-3">
          <AnimatePresence>
            {noteVisible ? (
              <motion.span
                initial={reducedMotion ? false : { opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: reducedMotion ? 0 : 0.4, ease: easing }}
                className="inline-flex max-w-[5.5rem] items-start gap-1 text-center text-[0.55rem] leading-tight text-[var(--on-surface-variant)] opacity-45 sm:max-w-[7rem] sm:text-[0.65rem]"
              >
                <span aria-hidden="true">·</span>
                <span>{note}</span>
              </motion.span>
            ) : null}
          </AnimatePresence>
        </span>
      ) : null}
    </div>
  );
}

function FutureNode({ label }: { label: string }) {
  return (
    <div className="flex w-12 shrink-0 flex-col items-center gap-1.5 min-[375px]:w-14 sm:w-20">
      <span className="grid h-[30px] place-items-center text-[var(--on-surface-variant)] opacity-45 sm:h-9">
        <span className="text-sm font-semibold tracking-[0.12em] sm:text-base">···</span>
      </span>
      <span className="text-center text-[0.6rem] font-medium leading-tight text-[var(--on-surface-variant)] opacity-45 sm:text-xs">{label}</span>
    </div>
  );
}
