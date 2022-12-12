import React, { useState, useEffect } from 'react';
import '../index.css';
import { API } from '../helpers/API';
import { IPlayer, ITeam } from '../helpers/interfaces';
import { getData } from '../helpers/apiCall';
import { localGet, localSet } from '../helpers/localStorage';
import PlayerColumn from './PlayerColumn';


export default function App() {

  const API_PLAYERS: string = `${API}/players`
  const API_TEAMS: string =  `${API}/teams`

  useEffect(() => {
   getData(API_PLAYERS, setAllPlayers)
   getData(API_TEAMS, setAllTeams)
   }, []);
   
  const [allPlayers, setAllPlayers] = useState<IPlayer[]>([])
  const [allTeams, setAllTeams] = useState<ITeam[]>([])
  const [dreamTeam, setDreamTeam] = useState<IPlayer[]>([])

   //Local Storage


  useEffect(()=> {
    localGet("dream-team", () => setDreamTeam)
  },[])

  useEffect(()=> {
    localSet("dream-team", dreamTeam)
  })


    
  

/*RENDER*/

  return (
   
        <div className='player__container'>

          <PlayerColumn dreamTeam= {dreamTeam} setter={setDreamTeam} teams= {allTeams} players={allPlayers} goalKeeper={true} />
          <PlayerColumn dreamTeam= {dreamTeam} setter={setDreamTeam} teams= {allTeams} players={allPlayers} />
          <PlayerColumn dreamTeam= {dreamTeam} setter={setDreamTeam} teams= {allTeams} players={allPlayers} />
          <PlayerColumn dreamTeam= {dreamTeam} setter={setDreamTeam} teams= {allTeams} players={allPlayers} />
          <PlayerColumn dreamTeam= {dreamTeam} setter={setDreamTeam} teams= {allTeams} players={allPlayers} />
          <PlayerColumn dreamTeam= {dreamTeam} setter={setDreamTeam} teams= {allTeams} players={allPlayers} />
        
        </div>
 
  );

  
}
