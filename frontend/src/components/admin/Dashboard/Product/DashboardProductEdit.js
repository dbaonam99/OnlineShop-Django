import React, { useEffect, useRef, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import { toSlug } from '../../../../utils/func'

export default function DashboardProductEdit(props) {
    const createForm = useRef()
    const cateInput = useRef()
    const [isCheckedSmall, setIsCheckedSmall] = useState(false)
    const [isCheckedMedium, setIsCheckedMedium] = useState(false)
    const [isCheckedLarge, setIsCheckedLarge] = useState(false)
    const [inputValue, setInputValue] = useState([])
    const [cate, setCate] = useState([])
    const [file, setFile] = useState([])
    const product = props.product

    const [productImg, setProductImg] = useState([])
    const [productName, setProductName] = useState('')
    const [productSale, setProductSale] = useState(0)
    const [productPrice, setProductPrice] = useState(0)
    const [productDes, setProductDes] = useState('')
    const [productCate, setProductCate] = useState('')
    const [productSize, setProductSize] = useState([])
    const [productSex, setProductSex] = useState([])

    const checkedSize = (event) => {
        if (event.target.id === '1') {
            if (isCheckedSmall) {
                const size = productSize.filter((item) => {
                    return item !== 'S'
                })
                setProductSize(size)
                setIsCheckedSmall(false)
            } else {
                setProductSize((productSize) => [...productSize, 1])
                setIsCheckedSmall(true)
            }
        }
        if (event.target.id === '2') {
            if (isCheckedMedium) {
                const size = productSize.filter((item) => {
                    return item !== 'M'
                })
                setProductSize(size)
                setIsCheckedMedium(false)
            } else {
                setProductSize((productSize) => [...productSize, 2])
                setIsCheckedMedium(true)
            }
        }
        if (event.target.id === '3') {
            const size = productSize.filter((item) => {
                return item !== 'L'
            })
            setProductSize(size)
            if (isCheckedLarge) {
                setIsCheckedLarge(false)
            } else {
                setProductSize((productSize) => [...productSize, 3])
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
        if (product) {
            setProductName(product.name)
            setProductImg(product.photo.split(','))
            setProductSale(product.sale)
            setProductPrice(product.price)
            setProductDes(product.description)
            setProductCate(product.category)
            setProductSex(product.sex)
            setProductSize(product.size)
            axios
                .get(`http://localhost:8000/api/categories/?format=json`)
                .then((res) => {
                    setCate(res.data)
                })
            if (product.size_names) {
                for (let i of product.size_names) {
                    if (i === 'S') setIsCheckedSmall(true)
                    if (i === 'M') setIsCheckedMedium(true)
                    if (i === 'L') setIsCheckedLarge(true)
                }
            }
        }
    }, [product])

    const onSubmit = (event) => {
        event.preventDefault()
        const config = {
            headers: {
                'content-type': 'multipart/form-data',
            },
        }

        axios
            .put(`http://127.0.0.1:8000/api/products/${product.id}/`, {
                name: productName,
                category: productCate,
                slug: toSlug(productName),
                description: productDes,
                price: productPrice,
                sale: productSale,
                sex: productSex,
                size: productSize,
            })
            .then((res) => {
                // const formData = new FormData()
                // const imageArr = Array.from(file)
                // imageArr.forEach((image) => {
                //     formData.append('image', image)
                // })
                // formData.append('product', res.data.id)
                // axios
                //     .post(
                //         `http://127.0.0.1:8000/api/product_upload_image/`,
                //         formData,
                //         config
                //     )
                //     .then((res) => {
                props.setCloseEditFunc(false)
                props.setToastFunc(true)
                // })
                // .catch((err) => {
                //     console.log(err)
                // })
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
                setCate((cate) => [...cate, res.data])
                setProductCate(res.data.id)
                cateInput.current.value = ''
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const deleteImg = (event) => {
        const id = event.target.id
        const virutalFile = [...file]
        virutalFile.splice(id, 1)
        setFile(virutalFile)

        const items = [...productImg]
        items.splice(id, 1)
        setProductImg(items)
        axios.post(`http://127.0.0.1:8000/products/update/${product.id}`, {
            deleteImgId: id,
        })
    }

    return (
        <div className="DashboardProductInfo">
            <div className="create-box">
                <div className="create-box-title flex">
                    <div className="create-box-title-text">
                        Product infomation
                    </div>
                    <div
                        className="create-box-title-close flex-center"
                        onClick={() => {
                            props.setCloseEditFunc(false)
                        }}
                    >
                        <FontAwesomeIcon icon={faTimes} />
                    </div>
                </div>
                {product && (
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
                                    value={productName}
                                    onChange={(event) => {
                                        setProductName(event.target.value)
                                    }}
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
                                                <div className="create-box-img">
                                                    <img
                                                        key={index}
                                                        src={`${item}`}
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
                            <div className="dashboard-left flex">
                                Defaut price{' '}
                            </div>
                            <div className="dashboard-right">
                                <input
                                    type="number"
                                    name="price"
                                    placeholder="USD"
                                    value={productPrice}
                                    onChange={(event) => {
                                        setProductPrice(event.target.value)
                                    }}
                                    required
                                ></input>
                            </div>
                        </div>
                        <div className="create-box-row flex">
                            <div className="dashboard-left flex">Sale off </div>
                            <div className="dashboard-right">
                                <input
                                    type="number"
                                    placeholder="%"
                                    style={{ width: '100%' }}
                                    name="sale"
                                    value={productSale}
                                    onChange={(event) => {
                                        setProductSale(event.target.value)
                                    }}
                                    required
                                ></input>
                            </div>
                        </div>
                        <div className="create-box-row flex">
                            <div className="dashboard-left flex">Category </div>
                            <div className="dashboard-right flex-center">
                                <select
                                    style={{ width: '350px' }}
                                    onChange={(event) => {
                                        setProductCate(event.target.value)
                                    }}
                                    value={productCate}
                                >
                                    <option></option>
                                    {cate.length > 0 &&
                                        cate.map((item, index) => {
                                            return (
                                                <option
                                                    key={index}
                                                    value={item.id}
                                                >
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
                                        setProductSex(event.target.value)
                                    }}
                                    value={productSex}
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
                            <div className="dashboard-left flex">
                                Description{' '}
                            </div>
                            <div className="dashboard-right">
                                <input
                                    type="text"
                                    name="des"
                                    value={productDes || ''}
                                    onChange={(event) => {
                                        setProductDes(event.target.value)
                                    }}
                                    required
                                ></input>
                            </div>
                        </div>

                        <div
                            className="flex-center"
                            style={{ marginTop: '40px' }}
                        >
                            <button className="create-box-btn btn">
                                Update product
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    )
}
