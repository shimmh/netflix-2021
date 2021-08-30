import styled from "styled-components";
import { IMovie } from "Routes/MovieRoute";
import { IShow } from "Routes/ShowRoute";
import PosterSwiper from "Components/module/Home/PosterSwiper";
import Message from "Components/module/Message";

interface IHome {
  movies: IMovie;
  shows: IShow;
  error: string;
}

const Container = styled.div`
  height: calc(100vh - 60px);
  overflow: hidden;
`;

const Title = styled.div`
  margin-top: 2%;
  text-align: left;
  height: 20%;
  font-weight: 700;
  /* font-size: 3.125rem; */
  font-size: 47px;
`;

const Main = styled.div`
  color: ${(props) => props.theme.color.red};
  opacity: 0.7;
`;

const Home = ({ shows, movies, error }: IHome) => {
  return (
    <Container>
      <Title>
        <Main>최신 트랜드</Main>
        영화, 프로그램을 한눈에
      </Title>
      <PosterSwiper shows={shows} movies={movies} />
      {error && <Message text={error} />}
    </Container>
  );
};

export default Home;
