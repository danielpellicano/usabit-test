import styled from "styled-components";
import { Container } from "../styles";

const Footer = () => {

    const Copyright = styled.div`
  text-align: center;
  width: 100%;
  padding:20px;
`;
   
    return (
      <footer>
        <Container>
            <Copyright>Teste para Vaga de Desenvolvedor Front-End da Usabit</Copyright>
        </Container>
      </footer>
    );
  };
  
  export default Footer;
  