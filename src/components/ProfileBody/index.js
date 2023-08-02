import "./index.css";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import ProfileCard from "../ProfileCard";
import { ColorRing } from "react-loader-spinner";

const ProfileBody = () => {
  const [profileDetails, setProfileDetails] = useState({});

  const [isLoading, setIsLoading] = useState(false);

  const loginId = Cookies.get("loginId");

  useEffect(() => {
    const getProfileDetails = async () => {
      setIsLoading(true);
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

      setProfileDetails(users[0]);
      setIsLoading(false);
    };
    getProfileDetails();
  }, [loginId]);

  return (
    <div className="profile-body">
      {isLoading ? (
        <div className="loader">
          <ColorRing
            visible={true}
            height="80"
            width="80"
            ariaLabel="blocks-loading"
            wrapperStyle={{}}
            wrapperClass="blocks-wrapper"
            colors={["#2D60FF", "#2D60FF", "#2D60FF", "#2D60FF", "#2D60FF"]}
          />
        </div>
      ) : (
        <ProfileCard profileItem={profileDetails} />
      )}
    </div>
  );
};

export default ProfileBody;
