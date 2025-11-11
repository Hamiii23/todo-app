import { useEffect, useRef, useState } from "react";
import { cn } from "../lib/utils";
import { useDebounce } from "../lib/useDebounce";
import { motion, AnimatePresence } from "motion/react";

export type ValidationRule = {
  test: (value: string) => boolean;
  message: string;
};

export function InputBox({
  id,
  icon,
  label,
  type,
  placeholder,
  onChange,
  value = "",
  validationRules = [],
  asyncValidation,
}: {
  id: string;
  icon: React.ReactNode;
  label: string;
  type: string;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  validationRules?: ValidationRule[];
  asyncValidation?: {
    check: (value: string) => Promise<{ isValid: boolean; message?: string }>;
    debounceMs?: number;
  };
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [focused, setFocused] = useState(false);
  const [asyncError, setAsyncError] = useState<string | null>(null);
  const [asyncSuccess, setAsyncSuccess] = useState<string | null>(null);
  const [isChecking, setIsChecking] = useState(false);

  const debouncedValue = useDebounce(
    value,
    asyncValidation?.debounceMs || 1000,
  );

  useEffect(() => {
    if (!asyncValidation) {
      return;
    }

    if (!debouncedValue || debouncedValue.length === 0) {
      setAsyncError(null);
      setIsChecking(false);
      return;
    }

    setIsChecking(true);
    asyncValidation
      .check(debouncedValue)
      .then((result) => {
        if (result.isValid) {
          setAsyncSuccess(result.message || "Available");
          setAsyncError(null);
        } else {
          setAsyncError(result.isValid ? null : result.message || "Invalid");
          setAsyncSuccess(null);
        }
      })
      .catch(() => {
        setAsyncError("Error checking availability");
      })
      .finally(() => {
        setIsChecking(false);
      });
  }, [debouncedValue]);

  const failedRules = validationRules.filter((rule) => !rule.test(value));
  const hasError = (failedRules.length > 0 || asyncError) && value.length > 0;

  return (
    <div>
      <div
        className={cn(
          "bg-neutral-100 px-8 py-2 rounded-xl border-neutral-200 drop-shadow-sm drop-shadow-neutral-400",
          "flex items-center gap-3",
          "dark:border-neutral-700 dark:bg-neutral-900 dark:drop-shadow-neutral-600",
          "hover:drop-shadow-sm hover:drop-shadow-neutral-400 transition duration-300",

          hasError
            ? "border-red-500 ring-2 ring-red-500/20"
            : focused
              ? "ring-1 ring-indigo-200 scale-100 dark:ring-indigo-500/50"
              : "",
        )}
        onClick={() => inputRef.current?.focus()}
      >
        <div className="dark:text-neutral-100">{icon}</div>
        <div className="h-9 w-px bg-gray-300 dark:bg-gray-600"></div>
        <div className="flex flex-col">
          <label
            htmlFor={type}
            className={cn(
              "text-xs mb-1 dark:text-neutral-300",
              hasError ? "text-red-500 dark:text-red-500" : "text-neutral-400",
            )}
          >
            {label}
          </label>
          <input
            value={value}
            onChange={onChange}
            ref={inputRef}
            id={id}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            type={type}
            placeholder={placeholder}
            className={cn(
              "outline-none bg-transparent text-sm dark:placeholder:text-neutral-400 dark:text-neutral-100",
            )}
          />
        </div>
        {isChecking && (
          <div className="rounded-full h-4 w-4 border-gray-500 border-2 border-t-indigo-500 animate-spin absolute right-4"></div>
        )}
      </div>
      <AnimatePresence>
        {failedRules.length > 0 && value.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: -10, height: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="mt-2 ml-2 space-y-1"
          >
            {failedRules.map((rule, idx) => (
              <p
                key={idx}
                className="text-red-500 text-xs flex items-start gap-1.5"
              >
                <span>{rule.message}</span>
              </p>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {asyncError && value.length > 0 && (
          <motion.p
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="text-red-500 text-xs flex items-start gap-1.5 mt-2 ml-2"
          >
            <span>{asyncError}</span>
          </motion.p>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {!asyncError &&
          !isChecking &&
          asyncValidation &&
          value.length > 0 &&
          failedRules.length === 0 && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="text-green-500 text-xs flex items-start gap-1.5 mt-2 ml-2"
            >
              <span>{asyncSuccess}</span>
            </motion.p>
          )}
      </AnimatePresence>
    </div>
  );
}
