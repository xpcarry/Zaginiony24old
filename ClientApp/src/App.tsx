import React, { useEffect, useContext } from "react";
import { Layout } from "./components/Layout";
import Home from "./components/Home";
import Login from "./components/Login";
import {
  Route,
  withRouter,
  RouteComponentProps
} from 'react-router-dom';
import { RootStoreContext } from "./stores/rootStore";
import LoadingComponent from './form/LoadingComponent';
import { observer } from 'mobx-react-lite';
import "./custom.css";
import Register from "./components/Register";
import NoticeDetails from "./components/NoticeDetails";
import AddNotice from "./components/AddNotice";

const App: React.FC<RouteComponentProps> = ({location}) => {
  const rootStore = useContext(RootStoreContext);
  const { setAppLoaded, token, appLoaded } = rootStore.commonStore;
  const { getUser } = rootStore.userStore;

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
      <Route path="/account/login" component={Login} />
      <Route path="/account/register" component={Register} />
      <Route path="/notice/details/:id" component={NoticeDetails}/>
      <Route path="/notice/addnotice/" component={AddNotice}/>
    </Layout>
  );
};

export default withRouter(observer(App));
