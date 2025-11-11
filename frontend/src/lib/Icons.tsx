import { cn } from "./utils";

function LockIcon({
  className,
  color,
}: {
  className?: string;
  color?: string;
}) {
  return (
    <div className={color}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={cn(
          "icon icon-tabler icons-tabler-outline icon-tabler-lock",
          className,
        )}
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M5 13a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v6a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-6z" />
        <path d="M11 16a1 1 0 1 0 2 0a1 1 0 0 0 -2 0" />
        <path d="M8 11v-4a4 4 0 1 1 8 0v4" />
      </svg>
    </div>
  );
}

function MailIcon({
  className,
  color,
}: {
  className?: string;
  color?: string;
}) {
  return (
    <div className={color}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={cn(
          "icon icon-tabler icons-tabler-outline icon-tabler-mail",
          className,
        )}
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M3 7a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-10z" />
        <path d="M3 7l9 6l9 -6" />
      </svg>
    </div>
  );
}

function UserIcon({
  className,
  color,
}: {
  className?: string;
  color?: string;
}) {
  return (
    <div className={color}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={cn(
          "icon icon-tabler icons-tabler-outline icon-tabler-user",
          className,
        )}
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" />
        <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
      </svg>
    </div>
  );
}

function NameIcon({
  className,
  color,
}: {
  className?: string;
  color?: string;
}) {
  return (
    <div className={color}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={cn(
          "icon icon-tabler icons-tabler-outline icon-tabler-a-b",
          className,
        )}
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M3 16v-5.5a2.5 2.5 0 0 1 5 0v5.5m0 -4h-5" />
        <path d="M12 6l0 12" />
        <path d="M16 16v-8h3a2 2 0 0 1 0 4h-3m3 0a2 2 0 0 1 0 4h-3" />
      </svg>
    </div>
  );
}

function MoonIcon({
  className,
  color,
}: {
  className?: string;
  color?: string;
}) {
  return (
    <div className={color}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={cn(
          "icon icon-tabler icons-tabler-outline icon-tabler-moon",
          className,
        )}
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1 -8.313 -12.454z" />
      </svg>
    </div>
  );
}

function SunIcon({ className, color }: { className?: string; color?: string }) {
  return (
    <div className={color}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={cn(
          "icon icon-tabler icons-tabler-outline icon-tabler-sun",
          className,
        )}
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M12 12m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" />
        <path d="M3 12h1m8 -9v1m8 8h1m-9 8v1m-6.4 -15.4l.7 .7m12.1 -.7l-.7 .7m0 11.4l.7 .7m-12.1 -.7l-.7 .7" />
      </svg>
    </div>
  );
}

export { MailIcon, LockIcon, UserIcon, NameIcon, MoonIcon, SunIcon };
