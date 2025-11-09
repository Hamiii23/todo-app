import { useState } from "react";
import { Button } from "../components/Button";
import { InputBox, type ValidationRule } from "../components/InputBox";
import Orb from "../components/Orb";
import TabSwitch, { type Tab } from "../components/TabSwitch";
import { LockIcon, MailIcon, NameIcon, UserIcon } from "../lib/Icons";
import { AnimatePresence, motion } from "motion/react";
import {
  checkEmailAndUsernameRequest,
  loginRequest,
  signUpRequest,
  type LoginCredentials,
  type SignUpCredentials,
} from "../api";
import axios from "axios";

const emailRules: ValidationRule[] = [
  {
    test: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
    message: "Must be a valid email address",
  },
];

const passwordRules: ValidationRule[] = [
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

const usernameRules: ValidationRule[] = [
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

export const Home = () => {
  const tabs: Tab[] = [
    { id: "signin", label: "Sign In" },
    { id: "signup", label: "Sign Up" },
  ];

  const [activeTab, setActiveTab] = useState(tabs[0].id);
  const [loginCredential, setLoginCredential] = useState<LoginCredentials>({
    email: "",
    password: "",
  });
  const [signUpCredential, setSignUpCredential] = useState<SignUpCredentials>({
    name: "",
    email: "",
    username: "",
    password: "",
  });

  async function checkUserNameAvailability(username: string) {
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

  async function checkEmailAvailability(email: string) {
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

  return (
    <div className="grid grid-cols-12 gap-2">
      <div className="h-screen items-center flex p-8 col-span-3 w-full shadow-md shadow-neutral-600">
        <div className="w-full gap-4 flex flex-col">
          <h2 className="text-2xl font-medium text-center">
            Let’s get started!
          </h2>
          <TabSwitch
            tabs={tabs}
            activeTab={activeTab}
            switchTab={setActiveTab}
          />
          <AnimatePresence mode="wait">
            {activeTab === "signin" ? (
              <motion.div
                key={"signin"}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{
                  duration: 0.4,
                  ease: "easeInOut",
                }}
                className="flex flex-col gap-4"
              >
                <InputBox
                  id="email"
                  onChange={(e) => {
                    setLoginCredential({
                      ...loginCredential,
                      email: e.target.value,
                    });
                  }}
                  type="text"
                  placeholder="Enter the email"
                  label="Email"
                  icon={<MailIcon className="w-5 h-5" />}
                  value={loginCredential.email}
                />
                <InputBox
                  id="password"
                  onChange={(e) => {
                    setLoginCredential({
                      ...loginCredential,
                      password: e.target.value,
                    });
                  }}
                  type="password"
                  placeholder="Enter the password"
                  label="Password"
                  icon={<LockIcon className="w-5 h-5" />}
                  value={loginCredential.password}
                />
              </motion.div>
            ) : (
              <motion.div
                key={"signup"}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{
                  duration: 0.4,
                  ease: "easeInOut",
                }}
                className="flex flex-col gap-4"
              >
                <InputBox
                  id="name"
                  value={signUpCredential.name}
                  onChange={(e) => {
                    setSignUpCredential({
                      ...signUpCredential,
                      name: e.target.value,
                    });
                  }}
                  type="text"
                  placeholder="Enter your name"
                  label="Name"
                  icon={<NameIcon className="w-5 h-5" />}
                />
                <InputBox
                  id="username"
                  onChange={(e) => {
                    setSignUpCredential({
                      ...signUpCredential,
                      username: e.target.value,
                    });
                  }}
                  type="text"
                  placeholder="Enter the username"
                  label="Username"
                  icon={<UserIcon className="w-5 h-5" />}
                  value={signUpCredential.username}
                  validationRules={usernameRules}
                  asyncValidation={{
                    check: checkUserNameAvailability,
                    debounceMs: 1000,
                  }}
                />
                <InputBox
                  id="email"
                  onChange={(e) => {
                    setSignUpCredential({
                      ...signUpCredential,
                      email: e.target.value,
                    });
                  }}
                  type="text"
                  placeholder="Enter the email"
                  label="Email"
                  icon={<MailIcon className="w-5 h-5" />}
                  value={signUpCredential.email}
                  validationRules={emailRules}
                  asyncValidation={{
                    check: checkEmailAvailability,
                    debounceMs: 1000,
                  }}
                />
                <InputBox
                  id="password"
                  onChange={(e) => {
                    setSignUpCredential({
                      ...signUpCredential,
                      password: e.target.value,
                    });
                  }}
                  type="password"
                  placeholder="Enter the password"
                  value={signUpCredential.password}
                  label="Password"
                  icon={<LockIcon className="w-5 h-5" />}
                  validationRules={passwordRules}
                />
              </motion.div>
            )}
          </AnimatePresence>
          <Button
            onClick={
              activeTab === "signin"
                ? () => {
                    let res = loginRequest(loginCredential);
                    console.log(res);
                  }
                : () => {
                    let res = signUpRequest(signUpCredential);
                    console.log(res);
                  }
            }
          >
            Continue
          </Button>
        </div>
      </div>
      <div className="h-screen w-full col-span-9 relative">
        <Orb
          delay={0}
          duration={8}
          size="300px"
          color="bg-blue-300"
          x="10%"
          y="20%"
        />
        <Orb
          delay={1}
          duration={10}
          size="250px"
          color="bg-purple-400"
          x="70%"
          y="60%"
        />
        <Orb
          delay={2}
          duration={9}
          size="200px"
          color="bg-pink-400"
          x="50%"
          y="10%"
        />
        <div className="flex justify-center items-center h-screen flex-col">
          <h1 className="text-4xl font-medium">
            Welcome to the{" "}
            <span className="text-blue-700 italic">Todo App</span>
          </h1>
          <h2>Your tasks, goals, and priorities — all in one simple place</h2>
        </div>
      </div>
    </div>
  );
};
