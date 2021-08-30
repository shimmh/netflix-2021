import styled from "styled-components";
import { Section, SectionGrid } from "Components/module/Section";
import Poster from "Components/module/Poster";
import { settings, StyledSlider } from "Components/module/Carousel";
import { IMovieProps, IMovie } from "Routes/MovieRoute";
import { useRef, useCallback, useState } from "react";
import useFetchMore from "util/useFetchMore";
import Message from "Components/module/Message";

interface IMovieCheck {
  movies: IMovie;
  error: string;
}
const Container = styled.div``;

const Movie = ({ movies, error }: IMovieCheck) => {
  const [pageNumber, setPageNumber] = useState(2);
  const { moreMovie, hasMore, loading } = useFetchMore(pageNumber, "movie");

  const observer = useRef<IntersectionObserver>();

  const lastElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPageNumber((prevPageNumber) => prevPageNumber + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  return (
    <Container>
      <Section title="현재 상영중인 영화">
        <StyledSlider {...settings}>
          {movies.nowPlaying?.map((movie: IMovieProps) => (
            <Poster
              key={movie.id}
              id={movie.id}
              imageUrl={movie.poster_path}
              title={movie.title}
              rating={movie.vote_average}
              isMovie={true}
              isSmall={false}
            />
          ))}
        </StyledSlider>
      </Section>
      <Section title="개봉 예정 영화">
        <StyledSlider {...settings}>
          {movies.upcoming?.map((movie: IMovieProps) => (
            <Poster
              key={movie.id}
              id={movie.id}
              imageUrl={movie.poster_path}
              title={movie.title}
              rating={movie.vote_average}
              isMovie={true}
              isSmall={false}
            />
          ))}
        </StyledSlider>
      </Section>

      <SectionGrid title="인기 있는 영화">
        {movies.popular?.map((movie: IMovieProps) => (
          <Poster
            key={movie.id}
            id={movie.id}
            imageUrl={movie.poster_path}
            title={movie.title}
            rating={movie.vote_average}
            isMovie={true}
            isSmall={true}
          />
        ))}
        {moreMovie?.map((movie: IMovieProps) => (
          <Poster
            key={movie.id}
            id={movie.id}
            imageUrl={movie.poster_path}
            title={movie.title}
            rating={movie.vote_average}
            isMovie={true}
            isSmall={true}
          />
        ))}
        <div ref={lastElementRef} />
        {/* <div>{loading && <Loader />}</div> */}
      </SectionGrid>
      {error && <Message text={error} />}
    </Container>
  );
};

export default Movie;
