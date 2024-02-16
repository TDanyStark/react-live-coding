import {useEffect, useState, useRef} from 'react'

export default function useNearScreen ({ distance = '0px', externalRef, mustDisconnect = true } = {}) {
  const [isNearScreen, setShow] = useState(false)
  const fromRef = useRef()

  useEffect(() => {
    let observer

    const element = externalRef ? externalRef.current : fromRef.current

    const onChange = (entries, observer) => {
      const el = entries[0]
      console.log(el.isIntersecting);
      if (el.isIntersecting) {
        setShow(true)
        if (mustDisconnect) observer.disconnect()
      }else {
        setShow(false)
      }
    }

    Promise.resolve(
      typeof IntersectionObserver !== 'undefined'
        ? IntersectionObserver
        : import('intersection-observer')
    ).then(() => {
      observer = new IntersectionObserver(onChange, {
        rootMargin: distance
      })
  
      if (element) observer.observe(element)
    })

    return () => observer && observer.disconnect()
  })

  return {isNearScreen, fromRef}
}