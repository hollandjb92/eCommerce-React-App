import React from "react";

import "./registration.styles.scss";
import SignIn from "../../components/sign-in/sign-in.component";
import SignUp from "../../components/sign-up/sign-up.component";

const Registration = () => {
  return (
    <div className="register">
      <SignIn />
      <SignUp />
    </div>
  );
};

export default Registration;
