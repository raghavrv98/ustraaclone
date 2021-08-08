import axios from "axios";
import React from "react";
import history from "../shared/history";
import ProductList from './productList';

class CategoryTabs extends React.Component {

	state = {
		productList: [],
		categoryId: this.props.categoryId,
		categoryTabs: this.props.categoryTabs,
		categoryName: this.props.categoryName
	}

	categoryClickHandler = (name, id) => {
		this.setState({
			categoryId: id,
			categoryName: name
		}, () => history.push(`/all-products/${name}`), this.getProductList(id))
	}

	componentDidMount() {
		if (this.state.categoryId) {
			this.getProductList(this.state.categoryId);
		}
	}

	getProductList = (categoryId) => {
		let url = `https://backend.ustraa.com/rest/V1/api/catalog/v1.0.1?category_id=${categoryId}`;
		axios.get(url)
			.then((res) => {
				let productList = res.data;
				this.setState({ productList: productList.products });
			})
			.catch((error) => {
				console.log(error);
			});
	};


	render() {
		return <div>
			<div className="category-outer-box">
				{this.state.categoryTabs.map(val => <div onClick={() => this.categoryClickHandler(val.category_name, val.category_id)} key={val.category_id} className="cat-tab">
					<img src={val.category_image} alt="ff" />
					<span>{val.category_name}</span>
				</div>)
				}
			</div>
			{this.state.productList.length > 0 ?
				<ProductList productList={this.state.productList} categoryName={this.state.categoryName} categoryTabs={this.props.categoryTabs} /> : <h1>Loading...</h1>
			}
		</div>
	}
}

export default CategoryTabs;
