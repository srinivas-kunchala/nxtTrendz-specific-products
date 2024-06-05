// Write your code here
import {Component} from 'react'
import Cookies from 'js-cookie'

import {BsPlusSquare, BsDashSquare} from 'react-icons/bs'

import SimilarProductItem from '../SimilarProductItem'

import './index.css'

class ProductItemDetails extends Component {
  state = {productItems: {}, count: 1}

  componentDidMount() {
    this.getProductItemDetails()
  }

  getProductItemDetails = async () => {
    const {match} = this.props

    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')

    const options = {
      method: 'GET',
      headers: {
        Authorization: `BEARER ${jwtToken}`,
      },
    }
    const url = `https://apis.ccbp.in/products/${id}`
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      console.log(data)
      const updatedItems = {
        id: data.id,
        imageUrl: data.image_url,
        title: data.title,
        price: data.price,
        availability: data.availability,
        brand: data.brand,
        description: data.description,
        rating: data.rating,
        similarProducts: data.similar_products,
        totalReviews: data.total_reviews,
      }
      this.setState({productItems: updatedItems}, this.getProductItemDetails)
    }
    const {productItems} = this.state
    console.log(productItems)
  }

  onIncrement = () => {
    this.setState(previousState => ({count: previousState.count + 1}))
  }

  onDecrement = () => {
    this.setState(previousState => ({count: previousState.count - 1}))
  }

  /* renderSimilar = () => {
    const {productItems} = this.state
    const {similarProducts} = productItems
    const similarItems = similarProducts.map(eachItem => ({
      id: eachItem.id,
      imageUrl: eachItem.imageUrl,
      title: eachItem.title,
      price: eachItem.price,
    }))
    return similarItems
  } */

  render() {
    const {productItems, count} = this.state
    const {
      imageUrl,
      title,
      price,
      availability,
      brand,
      description,
      rating,
      totalReviews,
    } = productItems

    return (
      <div>
        <div className="product-items-container">
          <img src={imageUrl} alt={title} className="image" />
          <div>
            <h1>{title}</h1>
            <p>Rs {price}/-</p>
            <div>
              <p>{rating}</p>
              <p>{totalReviews} Reviews</p>
            </div>
            <p>{description}</p>
            <p>Available: {availability}</p>
            <p>Brand: {brand}</p>
            <hr />
            <div className="btn-container">
              <button
                type="button"
                className="button"
                onClick={this.onIncrement}
              >
                +
              </button>
              <p>{count}</p>
              <button
                type="button"
                className="button"
                onClick={this.onDecrement}
              >
                -
              </button>
            </div>
          </div>
        </div>
        <SimilarProductItem />
      </div>
    )
  }
}

export default ProductItemDetails
