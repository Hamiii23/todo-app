import { useState, useEffect } from "react";
import Button from "../components/Button";
import Card from "../components/Card";
import Heading from "../components/Heading";
import InputBox from "../components/InputBox";
import PageWrapper from "../components/PageWrapper";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function UpdateProfile() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [user, setUser] = useState({});

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/v1/user/", {
        withCredentials: true,
      })
      .then((res) => {
        setUser(res.data.data);
      })
      .catch(() => {
        navigate("/signin");
      });
  }, []);

  const updateProfileRequest = async () => {
    try {
      const res = await axios.patch(
        "http://localhost:8000/api/v1/user/update",
        {
          name,
          username,
          email,
        },
        {
          withCredentials: true,
        },
      );
      console.log(res);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <PageWrapper>
        <Card>
          <Heading label={"Update Your Profile"} />
          <InputBox
            label={"Name"}
            onChange={(e) => setName(e.target.value)}
            placeholder={user.name}
          />
          <InputBox
            label={"Username"}
            onChange={(e) => setUsername(e.target.value)}
            placeholder={user.username}
          />
          <InputBox
            label={"Email"}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={user.email}
          />
          <Button label={"Update Profile"} onClick={updateProfileRequest} />
        </Card>
      </PageWrapper>
    </div>
  );
}
