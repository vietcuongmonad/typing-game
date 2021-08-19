import React, {useState, useEffect, useRef} from "react"
import "./App.css"
import useWordGame from "./useWordGame"

function App() {
    const { flag,
            text,
            handleChange,
            textRef,
            fullTime,
            changeFullTime,
            timer,
            startGame,
            wordCount,
            TIME_LIMIT} = useWordGame()

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
