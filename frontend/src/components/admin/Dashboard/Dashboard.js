import React, { useEffect, useState } from 'react'
import '../../../App.css'
import '../../../Styles/Dashboard.css'
import DashboardBody from './DashboardBody'
import DashboardMenu from './DashboardMenu'
import {
    faEnvelope,
    faFileInvoice,
    faHome,
    faShoppingBag,
    faTshirt,
    faUser,
    faInbox,
} from '@fortawesome/free-solid-svg-icons'
import Axios from 'axios'
import { withRouter } from 'react-router-dom'

function Dashboard(props) {
    const menuItems = [
        {
            id: '1',
            name: 'Dashboard',
            icon: faHome,
        },
        {
            id: '2',
            name: 'Orders',
            icon: faFileInvoice,
        },
        {
            id: '3',
            name: 'Products',
            icon: faTshirt,
        },
        {
            id: '4',
            name: 'Users',
            icon: faUser,
        },
        {
            id: '5',
            name: 'Collections',
            icon: faShoppingBag,
        },
        {
            id: '6',
            name: 'Subscribers',
            icon: faEnvelope,
        },
        {
            id: '7',
            name: 'Live Chat',
            icon: faInbox,
        },
    ]
    const [tabId, setTabId] = useState('1')
    const [openMenu, setOpenMenu] = useState(true)
    const [openMenuMobile, setOpenMenuMobile] = useState(true)
    const [productId, setProductId] = useState('')

    const [userInfo, setUserInfo] = useState(null)

    useEffect(() => {
        if (localStorage.getItem('token')) {
            Axios.get(
                `http://127.0.0.1:8000/api/users/${localStorage.getItem(
                    'user-id'
                )}`
            )
                .then((res) => {
                    setUserInfo(res.data.user)
                    const userInfo = res.data.user
                    if (userInfo.role === 'admin') {
                        // setOrderNotice(data)
                    } else {
                        localStorage.setItem(
                            'errLogin',
                            'You do not have Administrator access!'
                        )
                        props.history.push('/admin')
                    }
                })
                .catch((err) => {
                    console.log(err)
                })
        } else {
            props.history.push('/admin')
        }
    }, [])

    const setTabIdOnClick = (id) => {
        setTabId(id)
    }

    const setOpenMenuOnClick = () => {
        if (window.innerWidth <= 1110) {
            setOpenMenu(true)
            if (openMenuMobile) setOpenMenuMobile(false)
            else setOpenMenuMobile(true)
        } else {
            if (openMenu) setOpenMenu(false)
            else setOpenMenu(true)
        }
    }

    const [openCreate, setOpenCreate] = useState(false)

    const setOpenCreateFunc = () => {
        document.body.style.overflow = 'hidden'
        setOpenCreate(true)
    }

    const setCloseCreateFunc = (bool) => {
        document.body.style.overflow = 'unset'
        setOpenCreate(bool)
    }

    const [openEdit, setOpenEdit] = useState(false)

    const setOpenEditFunc = (event) => {
        document.body.style.overflow = 'hidden'
        setOpenEdit(true)
        setProductId(event.target.id)
    }

    const setCloseEditFunc = (bool) => {
        document.body.style.overflow = 'unset'
        setOpenEdit(bool)
    }

    return (
        <div className="Dashboard flex">
            <DashboardMenu
                setTabIdOnClick={setTabIdOnClick}
                setOpenMenuOnClick={setOpenMenuOnClick}
                tabId={tabId}
                menuItems={menuItems}
                openMenu={openMenu}
                openMenuMobile={openMenuMobile}
                setCloseCreateFunc={setCloseCreateFunc}
                setCloseEditFunc={setCloseEditFunc}
                userInfo={userInfo}
            />
            <DashboardBody
                tabId={tabId}
                menuItems={menuItems}
                openMenu={openMenu}
                openMenuMobile={openMenuMobile}
                openCreate={openCreate}
                openEdit={openEdit}
                setOpenMenuOnClick={setOpenMenuOnClick}
                setOpenCreateFunc={setOpenCreateFunc}
                setCloseCreateFunc={setCloseCreateFunc}
                setOpenEditFunc={setOpenEditFunc}
                setCloseEditFunc={setCloseEditFunc}
                productId={productId}
            />
        </div>
    )
}
export default withRouter(Dashboard)
