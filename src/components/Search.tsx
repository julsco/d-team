import React from 'react';
import '../App.css';
import Button from 'react-bootstrap/Button';
import { FiSearch } from "react-icons/fi";

interface ISearchType {
  handleQuery: (event: React.ChangeEvent<HTMLInputElement>) => void ,
  handleClick: (event: React.MouseEvent) => void,
  query: string
}

const formStyle = {
  display: "flex",
  gap: "10px"
}

function Search(props:ISearchType) {
  
  return (
    <>
      <form style={formStyle}>
        <input onChange={props.handleQuery} value={props.query} type="text" placeholder="Search by player name" name="search"/>
        <Button onClick={props.handleClick} className='search__btn' type="submit"><FiSearch /></Button>
      </form>
     
    </>
  );
}

export default Search;
