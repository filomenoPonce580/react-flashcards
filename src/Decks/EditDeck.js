import React, { Fragment, useState, useEffect } from "react";
import {BrowserRouter as Router, Route, Link, Switch, useHistory, useLocation, useRouteMatch, useParams} from "react-router-dom"
import {updateDeck} from "../utils/api"

function EditDeck({ deckList, buildDeckList }){
    const history = useHistory()
    const {deckId} = useParams()

    
    let initialFormData ={
        name: '',
        description: '',
    }    


    let targetDeck = deckList.find((deck)=>{
        return Number(deck.id) === Number(deckId)
    })



    const [formData, setFormData] = useState(initialFormData)

  

    function handleInputChange(event){
        setFormData({
            ...formData,
            [event.target?.name]: event.target?.value
        });
    };



    function handleSubmit(event){
        event.preventDefault();
        formData.id = targetDeck?.id
        updateDeck(formData)
            .then(res => {
                buildDeckList()
                history.push(`/decks/${res.id}`)  
            })
    }


    return (
        <React.Fragment>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                    <li className="breadcrumb-item"><Link to={`/decks/${deckId}`}>{targetDeck?.name}</Link></li>
                    <li className="breadcrumb-item active" aria-current="page">Edit Deck</li>
                </ol>
            </nav>

            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Name</label>
                        <input 
                        type="text" 
                        name="name" 
                        id="name" 
                        placeholder={targetDeck?.name} 
                        value={formData.name} onChange={handleInputChange}/>
                    <label htmlFor="description"></label>
                        Description
                        <textarea 
                            type="text"
                            name="description"
                            id="description" 
                            placeholder={targetDeck?.description}
                            value={formData.description} onChange={handleInputChange}></textarea>
                </div>
                <Link to={`/decks/${deckId}`}><button>Cancel</button></Link>
                <button onClick={handleSubmit}>Submit</button>
            </form>          
        </React.Fragment>
    )
    
    

}

export default EditDeck