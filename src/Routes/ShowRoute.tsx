import { useState, useEffect } from "react";
import { tvApi } from "util/api";
import Show from "Components/template/Show/Show";
import Loader from "Components/module/Loader";

export interface IShow {
  topRated: IShowProps[];
  popular: IShowProps[];
  airingToday: IShowProps[];
}

export interface IShowProps {
  id: number;
  poster_path: string;
  name: string;
  vote_average: number;
  isMovie: boolean;
}

export default function ShowRoute() {
  const [shows, setShows] = useState<IShow>({
    topRated: [],
    popular: [],
    airingToday: [],
  });

  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  async function handleShow() {
    try {
      const {
        data: { results: topRated },
      } = await tvApi.topRated();

      const {
        data: { results: popular },
      } = await tvApi.popular();
      const {
        data: { results: airingToday },
      } = await tvApi.airingToday();
      setShows({
        topRated: topRated,
        popular: popular,
        airingToday: airingToday,
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
    handleShow();
  }, []);

  return loading ? <Loader /> : <Show shows={shows} error={error} />;
}
