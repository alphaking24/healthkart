import React, { useEffect, useState } from 'react'

function Header() {
    const logOut =()=>{
        localStorage.removeItem('user')
        window.location.href="/login"
    }
    const [user, setUser] = useState({})
    useEffect(() =>{
        let getUser = JSON.parse(localStorage.getItem('user'))
        setUser(getUser)
    },[])
    return (
        <div className='flex justify-between mt-4'>
            <a href='/'><img src='https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/fkheaderlogo_plus-535108.svg' /></a>
            <div className='flex font-bold text-lg justify-between gap-4 mx-6'>
                <p className='p-2 hover:scale-110'>Hi, {user?.name}</p>
                <p className=' flex mx-6 p-2 gap-3 hover:scale-110'><img src='https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/header_cart-eed150.svg' /><span className='absolute -mt-3 ml-4 bg-red-500 text-white rounded-full p-1 text-xs px-2'>0</span>Cart</p>
                <a className='mx-6 p-2' href='/product'>Hot Deals</a>
                {
                    user ?  <button onClick={logOut}>logout</button> : <a href="/login"><button>Login</button></a>
                }
               
            </div>
        </div>
    )
}

export default Header
