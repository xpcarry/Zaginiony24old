import React, { useState, useEffect, useContext, SyntheticEvent } from 'react';
import Notice from './Notice';
import style from '../styles/home.module.scss';
import { Divider, Header, Segment, Dropdown, Form, Button } from 'semantic-ui-react';
import agent from '../api/agent';
import { RootStoreContext } from '../stores/rootStore';
import { INotice } from '../models/notice';
import { genderOptions, districtOptions } from '../form/options/options';


const Home = () => {
  const rootStore = useContext(RootStoreContext);
  const { isLoggedIn, user } = rootStore.userStore;

  const [noticies, setNoticies] = useState([]);
  const [gender, setGender] = useState("");
  const [district, setDistrict] = useState("");

  useEffect(() => {
    getNoticies();
    districtOptions.unshift({key:'wszystkie', value:'', text:'wszystkie'})
  }, []);

  const getNoticies = async () => {
    agent.Noticies.list(gender, district)
      .then(response => {
        console.log(response);
        if (response) {
          setNoticies(response);
        }
      });
  };

  const updateGender = (event: any, { value }: any) => {
    setGender(value);
  };

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
            placeholder="Wybierz płeć"
            selection
            options={genderOptions}
            onChange={updateGender}
          />
          <Dropdown
            style={{ marginRight: 20 }}
            placeholder="Województwo"
            selection
            search={true}
            options={districtOptions}
            onChange={() => (e:any, {value}:any) => {setDistrict(value)}}
          />
          <Button type="submit">Zastosuj</Button>
        </Form>
      </Segment>
      <Divider horizontal>
        <Header as="h4">Osoby Zaginione</Header>
      </Divider>
      <div className={style.noticeContainer}>
        {noticies.map((notice: INotice) => (
          <Notice key={notice.id} notice={notice}
          />
        ))}
      </div>
    </div>
  );
};
export default Home;
