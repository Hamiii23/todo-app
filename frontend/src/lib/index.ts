import axios from "axios";
import { checkEmailAndUsernameRequest } from "../api";
import type { ValidationRule } from "../components/InputBox";

export async function checkUserNameAvailability(username: string) {
  try {
    let res = await checkEmailAndUsernameRequest({ username });
    if (res.data.success === true) {
      return {
        isValid: true,
        message: res.data.message,
      };
    }
    return {
      isValid: false,
      message: "Error checking username",
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return {
        isValid: false,
        message: error.response?.data.message,
      };
    }
    return {
      isValid: false,
      message: "Error checking username",
    };
  }
}

export async function checkEmailAvailability(email: string) {
  try {
    let res = await checkEmailAndUsernameRequest({
      email: email.toLowerCase(),
    });
    if (res.data.success === true) {
      return {
        isValid: true,
        message: res.data.message,
      };
    }

    return {
      isValid: false,
      message: "Error checking email",
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return {
        isValid: false,
        message: error.response?.data.message,
      };
    }
    return {
      isValid: false,
      message: "Error checking email",
    };
  }
}

export function handleThemeChange() {
  document.documentElement.classList.toggle("dark");

  const newTheme = document.documentElement.classList.contains("dark")
    ? "dark"
    : "light";

  localStorage.setItem("theme", newTheme);
}

export const emailRules: ValidationRule[] = [
  {
    test: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
    message: "Must be a valid email address",
  },
];

