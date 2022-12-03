import React, { useState, useEffect } from 'react';
import '../index.css';
import { API } from '../helpers/API';
import { IPlayer, ITeam } from '../helpers/interfaces';
import BtnAdd from './BtnAdd';


export default function App() {

  const API_PLAYERS: string = "https://d-team.netlify.app/.netlify/functions/api/players"/* `${API}/players`; */
  const API_TEAMS: string =  "https://d-team.netlify.app/.netlify/functions/api/teams"/* `${API}/teams`; */

  const [allPlayers, setAllPlayers] = useState<IPlayer[]>([])
  const [allTeams, setAllTeams] = useState<ITeam[]>([])


  useEffect(() => {
    fetch(API_PLAYERS)
       .then((response) => response.json())
       .then((data) => {
          setAllPlayers(data);
       })
       .catch((err) => {
          console.log(err.message);
       });
    }, []);
    

    useEffect(() => {
      fetch(API_TEAMS)
         .then((response) => response.json())
         .then((data) => {
            setAllTeams(data);
         })
         .catch((err) => {
            console.log(err.message);
         });
   }, []);


/*RENDER*/

  return (
    <>
    <div className="wrapper">
        <div className='player__container'>

            <div className='player__column'>
              <BtnAdd teams={allTeams} players={allPlayers} goalKeeper={true}/>
            </div>

            <div className='player__column'>
              <BtnAdd teams={allTeams} players={allPlayers}/>
            </div>

            <div className='player__column'>
                <BtnAdd teams={allTeams} players={allPlayers}/>
            </div>

            <div className='player__column'>
                <BtnAdd teams={allTeams} players={allPlayers}/>
            </div>

            <div className='player__column'>
                <BtnAdd teams={allTeams} players={allPlayers}/>
            </div>

            <div className='player__column'>
                <BtnAdd teams={allTeams} players={allPlayers}/>
            </div>
        </div>
    </div>
</>
  );

  
}
