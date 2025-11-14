import { cn } from "./utils";

interface IconProps {
  color?: string;
  className?: string;
}

export type IconComponent = React.ComponentType<IconProps>;

export interface IconItem {
  title: string;
  icon: IconComponent;
}

function LockIcon({ className, color }: IconProps) {
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

function MailIcon({ className, color }: IconProps) {
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

function UserIcon({ className, color }: IconProps) {
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

function NameIcon({ className, color }: IconProps) {
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

function MoonIcon({ className, color }: IconProps) {
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

function SunIcon({ className, color }: IconProps) {
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

function TickIcon({ color, className }: IconProps) {
  return (
    <div className={color}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="currentColor"
        className={cn(
          "icon icon-tabler icons-tabler-filled icon-tabler-circle-check",
          className,
        )}
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M17 3.34a10 10 0 1 1 -14.995 8.984l-.005 -.324l.005 -.324a10 10 0 0 1 14.995 -8.336zm-1.293 5.953a1 1 0 0 0 -1.32 -.083l-.094 .083l-3.293 3.292l-1.293 -1.292l-.094 -.083a1 1 0 0 0 -1.403 1.403l.083 .094l2 2l.094 .083a1 1 0 0 0 1.226 0l.094 -.083l4 -4l.083 -.094a1 1 0 0 0 -.083 -1.32z" />
      </svg>
    </div>
  );
}

function NoteIcon({ color, className }: IconProps) {
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
          "icon icon-tabler icons-tabler-outline icon-tabler-note",
          className,
        )}
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M13 20l7 -7" />
        <path d="M13 20v-6a1 1 0 0 1 1 -1h6v-7a2 2 0 0 0 -2 -2h-12a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7" />
      </svg>
    </div>
  );
}

function ListIcon({ className, color }: IconProps) {
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
          "icon icon-tabler icons-tabler-outline icon-tabler-list",
          className,
        )}
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M9 6l11 0" />
        <path d="M9 12l11 0" />
        <path d="M9 18l11 0" />
        <path d="M5 6l0 .01" />
        <path d="M5 12l0 .01" />
        <path d="M5 18l0 .01" />
      </svg>
    </div>
  );
}

function InboxIcon({ color, className }: IconProps) {
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
          "icon icon-tabler icons-tabler-outline icon-tabler-inbox",
          className,
        )}
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z" />
        <path d="M4 13h3l3 3h4l3 -3h3" />
      </svg>
    </div>
  );
}

function TimeIcon({ color, className }: IconProps) {
  return (
    <div className={color}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="currentColor"
        className={cn(
          "icon icon-tabler icons-tabler-filled icon-tabler-calendar-week",
          className,
        )}
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M16 2c.183 0 .355 .05 .502 .135l.033 .02c.28 .177 .465 .49 .465 .845v1h1a3 3 0 0 1 2.995 2.824l.005 .176v12a3 3 0 0 1 -2.824 2.995l-.176 .005h-12a3 3 0 0 1 -2.995 -2.824l-.005 -.176v-12a3 3 0 0 1 2.824 -2.995l.176 -.005h1v-1a1 1 0 0 1 .514 -.874l.093 -.046l.066 -.025l.1 -.029l.107 -.019l.12 -.007q .083 0 .161 .013l.122 .029l.04 .012l.06 .023c.328 .135 .568 .44 .61 .806l.007 .117v1h6v-1a1 1 0 0 1 1 -1m3 7h-14v9.625c0 .705 .386 1.286 .883 1.366l.117 .009h12c.513 0 .936 -.53 .993 -1.215l.007 -.16z" />
        <path d="M9.015 13a1 1 0 0 1 -1 1a1.001 1.001 0 1 1 -.005 -2c.557 0 1.005 .448 1.005 1" />
        <path d="M13.015 13a1 1 0 0 1 -1 1a1.001 1.001 0 1 1 -.005 -2c.557 0 1.005 .448 1.005 1" />
        <path d="M17.02 13a1 1 0 0 1 -1 1a1.001 1.001 0 1 1 -.005 -2c.557 0 1.005 .448 1.005 1" />
        <path d="M12.02 15a1 1 0 0 1 0 2a1.001 1.001 0 1 1 -.005 -2z" />
        <path d="M9.015 16a1 1 0 0 1 -1 1a1.001 1.001 0 1 1 -.005 -2c.557 0 1.005 .448 1.005 1" />
      </svg>
    </div>
  );
}

function IconsIcon({ color, className }: IconProps) {
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
          "icon icon-tabler icons-tabler-outline icon-tabler-icons",
          className,
        )}
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M6.5 6.5m-3.5 0a3.5 3.5 0 1 0 7 0a3.5 3.5 0 1 0 -7 0" />
        <path d="M2.5 21h8l-4 -7z" />
        <path d="M14 3l7 7" />
        <path d="M14 10l7 -7" />
        <path d="M14 14h7v7h-7z" />
      </svg>
    </div>
  );
}

function SearchIcon({ color, className }: IconProps) {
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
          "icon icon-tabler icons-tabler-outline icon-tabler-search",
          className,
        )}
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
        <path d="M21 21l-6 -6" />
      </svg>
    </div>
  );
}

function NovelIcon({ color, className }: IconProps) {
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
          "icon icon-tabler icons-tabler-outline icon-tabler-book-2",
          className,
        )}
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M19 4v16h-12a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h12z" />
        <path d="M19 16h-12a2 2 0 0 0 -2 2" />
        <path d="M9 8h6" />
      </svg>
    </div>
  );
}

