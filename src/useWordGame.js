import {useState, useEffect, useRef} from "react"

function useWordGame() {
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
        let tmp = word.trim().split(/\s+/)
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

    return {
            flag,
            text,
            handleChange,
            textRef,
            fullTime,
            changeFullTime,
            timer,
            startGame,
            wordCount,
            TIME_LIMIT}
}

export default useWordGame
