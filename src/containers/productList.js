import React from "react";
import Product from "./product";
import Footer from './footer';

class ProductList extends React.Component {

	state = {
		productList: this.props.productList
	}

	componentDidUpdate() {
		if (this.state.productList !== this.props.productList) {
			this.setState({
				productList: this.props.productList
			})
		}
	}

	render() {
		return <div>
			<div className="product-list-outer-box">
				{this.state.productList.map(val => <Product
					id={val.id}
					imgUrl={val.image_urls.x520}
					altText={val.alt_text}
					name={val.name}
					weight={val.weight}
					weightUnit={val.weight_unit}
					price_new={val.price_new}
					final_price={val.final_price}
					rating={'4.1'}
					isAvailable={val.is_in_stock}
				/>)}
			</div>
			<Footer categoryTabs={this.props.categoryTabs} categoryName={this.props.categoryName} />
		</div>
	}
}

export default ProductList;
