import React, { ChangeEvent, useEffect, useState } from 'react'

import { BsPlayFill, BsPauseFill } from 'react-icons/bs'
import { FaUndoAlt, FaRegSun, FaSlidersH } from 'react-icons/fa'
import { FiSettings, FiSliders } from 'react-icons/fi'

import moment from 'moment'

import { CountdownCircleTimer } from 'react-countdown-circle-timer'

export default function Home() {
  let [duration, setDuration] = useState(5)

  let [count, setCount] = useState<number>(duration)

  const [isPlaying, setPlaying] = useState<boolean>(false)

  const [key, setKey] = useState(0)

  const [iteration, setIteration] = useState(0)

  function Clock() {
    const tasks = 8

    const work_time = 10
    const break_time = 5

    const sessions = []

    let working = true

    working ? setCount(work_time) : setCount(break_time)

    for (let i = 0; i < tasks; i++) {
      sessions.push(i)

      sessions[i] = {
        type: working ? 'working' : 'break', // working or break
        duration: working ? work_time : break_time, // duration in seconds
      }

      working = !working
    }

    if (sessions.length % 2 === 0) {
      sessions.pop()
    }

    return <>{count}</>
  }
  const children = ({ remainingTime }: { remainingTime: any }) => {
    count = remainingTime // use react-countdown-circle-timer's internal timer
    return <Clock />
  }

  return (
    <main>
      <CountdownCircleTimer
        isPlaying={isPlaying}
        // children={children}
        // colors='url(#fill)'
        colors={['#004777', '#F7B801', '#A30000', '#A30000']}
        colorsTime={[7, 5, 2, 0]}
        children={children}
        duration={duration}
        strokeWidth={20}
        trailStrokeWidth={10}
        strokeLinecap='round'
        key={key}
        size={500}
        trailColor='#1b1e21'
        onComplete={() => {
          setIteration(iteration + 1)
          console.log(iteration)
          // do your stuff here
          return { shouldRepeat: true, delay: 0 } // repeat animation in 1.5 seconds
        }}
      />
      <div>
        <button
          onClick={() => {
            setPlaying(false)
            setCount(duration)
            setKey((prevKey) => prevKey + 1)
          }}>
          <FaUndoAlt />
        </button>

        <button
          onClick={() => {
            setPlaying(!isPlaying)
          }}>
          <div>{isPlaying ? <BsPauseFill /> : <BsPlayFill />}</div>
        </button>
        <button>
          <FiSettings />
        </button>
      </div>
    </main>
  )
}
