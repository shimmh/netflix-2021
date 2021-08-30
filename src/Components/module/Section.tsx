import { ReactNode } from "react";
import styled from "styled-components";

interface ISection {
  title: string;
  children: ReactNode;
}

const Container = styled.div`
  :not(:last-child) {
    margin-bottom: 40px;
  }
`;

const Title = styled.div`
  :first-child {
    margin-top: 20px;
  }
  margin-left: 5px;
  font-size: 20px;
  font-weight: 500;
`;

const Content = styled.div`
  margin-top: 20px;
`;

const Grid = styled.div`
  margin-top: 20px;
  display: grid;
  grid-template-columns: repeat(auto-fill, 125px);
  grid-gap: 25px;
`;

export function Section({ title, children }: ISection) {
  return (
    <Container>
      <Title>{title}</Title>
      <Content>{children}</Content>
    </Container>
  );
}

export function SectionGrid({ title, children }: ISection) {
  return (
    <Container>
      <Title>{title}</Title>
      <Grid>{children}</Grid>
    </Container>
  );
}
export default Section;
