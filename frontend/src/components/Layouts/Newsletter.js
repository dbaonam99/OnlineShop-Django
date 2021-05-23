import React, { useRef, useState } from 'react'
import '../../App.css'
import axios from 'axios'

export default function Newsletter() {
    const inputEmailRef = useRef()
    const [emailInput, setEmailInput] = useState('')
    const handleOnChange = (event) => {
        setEmailInput(event.target.value)
    }
    const handleOnSubmit = (event) => {
        event.preventDefault()
        axios
            .post('http://localhost:8000/api/subscribers/', {
                email: emailInput,
            })
            .then((res) => {
                if (res.status === 201) alert('Đăng ký thành công!')
            })
            .catch((err) => {
                alert(err.response.data)
            })
        inputEmailRef.current.value = ''
    }

    return (
        <div className="Newsletter">
            <div className="newsletter-container flex-center">
                <div className="newsletter-title">Newsletter</div>
                <div className="newsletter-small">
                    Get timely updates from your favorite products
                </div>
                <form className="newsletter-form" onSubmit={handleOnSubmit}>
                    <input
                        className="newsletter-input"
                        placeholder="Enter your email address"
                        type="email"
                        onChange={handleOnChange}
                        ref={inputEmailRef}
                    ></input>
                    <button className="newsletter-btn btn">Subcribe</button>
                </form>
                <div className="newsletter-line"></div>
            </div>
        </div>
    )
}
