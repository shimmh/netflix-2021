import axios from "axios";

const api = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  params: {
    api_key: "4c834bc8a1eb1cda919768461786d872",
    language: "ko-KR",
    region: "KR",
  },
});

export const moviesApi = {
  nowPlaying: (page = 1) => api.get("movie/now_playing", { params: { page } }),
  upcoming: () => api.get("movie/upcoming"),
  popular: (page = 1) => api.get("movie/popular", { params: { page } }),
  movieDetail: (id: number) =>
    api.get(`movie/${id}`, {
      params: {
        append_to_response: "videos",
      },
    }),
  movieSimilar: (id: number) => api.get(`movie/${id}/similar`),
  search: (term: string, page = 1) =>
    api.get("search/movie", {
      params: { query: encodeURIComponent(term), page },
    }),
};

export const tvApi = {
  topRated: () => api.get("tv/top_rated"),
  popular: (page = 1) => api.get("tv/popular", { params: { page } }),
  airingToday: (page = 1) => api.get("tv/airing_today", { params: { page } }),
  showDetail: (id: number) =>
    api.get(`tv/${id}`, {
      params: {
        append_to_response: "videos",
      },
    }),
  showSimilar: (id: number) => api.get(`tv/${id}/similar`),
  search: (term: string, page = 1) =>
    api.get("search/tv", {
      params: {
        query: encodeURIComponent(term),
        page,
      },
    }),
};
