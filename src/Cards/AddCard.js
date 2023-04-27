import React, {useState, useEffect} from "react";
import {BrowserRouter as Router, Link, useHistory, useParams} from "react-router-dom"
import {createCard, readDeck} from "../utils/api"

function AddCard({deckList, buildDeckList}){
    const {deckId} = useParams()
    const history = useHistory()    
    const [deck, setDeck] = useState({})

    let initialFormData ={
        front: '',
        back: '',
    }
    const [formData, setFormData] = useState(initialFormData)    

    useEffect(()=>{
        readDeck(deckId)
            .then( (res) =>{
                setDeck(res)
            })       
    },[])
  
    function handleInputChange(event){
        event.preventDefault();
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });
    };
  
    function handleSubmit(event){
        event.preventDefault();
        createCard(deckId, formData)
            .then(res => {
                buildDeckList()
                history.push(`/decks/${deckId}`)  
            })
    }


    return (
        <React.Fragment>
            <div>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                        <li className="breadcrumb-item"><Link to={`/decks/${deckId}`}>{deck && deck.name}</Link></li>
                        <li className="breadcrumb-item active">Add Card</li>
                    </ol>
                </nav>
            </div>

            <h1>{deck && deck.name}: Add Card</h1>


            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="front"></label>
                    Front
                    <textarea 
                        type="text"
                        name="front"
                        id="front" 
                        placeholder="Front"
                        value={formData.description} onChange={handleInputChange}></textarea>
                    <label htmlFor="back"></label>
                    Back
                    <textarea 
                        type="text"
                        name="back"
                        id="back" 
                        placeholder="Back"
                        value={formData.description} onChange={handleInputChange}></textarea>
                </div>
                <Link to={"/"}><button>Done</button></Link>
                <button onClick={handleSubmit}>Save</button>
            </form>
                
        </React.Fragment>
    )
}

export default AddCard