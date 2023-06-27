import React from 'react'
import { useNavigate } from 'react-router-dom'

const Success = () => {
    const navigate = useNavigate()
    return (
        <div>
            <div className='card p-4'>
            <h1 className='text-center mb-4'>Payment Successfully Done!</h1>
            <a onClick={()=>navigate('/')} className='btn btn-outline-primary'>Done</a>
            </div>
        </div>
    )
}

export default Success