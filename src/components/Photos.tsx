import React, { FC } from 'react';
import styled from 'styled-components';

type PhotoProps = {
    id: string,
    title: string,
    url: string,
    thumbnailUrl: string
}
const Photos:FC <{photos: Array<PhotoProps>}> = ({photos}) => {
    return (
        <Container>
            {photos.map(singlePhoto => {
                return (
                        <CharacterStyle key={singlePhoto.id}>
                        <div>id: {singlePhoto.id}</div>
                        <div>title: {singlePhoto.title}</div>
                        <ImageStyle src={singlePhoto.url} alt={singlePhoto.title}/>
                        </CharacterStyle>
                    
                )
            })}
        </Container>
    )
}
export default Photos;

const Container = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    
`
const CharacterStyle = styled.div`
    padding: 15px;
    width: 17%;
    margin: 20px;
`
const ImageStyle = styled.img`
    height: auto;
    max-width: 100%;
    border-radius: 50px;
`