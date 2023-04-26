import React, {useState, useEffect} from "react";
import {BrowserRouter as Router, Route, Link, Switch, useHistory, useLocation, useRouteMatch, useParams} from "react-router-dom"
import { deleteDeck, deleteCard } from "../utils/api";

function ViewDeck({ deckList , buildDeckList}){
    const {deckId} = useParams()

    let targetDeck = deckList.find((deck)=>{
        return Number(deck.id) === Number(deckId)
    })


    const history = useHistory();

    function handleDeleteDeck(event) {
        event.preventDefault();
        let result = window.confirm("Delete Deck?");
        if (result) {
          deleteDeck(deckId).then((res) => {
            buildDeckList();
            history.push(`/`);
          });
        }
      }

    function handleDeleteCard(cardId){
        let result = window.confirm("Delete Card?")
        if(result){
            deleteCard(cardId)
                .then(res => {
                    buildDeckList()
                    history.push(`/decks/${deckId}`)  
                })
            }
    }

    return (
        <div>
            <div>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                        <li className="breadcrumb-item active">{targetDeck?.name}</li>
                    </ol>
                </nav>
            </div>
            <div >
                <h3>{targetDeck?.name}</h3> 
                <p className="card-text">{targetDeck?.description}</p>
                <Link to={`/decks/${targetDeck?.id}/edit`}><button>Edit</button></Link>
                <Link to={`/decks/${targetDeck?.id}/study`}><button>Study</button></Link>
                <Link to={`/decks/${targetDeck?.id}/cards/new`}><button>+Add Card</button></Link>
                <button onClick={handleDeleteDeck}>Delete</button>
            </div>

            <h2>Cards</h2>

            <div className="card">
                <ul className="list-group list-group-flush">
                    {targetDeck?.cards.map((card, indx)=>{
                        return <li key={indx} className="list-group-item">
                            <p>{card?.front}</p>
                            <p>{card?.back}</p>
                            <Link to={`/decks/${deckId}/cards/${card?.id}/edit`}><button>edit</button></Link>
                            <button onClick={()=>handleDeleteCard(card.id)}>Delete</button>
                        </li>
                    })}
                </ul>
            </div>

        </div>
    )
}


export default ViewDeck