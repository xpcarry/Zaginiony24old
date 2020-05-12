import React from "react";
import style from '../styles/notice.module.css'
import placeholder from '../pictures/120x150.png'

const Notice = ({
    name,
    surname,
    gender,
    lastseenplace,
    age,
    date
}) => {
    return(
        <div className={style.itemwrap}>
            <div className={style.picture}>
                <img src={placeholder} />
            </div>
            <div className={style.details}>
                <h5>{name} {surname}</h5>
                <span className={style.age}>Lat: {age}</span><br/>
                <span>Płeć: {gender}</span><br/>
                <span>Miejsce zaginięcia: {lastseenplace}</span><br/>
                <span>Data zaginięcia: {date}</span>

            </div>
        </div>
        );
};

export default Notice;