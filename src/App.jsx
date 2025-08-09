import Game from "./components/Game.jsx";
import Preview from "./components/Preview.jsx";
import "./index.css"
import {useState} from "react";

function App() {
    const [preview, setPreview] = useState(true);

    function togglePreview() {
        setPreview(!preview);
    }

    return (
        <>
            {preview === true ? <Preview togglePreview = {togglePreview}/> : <Game/>}
        </>
    )
}

export default App
