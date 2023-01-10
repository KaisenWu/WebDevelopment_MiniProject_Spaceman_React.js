import React from 'react'

const SpacemanCard = (props) => {
  return (
    <section>
        <img src={props.imgUrl} alt={props.title}/>
        <h2>{props.title}</h2>
        <p>{props.description}</p>
        <p>{props.extract}</p>
    </section>
  )
}

export default SpacemanCard