import React, { useState, useEffect, Dispatch, SetStateAction } from 'react';
import { IPlayer, ITeam } from "../helpers/interfaces";
import { localGet, localSet } from '../helpers/localStorage';
import '../index.css';
import Button from 'react-bootstrap/Button';
import { TfiAngleLeft } from "react-icons/tfi";
import Cards from './Cards';
import CardTeam from './CardTeam';
import CardChosen from './CardChosen';
import Search from "./Search";
import Spinner from "./Spinner";


interface IBtn {
  teams: ITeam[],
  players: IPlayer[],
  goalKeeper?: boolean,
  dreamTeam: IPlayer[],
  setter: Dispatch<SetStateAction<IPlayer[]>>
}


export default function BtnAdd(props: IBtn) {


    //MODAL SETUP

  const [modal, setModal] = useState(false);

   useEffect(() => {
        const close = (event:any) => {
          if(event.key === "Escape" && modal){
            backToInit()
          }
        }
        window.addEventListener('keydown', close)
      return () => window.removeEventListener('keydown', close)
    },[modal])

    modal ? document.body.classList.add("active-modal") : document.body.classList.remove("active-modal");

    //END OF MODAL SETUP--------------------------------------------

    //SEARCH SETUP

    const [query, setQuery] = useState("");
    const [playersSearched, setPlayersSearched] = useState<IPlayer[]>([]);
  
  /* Track user input*/ 
  const handleQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value.toLowerCase());
  }


  useEffect(()=> {

    const filteredPlayers = props.players.filter( (player:IPlayer) => !props.goalKeeper ? player.position !== "Goalkeeper" : player.position === "Goalkeeper")
    
    setPlayersSearched(filteredPlayers.filter((player:IPlayer) => player.fullName.toLowerCase().includes(query)));
    
  },[query])



  //---------------------------------------------------------------------------------------------END OF SEARCH SETUP

  const [showBackToTeamsBtn, setShowBackToTeamsBtn] = useState<boolean>(false)
  const [showButton, setShowButton] = useState<boolean>(true)
  const [showPlayer, setShowPlayer] = useState<boolean>(false);
  const [showTeams, setShowTeams] = useState<boolean>(false);
  const [showTeamPlayers, setShowTeamPlayers] = useState<boolean>(false);
  const [myPlayers, setMyPlayers] = useState<IPlayer[]>([]);
  const [chosenPlayer, setChosenPlayer] = useState<IPlayer>();
 
 
  //Button add player
  const handleAdd = () => {
    setShowTeams(!showTeams)
    
    if (showButton){
      setModal(!modal)
      setShowButton(!showButton)
    }

  }

  //Button to go back to team interface from Searched Players by name

  const backToMain = () => {
    setShowTeams(true)
    setQuery("")
    setShowButton(true)
    setShowBackToTeamsBtn(!showBackToTeamsBtn)
  }


  //Select team setup

  const selectTeam = (team:string) => {
    setShowTeamPlayers(!showTeamPlayers)
    setShowTeams(!showTeams)
    const filteredPlayers = props.players.filter( (player:IPlayer) => player.team === team)
    setMyPlayers(filteredPlayers.filter((player: IPlayer) => !props.goalKeeper ? player.position !== "Goalkeeper" : player.position === "Goalkeeper")) 
  }

  //Button to go back to team interface from Players searched by team

  const backToTeams = () => {
    setShowTeamPlayers(!showTeamPlayers)
    setShowTeams(!showTeams)
    setMyPlayers([])
  }


  //Selection of player setup

  const selectPlayer = (player:IPlayer) => {
    setShowPlayer(!showPlayer)
    setChosenPlayer(player)
    setShowTeamPlayers(!showTeamPlayers)
    setModal(!modal)
    setShowBackToTeamsBtn(false)
    setShowButton(false)
    props.setter((curr: IPlayer[])=> [...curr, player])
  }


   //Back to initial state

   const backToInit = () => {
    setShowButton(true)
    setModal(false)
    setShowTeams(false)
    setShowPlayer(false)
    setShowTeamPlayers(false)
    setQuery("")
    setShowBackToTeamsBtn(false)
    props.setter((curr: IPlayer[])=> curr.filter((player:IPlayer) => player !== chosenPlayer))
  }

    // Local Storage

    

      useEffect(()=> {
        if (chosenPlayer) localGet("selected-player", () => setChosenPlayer)
      },[])
    
      useEffect(()=> {
        if (chosenPlayer) localSet("selected-player", chosenPlayer)
      })
  
    

  return (
  <>
    <div className='btnAdd__component'>
      
            {/* Button to add player and lead to team interface */}
            {showButton && <Button onClick={handleAdd} className="btn btn-primary btn-lg sp">Add {props.goalKeeper ? "goalkeeper" : "player"}</Button>}
            {modal && 
            <>
                <div onClick={backToInit} className="overlay"></div>
                    <div className="modal__try">
                      <div className="modal__content">  
                            {!showTeamPlayers && 
                            
                            <div className="inner__modal">  


                              {/* Team interface */}
                              
                              <div className="btn__left inner__modal">
                                {showBackToTeamsBtn /* && queryClick */ && <Button className="btn btn-primary btn-lg" onClick={backToMain}><TfiAngleLeft /></Button> }
                              </div>
                              <div className="inner__modal">
                                <Search handleQuery = {handleQuery} query={query} />
                              </div>
                            </div>}
                            <div className="inner__modal search">
                              {showTeams && query.length == 0 && props.teams.map((team:ITeam, i:number)=>(
                                  <CardTeam  key={i} team={team} handleAdd={() => selectTeam(team.name)}/>
                                  ))}
                              


                              {/* PLAYERS SEARCHED INTERFACE */}
                              
                              {query.length > 0 && playersSearched.map((player: IPlayer, i: number) => (
                                  <Cards key= {i} player={player} dreamTeam={props.dreamTeam} buttonText={"Add me"} handleClick={() => selectPlayer(player)}/>
                                   ))}
                              
                              {query.length > 0 && playersSearched.length == 0 && <>{!props.goalKeeper ? "Player" : "Goalkeeper"} {query} not found</>}
                              
                                  

                            </div>
                            {/* Players from team selected interface */}
                            <div className="btn__left inner__modal">
                              {/* !showNotFound &&  */showTeamPlayers && !showTeams && <Button className="btn btn-primary btn-lg" onClick={backToTeams}><TfiAngleLeft /></Button>}
                            </div>
                            <div className="inner__modal">
                              {/* !showNotFound &&  */showTeamPlayers && !showTeams && myPlayers.map((player: IPlayer, i:number)=>(
                              <Cards key= {i} player={player} dreamTeam={props.dreamTeam} buttonText={"Add me"} handleClick={() => selectPlayer(player)}/>
                              ))}
                            </div> 
                      </div>
              </div>
                </>
            }
            
            {/* Display chosen player */}
            {showPlayer && <CardChosen player={chosenPlayer} buttonText={"Remove me"} handleClick={() => backToInit()} /> }
        
    </div>
    
  </>
)
}