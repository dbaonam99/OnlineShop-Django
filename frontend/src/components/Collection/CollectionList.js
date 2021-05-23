import React from 'react'
import CollectionItem from './CollectionItem'

export default function CollectionList(props) {
    const collection = props.collection

    return (
        <div className="CollectionList flex">
            {collection &&
                collection.products.map((item, index) => {
                    return <CollectionItem key={index} product={item} />
                })}
            <div
                className="product-info-line"
                style={{ margin: `40px 20px` }}
            ></div>
        </div>
    )
}
