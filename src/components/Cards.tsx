import React from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { IPlayer } from "../helpers/interfaces";
import "./cards.css";

interface ICard{
    player?: IPlayer;
    buttonText: string;
    handleClick: (event: React.MouseEvent) => void,
}


export default function Cards(props:ICard) {

    if (props.player) {
     return (
        <div className="cards">
            
                <Card style={{ width: '15rem', height:"35rem"}}>
                <Card.Img style={{ width: '15rem', height:"18rem"}} variant="top" 
                            src="https://resources.premierleague.com/premierleague/photos/players/110x140/Photo-Missing.png" />
                <Card.Body className="card__body">
                    <Card.Title className="player__name">{props.player.fullName}</Card.Title>
                    <Card.Text className="attributeStyle">
                        
                            <li>Position: {props.player.position}</li>
                            <li>Nationality: {props.player.nationality}</li>
                            <li>Number: {props.player.number}</li>
                            <li>Team: {props.player.team}</li>
                       
                    </Card.Text>
                    <Button onClick={props.handleClick} variant="primary">{props.buttonText}</Button>
                </Card.Body>
                </Card>
                
            
        </div>
        
      );
    }else{
        return (<></>)
    }
}