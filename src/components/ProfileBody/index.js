import "./index.css";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import ProfileCard from "../ProfileCard";

const ProfileBody = () => {
  const [profileDetails, setProfileDetails] = useState({});

  const loginId = Cookies.get("loginId");

  useEffect(() => {
    const getProfileDetails = async () => {
      const url = "https://bursting-gelding-24.hasura.app/api/rest/profile";

      const headers = {
        "content-type": "application/json",
        "x-hasura-admin-secret":
          "g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF",
        "x-hasura-role": "user",
        "x-hasura-user-id": loginId,
      };

      const response = await axios.get(url, { headers: headers });
      const responseData = await response.data;

      const { users } = responseData;
      console.log(users[0]);

      setProfileDetails(users[0]);
    };
    getProfileDetails();
  }, [loginId]);

  return (
    <div className="profile-body">
      <ProfileCard profileItem={profileDetails} />
    </div>
  );
};

export default ProfileBody;
