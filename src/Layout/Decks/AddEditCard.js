import React, {useState, useEffect,} from "react";
import {useNavigate, Link, useLocation, useParams} from "react-router-dom"
import {createCard, updateCard, readDeck, readCard} from "../../utils/api/index"

// /decks/:deckId/cards/new
// 	Allows the user to add a new card to an existing deck
// You must use the readDeck() function from src/utils/api/index.js to load the deck that you're adding the card to.
// Additionally, you must use the readCard() function from src/utils/api/index.js to load the card that you want to edit

function AddEditCard() {

    const initialFormState ={
        front:"",
        back:""
    }
    
    const [formData, setFormData] = useState({...initialFormState})
    const [deckName, setDeckName] = useState("")

    const handleChange = ({target}) => {
        setFormData({...formData, [target.name]: target.value})
    }

    const navigate = useNavigate()
    const location = useLocation()
    const {deckId, cardId} = useParams()
  
    const handleSubmit = async (event) => {
        console.log("handleCardSubmit")
        event.preventDefault()
        await createCard(deckId, formData)
        setFormData(initialFormState); 
        navigate(0)
    }

    const handleEdit = async (event) => {
        console.log("handleCardEdit")
        event.preventDefault()
        await updateCard(formData)
        setFormData(initialFormState); navigate(`/decks/${deckId}`)
    }
    

    useEffect(() => {
        const abortController = new AbortController();
        async function loadCard() {
            if(cardId) {
                try {
                    const cardData = await readCard(cardId, abortController.signal);
                    setFormData(cardData);
                } catch (error) {
                    console.log(error);
                }
            }
        }
        loadCard();
        return () => abortController.abort();
    }, [deckId]);

    useEffect(() => {
        const abortController = new AbortController();
        async function loadDeck() {
            if(deckId) {
                try {
                    const deckData = await readDeck(deckId, abortController.signal);
                    setDeckName(deckData.name);
                } catch (error) {
                    console.log(error);
                }
            }
        }
        loadDeck();
        return () => abortController.abort();
    }, [deckId]);
    
    const formTitle = location.pathname.includes("edit") ? "Edit Card" : "Add Card";
    const submitButtonLabel = location.pathname.includes("edit") ? "Submit" : "Save";
    const handleSubmitForm = location.pathname.includes("edit") ? handleEdit : handleSubmit;

    return (
        <>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                    {location.pathname.includes("new") ?  
                    <li className="breadcrumb-item"><Link to={`/decks/${deckId}`}>{deckName}</Link></li>
                        : null }
                    <li className="breadcrumb-item active" aria-current="page">
                        {formTitle}
                    </li>
                </ol>
            </nav>
            <div>
                <h3>{formTitle}</h3>
                <form onSubmit={handleSubmitForm}>
                    <label htmlFor="front">
                        Front
                        <br />
                        <textarea
                            id="front"
                            type="text"
                            name="front"
                            onChange={handleChange}
                            value={formData.front}
                            placeholder="Card Front"
                        />
                    </label>
                    <br/>
                    <label htmlFor="back">
                        Back
                        <br />
                        <textarea 
                            id="back" 
                            name="back"
                            placeholder="Card Back"
                            onChange={handleChange}
                            value={formData.back}
                        />
                    </label>
                    <br/>
                    <Link to={`/decks/${deckId}`} className= "btn btn-secondary">Done</Link>
                    <button type="submit" className="btn btn-primary">{submitButtonLabel}</button>
                </form>
            </div>
        </>
    );
}

export default AddEditCard;