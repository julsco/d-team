import React, { useState, useEffect } from 'react';
import '../index.css';
import PlayerColumn from './PlayerColumn';
import { IPlayer, ITeam } from '../helpers/interfaces';
import BtnAdd from './BtnAdd';


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

  const API_PLAYERS: string = "https://d-team.netlify.app/.netlify/functions/api/players"/* `${API}/players`; */
  const API_TEAMS: string =  "https://d-team.netlify.app/.netlify/functions/api/teams"/* `${API}/teams`; */

  const [allPlayers, setAllPlayers] = useState<IPlayer[]>([])
  const [allTeams, setAllTeams] = useState<ITeam[]>([])

   useEffect(() => {
    getData(API_PLAYERS, setAllPlayers)
    getData(API_TEAMS, setAllTeams)
    }, []);
    


/*RENDER*/

  return (
    <>
    <div className="wrapper">
        <div className='player__container'>

          <PlayerColumn teams= {allTeams} players={allPlayers} goalKeeper={true} />
          <PlayerColumn teams= {allTeams} players={allPlayers} />
          <PlayerColumn teams= {allTeams} players={allPlayers} />
          <PlayerColumn teams= {allTeams} players={allPlayers} />
          <PlayerColumn teams= {allTeams} players={allPlayers} />
          <PlayerColumn teams= {allTeams} players={allPlayers} />
        
        </div>
    </div>
</>
  );

  
}
