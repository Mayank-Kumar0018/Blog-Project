import React from 'react'

function Button({className , children , ...props}) {
  return (
    <button className={`inline-flex justify-center items-center text-center bg-indigo-500 text-white border-0 py-2 px-4 focus:outline-none hover:bg-indigo-600 rounded text-base mt-4 md:mt-0 ${className}`} {...props}> {children}  </button>
  )
}

export default Button