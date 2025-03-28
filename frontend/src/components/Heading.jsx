import React from 'react'

export default function Heading ({label}) {
  return (
    <div className='flex justify-center'>
        <h1 className='text-4xl m-2 font-bold'>{label}</h1>
    </div>
  )
}
