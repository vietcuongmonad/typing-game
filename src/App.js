import React, {useState, useEffect, useRef} from "react"
import "./App.css"

function App() {
    const TIME_INTIAL = 10
    const TIME_LIMIT = 360

    const [timer, setOurTimer] = useState(TIME_INTIAL)
    const [text, setText] = useState("")
    const [wordCount, setWordCount] = useState(0)
    const [flag, setFlag] = useState(false)
    const [fullTime, setFullTime] = useState(TIME_INTIAL)
    const textRef = useRef(null)

    function handleChange(event) {
        event.preventDefault()
        setText(event.target.value)
    }

    function count_word(word) {
        let tmp = word.trim().split(" ")
        tmp = tmp.filter(word => word !== "")
        return tmp.length
    }

    function startGame() {
        setOurTimer(fullTime)
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


    function changeFullTime(event) {
        const num = event.target.value
        if (num > TIME_LIMIT) {
            setFullTime(TIME_LIMIT)
        } else if (num < 1) setFullTime(1)
        else setFullTime(num)
    }

    return (
        <div>
            <h1>How fast do you think and type your own paragraph?</h1>
            <h2>Don't spam, the content should make sense! </h2>
            <textarea
                disabled={!flag}
                value={text}
                onChange={handleChange}
                ref = {textRef}
                />

            <div className="timing">
                <span>Set time remaining (1 - 360 secs): </span>

                <input
                    type="number"
                    value={fullTime}
                    onChange={changeFullTime}
                    min="1"
                    max={TIME_LIMIT}
                    step="1"
                    />
                <span> sec(s) </span>
            </div>

            <h3>Time remaining: {timer}</h3>

            <button
                onClick={startGame}
                disabled={flag}>START</button>
            <h1>Word count: {wordCount}</h1>
        </div>
    )
}

export default App