function BookIcon({ color, className }: IconProps) {
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
          "icon icon-tabler icons-tabler-outline icon-tabler-book",
          className,
        )}
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M3 19a9 9 0 0 1 9 0a9 9 0 0 1 9 0" />
        <path d="M3 6a9 9 0 0 1 9 0a9 9 0 0 1 9 0" />
        <path d="M3 6l0 13" />
        <path d="M12 6l0 13" />
        <path d="M21 6l0 13" />
      </svg>
    </div>
  );
}

function HomeIcon({ color, className }: IconProps) {
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
          "icon icon-tabler icons-tabler-outline icon-tabler-home",
          className,
        )}
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M5 12l-2 0l9 -9l9 9l-2 0" />
        <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7" />
        <path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6" />
      </svg>
    </div>
  );
}

function PeopleIcon({ color, className }: IconProps) {
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
          "icon icon-tabler icons-tabler-outline icon-tabler-users",
          className,
        )}
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M9 7m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" />
        <path d="M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        <path d="M21 21v-2a4 4 0 0 0 -3 -3.85" />
      </svg>
    </div>
  );
}

function WorkIcon({ color, className }: IconProps) {
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
          "icon icon-tabler icons-tabler-outline icon-tabler-briefcase-2",
          className,
        )}
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M3 9a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v9a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-9z" />
        <path d="M8 7v-2a2 2 0 0 1 2 -2h4a2 2 0 0 1 2 2v2" />
      </svg>
    </div>
  );
}

function ProjectIcon({ color, className }: IconProps) {
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
          "icon icon-tabler icons-tabler-outline icon-tabler-brand-vite",
          className,
        )}
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M10 4.5l6 -1.5l-2 6.5l2 -.5l-4 7v-5l-3 1z" />
        <path d="M15 6.5l7 -1.5l-10 17l-10 -17l7.741 1.5" />
      </svg>
    </div>
  );
}

function BuildingIcon({ color, className }: IconProps) {
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
          "icon icon-tabler icons-tabler-outline icon-tabler-building",
          className,
        )}
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M3 21l18 0" />
        <path d="M9 8l1 0" />
        <path d="M9 12l1 0" />
        <path d="M9 16l1 0" />
        <path d="M14 8l1 0" />
        <path d="M14 12l1 0" />
        <path d="M14 16l1 0" />
        <path d="M5 21v-16a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v16" />
      </svg>
    </div>
  );
}

function AtIcon({ color, className }: IconProps) {
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
          "icon icon-tabler icons-tabler-outline icon-tabler-at",
          className,
        )}
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M12 12m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" />
        <path d="M16 12v1.5a2.5 2.5 0 0 0 5 0v-1.5a9 9 0 1 0 -5.5 8.28" />
      </svg>
    </div>
  );
}

function ColorsIcon({ color, className }: IconProps) {
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
          "icon icon-tabler icons-tabler-outline icon-tabler-palette",
          className,
        )}
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M12 21a9 9 0 0 1 0 -18c4.97 0 9 3.582 9 8c0 1.06 -.474 2.078 -1.318 2.828c-.844 .75 -1.989 1.172 -3.182 1.172h-2.5a2 2 0 0 0 -1 3.75a1.3 1.3 0 0 1 -1 2.25" />
        <path d="M8.5 10.5m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
        <path d="M12.5 7.5m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
        <path d="M16.5 10.5m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
      </svg>
    </div>
  );
}

function PlusIcon({ color, className }: IconProps) {
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
          "icon icon-tabler icons-tabler-outline icon-tabler-plus",
          className,
        )}
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M12 5l0 14" />
        <path d="M5 12l14 0" />
      </svg>
    </div>
  );
}

function EnterIcon({ color, className }: IconProps) {
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
          "icon icon-tabler icons-tabler-outline icon-tabler-corner-down-left",
          className,
        )}
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M18 6v6a3 3 0 0 1 -3 3h-10l4 -4m0 8l-4 -4" />
      </svg>
    </div>
  );
}

export const iconsList: IconItem[] = [
  { title: "mail", icon: MailIcon },
  { title: "lock", icon: LockIcon },
  { title: "user", icon: UserIcon },
  { title: "name", icon: NameIcon },
  { title: "moon", icon: MoonIcon },
  { title: "sun", icon: SunIcon },
  { title: "note", icon: NoteIcon },
  { title: "tick", icon: TickIcon },
  { title: "list", icon: ListIcon },
  { title: "inbox", icon: InboxIcon },
  { title: "time", icon: TimeIcon },
  { title: "icons", icon: IconsIcon },
  { title: "search", icon: SearchIcon },
  { title: "novel", icon: NovelIcon },
  { title: "book", icon: BookIcon },
  { title: "home", icon: HomeIcon },
  { title: "people", icon: PeopleIcon },
  { title: "work", icon: WorkIcon },
  { title: "project", icon: ProjectIcon },
  { title: "building", icon: BuildingIcon },
  { title: "at", icon: AtIcon },
  { title: "colors", icon: ColorsIcon },
  { title: "plus", icon: PlusIcon },
  { title: "enter", icon: EnterIcon },
];

export {
  MailIcon,
  LockIcon,
  UserIcon,
  NameIcon,
  MoonIcon,
  SunIcon,
  NoteIcon,
  TickIcon,
  ListIcon,
  InboxIcon,
  TimeIcon,
  IconsIcon,
  SearchIcon,
  NovelIcon,
  BookIcon,
  HomeIcon,
  PeopleIcon,
  WorkIcon,
  ProjectIcon,
  BuildingIcon,
  AtIcon,
  ColorsIcon,
  PlusIcon,
  EnterIcon,
};
