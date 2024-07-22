import styled from "styled-components";
import { Container, Spinner } from "../styles";

const ContainerSpinner = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50%;

`;

const Loading = () => {

    return (
        <ContainerSpinner>
            <Spinner></Spinner>
        </ContainerSpinner>
    );
  };
  
  export default Loading;
  