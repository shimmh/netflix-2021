import styled, { keyframes } from "styled-components";

const Container = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
`;

const DotAnimation = keyframes`
    0%{
        background : #440A67;
    }
    30%{
        background: #822659;
    }
    50% {
        background : #B34180;
    }
    80% {
        background : #E36BAE;
    }
    100% {
        background: #440A67;
    }
   
`;

const Dots = styled.div`
  transform: translate(-50%, -50%);
  display: flex;
  z-index: 1;
`;

const Dot = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: ${(props) => props.theme.color.purple};
  margin: 0 2px;
  animation: ${DotAnimation} 1s ease-in-out infinite;
  &:first-child() {
    animation-delay: 0.1s;
  }
  &:nth-child(2) {
    animation-delay: 0.2s;
  }
  &:nth-child(3) {
    animation-delay: 0.3s;
  }
`;

const Loading = () => {
  return (
    <Container>
      <Dots>
        <Dot></Dot>
        <Dot></Dot>
        <Dot></Dot>
      </Dots>
    </Container>
  );
};

export default Loading;
