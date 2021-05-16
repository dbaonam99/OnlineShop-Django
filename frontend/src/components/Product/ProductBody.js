import React, { useContext, useEffect, useRef, useState } from 'react'
import '../../App.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faAngleRight,
    faCartPlus,
    faChevronLeft,
    faChevronRight,
    faHeart,
    faMinus,
    faPlus,
} from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import ReactStars from 'react-rating-stars-component'
import { CartContext } from '../../contexts/Cart'
import { toSlug } from '../../utils/func'

export default function ProductBody(props) {
    const [imgIndex, setImgIndex] = useState(0)
    const [countCart, setCountCart] = useState(1)
    const [hover, setHover] = useState(false)
    const [zoom, setZoom] = useState(`0% 0%`)
    const productSmall = useRef(null)

    const handleMouseMove = (e) => {
        const { left, top, width, height } = e.target.getBoundingClientRect()
        const x = ((e.pageX - left) / width) * 100
        const y = ((e.pageY - top) / height) * 100
        setZoom(`${x}% ${y}%`)
    }

    useEffect(() => {
        if (hover === false) {
            var interval = setInterval(() => {
                setImgIndex((imgIndex) => imgIndex + 1)
            }, 2000)
        }
        return () => {
            clearInterval(interval)
        }
    }, [hover])

    let slugSex = ''
    let ratingList = ''
    let product = ''
    let ratingStar = {}
    if (props.product) {
        product = props.product
        slugSex = '/' + toSlug(product.sex === 'Woman' ? 'Women' : 'Men')
        if (imgIndex >= product.photo.length) {
            //infinity slider loop
            // setProductImgBig(productImgBig.concat(props.productImg))
            setImgIndex(0)
        }

        if (window.innerWidth > 900) {
            if (product.photo.length > 4) {
                if (imgIndex === 1 || imgIndex === 2) {
                    productSmall.current.style.transform = `translateY(0px)`
                } else if (imgIndex === product.photo.length - 1) {
                    productSmall.current.style.transform = `translateY(-${
                        (imgIndex - 5) * 110 + 50
                    }px)`
                } else if (imgIndex === product.photo.length - 2) {
                    productSmall.current.style.transform = `translateY(-${
                        (imgIndex - 4) * 110 + 50
                    }px)`
                } else if (imgIndex === product.photo.length - 3) {
                    productSmall.current.style.transform = `translateY(-${
                        (imgIndex - 3) * 110 + 50
                    }px)`
                } else if (imgIndex > 2) {
                    productSmall.current.style.transform = `translateY(-${
                        (imgIndex - 2) * 110
                    }px)`
                } else {
                    if (productSmall.current) {
                        productSmall.current.style.transform = `translateY(0px)`
                    }
                }
            }
        } else {
            if (product.photo.length > 4) {
                console.log(imgIndex)
                if (imgIndex === 1 || imgIndex === 2) {
                    productSmall.current.style.transform = `translateX(0px)`
                } else if (imgIndex === product.photo.length - 1) {
                    productSmall.current.style.transform = `translateX(-${
                        (imgIndex - 5) * 85 + 105
                    }px)`
                } else if (imgIndex === product.photo.length - 2) {
                    productSmall.current.style.transform = `translateX(-${
                        (imgIndex - 4) * 85 + 105
                    }px)`
                } else if (imgIndex === product.photo.length - 3) {
                    productSmall.current.style.transform = `translateX(-${
                        (imgIndex - 3) * 85 + 105
                    }px)`
                } else if (imgIndex > 2) {
                    productSmall.current.style.transform = `translateX(-${
                        (imgIndex - 2) * 85
                    }px)`
                } else {
                    if (productSmall.current) {
                        productSmall.current.style.transform = `translateX(0px)`
                    }
                }
            }
        }

        // Counting star vote
        ratingList = product.votes.map((a) => a.star) // get all rating

        const totalRating = ratingList.reduce((a, b) => a + b, 0)
        const averageRating = totalRating / ratingList.length
        ratingStar = {
            size: 12,
            value: averageRating,
            edit: false,
            activeColor: '#fda32a',
            color: '#ddd',
            isHalf: true,
        }
    }
    let productDate = new Date(product.created)
    let today = new Date()

    const sliderWidth = useRef(null)
    const [loading, setLoading] = useState(0)
    const { addToCart, addToWishList } = useContext(CartContext)

    const cartClick = () => {
        setLoading(1)
        setTimeout(() => {
            setLoading(0)
            addToCart(product, countCart)
        }, 500)
        setCountCart(1)
    }

    const wishListClick = () => {
        setLoading(2)
        setTimeout(() => {
            setLoading(0)
            addToWishList(product)
        }, 500)
    }

    return (
        <div className="ProductBody">
            <div className="product-breadcrumb flex">
                <Link to="/" className="breadcrumb-item breadcrumb-link">
                    Home
                </Link>
                <FontAwesomeIcon
                    icon={faAngleRight}
                    className="breadcrumb-arrow"
                />
                <Link to={slugSex} className="breadcrumb-item breadcrumb-link">
                    {product.sex === 'Woman' ? 'Women' : 'Men'}
                </Link>
                <FontAwesomeIcon
                    icon={faAngleRight}
                    className="breadcrumb-arrow"
                />
                <div className="breadcrumb-item breadcrumb-product">
                    {product.name}
                </div>
            </div>

            <div className="product-detail flex">
                <div
                    className="product-gallery flex"
                    onMouseEnter={() => {
                        setHover(true)
                    }}
                    onMouseLeave={() => {
                        setHover(false)
                    }}
                >
                    <div className="product-small" ref={productSmall}>
                        {product.photo &&
                            product.photo.map((item, index) => {
                                return (
                                    <div
                                        key={index}
                                        className={
                                            imgIndex === index
                                                ? 'product-small-item product-small-item-active'
                                                : 'product-small-item'
                                        }
                                    >
                                        <img
                                            src={`${process.env.REACT_APP_API_KEY}${item}`}
                                            onClick={() => {
                                                setImgIndex(index)
                                            }}
                                            alt=""
                                        ></img>
                                    </div>
                                )
                            })}
                    </div>
                    <div
                        className="product-slider flex"
                        onMouseMove={handleMouseMove}
                        ref={sliderWidth}
                    >
                        <div className="product-tag">
                            {product.sale > 0 && (
                                <div className="product-tag-item sale">
                                    {product.sale}%
                                </div>
                            )}
                            {product.productSold >= 40 && (
                                <div className="product-tag-item hot">HOT</div>
                            )}
                            {(today - productDate) / (1000 * 3600 * 24) <
                                10 && (
                                <div className="product-tag-item new">NEW</div>
                            )}
                        </div>
                        {product.photo &&
                            product.photo.map((item, index) => {
                                const width = sliderWidth.current.offsetWidth
                                return (
                                    <div
                                        key={index}
                                        className="product-big flex"
                                        style={{
                                            transform: `translateX(-${
                                                width * imgIndex
                                            }px`,
                                            backgroundImage: `url(${process.env.REACT_APP_API_KEY}${item})`,
                                            backgroundPosition: `${zoom}`,
                                        }}
                                    >
                                        <div className="product-big-item">
                                            <img
                                                id={index}
                                                className="nodrag"
                                                style={{ width: `${width}px` }}
                                                src={`${process.env.REACT_APP_API_KEY}${item}`}
                                                alt=""
                                            ></img>
                                        </div>
                                    </div>
                                )
                            })}
                        <div
                            className="change-product left"
                            onClick={() => {
                                if (imgIndex > 0) setImgIndex(imgIndex - 1)
                            }}
                        >
                            <FontAwesomeIcon
                                icon={faChevronLeft}
                            ></FontAwesomeIcon>
                        </div>
                        <div
                            className="change-product right"
                            onClick={() => {
                                if (
                                    imgIndex < product.photo.length &&
                                    product.photo.length
                                )
                                    setImgIndex(imgIndex + 1)
                            }}
                        >
                            <FontAwesomeIcon
                                icon={faChevronRight}
                            ></FontAwesomeIcon>
                        </div>
                    </div>
                </div>
                <div className="product-info-detail">
                    <div className="product-info-title">{product.name}</div>
                    <div className="product-info-des">
                        {product.description}
                    </div>
                    <div
                        className="product-info-vote"
                        onClick={props.scrollOnLick}
                    >
                        <div style={{ height: '40px' }}>
                            {Object.keys(ratingStar).length !== 0 && (
                                <ReactStars {...ratingStar} />
                            )}
                        </div>
                        <p>({ratingList.length} customer reviews)</p>
                    </div>

                    {product.final_price &&
                        product.final_price < product.price && (
                            <div className="product-info-price">
                                <span
                                    style={{
                                        textDecoration: 'line-through',
                                        color: '#777',
                                        marginRight: '10px',
                                        fontSize: '10px',
                                    }}
                                >
                                    {product.price
                                        .toString()
                                        .replace(
                                            /\B(?=(\d{3})+(?!\d))/g,
                                            '.'
                                        )}{' '}
                                    Đ
                                </span>
                                <span style={{ height: 'max-content' }}>
                                    {product.final_price
                                        .toString()
                                        .replace(
                                            /\B(?=(\d{3})+(?!\d))/g,
                                            '.'
                                        )}{' '}
                                    Đ
                                </span>
                            </div>
                        )}
                    {product.final_price &&
                        product.final_price === product.price && (
                            <div className="product-info-price">
                                {product.price
                                    .toString()
                                    .replace(/\B(?=(\d{3})+(?!\d))/g, '.')}{' '}
                                Đ
                            </div>
                        )}
                    <div className="product-info-cart flex">
                        <div className="count-cart noselect">
                            <div
                                className="count-cart-item left flex-center"
                                onClick={() => {
                                    if (countCart > 1)
                                        setCountCart(countCart - 1)
                                }}
                            >
                                <FontAwesomeIcon icon={faMinus} />
                            </div>
                            <div className="count-cart-item text flex-center">
                                <form>
                                    <input
                                        type="text"
                                        value={countCart}
                                        onChange={(e) => {
                                            setCountCart(
                                                Number(
                                                    e.target.value.replace(
                                                        /\D+/g,
                                                        ''
                                                    )
                                                )
                                            )
                                        }}
                                    />
                                </form>
                            </div>
                            <div
                                className="count-cart-item right flex-center"
                                onClick={() => {
                                    setCountCart(countCart + 1)
                                }}
                            >
                                <FontAwesomeIcon icon={faPlus} />
                            </div>
                        </div>
                        {loading === 1 && (
                            <div
                                className="product-info-addtocart flex-center btn"
                                onClick={cartClick}
                            >
                                <div className="loading-icon"></div>
                            </div>
                        )}
                        {loading !== 1 && (
                            <div
                                className="product-info-addtocart flex-center btn"
                                onClick={cartClick}
                            >
                                <FontAwesomeIcon icon={faCartPlus} />
                                <p>Add to cart</p>
                            </div>
                        )}
                        {loading === 2 && (
                            <div
                                className="product-info-wishlist flex-center"
                                onClick={cartClick}
                            >
                                <div className="loading-icon"></div>
                            </div>
                        )}
                        {loading !== 2 && (
                            <div
                                className="product-info-wishlist flex-center"
                                onClick={wishListClick}
                            >
                                <FontAwesomeIcon
                                    icon={faHeart}
                                ></FontAwesomeIcon>
                            </div>
                        )}
                    </div>
                    <div className="product-info-line"></div>
                    <div className="product-info-cate flex">
                        <p>Category:</p>
                        <p>{product.category_name}</p>
                    </div>
                    <div className="product-info-line"></div>
                </div>
            </div>
            <div className="product-info-line mobile-disable-line"></div>
        </div>
    )
}
