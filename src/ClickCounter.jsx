import { useState, useEffect } from 'react'

function ClickCounter() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    function handleClick() {
      setCount(count + 1)
    }

    document.addEventListener('click', handleClick)

    return () => {
      document.removeEventListener('click', handleClick)
    }
  }, [count])

  return (
    <div>
      <p>Clicks: {count}</p>
    </div>
  )
}

export default ClickCounter