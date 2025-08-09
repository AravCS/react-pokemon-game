import "../styles/previewstyles.css";

export default function Preview({ togglePreview }) {
    return (
        <div className="preview-container">
            <h1 className="preview-title">Pokémon Memory Game</h1>
            <p className="preview-rules">
                To win, you have to click each card only once. The cards will shuffle after each click.
                If you click the same card more than once, you lose!
            </p>
            <p className="preview-rules">
                Each card is a Pokémon with its name shown on the button.
            </p>
            <button className="preview-start-btn" onClick={togglePreview}>
                Start Game
            </button>
        </div>
    );
}
