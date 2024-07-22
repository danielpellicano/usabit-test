import  styled, { createGlobalStyle, keyframes } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    transition: all 0.5s ease;
    font-family: "Manrope", sans-serif;
  }
`;

const Container = styled.div`
    max-width: 1240px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    width: 100%;
    gap: 20px;
`;
// Definindo as animações usando keyframes
const rotate = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const prixClipFix = keyframes`
  0% { clip-path: polygon(50% 50%, 0 0, 0 0, 0 0, 0 0, 0 0); }
  50% { clip-path: polygon(50% 50%, 0 0, 100% 0, 100% 0, 100% 0, 100% 0); }
  75%, 100% { clip-path: polygon(50% 50%, 0 0, 100% 0, 100% 100%, 100% 100%, 100% 100%); }
`;

// Estilizando o componente Loader
const Spinner = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  position: relative;
  animation: ${rotate} 1s linear infinite;

  &::before, &::after {
    content: "";
    box-sizing: border-box;
    position: absolute;
    inset: 0;
    border-radius: 50%;
    border: 5px solid #000;
    animation: ${prixClipFix} 2s linear infinite;
  }

  &::after {
    inset: 8px;
    transform: rotate3d(90, 90, 0, 180deg);
    border-color: #2c58fd;
  }
`;


export { GlobalStyle, Container, Spinner };
