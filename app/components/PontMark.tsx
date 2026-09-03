type PontMarkProps = {
  className?: string;
  compact?: boolean;
};

export function PontMark({ className = '', compact = false }: PontMarkProps) {
  return (
    <span
      className={`pont-mark ${compact ? 'pont-mark--compact' : ''} ${className}`}
      aria-label="PONT"
    >
      <span aria-hidden="true">P</span>
      <span className="pont-mark__orb" aria-hidden="true">
        <span className="pont-mark__core" />
      </span>
      <span aria-hidden="true">NT</span>
    </span>
  );
}
