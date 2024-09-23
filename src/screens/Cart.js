import React, { useEffect, useState } from 'react'
import '../css/Cart.css'
import api from '../api';
import { ACCESS_TOKEN } from '../constants';

export default function Cart() {
    const [cart,setcart]=useState([]);
    const [error,seterror]=useState();
    const [loading,setloading]=useState(false);
    useEffect(()=>{
        const fetchdata=async()=>{
            setloading(true);
            const token = localStorage.getItem(ACCESS_TOKEN);
            try{
                const response = await api.get('/cart/',{
                    headers:{
                       'Authorization': `Bearer ${token}`
                    }
                });
                setcart(response.data)
            }catch(error){
                seterror(error)
            }finally{
                setloading(false)
            }
        }
        fetchdata();
    },[])
    const deleteCart = async (id) => {
        try {
            const token = localStorage.getItem(ACCESS_TOKEN)
            await api.delete(`/cart/${id}/`,{
                headers:{
                    'Authorization':`Bearer${token}`
                }
            });
            setcart(cart.filter(cart => cart.id !== id)); 
        } catch (error) {
            console.error('Error deleting contact:', error);
        }
    };
  return (
    <div className='cart'>
        <section className="cart-container">
            <h1>MY SHOPPING BAG</h1>
            <div className='Title'>
                <p>product</p>
                <p></p>
                <p></p>
                <p></p>
                <p>Price</p>
                <p>Total</p>
            </div>
            <div className="cart-items">
                {error && <p>{error}</p>}
                {loading && <p>loading...</p>}
            {cart && cart.map((item)=>(
                <div key={item.id} className="item">
                    <a href={`product/${item.product.id}`}><img className="cart-img"src={item.product.image} alt={item.product.Name} /></a>
                    <div className="details">
                        <h2>{item.product.Name}</h2>
                        <p>Item No:{item.product.id}</p>
                        <p>Size: OS</p>
                        <p>Color: Silver/Black/Tan</p>
                        <p>Qty: {item.quantity}  | <button className='Remove' onClick={() => deleteCart(item.id)}>Remove</button></p>
                    </div>
                    <div className="price">
                        <p><span className="original-price">$425.00</span><br></br><span> ${item.product.price}</span></p>
                    </div>
                    <div className="Final-price">
                        <p>${item.product.price * item.quantity}</p>
                    </div>
                </div>
            ))}
            </div>
        </section>
        <aside className="summary">
            <h2>SUMMARY</h2>
            <form>
                <label htmlFor="promo-code">Do you have a promo code?</label>
                <div>
                    <input type="text" id="promo-code" />
                    <button type="submit">APPLY</button>
                </div>
            </form>
            <div className="totals">
                <p><b><span>Subtotal: </span></b><b><span>$1,090.50</span></b></p>
                <p><span>Shipping: </span><span>TBD</span></p>
                <p><span>Sales Tax: </span><span>TBD</span></p>
                <p className="total"><b>Estimated Total:</b><b>$</b></p>
            </div>
            <button className="checkout-btn" type="submit">CHECKOUT</button>
            <p className='helpline'>Need Help ? call us + XXXXXXXXXX</p>
        </aside>
    </div>
  )
}
