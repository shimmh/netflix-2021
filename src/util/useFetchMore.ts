import { useState, useEffect } from "react";
import { IShowProps } from "Routes/ShowRoute";
import { IMovieProps } from "Routes/MovieRoute";
import { tvApi, moviesApi } from "util/api";

export default function useFetchMore(pageNumber: number, field: string) {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [moreMovie, setMoreMovie] = useState<IMovieProps[]>([]);
  const [moreShow, setMoreShow] = useState<IShowProps[]>([]);

  const [hasMore, setHasMore] = useState<boolean>(false);

  async function handleFetchMore() {
    setLoading(true);
    setError(false);

    try {
      if (field === "show") {
        const {
          data: { results },
        } = await tvApi.popular(pageNumber);

        setMoreShow((prev) => {
          return [...new Set([...prev, ...results])];
        });

        setHasMore(results.length > 0);
      } else if (field === "movie") {
        const {
          data: { results },
        } = await moviesApi.popular(pageNumber);

        setMoreMovie((prev) => {
          return [...new Set([...prev, ...results])];
        });

        setHasMore(results.length > 0);
      }
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    handleFetchMore();
  }, [pageNumber]);

  return { loading, moreMovie, moreShow, hasMore };
}

export function useSearchMore(pageNumber: number, term: string) {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  const [moreMovie, setMoreMovie] = useState<IMovieProps[]>([]);
  const [moreShow, setMoreShow] = useState<IShowProps[]>([]);
  const [hasMore, setHasMore] = useState<boolean>(true);

  async function handleSearchMore() {
    setLoading(true);
    setError(false);

    try {
      if (typeof term === "string" && term !== "" && term !== null) {
        const {
          data: { results: movie },
        } = await moviesApi.search(term, pageNumber);

        const {
          data: { results: show },
        } = await tvApi.search(term, pageNumber);

        setMoreMovie((prev) => {
          return [...new Set([...prev, ...movie])];
        });

        setMoreShow((prev) => {
          return [...new Set([...prev, ...show])];
        });

        setHasMore(movie.length > 0 || show.length > 0);
      }
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    handleSearchMore();
  }, [pageNumber]);

  return { loading, moreMovie, moreShow, hasMore };
}
