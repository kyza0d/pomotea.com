import React, { useState, useEffect } from 'react'
import { BsPlayFill, BsPauseFill } from 'react-icons/bs'
import { FaUndoAlt } from 'react-icons/fa'
import { FiSettings } from 'react-icons/fi'
import moment from 'moment'
import { CountdownCircleTimer } from 'react-countdown-circle-timer'

const sessions = [
  { type: 'working', duration: 10 },
  { type: 'break', duration: 5 },
  { type: 'working', duration: 10 },
]

const Home = () => {
  const [isPlaying, setPlaying] = useState(false)
  const [duration, setDuration] = useState(sessions[0].duration)
  const [iteration, setIteration] = useState(0)

  useEffect(() => {
    setDuration(sessions[iteration].duration)
  }, [iteration])

  const handleTimerUpdate = (count: number) => {
    const activeTime = document.querySelectorAll('[role="timer"]')[iteration].querySelector('h1')
    if (activeTime) {
      activeTime.innerText = moment().minute(0).second(count).format('mm:ss')
    }
  }

  const handleTimerComplete = () => {
    setIteration((prevIteration) => {
      const nextIteration = prevIteration + 1
      if (nextIteration >= sessions.length) {
        setPlaying(false)
        return prevIteration
      }
      return nextIteration
    })
    return { shouldRepeat: true, delay: 0, newInitialRemainingTime: duration }
  }

  const resetTimer = () => {
    setIteration(0)
    setPlaying(false)
  }

  const toggleTimer = () => {
    setPlaying(!isPlaying)
  }

  return (
    <main>
      <CountdownCircleTimer
        duration={duration}
        onUpdate={handleTimerUpdate}
        key={iteration}
        isPlaying={isPlaying}
        onComplete={handleTimerComplete}
        trailColor='#1b1e21'
        colors={['#004777', '#F7B801', '#A30000', '#A30000']}
        colorsTime={[7, 5, 2, 0]}
      />

      {sessions.map((session, index) => (
        <div role='timer' key={index}>
          <h1>{moment().minute(0).second(session.duration).format('mm:ss')}</h1>
          <span>{session.type}</span>
        </div>
      ))}

      <div>
        <button onClick={resetTimer}>
          <FaUndoAlt />
        </button>

        <button onClick={toggleTimer}>
          <div>{isPlaying ? <BsPauseFill /> : <BsPlayFill />}</div>
        </button>

        <button>
          <FiSettings />
        </button>
      </div>
    </main>
  )
}

export default Home
