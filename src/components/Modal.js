import './Modal.css'

export default function Modal({handleModal}){
  return (
    <div className="modal-container">
      <div className="modal">
        <div className="modal-header">
          <h2>Welcome to Re Membah</h2>
        </div>
        <div className="modal-body">
          <p><strong>Re Membah</strong> is a memory game built using <strong>ReactJS</strong>.</p>
          <p>Find the same card until all the cards are exposed. 
          There are "turns" under the cards to see how many turns you complete the game.</p>
        </div>
        <div className="modal-footer">
          <button onClick={handleModal}>Close</button>
        </div>
      </div>
    </div>
  )  
}