import React, { ChangeEvent, useEffect, useState } from 'react'

import { BsPlayFill, BsPauseFill } from 'react-icons/bs'
import { FaUndoAlt } from 'react-icons/fa'
import { FiSettings } from 'react-icons/fi'

import moment from 'moment'

import { CountdownCircleTimer } from 'react-countdown-circle-timer'

export default function Home() {
  let [duration, setDuration] = useState(5)
  let [count, setCount] = useState<number>(duration)
  const [isPlaying, setPlaying] = useState<boolean>(false)
  const [key, setKey] = useState(0)

  const work_time = 5
  const break_time = 2

  let working = true
  let iteration = 0

  function active_session_time() {
    return working ? work_time : break_time
  }

  function Clock() {
    const tasks = 5

    let working = true

    const sessions: any[] = []

    for (let i = 0; i < tasks; i++) {
      sessions.push(i)

      sessions[i] = {
        type: working ? 'working' : 'break', // working or break
        duration: working ? work_time : break_time, // duration in seconds
      }

      working = !working
    }

    // Prevent break from being last
    if (sessions.length % 2 === 0) {
      sessions.pop()
    }

    return (
      <>
        {sessions.map((_, index) => {
          return (
            <div role='timer' key={index}>
              <h1>{moment().minute(0).second(sessions[index].duration).format('mm:ss')}</h1>
              <span>{sessions[index].type} </span>
            </div>
          )
        })}
      </>
    )
  }

  const children = ({ remainingTime }: { remainingTime: any }) => {
    count = remainingTime // use react-countdown-circle-timer's internal timer
    return <></>
  }

  return (
    <main>
      <CountdownCircleTimer
        duration={active_session_time()}
        onUpdate={() => {
          let active_time: any = document.querySelectorAll(['[role="timer"]'])[iteration].querySelector('h1')
          active_time.innerText = moment().minute(0).second(count).format('mm:ss')
        }}
        key={key}
        isPlaying={isPlaying} // Initial state of timer
        children={children} // Only being used to store `count`
        onComplete={() => {
          iteration = iteration + 1 // Next index of `sessions`
          working = !working // Determine which duration should be used
          console.log(working)
          return { shouldRepeat: true, delay: 0, newInitialRemainingTime: active_session_time() } // repeat animation in 1.5 seconds
        }}
        trailColor='#1b1e21'
        colors={['#004777', '#F7B801', '#A30000', '#A30000']}
        colorsTime={[7, 5, 2, 0]}
      />

      <Clock />

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
