import React from "react";
import "../App.css";
import RecommendBanner from "../components/Home/RecommendBanner.js"
import HomeTab from "../components/Home/HomeTab.js"
import Collection from '../components/Home/Collection.js'
import FashionNews from '../components/Home/FashionNews.js'
import Newsletter from "../components/Layouts/Newsletter.js"
import Footer from "../components/Layouts/Footer.js"
import Banner from '../components/Banner/Banner.js'
import Header from '../components/Header/Header.js' 

function Home() { 
    
    return (
        <div className="Home">
            <Header/>
            <Banner/>
            <RecommendBanner/>
            <HomeTab/>
            <Collection/>
            <FashionNews/>
            <Newsletter/>
            <Footer/>
        </div>
    )
}
export default Home;
