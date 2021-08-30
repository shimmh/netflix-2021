import styled from "styled-components";
import Loader from "Components/module/Loader";
import { SectionGrid } from "Components/module/Section";
import Poster from "Components/module/Poster";
import Message from "Components/module/Message";
import useSearchForm from "util/useSearchForm";
import { useSearchMore } from "util/useFetchMore";
import { useState } from "react";
import { ISearchProps } from "Routes/SearchRoute";

interface ISearch {
  results: ISearchProps;
  loading: boolean;
  error: string;
  initialSearch: boolean;
  term: string;
}

const Container = styled.div``;

const Form = styled.form`
  margin-bottom: 50px;
  width: 100%;
`;

const Input = styled.input`
  all: unset;
  font-size: 28px;
  width: 100%;
`;
const MoreSection = styled.div`
  display: flex;
  justify-content: center;
`;

const MoreButton = styled.button`
  margin: 30px 0px;
  width: 20%;
  height: 30px;
  color: ${(props) => props.theme.color.text};
  background-color: ${(props) => props.theme.color.background};
  border: solid 1px rgba(254, 254, 254, 0.2);
`;

const SearchForm = ({
  results,
  loading,
  error,
  initialSearch,
  term,
}: ISearch) => {
  const { register, handleSubmit, onSubmit } = useSearchForm();
  const [pageNumber, setPageNumber] = useState(2);
  const { moreMovie, moreShow, hasMore } = useSearchMore(pageNumber, term);
  const handleMoreData = () => {
    if (hasMore) {
      setPageNumber((prev) => prev + 1);
    }
  };
  return (
    <Container>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Input
          placeholder="Search Movies or TV Shows ..."
          {...register("search")}
        />
      </Form>
      {loading ? (
        <Loader />
      ) : (
        <>
          {results && (results.movie.length > 0 || results.show.length > 0) && (
            <>
              <SectionGrid title={`[ ${term} ]  검색 결과`}>
                {results.movie?.map((movie) => (
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
                {results.show?.map((show) => (
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

                {moreShow?.map((show) => (
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
                {moreMovie?.map((movie) => (
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
              </SectionGrid>
              {hasMore &&
                (results.movie.length === 20 ||
                  results.show.length === 20 ||
                  moreShow.length === 20 ||
                  moreMovie.length === 20) && (
                  <MoreSection>
                    <MoreButton onClick={handleMoreData}>
                      더보기 <i className="fas fa-chevron-down"></i>
                    </MoreButton>
                  </MoreSection>
                )}
            </>
          )}

          {error && <Message text={error} />}
          {initialSearch &&
            results &&
            results.show.length === 0 &&
            results.movie.length === 0 && (
              <Message
                text="검색어와 일치하는 컨텐츠가 없습니다."
                color="#e5e5e5"
              />
            )}
        </>
      )}
    </Container>
  );
};

export default SearchForm;
