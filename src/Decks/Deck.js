import React, { useState } from 'react';
import {BrowserRouter as Router, Route, Link, Switch, useHistory, useLocation, useRouteMatch, useParams, NavLink} from "react-router-dom"




function Deck({data}){
    return (
        <div className="card" >
            <div className="card-body">
                <h5 className="card-title">{data.name}</h5> 
                <span className="text-end">{data.cards.length} Cards</span>
                <p className="card-text">{data.description}</p>
                <Link to={`decks/${data.id}`}><button>View</button></Link>
                <Link to={`/decks/${data.id}/study`}><button>Study</button></Link>
                <button>Delete</button>
            </div>
        </div>
    )          
}


export default Deck;
