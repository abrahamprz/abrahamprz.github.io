import { useState, useEffect } from 'react'
import { useTranslation } from "react-i18next"


function ClickCounter() {
  const { t } = useTranslation()
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
      <p>{t('clickCounter.clicks')} {count}</p>
    </div>
  )
}

export default ClickCounter