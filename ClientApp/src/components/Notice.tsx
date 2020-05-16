import React from "react";
import style from '../styles/notice.module.css'
import placeholder from '../pictures/120x150.png'
import { INotice } from '../models/notice'

const Notice: React.FC<{notice: INotice}> = ({notice}) => {
    return(
        <div className={style.itemwrap}>
            <div className={style.picture}>
                <img src={placeholder} alt=''/>
            </div>
            <div className={style.details}>
                <h5>{notice.name} {notice.surname}</h5>
                <span className={style.age}>Lat: {notice.age}</span><br/>
                <span>Płeć: {notice.gender}</span><br/>
                <span>Miejsce zaginięcia: {notice.lastseenplace}</span><br/>
                <span>Data zaginięcia: {notice.dateOfDisappearance}</span>

            </div>
        </div>
        );
};

export default Notice;