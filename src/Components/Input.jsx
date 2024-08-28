import React from 'react'
import { useId } from 'react'

function Input({className = "" , children = "" , ...props} , ref ) {
    let id = useId()
  return (
    <>
    <div className='flex flex-col'>
        <label className='text-white mb-2 cursor-text' htmlFor= {id}>{children}</label>
        <input className = {`text-white bg-neutral-700 bg-opacity-15 rounded-sm w-72 p-1 focus:outline-none focus:border-b-2 focus:border-white-500 focus:bg-transparent hover:bg-neutral-800 placeholder:text-sm ${className}`} id= {id} ref={ref} {...props} />
    </div>
  </>
  )
}

export default React.forwardRef(Input);