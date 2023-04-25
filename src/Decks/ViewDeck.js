import React, {useState, useEffect} from "react";
import {BrowserRouter as Router, Route, Link, Switch, useHistory, useLocation, useRouteMatch, useParams} from "react-router-dom"
import { deleteDeck } from "../utils/api";
//import Deck from "./Deck";

function ViewDeck({ deckList , buildDeckList}){
    const {deckId} = useParams()
    console.log(deckList)

    let targetDeck = deckList.find((deck)=>{
        return Number(deck.id) === Number(deckId)
    })
    // console.log(targetDeck2)

    const history = useHistory();

    function handleDeleteDeck(event) {
        event.preventDefault();
        let result = window.confirm("Delete Card?");
        if (result) {
          deleteDeck(deckId).then((res) => {
            buildDeckList();
            history.push(`/`);
          });
        }
      }


    return (
        <div>
            <div>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                        <li className="breadcrumb-item"><Link to="#">{targetDeck?.name}</Link></li>
                    </ol>
                </nav>
            </div>
            <div >
                <h3>{targetDeck?.name}</h3> 
                <p className="card-text">{targetDeck?.description}</p>
                <button>Edit</button>
                <Link to={`/decks/${targetDeck?.id}/study`}><button>Study</button></Link>
                <button>+Add Card</button>
                <button onClick={handleDeleteDeck}>Delete</button>
            </div>

            <h2>Cards</h2>

            <div className="card">
                <ul className="list-group list-group-flush">
                    {targetDeck?.cards.map((card, indx)=>{
                        return <li key={indx} className="list-group-item">
                            <p>{card?.front}</p>
                            <p>{card?.back}</p>
                            <button>edit</button>
                            <button>Delete</button>
                        </li>
                    })}
                </ul>
            </div>

        </div>
    )
}


export default ViewDeck