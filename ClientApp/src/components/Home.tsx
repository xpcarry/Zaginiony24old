import React, { useState, useEffect, useContext, SyntheticEvent } from 'react';
import Notice from './Notice';
import style from '../styles/home.module.css';
import {Divider, Header, Segment, Dropdown, Form, Button } from 'semantic-ui-react';
import agent from '../api/agent';
import {RootStoreContext} from '../stores/rootStore';
import { INotice } from '../models/notice';


const Home = () => {
  const rootStore = useContext(RootStoreContext);
  const {isLoggedIn, user} = rootStore.userStore;

  const [noticies, setNoticies] = useState([]);
  const [gender, setGender] = useState("");

  useEffect(() => {
    getNoticies();
  }, []);

  const getNoticies = async () => {
    agent.Noticies.list(gender)
    .then(response =>{
      console.log(response);
      if (response){
        setNoticies(response);
      }
    });
  };

  const updateGender = (event:any, { value }:any) => {
    setGender(value);
  };

  const genderOptions = [
    {
      key: "kobieta",
      text: "Kobieta",
      value: "Kobieta",
    },
    {
      key: "mezczyzna",
      text: "Mężczyzna",
      value: "Mężczyzna",
    },
    {
      key: "wszyscy",
      text: "Wszyscy",
      value: "",
    },
  ];

  return (
    <div>
      <h2>Rejestr osób zaginionych</h2>
      <p>
        Dzięki bazie można sprawdzić, czy dana osoba została zgłoszona jako
        zaginiona. Aby przeszukać nasze zasoby, w odpowiednie pola wpisz
        dostępne informacje.
      </p>
      <Segment>
        <Header as="h4">Filtruj osoby</Header>
        <Form onSubmit={getNoticies}>
          <Dropdown
            style={{ marginRight: 20 }}
            label="dsadas"
            placeholder="Wybierz płeć"
            selection
            options={genderOptions}
            onChange={updateGender}
          />
          <Button type="submit">Zastosuj</Button>
        </Form>
      </Segment>
      <Divider horizontal>
        <Header as="h4">Osoby Zaginione</Header>
      </Divider>
      <div className={style.noticeContainer}>
        {noticies.map((notice:INotice) => (
          <Notice key={notice.id} notice={notice}
          />
        ))}
      </div>
    </div>
  );
};
export default Home;
