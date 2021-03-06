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
import DashboardInbox from './Inbox/DashboardInbox'
import DashboardUser from './User/DashboardUser'
import DashboardUserCreate from './User/DashboardUserCreate'
import DashboardOrder from './Order/DashboardOrder'
import DashboardCollection from './Collection/DashboardCollection'
import DashboardCollectionEdit from './Collection/DashboardCollectionEdit'
import DashboardCollectionCreate from './Collection/DashboardCollectionCreate'
import DashboardSubscriber from './Subscriber/DashboardSubscriber'
import DashboardSubscriberCreate from './Subscriber/DashboardSubscriberCreate'

export default function DashboardBody(props) {
    const { tabId, openMenuMobile } = props
    const [toast, setToast] = useState(false)
    const [isChange, setIsChange] = useState(false)
    const [product, setProduct] = useState({})
    const [collection, setCollection] = useState({})

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
        Axios.get(
            `http://localhost:8000/api/products/${props.productId}?format=json`
        ).then((res) => {
            setProduct(res.data)
        })
        Axios.get(
            `http://localhost:8000/api/collections/${props.productId}?format=json`
        ).then((res) => {
            setCollection(res.data)
        })
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
            {props.openCreate && tabId === '5' && (
                <DashboardCollectionCreate
                    setCloseCreateFunc={props.setCloseCreateFunc}
                    setToastFunc={setToastFunc}
                />
            )}
            {props.openEdit && tabId === '5' && (
                <DashboardCollectionEdit
                    setCloseEditFunc={props.setCloseEditFunc}
                    setToastFunc={setToastFunc}
                    collection={collection}
                />
            )}
            {props.openCreate && tabId === '6' && (
                <DashboardSubscriberCreate
                    setCloseCreateFunc={props.setCloseCreateFunc}
                    setToastFunc={setToastFunc}
                />
            )}
            <DashboardHeader
                itemName={props.menuItems[tabId - 1].name}
                setOpenMenuOnClick={props.setOpenMenuOnClick}
                openMenu={props.openMenu}
            />
            {tabId === '1' && <DashboardMain />}
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
            {tabId === '5' && (
                <DashboardCollection
                    setOpenCreateFunc={props.setOpenCreateFunc}
                    setOpenEditFunc={props.setOpenEditFunc}
                    toast={toast}
                    isChange={isChange}
                />
            )}
            {tabId === '6' && (
                <DashboardSubscriber
                    setOpenCreateFunc={props.setOpenCreateFunc}
                    setOpenEditFunc={props.setOpenEditFunc}
                    toast={toast}
                    isChange={isChange}
                />
            )}
            {tabId === '7' && <DashboardInbox />}
        </div>
    )
}
