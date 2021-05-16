import React, { useEffect, useState } from 'react'
import '../../../App.css'
import '../../../Styles/Dashboard.css'
import DashboardHeader from './DashboardHeader'
import DashboardMain from './Main/DashboardMain'
import classNames from 'classnames'
import DashboardProduct from './Product/DashboardProduct'
import DashboardProductEdit from './Product/DashboardProductEdit'
import DashboardProductCreate from './Product/DashboardProductCreate'
import Axios from 'axios'
import DashboardUser from './User/DashboardUser'
import DashboardUserCreate from './User/DashboardUserCreate'
import DashboardUserEdit from './User/DashboardUserEdit'
import DashboardOrder from './Order/DashboardOrder'
import DashboardOrderEdit from './Order/DashboardOrderEdit'
import DashboardOrderCreate from './Order/DashboardOrderCreate'

export default function DashboardBody(props) {
    const { tabId, openMenuMobile } = props
    const [toast, setToast] = useState(false)
    const [isChange, setIsChange] = useState(false)
    const [product, setProduct] = useState({})
    const [user, setUser] = useState({})
    const [order, setOrder] = useState({})

    const setToastFunc = (bool) => {
        setIsChange(true)
        setTimeout(() => {
            setIsChange(false)
        }, 100)
        setToast(true)
        setTimeout(() => {
            setToast(false)
        }, 3000)
    }

    useEffect(() => {
        // Axios.get(`http://127.0.0.1:8000/products/${props.productId}`)
        //     .then(res => {
        //         setProduct(res.data)
        //     }
        // )
        // Axios.get(`http://127.0.0.1:8000/users/list/${props.productId}`)
        //     .then(res => {
        //         setUser(res.data)
        //     }
        // )
        // Axios.get(`http://127.0.0.1:8000/order/${props.productId}`)
        //     .then(res => {
        //         setOrder(res.data)
        //     }
        // )
    }, [props.productId, props.openEdit])

    return (
        <div
            className={classNames('DashboardBody', {
                DashboardBody_small: !props.openMenu,
            })}
        >
            {!openMenuMobile && (
                <div
                    className="DashboardBody-closemenu"
                    onClick={props.setOpenMenuOnClick}
                ></div>
            )}
            {props.openCreate && tabId === '2' && (
                <DashboardOrderCreate
                    setCloseCreateFunc={props.setCloseCreateFunc}
                    setToastFunc={setToastFunc}
                />
            )}
            {props.openEdit && tabId === '2' && (
                <DashboardOrderEdit
                    setCloseEditFunc={props.setCloseEditFunc}
                    setToastFunc={setToastFunc}
                    order={order}
                />
            )}
            {props.openCreate && tabId === '3' && (
                <DashboardProductCreate
                    setCloseCreateFunc={props.setCloseCreateFunc}
                    setToastFunc={setToastFunc}
                />
            )}
            {props.openEdit && tabId === '3' && (
                <DashboardProductEdit
                    setCloseEditFunc={props.setCloseEditFunc}
                    setToastFunc={setToastFunc}
                    product={product}
                />
            )}
            {props.openCreate && tabId === '4' && (
                <DashboardUserCreate
                    setCloseCreateFunc={props.setCloseCreateFunc}
                    setToastFunc={setToastFunc}
                />
            )}
            {props.openEdit && tabId === '4' && (
                <DashboardUserEdit
                    setCloseEditFunc={props.setCloseEditFunc}
                    setToastFunc={setToastFunc}
                    user={user}
                />
            )}
            <DashboardHeader
                itemName={props.menuItems[tabId - 1].name}
                setOpenMenuOnClick={props.setOpenMenuOnClick}
                openMenu={props.openMenu}
            />
            {/* {
                tabId === "1" && <DashboardMain/>
            }  */}
            {tabId === '2' && (
                <DashboardOrder
                    setOpenCreateFunc={props.setOpenCreateFunc}
                    setOpenEditFunc={props.setOpenEditFunc}
                    toast={toast}
                    isChange={isChange}
                />
            )}
            {tabId === '3' && (
                <DashboardProduct
                    setOpenCreateFunc={props.setOpenCreateFunc}
                    setOpenEditFunc={props.setOpenEditFunc}
                    toast={toast}
                    isChange={isChange}
                />
            )}
            {tabId === '4' && (
                <DashboardUser
                    setOpenCreateFunc={props.setOpenCreateFunc}
                    setOpenEditFunc={props.setOpenEditFunc}
                    toast={toast}
                    isChange={isChange}
                />
            )}
        </div>
    )
}
