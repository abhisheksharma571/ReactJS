import React, { useEffect, useState } from 'react'
import { useLoaderData } from 'react-router-dom'

function Github() {
    const data = useLoaderData()
    // const [data, setData] = useState([])
    // useEffect(() => {
    //  fetch('https://api.github.com/users/hiteshchoudhary')
    //  .then(response => response.json())
    //  .then(data => {
    //     console.log(data);
    //     setData(data)
    //  })
    // }, [])
    
  return (
    <>
    <div className='text-center m-4 bg-gray-600 text-white p-4 rounded-lg shadow-lg'>
    <h1 className='text-3xl mb-4'>Github followers: {data.followers}</h1>
    <img 
      src={data.avatar_url} 
      alt="Git picture" 
      width={300} 
      className='rounded-full mx-auto border-4 border-white'
    />
    <p className='mt-4 text-xl'>{data.name}</p>
    <p className='text-md'>{data.bio}</p>
    <p className='text-md mt-2'>{data.location}</p>
    <a href={data.html_url} target="_blank" rel="noopener noreferrer" className='text-blue-400 mt-4 inline-block hover:underline hover:text-blue-500'>
        Visit GitHub Profile
    </a>
  </div>

  </>
  )
}

export default Github

export const githubInfoLoader = async () => {
    const response = await fetch('https://api.github.com/users/abhisheksharma571')
    return response.json()
}