import { moviesApi } from "util/api";
import { useState, useEffect } from "react";
import Loader from "Components/module/Loader";
import Movie from "Components/template/Movie/Movie";

export interface IMovie {
  nowPlaying: IMovieProps[];
  popular: IMovieProps[];
  upcoming: IMovieProps[];
}

export interface IMovieProps {
  id: number;
  poster_path: string;
  title: string;
  vote_average: number;
  isMovie: boolean;
}

export default function MovieRoute() {
  const [movies, setMovies] = useState<IMovie>({
    nowPlaying: [],
    upcoming: [],
    popular: [],
  });
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  async function handleMovie() {
    try {
      const {
        data: { results: nowPlaying },
      } = await moviesApi.nowPlaying();

      const {
        data: { results: upcoming },
      } = await moviesApi.upcoming();

      const {
        data: { results: popular },
      } = await moviesApi.popular();

      setMovies({
        nowPlaying: nowPlaying,
        popular: popular,
        upcoming: upcoming,
      });
    } catch {
      setError(
        "정보를 읽어올 수 없습니다. 잠시후 다시 시도해 주시기 바랍니다."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    handleMovie();
  }, []);

  return loading ? <Loader /> : <Movie movies={movies} error={error} />;
}
