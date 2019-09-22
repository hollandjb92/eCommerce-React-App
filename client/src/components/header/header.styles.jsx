import styled /*, {css} */ from "styled-components";
import { Link } from "react-router-dom";

export const HeaderContainer = styled.div`
  height: 4.375rem;
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 1.5625rem;

  @media screen and (max-width: 800px) {
    height: 3.75rem;
    padding: 0.625rem;
    margin-bottom: 1.25rem;
  }
`;

export const LogoContainer = styled(Link)`
  height: 100%;
  width: 70px;
  padding: 25px;

  @media screen and (max-width: 800px) {
    width: 3.125rem;
    padding: 0;
  }
`;

export const OptionsContainer = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;

  @media screen and (max-width: 800px) {
    width: 80%;
  }
`;

export const OptionLink = styled(Link)`
  padding: 10px 15px;
  cursor: pointer;
`;
