import React, { useContext, useEffect, useState } from 'react'
import '../../App.css'
import '../../Styles/Account.css'
import { withRouter } from 'react-router-dom'
import { UserContext } from '../../contexts/User'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'

function AccountInfo(props) {
    const [tinh, setTinh] = useState([])
    const [huyen, setHuyen] = useState([])
    const { userInfo, setUserInfoFunc } = useContext(UserContext)
    const [product, setProduct] = useState([])

    const [tabId, setTabId] = useState(1)
    const [userName, setUserName] = useState('')
    const [userEmail, setUserEmail] = useState('')
    const [userPassword, setUserPassword] = useState('')
    const [userPhone, setUserPhone] = useState('')
    const [userAvt, setUserAvt] = useState('')
    const [file, setFile] = useState('')
    const [provinceId, setProvinceId] = useState('')
    const [userTinh, setUserTinh] = useState(null)
    const [userHuyen, setUserHuyen] = useState(null)
    const [userAddress, setUserAddress] = useState(null)
    const [toast, setToast] = useState(false)
    const [orderList, setOrderList] = useState([])

    useEffect(() => {
        axios
            .get(`http://localhost:8000/api/products/?format=json`)
            .then((res) => {
                setProduct(res.data)
            })
        if (userInfo) {
            setUserName(userInfo.name)
            setUserEmail(userInfo.email)
            setUserPhone(userInfo.phone)
            setUserAvt(userInfo.photo)
            setUserAddress(userInfo.address)
            setUserPassword(userInfo.password)
            setUserTinh(userInfo.province)
            setUserHuyen(userInfo.district)
            axios
                .get(`http://localhost:8000/api/orders/?format=json`)
                .then((res) => {
                    setOrderList(
                        res.data.filter((item) => item.creator === userInfo.id)
                    )
                })
            axios
                .get('http://localhost:8000/api/province/?format=json')
                .then((res) => {
                    setTinh(res.data)
                    res.data.filter((item) => {
                        if (userInfo.name === item.name) {
                            setProvinceId(item.id)
                        }
                        return null
                    })
                })
            axios
                .get('http://localhost:8000/api/district/?format=json')
                .then((res) => {
                    setHuyen(res.data)
                })
        }
    }, [userInfo])

    const submitInfo = async (event) => {
        event.preventDefault()
        const config = {
            headers: {
                'content-type': 'multipart/form-data',
            },
        }
        const imageArr = Array.from(file)
        if (imageArr.length > 0) {
            const formData = new FormData()
            formData.append('url', imageArr[0])
            const res = await axios.post(
                `http://127.0.0.1:8000/api/images/`,
                formData,
                config
            )
            const data = {
                username: userInfo.username,
                name: userName,
                email: userEmail,
                phone: userPhone,
                province: userTinh,
                district: userHuyen,
                address: userAddress,
                role: userInfo.username,
                photo: res.data.url,
                password: userPassword,
            }
            axios
                .put(`http://127.0.0.1:8000/api/profile/`, data, {
                    headers: {
                        authorization: `Bearer ${localStorage.getItem(
                            'token'
                        )}`,
                    },
                })
                .then((res) => {
                    setUserInfoFunc(res.data)
                    setToast(true)
                    setTimeout(() => {
                        setToast(false)
                    }, 2000)
                })
        } else {
            const data = {
                username: userInfo.username,
                name: userName,
                email: userEmail,
                phone: userPhone,
                province: userTinh,
                district: userHuyen,
                address: userAddress,
                role: userInfo.username,
                photo: userInfo.photo,
                password: userPassword,
            }
            axios
                .put(`http://127.0.0.1:8000/api/profile/`, data, {
                    headers: {
                        authorization: `Bearer ${localStorage.getItem(
                            'token'
                        )}`,
                    },
                })
                .then((res) => {
                    console.log(res)
                    setUserInfoFunc(res.data)
                    setToast(true)
                    setTimeout(() => {
                        setToast(false)
                    }, 2000)
                })
        }
    }

    return (
        <div className="AccountInfo">
            <div className="accountinfo-container flex">
                <div
                    className={toast ? 'toast toast-show' : 'toast'}
                    style={{ top: '20px' }}
                >
                    <FontAwesomeIcon icon={faCheckCircle} className="icon" />
                    Change account infomation success!
                </div>
                <div className="accountinfo-menu">
                    <div className="accountinfo-avt flex">
                        <img
                            style={{ borderRadius: '50%' }}
                            className="accountinfo-avt-img"
                            src={userInfo.photo}
                            alt=""
                            width="48px"
                            height="48px"
                        ></img>
                        <div className="accountinfo-avt-name">
                            {userInfo.username}
                        </div>
                    </div>
                    <div className="accountinfo-menu-list">
                        <div
                            className={
                                tabId === 1
                                    ? 'accountinfo-active accountinfo-menu-item flex'
                                    : 'accountinfo-menu-item flex'
                            }
                            onClick={() => setTabId(1)}
                        >
                            My account
                        </div>
                        <div
                            className={
                                tabId === 2
                                    ? 'accountinfo-active accountinfo-menu-item flex'
                                    : 'accountinfo-menu-item flex'
                            }
                            onClick={() => setTabId(2)}
                        >
                            Orders
                        </div>
                        <div
                            className={
                                tabId === 3
                                    ? 'accountinfo-active accountinfo-menu-item flex'
                                    : 'accountinfo-menu-item flex'
                            }
                            onClick={() => {
                                localStorage.removeItem('user-id')
                                localStorage.removeItem('token')
                                sessionStorage.removeItem('chat-id')
                                window.location.reload(false)
                                localStorage.removeItem('total')
                                localStorage.removeItem('cart')
                            }}
                        >
                            Log out
                        </div>
                    </div>
                </div>
                {tabId === 1 && (
                    <div className="accountinfo-main">
                        <div className="accountinfo-title">
                            <p>Account Infomation</p>
                            <p>
                                Manage account information for account security
                            </p>
                        </div>
                        <div className="accountinfo-body flex">
                            <form
                                onSubmit={submitInfo}
                                encType="multipart/form-data"
                            >
                                <div className="create-box-row account-box-row flex">
                                    <div className="dashboard-left create-box-left flex">
                                        Name
                                    </div>
                                    <div className="dashboard-right create-box-right">
                                        <input
                                            type="text"
                                            name="title"
                                            value={userName}
                                            onChange={(event) => {
                                                setUserName(event.target.value)
                                            }}
                                        ></input>
                                    </div>
                                </div>
                                <div className="create-box-row account-box-row flex">
                                    <div className="dashboard-left create-box-left flex">
                                        Images{' '}
                                    </div>
                                    <div className="dashboard-right create-box-right">
                                        <input
                                            onChange={(event) => {
                                                const files = event.target.files
                                                setUserAvt(
                                                    URL.createObjectURL(
                                                        files[0]
                                                    )
                                                )
                                                const fileArr =
                                                    Array.prototype.slice.call(
                                                        files
                                                    )
                                                fileArr.forEach((item) => {
                                                    setFile((file) => [
                                                        ...file,
                                                        item,
                                                    ])
                                                })
                                            }}
                                            type="file"
                                            name="newsImg"
                                            className="noborder"
                                            multiple="multiple"
                                            style={{ height: '30px' }}
                                        ></input>
                                        <div
                                            className="flex"
                                            style={{
                                                overflowY: 'hidden',
                                                flexWrap: 'wrap',
                                            }}
                                        >
                                            <img
                                                className="accountinfo-editavt-img"
                                                src={userAvt}
                                                alt=""
                                                width="80px"
                                                height="80px"
                                            ></img>
                                        </div>
                                    </div>
                                </div>
                                <div className="create-box-row account-box-row flex">
                                    <div className="dashboard-left create-box-left flex">
                                        Email
                                    </div>
                                    <div className="dashboard-right create-box-right">
                                        <input
                                            type="text"
                                            value={userEmail}
                                            onChange={(event) => {
                                                setUserEmail(event.target.value)
                                            }}
                                        ></input>
                                    </div>
                                </div>
                                <div className="create-box-row account-box-row flex">
                                    <div className="dashboard-left create-box-left flex">
                                        Phone number
                                    </div>
                                    <div className="dashboard-right create-box-right">
                                        <input
                                            type="text"
                                            value={userPhone}
                                            onChange={(event) => {
                                                setUserPhone(event.target.value)
                                            }}
                                        ></input>
                                    </div>
                                </div>
                                <div className="create-box-row account-box-row flex">
                                    <div className="dashboard-left create-box-left flex">
                                        Province
                                    </div>
                                    <div className="dashboard-right create-box-right">
                                        <select
                                            className="input"
                                            value={userTinh || ''}
                                            onChange={(event) => {
                                                setProvinceId(
                                                    event.target.selectedIndex
                                                )
                                                setUserTinh(event.target.value)
                                            }}
                                        >
                                            <option defaultValue disabled>
                                                select a province
                                            </option>
                                            {tinh.map((item, index) => {
                                                return (
                                                    <option
                                                        key={index}
                                                        value={item.name}
                                                    >
                                                        {item.name}
                                                    </option>
                                                )
                                            })}
                                        </select>
                                    </div>
                                </div>
                                <div className="create-box-row account-box-row flex">
                                    <div className="dashboard-left create-box-left flex">
                                        District
                                    </div>
                                    <div className="dashboard-right create-box-right">
                                        <select
                                            className="input"
                                            value={userHuyen || ''}
                                            onChange={(event) => {
                                                setUserHuyen(event.target.value)
                                            }}
                                        >
                                            <option defaultValue disabled>
                                                select a district
                                            </option>
                                            {huyen.map((item, index) => {
                                                if (
                                                    Number(item.tinh_id) ===
                                                    Number(provinceId)
                                                ) {
                                                    return (
                                                        <option
                                                            key={index}
                                                            value={item.name}
                                                        >
                                                            {item.name}
                                                        </option>
                                                    )
                                                }
                                                return null
                                            })}
                                        </select>
                                    </div>
                                </div>
                                <div className="create-box-row account-box-row flex">
                                    <div className="dashboard-left create-box-left flex">
                                        Address
                                    </div>
                                    <div className="dashboard-right create-box-right">
                                        <input
                                            type="text"
                                            className="input"
                                            name="phone"
                                            value={userAddress || ''}
                                            onChange={(event) => {
                                                setUserAddress(
                                                    event.target.value
                                                )
                                            }}
                                        ></input>
                                    </div>
                                </div>
                                <div className="create-box-row account-box-row flex">
                                    <div className="dashboard-left create-box-left flex">
                                        New password
                                    </div>
                                    <div className="dashboard-right create-box-right">
                                        <input
                                            type="password"
                                            className="input"
                                            name="email"
                                            value={userPassword}
                                            onChange={(event) => {
                                                setUserPassword(
                                                    event.target.value
                                                )
                                            }}
                                        ></input>
                                    </div>
                                </div>
                                <div className="accountinfo-btn-row">
                                    <button className="accountinfo-btn btn">
                                        Update infomation
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
                {tabId === 2 && (
                    <div className="accountinfo-main">
                        <div className="accountinfo-title">
                            <p>Orders infomation</p>
                            <p>List of your orders</p>
                        </div>
                        <div className="dashboard-table-orderlist">
                            <table
                                className="dashboard-table"
                                style={{ tableLayout: 'fixed' }}
                            >
                                <tbody>
                                    <tr className="dashboard-order">
                                        <th className="table-new-title table-order-title">
                                            Shipping info
                                        </th>
                                        <th className="table-new-title table-order-title">
                                            Date
                                        </th>
                                        <th className="table-new-title table-order-title">
                                            Payment Method
                                        </th>
                                        <th className="table-new-title table-order-title">
                                            Items
                                        </th>
                                        <th className="table-new-title table-order-title">
                                            Total money
                                        </th>
                                    </tr>
                                    {orderList.reverse().map((item, index) => {
                                        const date = new Date(item.created)
                                        const day = date.getDate()
                                        const month = date.getMonth() + 1
                                        const year = date.getFullYear()
                                        var totalItem = 0
                                        for (let i in item.orderList) {
                                            totalItem +=
                                                item.orderList[i].amount
                                        }
                                        return (
                                            <tr
                                                key={index}
                                                className="mobile-table"
                                            >
                                                <td>
                                                    <div
                                                        className="flex"
                                                        style={{
                                                            alignItems:
                                                                'center',
                                                            margin: '10px 0',
                                                        }}
                                                    >
                                                        <p
                                                            style={{
                                                                wordWrap:
                                                                    'break-word',
                                                                WebkitLineClamp:
                                                                    '3',
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
                                                    <p
                                                        style={{
                                                            textTransform:
                                                                'capitalize',
                                                        }}
                                                    >
                                                        {item.paymentMethod}
                                                    </p>
                                                </td>
                                                <td>
                                                    {typeof totalItem ===
                                                        'number' && (
                                                        <div key={index}>
                                                            {item.orderProduct
                                                                .length > 0 &&
                                                                item.orderProduct.map(
                                                                    (item) => {
                                                                        const productData =
                                                                            product.filter(
                                                                                (
                                                                                    item2
                                                                                ) =>
                                                                                    item2.id ===
                                                                                    item.id
                                                                            )
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
                                                                                    {productData.length >
                                                                                        0 &&
                                                                                        productData[0]
                                                                                            .name}
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
                                                <td>
                                                    <p>{item.totalAmount} đ</p>
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default withRouter(AccountInfo)
