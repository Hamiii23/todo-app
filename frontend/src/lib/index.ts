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
