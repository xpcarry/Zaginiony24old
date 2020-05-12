import React, { useState, useEffect } from "react";
import Notice from "./Notice";
import style from "../styles/home.module.css";
import {
  Divider,
  Header,
  Segment,
  Dropdown,
  Form,
  Button,
} from "semantic-ui-react";

const Home = () => {
  const [noticies, setNoticies] = useState([]);
  const [gender, setGender] = useState("");

  useEffect(() => {
    getNoticies();
  }, []);

  const getNoticies = async () => {
    const response = await fetch(`api/home?gender=${gender}`);
    const data = await response.json();
    if (data.isSuccess === true) {
      setNoticies(data.result);
    }
  };

  const updateGender = (event, { value }) => {
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
        {noticies.map((notice) => (
          <Notice
            key={notice.id}
            name={notice.name}
            surname={notice.surname}
            date={notice.date}
            gender={notice.gender}
            age={notice.age}
            lastseenplace={notice.lastSeenPlace}
          />
        ))}
      </div>
    </div>
  );
};
export default Home;
