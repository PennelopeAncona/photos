import React, { useEffect, useState } from 'react';
import { useQuery, gql } from "@apollo/client";
import styled from 'styled-components';
import Photos from './Photos';
import Photo from './Photo';

const GET_PHOTOSLIST = gql`
query photos($page: Int, $order: SortOrderEnum, $field: String ){
  photos(options: {paginate: {page: $page}, sort: {order: $order, field: $field}}){
    data{
      id,
      title,
      url,
      thumbnailUrl,
    },
    links{
      first{page},
      prev{page},
      next{page},
      last{page}
    }
  }, 
},

`
type QueryReturnType = {
    photos:{
        data: Array<{
          id :string,
          title: string ,
          url: string,
          thumbnailUrl: string,
        }>,
        links:{
          first?:{page: string},
          prev?:{page: string},
          next?:{page: string},
          last?:{page: string }
        }
      },
    
}
const Main = () => {
    const [page,setPage] = useState<number>(1); 
  const [field,setField] =useState<string>(); 
  const [order,setOrder] =useState<string>();
    const [id,setId] =useState<number>();
    const {loading, error,data} = useQuery<QueryReturnType>(GET_PHOTOSLIST, {variables: {page, field, order, id}});
    const [inputId, setInputId] = useState<string |undefined>(undefined);
    const [fieldInput, setFieldInput] = useState<string |undefined>(undefined);
    const [orderInput, setOrderInput] = useState<string |undefined>(undefined);

    console.log('title '+ field?.toString());
    console.log('order '+ order?.toString());
    console.log('id '+ id);

  

    if(loading) return ( <div>Loading...</div>)
    if(error) return ( <div>error</div>)
    return (
        <div> 
            <Navigation>
                <Title>Graphql API: https://graphqlzero.almansi.me/api</Title>
            </Navigation>
            <Navigation>
              <Input>
                <input type="text" placeholder='field name' value={fieldInput} onChange={(e) => setFieldInput(e.target.value)} ></input>
                <input type="text" placeholder='order: ASC o DESC' value={orderInput} onChange={(e) => setOrderInput(e.target.value)} ></input>
                {fieldInput && orderInput && <button onClick={()=>{setField(fieldInput!); setOrder(orderInput!)}}>Search by filters</button> }
                

                <input type="text" placeholder='photo id' onChange={(e) => { if(!e.target.value) setId(undefined); setInputId(e.target.value)}} ></input>
                {inputId && <button onClick={()=>{setId(parseInt(inputId!))}}>Search by id</button>}
              </Input>
                </Navigation>
            <Navigation>
            {page}
            {data?.photos.links.prev?.page && (<Button onClick={() => setPage(page-1)}>prev</Button>)} /
            {data?.photos.links.next?.page && (<Button onClick={() => setPage(page+1)}>next</Button>)}
            ({data?.photos.links.last?.page})
            </Navigation>
            
            {isNaN(id!)? <Navigation><Photos photos={data?.photos.data || []}></Photos></Navigation>: <Photo id={id!} ></Photo>  }
        </div>
    )
}
export default Main;
const Navigation = styled.div`
    display: flex;
    justify-content: center;
    margin: auto;
    width: 100%;
    margin-top: 15px;
    margin-bottom: 10;
    a{
       cursor: pointer;
    }

`
const Button = styled.button`
  border-color: rgb(255, 152, 1);
  font-family: 'Courier New', Courier, monospace;
  margin-right: 5px;
  margin-left: 5px;
  border-radius: 15%;
`
const Input = styled.div`
  display: flex;
  align-items: center;  
  justify-content: center;
  flex-direction: row;  
  margin: 15px;
`
const Title = styled.div`
  display: flex;
  align-items: center;  
  justify-content: center;
  font-size: 45px;
  font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
`
const ButtonSearch = styled.button`
  border-color: rgb(255, 152, 1);
  border-radius: 15%;
  font-family: 'Courier New', Courier, monospace;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
`
//            {id !== ''?  <Photo photo={data?.photo!}></Photo> : <Photos photos={data?.photos.data || []}></Photos>}
//            <Photo photo={data?.photo!}></Photo>
//                           {isNaN(id!)?  <button onClick={()=>{setId(parseInt(inputId!))}}>SinglePhoto</button>  :  <button onClick={()=>{setField(fieldInput!); setOrder(orderInput!)}}>Search</button>}
//{isNaN(id!)? <button onClick={()=>{setId(0); setField(fieldInput!); setOrder(orderInput!)}}>search</button> : <button onClick={()=>{setId(parseInt(inputId!)); setField(''); setOrder('')}}>Search</button>}

