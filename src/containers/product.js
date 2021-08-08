import React from "react";
import Button from '@material-ui/core/Button';

class Product extends React.Component {
	render() {
		return <div>
			<div className="product-outer-box" key={this.props.id}>
				<img src={this.props.imgUrl} alt={this.props.altText} />
				<div className="content">
					<p className="product-heading">{this.props.name}</p><span>{this.props.rating} &#9733;</span>
					<p className="product-quantity">({this.props.weight} {this.props.weightUnit})</p>
					<p className="product-price">₹ {this.props.final_price} <del>₹ {this.props.price_new}</del></p>
					{this.props.isAvailable ?
						<Button variant="contained" color='primary' className="active">
							ADD TO CART
						</Button> :
						<Button variant="contained" className="disabled">
							OUT OF STOCK
						</Button>
					}
				</div>
			</div>
			<hr />
		</div>
	}
}

export default Product;
