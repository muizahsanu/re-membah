import './App.css'
import {useEffect, useState} from 'react'
import SingleCard from './components/SingleCard'
import Modal from './components/Modal'

const cardImages = [
  {"src": "/img/helmet-1.png", matched: false},
  {"src": "/img/potion-1.png", matched: false},
  {"src": "/img/ring-1.png", matched: false},
  {"src": "/img/scroll-1.png", matched: false},
  {"src": "/img/shield-1.png", matched: false},
  {"src": "/img/sword-1.png", matched: false}
]

function App() {
  const [cards, setCards] = useState([])
  const [turn, setTurn] = useState(0)
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)
  const [showModal, setShowModal] = useState(true)

  const handleModal = () =>{
    setShowModal(false)
  }

  // Chuffle cards
  const shuffleCards = () =>{
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, "id": Math.random() }))

    setChoiceOne(null)
    setChoiceTwo(null)
    setCards(shuffledCards)
    setTurn(0)
  }

  // Handle card choice
  const handleChoice = (card) =>{
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
  }

  // Rest turn
  const resetTurn = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurn(prevTurn => prevTurn + 1)
  }

  // Compare 2 selected cards
  useEffect(()=>{
    if(choiceTwo && choiceOne){
      if(choiceOne.src === choiceTwo.src){
        setCards(prevCards=>{
          return prevCards.map(card=>{
            if(card.src === choiceOne.src){
              return {...card, matched: true}
            } else{
              return card
            }
          })
        })
        resetTurn()
      }
      else{
        setTimeout(() => resetTurn(), 1000)
      }
    }
  }, [choiceOne, choiceTwo])

  // Init cards in first
  useEffect(()=>{
    shuffleCards()
  }, [])

  return (
    <div className="App">
      <h1>Re Membah</h1>
      <button onClick={ shuffleCards }>New Game</button>

      <div className="card-grid">
        {cards.map(card => (
          <SingleCard 
            key = {card.id} 
            card = {card} 
            handleChoice = {handleChoice}
            flipped = {card === choiceOne || card === choiceTwo || card.matched}
            disabled = {choiceOne && choiceTwo}
          />
        ))}
      </div>
      <p style={{ fontSize: 16, fontWeight: 700 }}>Turns: {turn} </p>
      <div className="info">
        <p>Project from <a href="https://www.udemy.com/user/47fd83f6-5e4a-4e87-a0f0-519ac51f91b6/">Udemy (The Net Ninja)</a>. 
          Code by <a href="https://github.com/muizahsanu">Muiz Ahsanu</a>
        </p>
      </div>

      {showModal && <Modal handleModal={handleModal} />}
    </div>
  );
}

export default App