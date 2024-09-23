import React, { useEffect, useState } from 'react'
import { ACCESS_TOKEN } from '../constants';

export default function Wishlist() {
    const[wishlist,setwishlist]=useState();
    const[loading,setloading]=useState(false);
    const[error,seterror]=useState();

    useEffect=(()=>{
        const fetchdata=async()=>{
            try{
                setloading(true);
                const token = localStorage.getItem(ACCESS_TOKEN)
                const response = await api.get('/wishlist/',{
                    headers:{
                        'Authorization':`Bearer${token}`
                    }
                });
                setwishlist(response.data)
            }catch(error){
                seterror(error)
            }finally{
                setloading(false);
            }
        }
        fetchdata();
    },[])
  return (
    <div>
        
    </div>
  )
}
