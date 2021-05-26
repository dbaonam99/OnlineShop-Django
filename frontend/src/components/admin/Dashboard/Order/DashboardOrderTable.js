import React, { useEffect, useState } from 'react'
import '../../../../App.css'
import '../../../../Styles/Dashboard.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import classNames from 'classnames'

export default function DashboardUserTable(props) {
    const [order, setOrder] = useState([])
    const [product, setProduct] = useState([])
    const [isChanged, setIsChanged] = useState(false)
    const [constOrder, setConstOrder] = useState([])

    useEffect(() => {
        axios
            .get(`http://localhost:8000/api/orders/?format=json`)
            .then((res) => {
                setOrder(res.data)
                setConstOrder(res.data)
            })
        axios
            .get(`http://localhost:8000/api/products/?format=json`)
            .then((res) => {
                setProduct(res.data)
            })
    }, [props.isChange, isChanged])

    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 5

    const choosePage = (event) => {
        if (Number(event.target.id) === 0) {
            setCurrentPage(currentPage)
        } else if (Number(event.target.id) === -1) {
            if (currentPage > 1) {
                setCurrentPage(currentPage - 1)
            } else {
                setCurrentPage(1)
            }
        } else if (Number(event.target.id) === 999) {
            setCurrentPage(currentPage + 1)
        } else {
            setCurrentPage(Number(event.target.id))
        }
    }

    const indexOfLast = currentPage * itemsPerPage
    const indexOfFirst = indexOfLast - itemsPerPage
    const current = order.slice(indexOfFirst, indexOfLast)
    const pageNumbers = []
    for (let i = 1; i <= Math.ceil(order.length / itemsPerPage); i++) {
        pageNumbers.push(i)
    }

    const pages = []

    if (pageNumbers.length > 3) {
        if (currentPage === 2) {
            pages.push(currentPage - 1, currentPage, currentPage + 1)
        } else {
            if (currentPage === 1) {
                pages.push(currentPage, currentPage + 1, currentPage + 2)
            } else if (currentPage === 2) {
                pages.push(currentPage - 1, currentPage, currentPage + 1)
            } else if (
                currentPage > 2 &&
                currentPage < pageNumbers.length - 1
            ) {
                pages.push(currentPage - 1, currentPage, currentPage + 1)
            } else if (currentPage === pageNumbers.length - 1) {
                pages.push(currentPage - 1, currentPage, currentPage + 1)
            } else {
                pages.push(currentPage - 2, currentPage - 1, currentPage)
            }
        }
    } else if (pageNumbers.length === 3) {
        if (currentPage === 2) {
            pages.push(currentPage - 1, currentPage, currentPage + 1)
        } else {
            if (currentPage === 1) {
                pages.push(currentPage, currentPage + 1, currentPage + 2)
            } else if (currentPage === 2) {
                pages.push(currentPage - 1, currentPage, currentPage + 1)
            } else if (
                currentPage > 2 &&
                currentPage < pageNumbers.length - 1
            ) {
                pages.push(currentPage - 1, currentPage, currentPage + 1)
            } else if (currentPage === pageNumbers.length - 1) {
                pages.push(currentPage - 1, currentPage, currentPage + 1)
            } else {
                pages.push(currentPage - 2, currentPage - 1, currentPage)
            }
        }
    } else if (pageNumbers.length === 2) {
        if (currentPage === 2) {
            pages.push(currentPage - 1, currentPage)
        } else {
            if (currentPage === 1) {
                pages.push(currentPage, currentPage + 1)
            } else if (currentPage === 2) {
                pages.push(currentPage - 1, currentPage)
            }
        }
    } else {
        if (currentPage === 1) {
            pages.push(currentPage)
        }
    }

    const deleteOnClick = (event) => {
        const id = event.target.id
        axios
            .delete(`http://localhost:8000/api/orders/${event.target.id}`, {
                id: id,
            })
            .then(() => {
                setIsChanged(!isChanged)
                setOrder(
                    order.filter((item) => {
                        return item.id !== id
                    })
                )
            })
    }

    const searchOnSubmit = (event) => {
        event.preventDefault()
    }

    const searchOnChange = (event) => {
        const searchInput = event.target.value
        const search = []
        for (let i in constOrder) {
            if (constOrder[i].userName.toLowerCase().includes(searchInput)) {
                search.push(constOrder[i])
            } else if (constOrder[i].id.toString().includes(searchInput)) {
                search.push(constOrder[i])
            }
        }
        setOrder(search)
    }

    return (
        <div className="topfive flex-col" style={{ width: '100%' }}>
            <div className={`headerbox flex-center ${props.color}`}>
                <FontAwesomeIcon icon={props.icon} className="icon" />
            </div>
            <div className="top-location-container">
                <div className="headerbox-header">
                    <p>{props.title}</p>
                </div>
                <div className="topfive-content flex-col">
                    <div className="dashboard-addnew flex">
                        <div className="dashboard-addnew-search">
                            <form onSubmit={searchOnSubmit}>
                                <input
                                    type="text"
                                    placeholder="Search records"
                                    onChange={searchOnChange}
                                ></input>
                            </form>
                        </div>
                    </div>
                    <table
                        className="dashboard-table"
                        style={{ tableLayout: 'fixed' }}
                    >
                        <tbody>
                            <tr className="dashboard-order">
                                {props.table.map((item, index) => {
                                    return (
                                        <th
                                            key={index}
                                            className="table-new-title table-order-title"
                                            id={`Order${item
                                                .split(' ')
                                                .join('')}`}
                                        >
                                            {item}
                                        </th>
                                    )
                                })}
                            </tr>
                            {current.map((item, index) => {
                                const date = new Date(item.created)
                                const day = date.getDate()
                                const month = date.getMonth() + 1
                                const year = date.getFullYear()
                                var totalItem = 0
                                for (let i in item.orderList) {
                                    totalItem += item.orderList[i].amount
                                }
                                return (
                                    <tr key={index} className="mobile-table">
                                        <td className="mobile-table-orderinfo">
                                            <ul style={{ margin: '10px 0' }}>
                                                <li className="flex">
                                                    <p
                                                        style={{
                                                            marginRight: '5px',
                                                            fontWeight: 'bold',
                                                        }}
                                                    >
                                                        #{item.id}
                                                    </p>
                                                    <p className="mobile-table-name">
                                                        by {item.userName}
                                                    </p>
                                                </li>
                                            </ul>
                                        </td>
                                        <td className="mobile-table-shippinginfo">
                                            <div
                                                className="flex"
                                                style={{
                                                    alignItems: 'center',
                                                    margin: '10px 0',
                                                }}
                                            >
                                                <p
                                                    style={{
                                                        wordWrap: 'break-word',
                                                        WebkitLineClamp: '3',
                                                    }}
                                                >
                                                    {item.userAddress},{' '}
                                                    {item.userDistrict},{' '}
                                                    {item.userProvince}
                                                </p>
                                            </div>
                                        </td>
                                        <td>
                                            <p>
                                                {day}-{month}-{year}
                                            </p>
                                        </td>
                                        <td>
                                            {typeof totalItem === 'number' && (
                                                <div
                                                    key={index}
                                                    className="flex"
                                                    style={{
                                                        flexDirection: 'column',
                                                        justifyContent:
                                                            'space-between',
                                                    }}
                                                >
                                                    {product.length > 0 &&
                                                        item.orderProduct.map(
                                                            (item) => {
                                                                return (
                                                                    <div>
                                                                        <p
                                                                            style={{
                                                                                margin: '10px 0',
                                                                                width: '100%',
                                                                                WebkitLineClamp:
                                                                                    '2',
                                                                            }}
                                                                        >
                                                                            {
                                                                                product.filter(
                                                                                    (
                                                                                        item2
                                                                                    ) =>
                                                                                        item2.id ===
                                                                                        Number(
                                                                                            item.product
                                                                                        )
                                                                                )[0]
                                                                                    .name
                                                                            }{' '}
                                                                            (x
                                                                            {
                                                                                item.quantity
                                                                            }
                                                                            )
                                                                        </p>
                                                                    </div>
                                                                )
                                                            }
                                                        )}
                                                </div>
                                            )}
                                        </td>
                                        <td className="mobile-table-totalmoney">
                                            <p>{item.totalAmount} đ</p>
                                        </td>
                                        <td>
                                            <div className="action-table flex">
                                                <div
                                                    className="action-item flex-center action-red"
                                                    onClick={deleteOnClick}
                                                    id={item.id}
                                                >
                                                    <FontAwesomeIcon
                                                        style={{
                                                            pointerEvents:
                                                                'none',
                                                        }}
                                                        icon={faTimes}
                                                    />
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>

                    <div
                        className="pagination-container flex"
                        style={{ justifyContent: 'flex-end', margin: '20px 0' }}
                    >
                        <div
                            className="pagnigation flex-center"
                            onClick={choosePage}
                        >
                            <div
                                id="-1"
                                className={classNames({
                                    pagnigation_disable: currentPage === 1,
                                })}
                            >
                                ←
                            </div>
                            {pages.map(function (number, index) {
                                if (currentPage === number) {
                                    return (
                                        <div
                                            key={number}
                                            id={number}
                                            className="pagnigation-active"
                                        >
                                            {number}
                                        </div>
                                    )
                                } else {
                                    return (
                                        <div key={number} id={number}>
                                            {number}
                                        </div>
                                    )
                                }
                            })}
                            <div
                                id="999"
                                className={classNames({
                                    pagnigation_disable:
                                        currentPage === pageNumbers.length,
                                })}
                            >
                                →
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
