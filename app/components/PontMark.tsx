import Image from 'next/image';

type PontMarkProps = {
  className?: string;
};

export function PontMark({ className = '' }: PontMarkProps) {
  return (
    <Image
      className={`pont-mark ${className}`}
      src="/pont-logo.png"
      width={741}
      height={193}
      alt="PONT."
      draggable="false"
      priority
    />
  );
}
