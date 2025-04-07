import { useState } from "react";
import axios from "axios";
import InputBox from "../components/InputBox";
import Button from "../components/Button";
import Card from "../components/Card";
import Heading from "../components/Heading";
import SubHeading from "../components/SubHeading";

export default function AddList() {
  const [name, setName] = useState("");

  const listCreateRequest = async () => {
    try {
      const res = await axios.post(
        "http://localhost:8000/api/v1/lists/create",
        {
          name,
        },
        {
          withCredentials: true,
        },
      );
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-96">
      <Card>
        <Heading label={"Add List"} />
        <SubHeading label={"What Would You Like to Name Your List?"} />
        <InputBox
          onChange={(e) => {
            setName(e.target.value);
          }}
          label={"Title"}
          placeholder={"Enter your list name"}
          type={"text"}
        />
        <Button onClick={listCreateRequest} label={"Add List"} />
      </Card>
    </div>
  );
}
