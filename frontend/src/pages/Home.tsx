import { Button } from "../components/Button";
import { InputBox } from "../components/InputBox";

export const Home = () => {
  return (
    <div className="grid grid-cols-12 gap-2">
      <div className="h-screen items-center flex p-8 rounded-r-4xl col-span-3 w-full shadow-md shadow-neutral-600">
        <div className="w-full">
          <div className="mx-auto text-center">
            <h1 className="text-3xl font-semibold">Login</h1>
          </div>
          <InputBox type="text" placeholder="Enter the email" label="Email" />
          <InputBox
            type="password"
            placeholder="Enter the password"
            label="Password"
          />
          <h3 className="my-4">
            Don't have an account?{" "}
            <a
              className="text-blue-600 hover:underline hover:text-blue-900 transition duration-300"
              href=""
            >
              Sign Up
            </a>
          </h3>
          <Button label={"Sign Up"}></Button>
        </div>
      </div>
      <div className="h-screen w-full col-span-9 rounded-l-4xl bg-[radial-gradient(circle_at_1px_1px,_rgba(0,0,0,0.1)_1px,_transparent_0)] [background-size:10px_10px]"></div>
    </div>
  );
};
