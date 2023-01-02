import React, { useState, useEffect, createContext, Dispatch, SetStateAction,  } from 'react';
import '../index.css';
import { API } from '../helpers/API';
import { IPlayer, ITeam } from '../helpers/interfaces';
import { getData } from '../helpers/apiCall';
import { localGet, localSet } from '../helpers/localStorage';
import PlayerColumn from './PlayerColumn';

interface IDT {
  dreamTeam: IPlayer[],
  setter: Dispatch<SetStateAction<IPlayer[]>>
}

export const PlayersContext = createContext<IPlayer[]>([]);
export const TeamsContext = createContext<ITeam[]>([]);
export const DreamTeamContext = createContext<any>([]);
 

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
    <PlayersContext.Provider value={allPlayers}>
        <TeamsContext.Provider value={allTeams}>
            <DreamTeamContext.Provider value={[dreamTeam, setDreamTeam]}>
                 <div className='player__container'>

                    <PlayerColumn goalKeeper={true} />
                    <PlayerColumn />
                    <PlayerColumn />
                    <PlayerColumn />
                    <PlayerColumn />
                    <PlayerColumn />
        
                 </div>
            </DreamTeamContext.Provider>
        </TeamsContext.Provider>
    </PlayersContext.Provider>
  );

  
}
