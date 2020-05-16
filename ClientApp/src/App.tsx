import React, { useEffect, useContext } from "react";
import { Layout } from "./components/Layout";
import Home from "./components/Home";
import { FetchData } from "./components/FetchData";
import Login from "./components/Login";
import { Counter } from "./components/Counter";
import {
  Route,
  withRouter,
  RouteComponentProps,
  Switch
} from 'react-router-dom';
import { RootStoreContext } from "./stores/rootStore";
import LoadingComponent from './form/LoadingComponent';
import { observer } from 'mobx-react-lite';
import "./custom.css";

const App: React.FC<RouteComponentProps> = ({location}) => {
  const rootStore = useContext(RootStoreContext);
  const { setAppLoaded, token, appLoaded } = rootStore.commonStore;
  const { getUser, isLoggedIn } = rootStore.userStore;

  useEffect(() => {
    if (token) {
      getUser().finally(() => setAppLoaded())
    } else {
      setAppLoaded();
    }
  }, [getUser, setAppLoaded, token])

  if (!appLoaded)  return <LoadingComponent content='Ładowanie aplikacji...' />

  return (
    <Layout>
      <Route exact path="/" component={Home} />
      <Route path="/counter" component={Counter} />
      <Route path="/fetch-data" component={FetchData} />
      <Route path="/account/login" component={Login} />
    </Layout>
  );
};

export default withRouter(observer(App));