export const passwordRules: ValidationRule[] = [
  {
    test: (value) => value.length >= 6,
    message: "At least 6 characters long",
  },
  {
    test: (value) => /[0-9]/.test(value),
    message: "Contains at least one number",
  },
  {
    test: (value) => /[!@#$%^&*(),.?":{}|<>]/.test(value),
    message: "Contains at least one symbol (!@#$%^&*)",
  },
  {
    test: (value) => /[A-Z]/.test(value),
    message: "Contains at least one uppercase letter",
  },
  {
    test: (value) => /[a-z]/.test(value),
    message: "Contains at least one lowercase letter",
  },
];

export const usernameRules: ValidationRule[] = [
  {
    test: (value) => value.length >= 3,
    message: "At least 3 characters long",
  },
  {
    test: (value) => /^[a-zA-Z0-9_]+$/.test(value),
    message: "Only letters, numbers, and underscores allowed",
  },
  {
    test: (value) => value.length <= 20,
    message: "Maximum 20 characters",
  },
];

export const colorList = [
  {
    title: "blue",
    background: "bg-blue-100 dark:bg-blue-900/50",
    hover: "hover:bg-blue-200 dark:hover:bg-blue-900/70",
    text: "text-blue-700 dark:text-blue-400",
    altBackground: "bg-blue-500 dark:bg-blue-600",
    altHover: "hover:bg-blue-600 dark:hover:bg-blue-700",
  },
  {
    title: "indigo",
    background: "bg-indigo-100 dark:bg-indigo-900/50",
    hover: "hover:bg-indigo-200 dark:hover:bg-indigo-900/70",
    text: "text-indigo-700 dark:text-indigo-400",
    altBackground: "bg-indigo-500 dark:bg-indigo-600",
    altHover: "hover:bg-indigo-600 dark:hover:bg-indigo-700",
  },
  {
    title: "red",
    background: "bg-red-100 dark:bg-red-900/50",
    hover: "hover:bg-red-200 dark:hover:bg-red-900/70",
    text: "text-red-700 dark:text-red-400",
    altBackground: "bg-red-500 dark:bg-red-600",
    altHover: "hover:bg-red-600 dark:hover:bg-red-700",
  },
  {
    title: "orange",
    background: "bg-orange-100 dark:bg-orange-900/50",
    hover: "hover:bg-orange-200 dark:hover:bg-orange-900/70",
    text: "text-orange-700 dark:text-orange-400",
    altBackground: "bg-orange-500 dark:bg-orange-600",
    altHover: "hover:bg-orange-600 dark:hover:bg-orange-700",
  },
  {
    title: "amber",
    background: "bg-amber-100 dark:bg-amber-900/50",
    hover: "hover:bg-amber-200 dark:hover:bg-amber-900/70",
    text: "text-amber-700 dark:text-amber-400",
    altBackground: "bg-amber-500 dark:bg-amber-600",
    altHover: "hover:bg-amber-600 dark:hover:bg-amber-700",
  },
  {
    title: "yellow",
    background: "bg-yellow-100 dark:bg-yellow-900/60",
    hover: "hover:bg-yellow-200 dark:hover:bg-yellow-900/80",
    text: "text-yellow-700 dark:text-yellow-300",
    altBackground: "bg-yellow-500 dark:bg-yellow-600",
    altHover: "hover:bg-yellow-600 dark:hover:bg-yellow-700",
  },
  {
    title: "lime",
    background: "bg-lime-100 dark:bg-lime-900/60",
    hover: "hover:bg-lime-200 dark:hover:bg-lime-900/80",
    text: "text-lime-700 dark:text-lime-300",
    altBackground: "bg-lime-500 dark:bg-lime-600",
    altHover: "hover:bg-lime-600 dark:hover:bg-lime-700",
  },
  {
    title: "green",
    background: "bg-green-100 dark:bg-green-900/50",
    hover: "hover:bg-green-200 dark:hover:bg-green-900/70",
    text: "text-green-700 dark:text-green-400",
    altBackground: "bg-green-500 dark:bg-green-600",
    altHover: "hover:bg-green-600 dark:hover:bg-green-700",
  },
  {
    title: "emerald",
    background: "bg-emerald-100 dark:bg-emerald-900/50",
    hover: "hover:bg-emerald-200 dark:hover:bg-emerald-900/70",
    text: "text-emerald-700 dark:text-emerald-400",
    altBackground: "bg-emerald-500 dark:bg-emerald-600",
    altHover: "hover:bg-emerald-600 dark:hover:bg-emerald-700",
  },
  {
    title: "teal",
    background: "bg-teal-100 dark:bg-teal-900/50",
    hover: "hover:bg-teal-200 dark:hover:bg-teal-900/70",
    text: "text-teal-700 dark:text-teal-400",
    altBackground: "bg-teal-500 dark:bg-teal-600",
    altHover: "hover:bg-teal-600 dark:hover:bg-teal-700",
  },
  {
    title: "cyan",
    background: "bg-cyan-100 dark:bg-cyan-900/60",
    hover: "hover:bg-cyan-200 dark:hover:bg-cyan-900/75",
    text: "text-cyan-700 dark:text-cyan-300",
    altBackground: "bg-cyan-500 dark:bg-cyan-600",
    altHover: "hover:bg-cyan-600 dark:hover:bg-cyan-700",
  },
  {
    title: "sky",
    background: "bg-sky-100 dark:bg-sky-900/60",
    hover: "hover:bg-sky-200 dark:hover:bg-sky-900/75",
    text: "text-sky-700 dark:text-sky-300",
    altBackground: "bg-sky-500 dark:bg-sky-600",
    altHover: "hover:bg-sky-600 dark:hover:bg-sky-700",
  },
  {
    title: "violet",
    background: "bg-violet-100 dark:bg-violet-900/50",
    hover: "hover:bg-violet-200 dark:hover:bg-violet-900/70",
    text: "text-violet-700 dark:text-violet-400",
    altBackground: "bg-violet-500 dark:bg-violet-600",
    altHover: "hover:bg-violet-600 dark:hover:bg-violet-700",
  },
  {
    title: "purple",
    background: "bg-purple-100 dark:bg-purple-900/50",
    hover: "hover:bg-purple-200 dark:hover:bg-purple-900/70",
    text: "text-purple-700 dark:text-purple-400",
    altBackground: "bg-purple-500 dark:bg-purple-600",
    altHover: "hover:bg-purple-600 dark:hover:bg-purple-700",
  },
  {
    title: "fuchsia",
    background: "bg-fuchsia-100 dark:bg-fuchsia-900/50",
    hover: "hover:bg-fuchsia-200 dark:hover:bg-fuchsia-900/70",
    text: "text-fuchsia-700 dark:text-fuchsia-400",
    altBackground: "bg-fuchsia-500 dark:bg-fuchsia-600",
    altHover: "hover:bg-fuchsia-600 dark:hover:bg-fuchsia-700",
  },
  {
    title: "pink",
    background: "bg-pink-100 dark:bg-pink-900/50",
    hover: "hover:bg-pink-200 dark:hover:bg-pink-900/70",
    text: "text-pink-700 dark:text-pink-400",
    altBackground: "bg-pink-500 dark:bg-pink-600",
    altHover: "hover:bg-pink-600 dark:hover:bg-pink-700",
  },
  {
    title: "rose",
    background: "bg-rose-100 dark:bg-rose-900/50",
    hover: "hover:bg-rose-200 dark:hover:bg-rose-900/70",
    text: "text-rose-700 dark:text-rose-400",
    altBackground: "bg-rose-500 dark:bg-rose-600",
    altHover: "hover:bg-rose-600 dark:hover:bg-rose-700",
  },
  {
    title: "slate",
    background: "bg-slate-100 dark:bg-slate-800/50",
    hover: "hover:bg-slate-200 dark:hover:bg-slate-800/70",
    text: "text-slate-700 dark:text-slate-300",
    altBackground: "bg-slate-500 dark:bg-slate-600",
    altHover: "hover:bg-slate-600 dark:hover:bg-slate-700",
  },
  {
    title: "gray",
    background: "bg-gray-100 dark:bg-gray-800/50",
    hover: "hover:bg-gray-200 dark:hover:bg-gray-800/70",
    text: "text-gray-700 dark:text-gray-300",
    altBackground: "bg-gray-500 dark:bg-gray-600",
    altHover: "hover:bg-gray-600 dark:hover:bg-gray-700",
  },
  {
    title: "zinc",
    background: "bg-zinc-100 dark:bg-zinc-800/50",
    hover: "hover:bg-zinc-200 dark:hover:bg-zinc-800/70",
    text: "text-zinc-700 dark:text-zinc-300",
    altBackground: "bg-zinc-500 dark:bg-zinc-600",
    altHover: "hover:bg-zinc-600 dark:hover:bg-zinc-700",
  },
  {
    title: "neutral",
    background: "bg-neutral-100 dark:bg-neutral-800/50",
    hover: "hover:bg-neutral-200 dark:hover:bg-neutral-800/70",
    text: "text-neutral-700 dark:text-neutral-300",
    altBackground: "bg-neutral-500 dark:bg-neutral-600",
    altHover: "hover:bg-neutral-600 dark:hover:bg-neutral-700",
  },
  {
    title: "stone",
    background: "bg-stone-100 dark:bg-stone-800/50",
    hover: "hover:bg-stone-200 dark:hover:bg-stone-800/70",
    text: "text-stone-700 dark:text-stone-300",
    altBackground: "bg-stone-500 dark:bg-stone-600",
    altHover: "hover:bg-stone-600 dark:hover:bg-stone-700",
  },
];
