import { useState, useEffect } from "react";
import { RouteComponentProps } from "react-router-dom";
import { moviesApi, tvApi } from "util/api";
import DetailShow from "Components/template/Detail/DetailShow";
import DetailMovie from "Components/template/Detail/DetailMovie";
import Loader from "Components/module/Loader";
import { IMovieProps } from "./MovieRoute";
import { IShowProps } from "./ShowRoute";

export interface IMovieDetail {
  detail: IMovieDetailProps;
  similar: IMovieProps[];
}

export interface IShowDetail {
  detail: IShowDetailProps;
  similar: IShowProps[];
}
export interface IMovieDetailProps {
  id: number;
  adult: boolean;
  backdrop_path: string;
  genres: { name: string }[];
  imdb_id: string;
  overview: string;
  poster_path: string;
  production_companies: { name: string }[];
  production_countries: { name: string }[];
  release_date: string;
  runtime: number;
  title: string;
  vote_average: number;
  videos: IVideo;
}

export interface IShowDetailProps {
  id: number;
  backdrop_path: string;
  created_by: ICreatedBy[];
  first_air_date: string;
  episode_run_time: number[];
  genres: { name: string }[];
  homepage: string;
  name: string;
  networks: INetwork[];
  overview: string;
  poster_path: string;
  production_companies: { name: string }[];
  production_countries: { name: string }[];
  vote_average: number;
  seasons: ISeasons[];
  videos: IVideo;
}

interface ICreatedBy {
  name: string;
  profile_path: string;
}
interface INetwork {
  name: string;
  logo_path: string;
  origin_country: string;
}
interface ISeasons {
  air_date: "string";
  name: "string";
  poster_path: "string";
  episode_count: number;
}

interface IVideo {
  results: {
    name: string;
    key: string;
    site: string;
    size: number;
    type: string;
    official: boolean;
  }[];
}

export const initialMovieDetailProps = {
  id: 0,
  adult: false,
  backdrop_path: "",
  genres: [],
  imdb_id: "",
  overview: "",
  poster_path: "",
  production_companies: [],
  production_countries: [],
  release_date: "",
  runtime: 0,
  title: "",
  vote_average: 0,
  videos: {
    results: [
      {
        name: "",
        key: "",
        site: "",
        size: 0,
        type: "",
        official: false,
      },
    ],
  },
};

export const initialShowDetailProps = {
  id: 0,
  backdrop_path: "",
  created_by: [],
  first_air_date: "",
  episode_run_time: [],
  genres: [],
  homepage: "",
  name: "",
  networks: [],
  overview: "",
  poster_path: "",
  production_companies: [],
  production_countries: [],
  vote_average: 0,
  seasons: [],
  videos: {
    results: [
      {
        name: "",
        key: "",
        site: "",
        size: 0,
        type: "",
        official: false,
      },
    ],
  },
};

export function DetailMovieRoute(props: RouteComponentProps<any>) {
  const [result, setResult] = useState<IMovieDetail>({
    detail: initialMovieDetailProps,
    similar: [],
  });
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  const {
    match: {
      params: { id },
    },
    history: { push },
  } = props;

  async function handleDetail() {
    const parsedId = Number(id);

    if (isNaN(parsedId)) {
      return push("/");
    }

    try {
      const { data: detail } = await moviesApi.movieDetail(parsedId);

      const {
        data: { results: similar },
      } = await moviesApi.movieSimilar(parsedId);

      setResult({ detail: detail, similar: similar });
    } catch {
      setError("Can't find anything");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    handleDetail();
  }, []);

  useEffect(() => {
    handleDetail();
  }, [id]);

  return loading ? <Loader /> : <DetailMovie {...result} />;
}

export function DetailShowRoute(props: RouteComponentProps<any>) {
  const [result, setResult] = useState<IShowDetail>({
    detail: initialShowDetailProps,
    similar: [],
  });

  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  const {
    match: {
      params: { id },
    },
    history: { push },
  } = props;

  async function handleDetail() {
    const parsedId = Number(id);

    if (isNaN(parsedId)) {
      return push("/");
    }

    try {
      const { data: detail } = await tvApi.showDetail(parsedId);
      const {
        data: { results: similar },
      } = await tvApi.showSimilar(parsedId);

      setResult({
        detail: detail,
        similar: similar,
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
    handleDetail();
  }, []);

  useEffect(() => {
    handleDetail();
  }, [id]);

  return loading ? <Loader /> : <DetailShow {...result} />;
}
