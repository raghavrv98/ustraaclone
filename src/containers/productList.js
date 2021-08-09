import React from "react";
import Product from "./product";

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
				{this.state.productList.map(val => <React.Fragment key={val.id}><Product
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
				/></React.Fragment>)}
			</div>
		</div>
	}
}

export default ProductList;
