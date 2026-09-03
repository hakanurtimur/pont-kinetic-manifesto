type PontMarkProps = {
  className?: string;
};

export function PontMark({ className = '' }: PontMarkProps) {
  return (
    <span className={`pont-mark ${className}`}>
      <span className="sr-only">PONT.</span>
      <span className="pont-mark__base" aria-hidden="true" />
      <span className="pont-mark__contrast" aria-hidden="true" />
    </span>
  );
}
