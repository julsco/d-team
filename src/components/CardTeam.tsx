import React from "react";
import { ITeam } from "../helpers/interfaces";
import "./cards.css";


interface ICardTeam{
    team: ITeam,
    handleAdd?: (event: React.MouseEvent) => void,
}

export default function CardTeam(props:ICardTeam) {

    if (props.team) {
     return (
        <div onClick={props.handleAdd} className="cards">
            <div className="card__team">
                <img src={props.team.imgURL} />
            </div>
            <div className="card__team">
                {props.team.name}
            </div>
        </div>





);
}else{
    return (<></>)
}
}
{/*  <Card onClick={props.handleAdd} style={{ width: '15rem' }}>
 <Card.Img variant="top" src="https://resources.premierleague.com/premierleague/badges/t3.svg" />
 <Card.Body>
     <Card.Title >{props.team}</Card.Title>
 </Card.Body>
 </Card> */}