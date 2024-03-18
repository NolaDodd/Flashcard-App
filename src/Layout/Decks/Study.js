// /decks/:deckId/study	
// Allows the user to study the cards from a specified deck

import React, {useEffect, useState} from "react";
import { readDeck } from "../../utils/api";
import { useParams, Link, useNavigate } from "react-router-dom";

function Study() {
    const [cards, setCards] = useState([])
    const [currentCard, setCurrentCard] = useState([])
    const [deckName, setDeckName] = useState("")
    const [flip, setFlip] = useState(true)
    const [count, setCount] = useState(0)
    const [finished, setFinished] = useState(false);

    const {deckId} = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        const abortController = new AbortController()
        async function loadDeck(){
            try {
                const response = await readDeck(deckId, abortController.signal)
                setCards(response.cards)
                setDeckName(response.name)
                if (response.cards.length > 0) {
                    setCurrentCard(response.cards[0])
                }
            } catch (error) {
                if (error.name === "AbortError") {
                    console.log("Aborted", setCards)
                }
            }
        }
        loadDeck()
    }, [])

    const handleNext = () => {
        if (count < cards.length - 1) {
            setCount(count + 1);
        } else {
            const restart = window.confirm("Restart cards? Click 'Cancel' to return to the home screen.");
            if (restart) {
                setCount(0);
            } else {
                navigate("/")
            }
        }
    };

    useEffect(() => {
        if (cards.length > 0 && count < cards.length) {
            setCurrentCard(cards[count]);
        }
    }, [count, cards]);
    
     const cardsFrontAndBack = cards.map((card) => 
    <>
        {card.front}
        <li>{card.back}</li>
        <br/>
    </>
    )  
    
    const cardFront = currentCard && (
        <div key={currentCard.id} className="card">
        <div className="card-body">
            <h6>Card {count + 1} of {cards.length}</h6>
            <p className="card-title">{currentCard.front}</p>
            <button className="btn btn-secondary" onClick={() => setFlip(false)}>Flip</button>
        </div>
    </div>
    )
    
    const cardBack = currentCard && (
        <div key={currentCard.id} className="card">
        <div className="card-body">
            <h6>Card {count + 1} of {cards.length}</h6>
            <p className="card-title">{currentCard.back}</p>
            <button className="btn btn-secondary" onClick={() => setFlip(true)}>Flip</button>
            <button className="btn btn-primary" onClick={() => {setFlip(true); handleNext();}}>Next</button>
        </div>
    </div>
    )

    return (
        <>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                    <li className="breadcrumb-item"><Link to={`/decks/${deckId}`}>{deckName}</Link></li>
                    <li className="breadcrumb-item active" aria-current="page">Study</li>
                </ol>
            </nav>
          <h2>{deckName}: Study </h2>
        {cards.length < 3 ? 
            ( <>
                <h4>Not enough cards</h4> 
                <p>You need at least 3 cards to study. There {cards.length === 1 ? "is" : "are"} currently {cards.length} in the deck.</p>
                 {cards.length > 1 ? null : cardsFrontAndBack }
                <Link to={`/decks/${deckId}/cards/new`} className="btn btn-primary">Add Card</Link> </>)
            :
            (<> 
            {finished ? (
                <div>
                    <p>You have finished studying this deck!</p>
                    <button onClick={() => {setCount(0); setFinished(false);}}>Restart</button>
                    <Link to="/">Return to Home</Link>
                </div>
            ) : (
                flip ? cardFront : cardBack
            )}
            </>
            )
            }
        </>
    )
    
}

export default Study