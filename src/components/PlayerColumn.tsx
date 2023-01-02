import React, { Dispatch } from 'react';
import '../index.css';
import BtnAdd from './BtnAdd';

interface IPlayerColumn {
    goalKeeper?: boolean,
}


export default function PlayerColumn(props: IPlayerColumn) {


/*RENDER*/

  return (
    
        <div className='player__column'>
          <BtnAdd goalKeeper={props.goalKeeper}/>
        </div>

  );

  
}
