import React, { Children } from 'react'

const Button = ({ children, variant, onClick }) => {

  return (
      <button
      className={`px-4 py-2 rounded text-white ${variant}`}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default Button
