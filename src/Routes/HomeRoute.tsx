import { moviesApi, tvApi } from "util/api";
import { useState, useEffect } from "react";
import { IMovie } from "Routes/MovieRoute";
import { IShow } from "Routes/ShowRoute";
import Loader from "Components/module/Loader";
import Home from "Components/template/Home/Home";
import { RouteComponentProps } from "react-router-dom";

const HomeRoute = (props: RouteComponentProps<any>) => {
  const [movies, setMovies] = useState<IMovie>({
    nowPlaying: [],
    upcoming: [],
    popular: [],
  });

  const [shows, setShows] = useState<IShow>({
    topRated: [],
    popular: [],
    airingToday: [],
  });

  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  async function handleHome() {
    try {
      const {
        data: { results: moviePopular },
      } = await moviesApi.popular();

      const {
        data: { results: showPopular },
      } = await tvApi.popular();

      setMovies({
        nowPlaying: [],
        popular: moviePopular,
        upcoming: [],
      });

      setShows({
        topRated: [],
        popular: showPopular,
        airingToday: [],
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
    handleHome();
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <Home shows={shows} movies={movies} error={error} />
  );
};
export default HomeRoute;
