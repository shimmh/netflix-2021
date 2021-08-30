import styled from "styled-components";

interface IMessage {
  text: string;
  color?: string;
}
const Container = styled.div`
  position: fixed;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -30%);
  z-index: 99;
`;

const Text = styled.span`
  color: ${(props) => props.color};
`;

const Message = ({ text, color = "#f40712" }: IMessage) => (
  <Container>
    <Text color={color}>{text}</Text>
  </Container>
);

export default Message;
