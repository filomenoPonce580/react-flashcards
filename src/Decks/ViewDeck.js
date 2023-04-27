import React, {useState, useEffect} from "react";
import {BrowserRouter as Router, Link, useHistory, useParams} from "react-router-dom"
import { deleteDeck, deleteCard, readDeck } from "../utils/api";

function ViewDeck({buildDeckList}){
    const {deckId} = useParams()
    const [deck, setDeck] = useState({})
    const history = useHistory();


    useEffect(()=>{
        readDeck(deckId)
            .then( (res) =>{
                setDeck(res)
            })       
    },[])


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
                    buildDeckList();
                    readDeck(deckId)
                        .then(res=>{
                            setDeck(res)
                        })
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
                        <li className="breadcrumb-item active">{deck && deck.name}</li>
                    </ol>
                </nav>
            </div>
            <div >
                <h3>{deck && deck.name}</h3> 
                <p className="card-text">{deck && deck.description}</p>
                <Link to={`/decks/${deck && deck.id}/edit`}><button>Edit</button></Link>
                <Link to={`/decks/${deck && deck.id}/study`}><button>Study</button></Link>
                <Link to={`/decks/${deck && deck.id}/cards/new`}><button>+Add Card</button></Link>
                <button onClick={handleDeleteDeck}>Delete</button>
            </div>

            <h2>Cards</h2>

            <div className="card">
                <ul className="list-group list-group-flush">
                    {deck.cards && deck.cards.map((card, indx)=>{
                        return <li key={indx} className="list-group-item">
                            <p>{card && card.front}</p>
                            <p>{card && card.back}</p>
                            <Link to={`/decks/${deckId}/cards/${card?.id}/edit`}><button>Edit</button></Link>
                            <button onClick={()=>handleDeleteCard(card.id)}>Delete</button>
                        </li>
                    })}
                </ul>
            </div>
        </div>
    )
}


export default ViewDeck