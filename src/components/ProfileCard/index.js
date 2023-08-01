import "./index.css";

const ProfileCard = (props) => {
  const { profileItem } = props;

  const { date_of_birth, email, name } = profileItem;
  return (
    <div className="profile-card">
      <img
        src="https://res.cloudinary.com/djzsbpran/image/upload/v1690822928/pexels-christina-morillo-1181690_1_v51dkq.png"
        alt="profile"
        className="profile-image"
      />
      <div className="details-container">
        <div className="left-con">
          <div>
            <label>Your Name</label>
            <p className="pro-field">{name}</p>
          </div>
          <div>
            <label>Email</label>
            <p className="pro-field">{email}</p>
          </div>
          <div>
            <label>Date of Birth</label>
            <p className="pro-field">{date_of_birth}</p>
          </div>
          <div>
            <label>Present Address</label>
            <p className="pro-field">San Jose, California, USA</p>
          </div>
          <div>
            <label>Postal Code</label>
            <p className="pro-field">45962</p>
          </div>
        </div>

        <div className="right-con">
          <div>
            <label>User Name</label>
            <p className="pro-field">{name}</p>
          </div>

          <div>
            <label>Password</label>
            <p className="pro-field">*********</p>
          </div>

          <div>
            <label>Permanent Address</label>
            <p className="pro-field">San Jose, California, USA</p>
          </div>
          <div>
            <label>City</label>
            <p className="pro-field">San Jose</p>
          </div>

          <div>
            <label>Country</label>
            <p className="pro-field">USA</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
