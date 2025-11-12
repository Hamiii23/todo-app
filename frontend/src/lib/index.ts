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
    background: "bg-blue-100",
    hover: "hover:bg-blue-200",
    text: "text-blue-700",
    altBackground: "bg-blue-500",
    altHover: "hover:bg-blue-600",
  },
  {
    title: "indigo",
    background: "bg-indigo-100",
    hover: "hover:bg-indigo-200",
    text: "text-indigo-700",
    altBackground: "bg-indigo-500",
    altHover: "hover:bg-indigo-600",
  },
  {
    title: "red",
    background: "bg-red-100",
    hover: "hover:bg-red-200",
    text: "text-red-700",
    altBackground: "bg-red-500",
    altHover: "hover:bg-red-600",
  },
  {
    title: "orange",
    background: "bg-orange-100",
    hover: "hover:bg-orange-200",
    text: "text-orange-700",
    altBackground: "bg-orange-500",
    altHover: "hover:bg-orange-600",
  },
  {
    title: "amber",
    background: "bg-amber-100",
    hover: "hover:bg-amber-200",
    text: "text-amber-700",
    altBackground: "bg-amber-500",
    altHover: "hover:bg-amber-600",
  },
  {
    title: "yellow",
    background: "bg-yellow-100",
    hover: "hover:bg-yellow-200",
    text: "text-yellow-700",
    altBackground: "bg-yellow-500",
    altHover: "hover:bg-yellow-600",
  },
  {
    title: "lime",
    background: "bg-lime-100",
    hover: "hover:bg-lime-200",
    text: "text-lime-700",
    altBackground: "bg-lime-500",
    altHover: "hover:bg-lime-600",
  },
  {
    title: "green",
    background: "bg-green-100",
    hover: "hover:bg-green-200",
    text: "text-green-700",
    altBackground: "bg-green-500",
    altHover: "hover:bg-green-600",
  },
  {
    title: "emerald",
    background: "bg-emerald-100",
    hover: "hover:bg-emerald-200",
    text: "text-emerald-700",
    altBackground: "bg-emerald-500",
    altHover: "hover:bg-emerald-600",
  },
  {
    title: "teal",
    background: "bg-teal-100",
    hover: "hover:bg-teal-200",
    text: "text-teal-700",
    altBackground: "bg-teal-500",
    altHover: "hover:bg-teal-600",
  },
  {
    title: "cyan",
    background: "bg-cyan-100",
    hover: "hover:bg-cyan-200",
    text: "text-cyan-700",
    altBackground: "bg-cyan-500",
    altHover: "hover:bg-cyan-600",
  },
  {
    title: "sky",
    background: "bg-sky-100",
    hover: "hover:bg-sky-200",
    text: "text-sky-700",
    altBackground: "bg-sky-500",
    altHover: "hover:bg-sky-600",
  },
  {
    title: "violet",
    background: "bg-violet-100",
    hover: "hover:bg-violet-200",
    text: "text-violet-700",
    altBackground: "bg-violet-500",
    altHover: "hover:bg-violet-600",
  },
  {
    title: "purple",
    background: "bg-purple-100",
    hover: "hover:bg-purple-200",
    text: "text-purple-700",
    altBackground: "bg-purple-500",
    altHover: "hover:bg-purple-600",
  },
  {
    title: "fuchsia",
    background: "bg-fuchsia-100",
    hover: "hover:bg-fuchsia-200",
    text: "text-fuchsia-700",
    altBackground: "bg-fuchsia-500",
    altHover: "hover:bg-fuchsia-600",
  },
  {
    title: "pink",
    background: "bg-pink-100",
    hover: "hover:bg-pink-200",
    text: "text-pink-700",
    altBackground: "bg-pink-500",
    altHover: "hover:bg-pink-600",
  },
  {
    title: "rose",
    background: "bg-rose-100",
    hover: "hover:bg-rose-200",
    text: "text-rose-700",
    altBackground: "bg-rose-500",
    altHover: "hover:bg-rose-600",
  },
  {
    title: "slate",
    background: "bg-slate-100",
    hover: "hover:bg-slate-200",
    text: "text-slate-700",
    altBackground: "bg-slate-500",
    altHover: "hover:bg-slate-600",
  },
  {
    title: "gray",
    background: "bg-gray-100",
    hover: "hover:bg-gray-200",
    text: "text-gray-700",
    altBackground: "bg-gray-500",
    altHover: "hover:bg-gray-600",
  },
  {
    title: "zinc",
    background: "bg-zinc-100",
    hover: "hover:bg-zinc-200",
    text: "text-zinc-700",
    altBackground: "bg-zinc-500",
    altHover: "hover:bg-zinc-600",
  },
  {
    title: "neutral",
    background: "bg-neutral-100",
    hover: "hover:bg-neutral-200",
    text: "text-neutral-700",
    altBackground: "bg-neutral-500",
    altHover: "hover:bg-neutral-600",
  },
  {
    title: "stone",
    background: "bg-stone-100",
    hover: "hover:bg-stone-200",
    text: "text-stone-700",
    altBackground: "bg-stone-500",
    altHover: "hover:bg-stone-600",
  },
];
