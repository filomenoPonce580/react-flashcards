import React, {useEffect, useState} from "react";
import DeckList from "../Decks/DeckList";
import Study from "../Decks/Study";
import Header from "./Header";
import NotFound from "./NotFound";
import ViewDeck from "../Decks/ViewDeck";
import CreateDeck from "../Decks/CreateDeck";

import { listDecks } from "../utils/api";


import {BrowserRouter as Router, Route, Link, Switch, useHistory, useLocation, useRouteMatch, useParams} from "react-router-dom"




function Layout() {
  let [deckList, setDeckList] = useState([])

  useEffect( () => {
      listDecks()
          .then((decks) => {
              setDeckList(decks)
          })        
  }, [])


  return (
    <>
      <Header />
      <div className="container">
        {/* TODO: Implement the screen starting here */}
        {/*On click, display a form, render a form component*/}
        {/*Render deck list component*/}
        <Switch>
          <Route path="/decks/:deckId/study">
              <Study />
          </Route>

          <Route path="/decks/new">
              <CreateDeck />
          </Route>

          <Route path="/decks/:deckId">
              <ViewDeck deckList={deckList}/>
          </Route>

          <Route path="/">
            <DeckList deckList={deckList} />
          </Route>

          <NotFound />
        </Switch>
      </div>
    </>
  );
}

export default Layout;
