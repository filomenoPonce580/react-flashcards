import React, { useEffect, useState } from 'react';
//import Deck from './Deck';
import { listDecks } from "../utils/api";
import Deck from './Deck';
import {BrowserRouter as Router, Link, Switch, useHistory, useLocation, useRouteMatch, useParams} from "react-router-dom"


function DeckList({deckList, buildDeckList}, {  deleteDeck, replaceDeck }) {

    
    return <div>
        <Link to={`/decks/new`}><button>+ Create A Deck</button></Link>
        {/*Render Deck componend within map. */}
        {deckList.map((oneDeck, indx) => <Deck key={indx} data={oneDeck} buildDeckList={buildDeckList}/>)}
    </div>
}

export default DeckList;
