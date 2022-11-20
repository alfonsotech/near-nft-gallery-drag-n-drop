import React from 'react';


export default function Card(props) {
    console.log('item', props.item);
    return (
        <>
        <figure className='flex-centered'> <img src={props.item.media} alt="nft image"></img>
                <figcaption>
                    <h2>{props.item.title}</h2>
                    <p>Description: {props.item.description}</p>
                    <p>Owner: {props.item.owner}</p>
                </figcaption>
        </figure>
        </>
    );
}