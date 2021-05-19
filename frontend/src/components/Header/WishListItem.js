import React, { useContext } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartPlus, faTimes } from '@fortawesome/free-solid-svg-icons'
import { CartContext } from '../../contexts/Cart'
import axios from 'axios'

export default function WishListItem(props) {
    const { wishListItems, removeFromWishList, addToCart } =
        useContext(CartContext)

    const cartClick = (event) => {
        const id = event.target.id
        axios
            .get(`http://localhost:8000/api/products/${id}?format=json`)
            .then((res) => {
                addToCart(res.data)
            })
    }

    return (
        <div
            className="search-form login-form fadeToRight"
            style={{ width: '100%' }}
        >
            <div className="cart-list">
                {wishListItems.length === 0 && (
                    <div style={{ textAlign: 'center', color: '#777' }}>
                        Your wishlist is currently empty.
                    </div>
                )}
                {wishListItems.map((item, index) => {
                    return (
                        <div className="cart-item flex" key={index}>
                            <div className="cart-product-img">
                                <img
                                    src={`${process.env.REACT_APP_API_KEY}${item.photo[1]}`}
                                    width="80px"
                                    height="100%"
                                    alt=""
                                ></img>
                            </div>
                            <div className="cart-product-mobile flex">
                                <div
                                    className="cart-product-name flex"
                                    style={{
                                        alignItems: 'center',
                                        justifyContent: 'flex-start',
                                    }}
                                >
                                    {item.name}
                                </div>
                                {item.final_price && (
                                    <div
                                        className="cart-product-price wl-mb-price flex"
                                        style={{
                                            alignItems: 'center',
                                            justifyContent: 'flex-start',
                                        }}
                                    >
                                        {item.final_price
                                            .toString()
                                            .replace(
                                                /\B(?=(\d{3})+(?!\d))/g,
                                                '.'
                                            )}{' '}
                                        đ
                                    </div>
                                )}
                                <div
                                    className="product-info-addtocart wl-mb-addtocart flex-center btn"
                                    onClick={(event) => {
                                        cartClick(event)
                                        removeFromWishList(event)
                                    }}
                                    id={item.id}
                                >
                                    <FontAwesomeIcon
                                        style={{ pointerEvents: 'none' }}
                                        icon={faCartPlus}
                                    />
                                    <p style={{ pointerEvents: 'none' }}>
                                        Add to cart
                                    </p>
                                </div>
                                <div
                                    className="cart-product-delete wl-mb-delete"
                                    onClick={removeFromWishList}
                                    id={item.id}
                                >
                                    <FontAwesomeIcon
                                        style={{ pointerEvents: 'none' }}
                                        icon={faTimes}
                                    />
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
