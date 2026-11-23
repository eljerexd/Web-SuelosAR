"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";

const easing = [0.22, 1, 0.36, 1] as const;

interface ProvinceRoadmapProps {
  labels: {
    buenosAires: string;
    santaFe: string;
    cordoba: string;
    rioNegro: string;
    available: string;
    nextObjective: string;
    buenosAiresMilestone: string;
    santaFeMilestone: string;
    cordobaMilestone: string;
  };
  /** 0 → 1 progress animated once when the roadmap enters the viewport. */
  progress: number;
  santaFeActive: boolean;
  cordobaActive: boolean;
  buenosAiresMilestoneVisible: boolean;
  santaFeMilestoneVisible: boolean;
  cordobaMilestoneVisible: boolean;
  reducedMotion: boolean;
}
/**
 * Thin horizontal coverage timeline: Buenos Aires → Santa Fe → Córdoba → Río Negro.
 * The connector line is the protagonist; nodes stay small and refined, not a corporate roadmap.
 * A much quieter second layer under each available province notes one product milestone shipped
 * alongside that province's coverage — deliberately far less prominent than the province itself.
 */
export function ProvinceRoadmap({ labels, progress, santaFeActive, cordobaActive, buenosAiresMilestoneVisible, santaFeMilestoneVisible, cordobaMilestoneVisible, reducedMotion }: ProvinceRoadmapProps) {
  return (
    <div className="mx-auto mt-10 flex items-start justify-center sm:mt-12">
      <Milestone
        label={labels.buenosAires}
        status={labels.available}
        state="active"
        note={labels.buenosAiresMilestone}
        noteVisible={buenosAiresMilestoneVisible}
        reducedMotion={reducedMotion}
      />
      <Connector filled={Math.min(progress * 2, 1)} />
      <Milestone
        label={labels.santaFe}
        status={labels.available}
        state={santaFeActive ? "active" : "pending"}
        note={labels.santaFeMilestone}
        noteVisible={santaFeMilestoneVisible}
        reducedMotion={reducedMotion}
      />
      <Connector filled={Math.max((progress - 0.5) * 2, 0)} />
      <Milestone
        label={labels.cordoba}
        status={labels.available}
        state={cordobaActive ? "active" : "pending"}
        note={labels.cordobaMilestone}
        noteVisible={cordobaMilestoneVisible}
        reducedMotion={reducedMotion}
      />
      <Connector filled={0} faint />
      <Milestone label={labels.rioNegro} status={labels.nextObjective} state="next" reducedMotion={reducedMotion} />
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
