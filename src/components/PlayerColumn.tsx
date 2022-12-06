import React from 'react';
import '../index.css';
import { IPlayer, ITeam } from '../helpers/interfaces';
import BtnAdd from './BtnAdd';

interface IPlayerColumn {
    players: IPlayer[],
    teams: ITeam[],
    goalKeeper?: boolean
}

export default function PlayerColumn(props: IPlayerColumn) {


/*RENDER*/

  return (
    
        <div className='player__column'>
          <BtnAdd teams={props.teams} players={props.players} goalKeeper={props.goalKeeper}/>
        </div>

  );

  
}
