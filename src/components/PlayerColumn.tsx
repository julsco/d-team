import React, { Dispatch, SetStateAction } from 'react';
import '../index.css';
import { IPlayer, ITeam } from '../helpers/interfaces';
import BtnAdd from './BtnAdd';

interface IPlayerColumn {
    players: IPlayer[],
    teams: ITeam[],
    goalKeeper?: boolean,
    dreamTeam: IPlayer[],
    setter: Dispatch<SetStateAction<IPlayer[]>>
}


export default function PlayerColumn(props: IPlayerColumn) {


/*RENDER*/

  return (
    
        <div className='player__column'>
          <BtnAdd dreamTeam = {props.dreamTeam} setter={props.setter} teams={props.teams} players={props.players} goalKeeper={props.goalKeeper}/>
        </div>

  );

  
}
