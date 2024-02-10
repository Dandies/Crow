import dayjs from "dayjs"
import { Dispatch, SetStateAction, useState, useRef, useEffect } from "react"

export function Countdown({ until, setCanClaim }: { until: number; setCanClaim: Dispatch<SetStateAction<boolean>> }) {
  const [timer, setTimer] = useState(dayjs(until * 1000).fromNow())
  const id = useRef<ReturnType<typeof setInterval>>()

  useEffect(() => {
    function tick() {
      const now = dayjs().unix()
      if (until > now) {
        setCanClaim(false)
      } else {
        setCanClaim(true)
      }
      setTimer(dayjs(until * 1000).fromNow())
    }
    tick()
    id.current = setInterval(tick, 1000)
    return () => {
      clearInterval(id.current)
    }
  }, [until])

  return timer
}
