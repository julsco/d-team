import React, { useState, useEffect } from 'react';
import { getJSON } from "../helpers/apiCall";
import { API } from '../helpers/API';
import { IPlayer, ITeam } from "../helpers/interfaces";
import '../index.css';
import Button from 'react-bootstrap/Button';
import { TfiAngleLeft } from "react-icons/tfi";
import Cards from './Cards';
import CardTeam from './CardTeam';
import Search from "./Search";
import Spinner from "./Spinner";


interface IBtn {
  teams: ITeam[],
  players: IPlayer[]
  goalKeeper?: boolean
}


export default function BtnAdd(props: IBtn) {

    //MODAL SETUP

  const [modal, setModal] = useState(false);

   useEffect(() => {
        const close = (event:any) => {
          if(event.key === "Escape" && modal){
            /* toggleModal()
            setShowTeams(!showTeams) */
            backToInit()
          }
        }
        window.addEventListener('keydown', close)
      return () => window.removeEventListener('keydown', close)
    },[modal])

    modal ? document.body.classList.add("active-modal") : document.body.classList.remove("active-modal");

    //END OF MODAL SETUP--------------------------------------------

    //SEARCH SETUP
    const [searchClick,setSearchClick] = useState(0);
    const [query, setQuery] = useState("");
    const [queryClick, setQueryClick] = useState(query);
    const [APISearchPlayer, setAPISearchPlayer] = useState<string>(``);
    const [playersSearched, setPlayersSearched] = useState<IPlayer[]>([]);
    const [showNotFound, setShowNotFound] = useState<boolean>(false);
  
  /* Track user input*/ 
  const handleQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value)
  }

/* Get user input on click*/
  const handleSearchClick = (event: React.MouseEvent) => {
    event.preventDefault();
    setQuery("")
    setShowNotFound(false)
    if (searchClick > 0) {
      setPlayersSearched([])
    }
    if (query && (query?.trim().length !== 0)){
      setShowBackToTeamsBtn(true)
      setQueryClick(query.trimStart());
      setSearchClick(count => count+=1)
      if (searchClick === 0) setShowTeams(false)
    }

  }

  
/* Set API depending on query*/
useEffect(() => {
    /* if (searchClick > 0) setAPISearchPlayer(`${API}/search?fullName=${queryClick.trim()}`); */
    if (searchClick > 0) setAPISearchPlayer(`${API}/search?fullName=${queryClick.trim()}`);
    }, [queryClick]);

/* API call*/
useEffect( () => {
  setTimeout(()=> {
      
      if (queryClick) {
        getJSON(APISearchPlayer).then((players) => 
          !props.goalKeeper ? setPlayersSearched(players?.filter((player: IPlayer) => player.position !== "Goalkeeper")) : 
          setPlayersSearched(players.filter((player: IPlayer) => player.position === "Goalkeeper")));
      
          playersSearched?.length === 0 ? setShowNotFound(true) : setShowNotFound(false);
      }
    }, 2000)
  },[APISearchPlayer]);

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
    if(!showButton){
      setSearchClick(0)

    }
  }

  //Button to go back to team interface from Searched Players by name

  const backToMain = () => {
    setShowTeams(true)
    setQueryClick("")
    setQuery("")
    setPlayersSearched([])
    setSearchClick(0)
    setShowButton(true)
    setShowBackToTeamsBtn(!showBackToTeamsBtn)
    setAPISearchPlayer("")
    setShowNotFound(false)
  }


  //Select team setup

  const selectTeam = (team:string) => {
    setShowTeamPlayers(!showTeamPlayers)
    setShowTeams(!showTeams)
    const filteredPlayers = props.players.filter( (player:IPlayer) => player.team === team)
    
    !props.goalKeeper ? setMyPlayers(filteredPlayers.filter((player: IPlayer) => player.position !== "Goalkeeper")) : 
    setMyPlayers(filteredPlayers.filter((player: IPlayer) => player.position === "Goalkeeper")) 
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
  }


   //Back to initial state

   const backToInit = () => {
    setShowButton(true)
    setModal(false)
    setShowTeams(false)
    setSearchClick(0)
    setPlayersSearched([])
    setShowPlayer(false)
    setShowTeamPlayers(false)
    setQuery("")
    setQueryClick("")
    setShowBackToTeamsBtn(false)
    setAPISearchPlayer("")
    setShowNotFound(false)
  }


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
                                {showBackToTeamsBtn && queryClick && <Button className="btn btn-primary btn-lg" onClick={backToMain}><TfiAngleLeft /></Button> }
                              </div>
                              <div className="inner__modal">
                                <Search handleClick={handleSearchClick} handleQuery = {handleQuery} query={query} />
                              </div>
                            </div>}
                            <div className="inner__modal search">
                              {showTeams && props.teams.map((team:ITeam, i:number)=>(
                                  <CardTeam  key={i} team={team} handleAdd={() => selectTeam(team.name)}/>
                                  ))}
                              


                              {/* PLAYERS SEARCHED INTERFACE */}



                              {!showTeams && playersSearched?.length > 0 ? playersSearched.map((player: IPlayer, i: number) => (
                                  <Cards key= {i} player={player} buttonText={"Add me"} handleClick={() => selectPlayer(player)}/>
                                   )): !showTeams && !showTeamPlayers && !showNotFound &&  <Spinner />}

                              {!showTeams && showNotFound &&  playersSearched?.length ===0 && <>{!props.goalKeeper ? "Player" : "Goalkeeper"} {queryClick} not found</>}
                                
                              
                                  

                            {/* Players from team selected interface */}
                            </div>
                            <div className="btn__left inner__modal">
                              {!showNotFound && showTeamPlayers && !showTeams && <Button className="btn btn-primary btn-lg" onClick={backToTeams}><TfiAngleLeft /></Button>}
                            </div>
                            <div className="inner__modal">
                              {!showNotFound && showTeamPlayers && !showTeams && myPlayers.map((player: IPlayer, i:number)=>(
                              <Cards key= {i} player={player} buttonText={"Add me"} handleClick={() => selectPlayer(player)}/>
                              ))}
                            </div> 
                      </div>
              </div>
                </>
            }
            
            {/* Display chosen player */}
            {showPlayer && <Cards player={chosenPlayer} buttonText={"Remove me"} handleClick={() => backToInit()} /> }
        
    </div>
    
  </>
)
}