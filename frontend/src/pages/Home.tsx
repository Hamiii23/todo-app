import { useEffect, useState } from "react";
import { Button } from "../components/Button";
import { InputBox } from "../components/InputBox";
import Orb from "../components/Orb";
import TabSwitch, { type Tab } from "../components/TabSwitch";
import { LockIcon, MailIcon, NameIcon, UserIcon } from "../lib/Icons";
import { AnimatePresence, motion } from "motion/react";
import {
  loginRequest,
  signUpRequest,
  type LoginCredentials,
  type SignUpCredentials,
} from "../api";
import { cn } from "../lib/utils";
import {
  checkEmailAvailability,
  checkUserNameAvailability,
  emailRules,
  passwordRules,
  usernameRules,
} from "../lib";
import ThemeSwitcher from "../components/ThemeSwitcher";

export default function Home() {
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

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  return (
    <div className={cn("grid grid-cols-12 gap-2", "dark:bg-neutral-950")}>
      <div className="h-screen items-center flex p-8 col-span-3 w-full shadow-md shadow-neutral-600 dark:bg-neutral-900">
        <div className="w-full gap-4 flex flex-col">
          <h2 className="text-2xl font-medium text-center dark:text-neutral-100">
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
          color="bg-blue-300 dark:bg-blue-600"
          x="10%"
          y="20%"
        />
        <Orb
          delay={1}
          duration={10}
          size="250px"
          color="bg-purple-400 dark:bg-purple-600"
          x="70%"
          y="60%"
        />
        <Orb
          delay={2}
          duration={9}
          size="200px"
          color="bg-pink-400 dark:bg-pink-600"
          x="50%"
          y="10%"
        />
        <div className="flex justify-center items-center h-screen flex-col">
          <h1 className="text-4xl font-medium dark:text-neutral-100">
            Welcome to the{" "}
            <span className="text-blue-700 italic">Todo App</span>
          </h1>
          <h2 className={cn("dark:text-neutral-100")}>
            Your tasks, goals, and priorities — all in one simple place
          </h2>
        </div>
        <ThemeSwitcher />
      </div>
    </div>
  );
}
