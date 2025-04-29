import { useEffect, useState } from "react";
import axios from "axios";
import InputBox from "../components/InputBox";
import Button from "../components/Button";
import Card from "../components/Card";
import Heading from "../components/Heading";
import SubHeading from "../components/SubHeading";

export default function UpdateList({ onComplete, list }) {
  const [name, setName] = useState("");

  const listCreateRequest = async () => {
    try {
      const res = await axios.patch(
        `http://localhost:8000/api/v1/lists/update/${list._id}`,
        {
          name,
        },
        {
          withCredentials: true,
        },
      );
      console.log(res);
      setName("");
      onComplete();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setName(list.name);
  }, [list]);

  return (
    <div className="w-96">
      <Card>
        <Heading label={"Update List"} />
        <SubHeading label={"What Would You Like to Name Your List?"} />
        <InputBox
          onChange={(e) => {
            setName(e.target.value);
          }}
          label={"Title"}
          value={name}
          placeholder={"Enter your list name"}
          type={"text"}
        />
        <Button onClick={listCreateRequest} label={"Update List"} />
      </Card>
    </div>
  );
}
