import React from 'react'

const Card = ({tittle,year,poster}) => {
    return (
        <div className='card'>
            <p>{tittle}  <label htmlFor="">{year}</label></p>
            <img src={poster} alt="" />
        </div>
    )
}

export default Card