import Header from "./template/Common/Header";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import HomeRoute from "Routes/HomeRoute";
import MovieRoute from "Routes/MovieRoute";
import ShowRoute from "Routes/ShowRoute";
import SearchRoute from "Routes/SearchRoute";
import { DetailMovieRoute, DetailShowRoute } from "Routes/DetailRoute";

interface IRoute {
  path: string;
  name: string;
  exact: boolean;
  component: any;
  props?: any;
}

const routes: IRoute[] = [
  {
    path: "/",
    name: "Home",
    component: HomeRoute,
    exact: true,
  },
  {
    path: "/movie",
    name: "Movie",
    component: MovieRoute,
    exact: true,
  },
  {
    path: "/movie/:id",
    name: "Movie Detail",
    component: DetailMovieRoute,
    exact: true,
  },

  {
    path: "/show",
    name: "TV",
    component: ShowRoute,
    exact: true,
  },
  {
    path: "/show/:id",
    name: "TV Detail",
    component: DetailShowRoute,
    exact: true,
  },
  {
    path: "/search",
    name: "Search",
    component: SearchRoute,
    exact: true,
  },
];

const Router = () => {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        {routes.map((route, index) => {
          return (
            <Route
              key={index}
              path={route.path}
              exact={route.exact}
              component={route.component}
              // render={(props: RouteComponentProps<any>) => (
              //   <route.component {...props} {...route.props} />
              // )}
            />
          );
        })}
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
