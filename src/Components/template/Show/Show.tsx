import { IShow, IShowProps } from "Routes/ShowRoute";
import styled from "styled-components";
import { Section, SectionGrid } from "Components/module/Section";
import { settings, StyledSlider } from "Components/module/Carousel";
import Poster from "Components/module/Poster";
import { useRef, useCallback, useState } from "react";
import useFetchMore from "util/useFetchMore";
import Message from "Components/module/Message";

interface IShowCheck {
  shows: IShow;
  error: string;
}

const Container = styled.div``;

const Show = ({ shows, error }: IShowCheck) => {
  const [pageNumber, setPageNumber] = useState(2);
  const { moreShow, hasMore, loading } = useFetchMore(pageNumber, "show");

  const observer = useRef<IntersectionObserver>();

  const lastBookElementRef = useCallback(
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
      <Section title="현재 방영중인 프로그램">
        <StyledSlider {...settings}>
          {shows.airingToday?.map((show: IShowProps) => (
            <Poster
              key={show.id}
              id={show.id}
              imageUrl={show.poster_path}
              title={show.name}
              rating={show.vote_average}
              isMovie={false}
              isSmall={false}
            />
          ))}
        </StyledSlider>
      </Section>
      {/* <Section title="인기 있는 프로그램">
        <StyledSlider {...settings}>
          {shows.popular?.map((show: IShowProps) => (
            <Poster
              key={show.id}
              id={show.id}
              imageUrl={show.poster_path}
              title={show.name}
              rating={show.vote_average}
              isMovie={false}
              isSmall={false}
            />
          ))}
        </StyledSlider>
      </Section> */}
      <Section title="요즘 뜨는 프로그램">
        <StyledSlider {...settings}>
          {shows.topRated?.map((show: IShowProps) => (
            <Poster
              key={show.id}
              id={show.id}
              imageUrl={show.poster_path}
              title={show.name}
              rating={show.vote_average}
              isMovie={false}
              isSmall={false}
            />
          ))}
        </StyledSlider>
      </Section>
      <SectionGrid title="인기 있는 프로그램">
        {shows.popular?.map((show: IShowProps) => (
          <Poster
            key={show.id}
            id={show.id}
            imageUrl={show.poster_path}
            title={show.name}
            rating={show.vote_average}
            isMovie={false}
            isSmall={true}
          />
        ))}
        {moreShow?.map((show: IShowProps) => (
          <Poster
            key={show.id}
            id={show.id}
            imageUrl={show.poster_path}
            title={show.name}
            rating={show.vote_average}
            isMovie={false}
            isSmall={true}
          />
        ))}
        <div ref={lastBookElementRef} />
      </SectionGrid>
      {error && <Message text={error} />}
    </Container>
  );
};

export default Show;
