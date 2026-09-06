export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true" fill="none">
      <rect width="32" height="32" rx="8" fill="currentColor" />
      <path d="M9 21V11h3.2l3.3 6.4L18.8 11H22v10h-2.4v-6.2l-2.9 5.4h-1.4l-2.9-5.4V21H9Z" fill="#fff" />
    </svg>
  );
}

export function Wordmark() {
  return (
    <span className="text-[21px] font-extrabold tracking-tight text-foreground">
      College<span className="font-normal">Centre</span>
    </span>
  );
}
