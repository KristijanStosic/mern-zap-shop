import React, { useState } from 'react'

const ReadMore = ({ children }) => {
  const text = children || ''
  const [readMore, setReadMore] = useState(true)

  const toggleReadMore = () => {
      setReadMore(!readMore)
  }

  return <p className="text">
      {readMore && readMore ? text.slice(0, 100) : text}
      <span onClick={toggleReadMore} className="read-or-hide">
        {readMore ? " [...read more]" : " [show less]"}
      </span>
    </p>
}

export default ReadMore
