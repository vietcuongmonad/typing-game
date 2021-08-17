import React, {useState, useEffect, useRef} from "react"
import "./App.css"

function App() {
    const TIME_LIMIT = 10

    const [timer, setOurTimer] = useState(TIME_LIMIT)
    const [text, setText] = useState("")
    const [wordCount, setWordCount] = useState(0)
    const [flag, setFlag] = useState(false)
    const textRef = useRef(null)

    function handleChange(event) {
        setText(event.target.value)
    }

    function count_word(word) {
        let tmp = word.trim().split(" ")
        tmp = tmp.filter(word => word !== "")
        return tmp.length
    }

    function startGame() {
        setOurTimer(TIME_LIMIT)
        setText("")
        setWordCount(0)
        setFlag(true)
        textRef.current.disabled = false
        textRef.current.focus()
    }

    function endGame() {
        setWordCount(count_word(text))
        setFlag(false)
    }

    useEffect(() => {
        if (timer && flag) {
            setTimeout(() => setOurTimer(x => x-1), 1000)
        } else if (timer === 0) {
            endGame()
        }
    }, [timer, flag])

    return (
        <div>
            <h1>How fast do you think and type your own paragraph?</h1>
            <textarea
                disabled={!flag}
                value={text}
                onChange={handleChange}
                ref = {textRef}
                />

            <h3>Time remaining: {timer}</h3>

            <button
                onClick={startGame}
                disabled={flag}>START</button>
            <h1>Word count: {wordCount}</h1>
        </div>
    )
}

export default App
