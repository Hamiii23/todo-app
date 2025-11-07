import { useState } from "react";
import { Button } from "../components/Button";
import { InputBox } from "../components/InputBox";
import Orb from "../components/Orb";
import TabSwitch, { type Tab } from "../components/TabSwitch";
import { LockIcon, MailIcon, NameIcon, UserIcon } from "../lib/Icons";
import { AnimatePresence, motion } from "motion/react";

export const Home = () => {
  const tabs: Tab[] = [
    { id: "signin", label: "Sign In" },
    { id: "signup", label: "Sign Up" },
  ];

  const [activeTab, setActiveTab] = useState(tabs[0].id);

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
                  type="text"
                  placeholder="Enter the email"
                  label="Email"
                  icon={<MailIcon className="w-5 h-5" />}
                />
                <InputBox
                  type="password"
                  placeholder="Enter the password"
                  label="Password"
                  icon={<LockIcon className="w-5 h-5" />}
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
                  type="text"
                  placeholder="Enter your name"
                  label="Name"
                  icon={<NameIcon className="w-5 h-5" />}
                />
                <InputBox
                  type="text"
                  placeholder="Enter the username"
                  label="Username"
                  icon={<UserIcon className="w-5 h-5" />}
                />
                <InputBox
                  type="text"
                  placeholder="Enter the email"
                  label="Email"
                  icon={<MailIcon className="w-5 h-5" />}
                />
                <InputBox
                  type="password"
                  placeholder="Enter the password"
                  label="Password"
                  icon={<LockIcon className="w-5 h-5" />}
                />
              </motion.div>
            )}
          </AnimatePresence>
          <Button>Continue</Button>
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
