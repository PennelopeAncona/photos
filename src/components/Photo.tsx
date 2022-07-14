/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { FC, useState } from 'react';
import { useQuery, gql } from "@apollo/client";

type PhotoProps = {
    id: number,
}
const GET_PHOTO = gql`
query photo($id: ID!){
        photo(id: $id){
            id,
            title,
            url,
            thumbnailUrl
        }
    }
`
type PhotoType = {
   
        photo: {
            id: string,
            title: string,
            url: string,
            thumbnailUrl: string
        }
     
        
    
}
const Photo:FC <PhotoProps> = ({id}) => {
    const {loading, error,data} = useQuery<PhotoType>(GET_PHOTO, {variables: {id}});
    if(loading) return <div>Loading photo...</div>
    if(error) {
        console.log(error.message)
        return <div>Error photo...</div>
    }
    return (
        <div>
              
                    <div key={data?.photo.id}>
                        <div>id: {data?.photo.id}</div>
                        <div>title: {data?.photo.title}</div>
                        <img src={data?.photo.url} alt={data?.photo.title}/>
                    </div>
                
            
        </div>
    )
}
export default Photo;