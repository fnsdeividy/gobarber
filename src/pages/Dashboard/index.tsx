import React from "react";
import { Container, Header, HeaderContent, Profile } from "./styles";
import LogoImg from "../../assets/logo.svg";
import { FiPower } from "react-icons/fi";
import { useAuth } from "../../hooks/Auth";

const Dashboard: React.FC = () => {
    const { signOut, user } = useAuth()

  return (
    <Container>
      <Header>
        <HeaderContent>
          <img src={LogoImg} alt="Gobarber" />
          <Profile>
            <img
              src={user.avatar_url }
              alt={user.name}
            />
            <div>
              <span>Bem-vindo,</span>
              <strong>{user.name}</strong>
            </div>
          </Profile>

          <button type="button" onClick={signOut}>
            <FiPower />
          </button>
        </HeaderContent>
      </Header>
    </Container>
  );
};

export default Dashboard;
