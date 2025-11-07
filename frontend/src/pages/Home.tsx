import { Button } from "../components/Button";
import { InputBox } from "../components/InputBox";
import TabSwitch from "../components/TabSwitch";
import { LockIcon, MailIcon } from "../lib/Icons";

export const Home = () => {
  return (
    <div className="grid grid-cols-12 gap-2">
      <div className="h-screen items-center flex p-8 rounded-r-4xl col-span-3 w-full shadow-md shadow-neutral-600">
        <div className="w-full gap-4 flex flex-col">
          <TabSwitch
            tabs={[
              { id: "signin", label: "Sign In" },
              { id: "signup", label: "Sign Up" },
            ]}
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
          <Button>Continue</Button>
        </div>
      </div>
      <div className="h-screen w-full col-span-9 rounded-l-4xl bg-[radial-gradient(circle_at_1px_1px,_rgba(0,0,0,0.1)_1px,_transparent_0)] [background-size:10px_10px]"></div>
    </div>
  );
};
