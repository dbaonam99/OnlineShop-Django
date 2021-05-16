import React, { useEffect, useRef, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import { toSlug } from '../../../../utils/func'

export default function DashboardProductCreate(props) {
    const createForm = useRef()
    const cateInput = useRef()
    const groupCateInput = useRef()
    const [isCheckedSmall, setIsCheckedSmall] = useState(false)
    const [isCheckedMedium, setIsCheckedMedium] = useState(false)
    const [isCheckedLarge, setIsCheckedLarge] = useState(false)
    const [inputValue, setInputValue] = useState([])
    const [cate, setCate] = useState([])
    const [cateValue, setCateValue] = useState('')
    const [size, setSize] = useState([])
    const [sex, setSex] = useState('')
    const [file, setFile] = useState([])
    const [productGroupCate, setProductGroupCate] = useState('')
    const [productGroupCateList, setProductGroupCateList] = useState([])

    const [productImg, setProductImg] = useState([])

    const checkedSize = (event) => {
        if (event.target.id === '1') {
            if (isCheckedSmall) {
                setIsCheckedSmall(false)
            } else {
                setSize((size) => [...size, 'Small'])
                setIsCheckedSmall(true)
            }
        }
        if (event.target.id === '2') {
            if (isCheckedMedium) {
                setIsCheckedMedium(false)
            } else {
                setSize((size) => [...size, 'Medium'])
                setIsCheckedMedium(true)
            }
        }
        if (event.target.id === '3') {
            if (isCheckedLarge) {
                setIsCheckedLarge(false)
            } else {
                setSize((size) => [...size, 'Large'])
                setIsCheckedLarge(true)
            }
        }
    }

    const handleOnChange = (event) => {
        setInputValue({
            ...inputValue,
            [event.target.name]: event.target.value,
        })
    }

    useEffect(() => {
        axios
            .get(`http://localhost:8000/api/categories/?format=json`)
            .then((res) => {
                setCate(res.data)
            })
    }, [])

    const onSubmit = (event) => {
        event.preventDefault()
        const config = {
            headers: {
                'content-type': 'multipart/form-data',
            },
        }
        axios
            .post(`http://127.0.0.1:8000/api/products/`, {
                name: inputValue.name,
                category: Number(cateValue),
                images: [],
                slug: toSlug(inputValue.name),
                description: inputValue.des,
                price: inputValue.price,
                sale: inputValue.sale,
                sex: sex,
                available: true,
                size: [],
                product_votes: [],
            })
            .then((res) => {
                const formData = new FormData()
                const imageArr = Array.from(file)
                imageArr.forEach((image) => {
                    formData.append('image', image)
                })
                formData.append('product', res.data.id)
                axios
                    .post(
                        `http://127.0.0.1:8000/api/product_upload_image/`,
                        formData,
                        config
                    )
                    .then((res) => {
                        props.setCloseCreateFunc(false)
                        props.setToastFunc(true)
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const addNewCate = async () => {
        axios
            .post('http://127.0.0.1:8000/api/categories/', {
                name: inputValue.cate,
                slug: toSlug(inputValue.cate),
            })
            .then((res) => {
                console.log(res)
            })
            .catch((err) => {
                console.log(err)
            })
        setCate((cate) => [...cate, { cateName: inputValue.cate }])
        setCateValue(inputValue.cate)
        cateInput.current.value = ''
    }

    const addNewGroupCate = () => {
        setProductGroupCate(inputValue.groupCate)
        setProductGroupCateList((productGroupCateList) => [
            ...productGroupCateList,
            { productGroupCate: inputValue.groupCate },
        ])
        groupCateInput.current.value = ''
    }

    const deleteImg = (event) => {
        const virtualFile = [...file]
        virtualFile.splice(event.target.id, 1)
        setFile(virtualFile)

        const items = [...productImg]
        items.splice(event.target.id, 1)
        setProductImg(items)
    }

    return (
        <div className="DashboardProductInfo">
            <div className="create-box">
                <div className="create-box-title flex">
                    <div className="create-box-title-text">
                        Product information
                    </div>
                    <div
                        className="create-box-title-close flex-center"
                        onClick={() => {
                            props.setCloseCreateFunc(false)
                        }}
                    >
                        <FontAwesomeIcon icon={faTimes} />
                    </div>
                </div>
                <form
                    onSubmit={onSubmit}
                    encType="multipart/form-data"
                    ref={createForm}
                >
                    <div className="create-box-row flex">
                        <div className="dashboard-left flex">Name</div>
                        <div className="dashboard-right">
                            <input
                                type="text"
                                name="name"
                                onChange={handleOnChange}
                                required
                            ></input>
                        </div>
                    </div>
                    <div className="create-box-row flex">
                        <div className="dashboard-left flex">Images </div>
                        <div className="dashboard-right">
                            <input
                                onChange={(event) => {
                                    const files = event.target.files
                                    for (let i = 0; i < files.length; i++) {
                                        setProductImg((product) => [
                                            ...product,
                                            URL.createObjectURL(files[i]),
                                        ])
                                    }
                                    const fileArr =
                                        Array.prototype.slice.call(files)
                                    fileArr.forEach((item) => {
                                        setFile((file) => [...file, item])
                                    })
                                }}
                                type="file"
                                name="productImg"
                                className="noborder"
                                multiple="multiple"
                                style={{ height: '50px' }}
                            ></input>
                            <div
                                className="flex"
                                style={{
                                    overflowY: 'hidden',
                                    flexWrap: 'wrap',
                                }}
                            >
                                {productImg &&
                                    productImg.map((item, index) => {
                                        return (
                                            <div
                                                key={index}
                                                className="create-box-img"
                                            >
                                                <img
                                                    key={index}
                                                    src={item}
                                                    alt=""
                                                ></img>
                                                <div className="create-box-img-overlay">
                                                    <p
                                                        id={index}
                                                        onClick={deleteImg}
                                                        className="icon"
                                                    >
                                                        X
                                                    </p>
                                                </div>
                                            </div>
                                        )
                                    })}
                            </div>
                        </div>
                    </div>
                    <div className="create-box-row flex">
                        <div className="dashboard-left flex">Defaut price </div>
                        <div className="dashboard-right">
                            <input
                                type="number"
                                name="price"
                                placeholder="USD"
                                onChange={handleOnChange}
                                required
                            ></input>
                        </div>
                    </div>
                    <div className="create-box-row flex">
                        <div className="dashboard-left flex">Sale off </div>
                        <div className="dashboard-right flex-center">
                            <input
                                type="number"
                                placeholder="%"
                                style={{ width: '100%' }}
                                onChange={handleOnChange}
                                name="sale"
                                required
                            />
                        </div>
                    </div>
                    {/* <div className="create-box-row flex">
                        <div className="dashboard-left flex">Category group</div>
                        <div className="dashboard-right flex-center">
                            <select style={{ width: "350px"}} 
                                onChange={(event) => {setProductGroupCate(event.target.value)}}
                                value={productGroupCate}
                            >
                                { productGroupCateList.length > 0 &&
                                    productGroupCateList.map((item, index) => {
                                        return (
                                            <option key={index} value={item}>{item.productGroupCate}</option>
                                        )
                                    })
                                }
                            </select>
                            <input type="text" name="groupCate" placeholder="New category group?" style={{  margin:'0 10px'}} onChange={handleOnChange} ref={groupCateInput}></input>
                            <div className="btn" style={{
                                fontSize: '14px',
                                fontFamily: 'sans-serif',
                                fontWeight: '300',
                                padding: '0 10px',
                                cursor: 'pointer',
                                width: '350px',
                                height: '30px'
                            }}
                            onClick={addNewGroupCate}>
                                Add
                            </div>
                        </div>
                    </div> */}
                    <div className="create-box-row flex">
                        <div className="dashboard-left flex">Category </div>
                        <div className="dashboard-right flex-center">
                            <select
                                style={{ width: '350px' }}
                                onChange={(event) => {
                                    setCateValue(event.target.value)
                                }}
                                value={cateValue}
                            >
                                <option disabled></option>
                                {cate.length > 0 &&
                                    cate.map((item, index) => {
                                        return (
                                            <option key={index} value={item.id}>
                                                {item.name}
                                            </option>
                                        )
                                    })}
                            </select>
                            <input
                                type="text"
                                name="cate"
                                placeholder="New category?"
                                style={{ margin: '0 10px' }}
                                onChange={handleOnChange}
                                ref={cateInput}
                            ></input>
                            <div
                                className="btn"
                                style={{
                                    fontSize: '14px',
                                    fontFamily: 'sans-serif',
                                    fontWeight: '300',
                                    padding: '0 10px',
                                    cursor: 'pointer',
                                    width: '350px',
                                    height: '30px',
                                }}
                                onClick={addNewCate}
                            >
                                Add
                            </div>
                        </div>
                    </div>
                    <div className="create-box-row flex">
                        <div className="dashboard-left flex">Sex </div>
                        <div className="dashboard-right flex">
                            <select
                                style={{ width: '200px' }}
                                onChange={(event) => {
                                    setSex(event.target.value)
                                }}
                                value={sex}
                                required
                            >
                                <option></option>
                                <option value="MAN">Man</option>
                                <option value="WOMAN">Woman</option>
                            </select>
                        </div>
                    </div>
                    <div className="create-box-row flex">
                        <div className="dashboard-left flex">Size </div>
                        <div className="dashboard-right flex">
                            <div
                                className={
                                    isCheckedSmall
                                        ? 'size-check isChecked'
                                        : 'size-check'
                                }
                                id="1"
                                onClick={checkedSize}
                            >
                                Small
                            </div>
                            <div
                                className={
                                    isCheckedMedium
                                        ? 'size-check isChecked'
                                        : 'size-check'
                                }
                                id="2"
                                onClick={checkedSize}
                            >
                                Medium
                            </div>
                            <div
                                className={
                                    isCheckedLarge
                                        ? 'size-check isChecked'
                                        : 'size-check'
                                }
                                id="3"
                                onClick={checkedSize}
                            >
                                Large
                            </div>
                        </div>
                    </div>
                    <div className="create-box-row flex">
                        <div className="dashboard-left flex">Description </div>
                        <div className="dashboard-right">
                            <input
                                type="text"
                                name="des"
                                onChange={handleOnChange}
                                required
                            ></input>
                        </div>
                    </div>

                    <div className="flex-center" style={{ marginTop: '40px' }}>
                        <button className="create-box-btn btn">
                            Add product
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
