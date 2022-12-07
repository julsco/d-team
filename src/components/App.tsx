import React, { useState, useEffect } from 'react';
import '../index.css';
import { API, CORS_API} from '../helpers/API';
import PlayerColumn from './PlayerColumn';
import { IPlayer, ITeam } from '../helpers/interfaces';



const getData = (apiUrl:string, setterFunction: (data: []) => void) => {
  fetch(apiUrl)
     .then((response) => response.json())
     .then((data) => {
        setterFunction(data);
     })
     .catch((err) => {
        console.log(err.message);
     });
 }

export default function App() {

  const API_PLAYERS: string = `${API}/players`
  const API_TEAMS: string =  `${API}/teams`

  const [allPlayers, setAllPlayers] = useState<IPlayer[]>([])
  const [allTeams, setAllTeams] = useState<ITeam[]>([])

   useEffect(() => {
    getData(API_PLAYERS, setAllPlayers)
    getData(API_TEAMS, setAllTeams)
    }, []);
    


/*RENDER*/

  return (
   
        <div className='player__container'>

          <PlayerColumn teams= {allTeams} players={allPlayers} goalKeeper={true} />
          <PlayerColumn teams= {allTeams} players={allPlayers} />
          <PlayerColumn teams= {allTeams} players={allPlayers} />
          <PlayerColumn teams= {allTeams} players={allPlayers} />
          <PlayerColumn teams= {allTeams} players={allPlayers} />
          <PlayerColumn teams= {allTeams} players={allPlayers} />
        
        </div>
 
  );

  
}
