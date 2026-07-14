import { Sprout } from "lucide-react";

interface BrandMarkProps {
  className?: string;
  compact?: boolean;
}

export function BrandMark({ className = "", compact = false }: BrandMarkProps) {
  return (
    <div
      className={`grid place-items-center rounded-[28%] bg-[var(--primary-container)] text-[var(--on-primary-container)] shadow-[var(--shadow-soft)] ${compact ? "size-9 rounded-xl" : "size-24 sm:size-28"} ${className}`}
      role="img"
      aria-label="Marcador de posición del logotipo de SuelosAR"
    >
      <Sprout aria-hidden="true" strokeWidth={1.8} size={compact ? 20 : 48} />
    </div>
  );
}
