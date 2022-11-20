import React from 'react'
import { useQuery, gql } from "@apollo/client";
// import Card from './Card';


export default function Gallery(props) {
console.log('Gallery props', props);
    const NFT_QUERY = gql`query myQuery {
        mb_views_nft_tokens(distinct_on:metadata_id where: {owner:{_eq: "alfonsoteched.testnet"}, _and: {burned_timestamp: {_is_null: true}}}
        ) {
          nft_contract_id
          title
          media
          owner
        }
      }`;

      const NFT_QUERY2 = gql`query myQuery {
        mb_views_nft_tokens(distinct_on:metadata_id where: {owner:{_eq: "alfonsotech.near"}, _and: {burned_timestamp: {_is_null: true}}}
        ) {
          nft_contract_id
          title
          media
          owner
        }
      }`
      
    //Get data from Mintbase API, cont.
    const { data, loading, error } = useQuery(NFT_QUERY2);
    if (loading) return "Loading...";
    if (error) return <pre>{error.message}</pre>
    return (
        <>
        <ul className="characters">
            {data.mb_views_nft_tokens.map((item, id) => {
                
            return (
                <li key={id}>
                    <figure className='flex-centered'> <img className="nft-media" src={item.media} alt="nft image"></img>
                <figcaption>
                    <h2>{item.title}</h2>
                <p>Artist: {item.owner}</p>
                <p>TokenID: {item.nft_contract_id}</p>
                </figcaption>
        </figure>
                </li>
            );
        })}
        </ul>
        {/* <Card data={data.mb_views_nft_tokens} /> */}
        {/* <Card text='Write the docs' /> */}
        </>
    )

}
