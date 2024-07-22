import styled, { ThemeProvider } from 'styled-components';
import { IoSunnyOutline, IoMoonOutline } from "react-icons/io5";
import logo from '../../public/usabit-global.svg';
import { Container } from '../styles';
import { useState } from 'react';



const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: ${(props) => props.theme.body};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background: #f9f9f9;
  margin-bottom: 20px;
  padding-bottom: 10px;
`;

const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  display: flex;

  img {
    max-width: 180px;
  }
`;

const Profile = styled.div`
  font-size: 0.85rem;
  display: flex;

  @media (max-width:600px) {
    p {
        display: none;
    }
  }
`;


const ProfileImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-left: 20px;
`;

const Header = () => {
//   const [theme, setTheme] = useState('light');

//   const toggleTheme = () => {
//     setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
//   };

  return (
      <HeaderContainer>
        <Container>
        <Logo><img src={logo} alt="Usabit" /></Logo>
        {/* <div>
          {theme === 'light' ? (
            <DarkModeIcon onClick={toggleTheme} />
          ) : (
            <LightModeIcon onClick={toggleTheme} />
          )}
        </div> */}
        <Profile>
        <p><b>Daniel Curado Pellicano</b> ( Desenvolvedor Front End)</p>
        <ProfileImage src="https://media.licdn.com/dms/image/D4D03AQEWDK-4am8KXg/profile-displayphoto-shrink_100_100/0/1718583467860?e=1727308800&v=beta&t=X-r-FnElVt_0WJxLXfPDR5LhI4AnBL8IkczoLGBot2I" alt="Profile" />

        </Profile>
        

        </Container>
      </HeaderContainer>
  );
};

export default Header;
