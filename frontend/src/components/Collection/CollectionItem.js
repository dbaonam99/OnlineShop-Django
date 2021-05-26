import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom'
import axios from 'axios'

function CollectionItem(props) {
    const [hoverPrice, setHoverPrice] = useState(false)
    const [product, setProduct] = useState([])

    useEffect(() => {
        axios
            .get(
                `http://localhost:8000/api/products/${props.product}/?format=json`
            )
            .then((res) => {
                setProduct(res.data)
            })
    }, [])

    const redirect = () => {
        window.scrollTo(0, 0)
        props.history.push(`/products/${product.id}`)
    }

    return (
        <div className="CollectionItem">
            {product.photo && (
                <img src={product.photo.split(',')[0]} alt=""></img>
            )}
            <div className="collection-overlay-container flex-center">
                <div className="collectionitem-overlay">
                    <div className="collectionitem-title" onClick={redirect}>
                        {product.name}
                    </div>
                    <div className="collectionitem-des">
                        {product.description}
                    </div>
                    <div
                        className="collectionitem-price"
                        onMouseEnter={() => {
                            setHoverPrice(true)
                        }}
                        onMouseLeave={() => {
                            setHoverPrice(false)
                        }}
                    >
                        {product.finalPrice && (
                            <p
                                className={
                                    hoverPrice
                                        ? 'collectionitem-price-text price-transform displayNone'
                                        : 'collectionitem-price-text'
                                }
                            >
                                {product.finalPrice
                                    .toString()
                                    .replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
                                đ
                            </p>
                        )}
                        <div
                            onClick={redirect}
                            className={
                                hoverPrice
                                    ? 'addtocart-btn-collection price-transform addtocart-btn-collectio-hover'
                                    : 'addtocart-btn-collection'
                            }
                        >
                            ADD TO CART
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default withRouter(CollectionItem)
