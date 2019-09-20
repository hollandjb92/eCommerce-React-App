import React from "react";

import SignIn from "../../components/sign-in/sign-in.component";
import SignUp from "../../components/sign-up/sign-up.component";
import { RegistrationContainer } from "./registration.styles";

const Registration = () => {
  return (
    <RegistrationContainer>
      <SignIn />
      <SignUp />
    </RegistrationContainer>
  );
};

export default Registration;
