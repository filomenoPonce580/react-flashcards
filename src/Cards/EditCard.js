import React, {useState, useEffect} from "react";
import {BrowserRouter as Router, Route, Link, Switch, useHistory, useLocation, useRouteMatch, useParams} from "react-router-dom"
import {readCard, readDeck, updateCard} from "../utils/api"

function EditCard({deckList, buildDeckList}){
    const {deckId, cardId} = useParams()
    const history = useHistory()

    let targetDeck = deckList.find((deck)=>{
        return Number(deck.id) === Number(deckId)
    })

    let targetCard = targetDeck?.cards.find((card)=>{
        return Number(card.id) === Number(cardId)
    })
    console.log(targetCard)

    // console.log(targetDeck.cards)

    //let targetCard = targetDeck.cards.find((card)=>{
    //     return Number(card.id) === Number(cardId)
    // })




    let initialFormData ={
        front: '',
        back: '',
    }
    const [formData, setFormData] = useState(initialFormData)

    //readDeck -> readCard(needsID) -> udpateCard(formData)


    function handleInputChange(event){
        event.preventDefault();
        setFormData({
            ...formData,
            [event.target?.name]: event.target?.value
        });
    };
  
    function handleSubmit(event){
        event.preventDefault();
        readDeck(deckId)
            .then(res=>{
            readCard(cardId)
                .then(res=>{
                    console.log(res)
                    formData.id = res.id
                    formData.deckId = res.deckId

                    updateCard(formData)
                        .then(res => {
                            buildDeckList()
                            history.push(`/decks/${deckId}`)  
                        })
                })
            })
    }
    return (
        <React.Fragment>
            <div>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                        <li className="breadcrumb-item"><Link to={`/decks/${deckId}`}>{targetDeck?.name}</Link></li>
                        <li className="breadcrumb-item active">Add Card</li>
                    </ol>
                </nav>
            </div>

            <h1>Edit Card</h1>


            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="front"></label>
                    Front
                    <textarea 
                        type="text"
                        name="front"
                        id="front" 
                        placeholder={targetCard?.front}
                        value={formData.front} onChange={handleInputChange}></textarea>
                    <label htmlFor="back"></label>
                    Back
                    <textarea 
                        type="text"
                        name="back"
                        id="back" 
                        placeholder={targetCard?.back}
                        value={formData.back} onChange={handleInputChange}></textarea>
                </div>
                <Link to={"/"}><button>Done</button></Link>
                <button onClick={handleSubmit}>Save</button>
            </form>
                
        </React.Fragment>
    )

}

export default EditCard