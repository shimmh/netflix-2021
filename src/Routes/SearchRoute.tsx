import { useState, useEffect } from "react";
import { moviesApi, tvApi } from "util/api";
import SearchForm from "Components/template/Search/SearchForm";
import { IMovieProps } from "Routes/MovieRoute";
import { IShowProps } from "Routes/ShowRoute";
import { RouteComponentProps } from "react-router-dom";

export interface ISearchProps {
  movie: IMovieProps[];
  show: IShowProps[];
}
const SearchRoute = (props: RouteComponentProps<any>) => {
  const {
    location: { state },
  } = props;

  const [results, setResults] = useState<ISearchProps>({
    movie: [],
    show: [],
  });

  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [initialSearch, setInitialSearch] = useState(false);
  const [term, setTerm] = useState("");

  async function handleSearch() {
    try {
      if (typeof state === "string" && state !== null && state !== "") {
        const term: string = state;
        setTerm(term);
        setLoading(true);
        setInitialSearch(true);

        const {
          data: { results: movie },
        } = await moviesApi.search(term);

        const {
          data: { results: show },
        } = await tvApi.search(term);

        setResults({
          movie: movie,
          show: show,
        });
      }
    } catch (e) {
      setError(
        "정보를 읽어올 수 없습니다. 잠시후 다시 시도해 주시기 바랍니다."
      );
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    handleSearch();
  }, [state]);

  return (
    <SearchForm
      results={results}
      loading={loading}
      error={error}
      initialSearch={initialSearch}
      term={term}
    />
  );
};

export default SearchRoute;
