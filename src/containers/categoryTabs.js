import axios from "axios";
import React from "react";
import history from "../shared/history";
import ProductList from './productList';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

class CategoryTabs extends React.Component {

	state = {
		productList: [],
		categoryId: this.props.categoryId,
		categoryTabs: this.props.categoryTabs,
		categoryName: this.props.categoryName,
		anchorEl: null,
		isOpen: false,
		prodList: []
	}

	componentDidMount() {
		if (this.state.categoryId) {
			this.getProductList(this.state.categoryId);
		}
	}

	categoryClickHandler = (name, id) => {
		this.setState({
			categoryId: id,
			categoryName: name
		}, () => history.push(`/all-products/${name}`), this.getProductList(id))
	}
	getProductList = (categoryId) => {
		let url = `https://backend.ustraa.com/rest/V1/api/catalog/v1.0.1?category_id=${categoryId}`;
		axios.get(url)
			.then((res) => {
				let productList = res.data;
				this.setState({ productList: productList.products, isOpen: false }, () => this.initialProductShowHandler());
			})
			.catch((error) => {
				console.log(error);
			});
	};

	initialProductShowHandler = () => {
		this.setState({
			prodList: this.state.productList.slice(0, 3)
		})
	}

	handleClick = (event) => {
		this.setState({
			anchorEl: event.currentTarget
		})
	};

	handleClose = (name, id) => {
		history.push(`/all-products/${name}`);
		this.getProductList(id);
		this.setState({
			anchorEl: null,
			categoryName: name
		})
	};

	viewMoreHandler = () => {
		const isOpen = this.state.isOpen;
		const productList = this.state.productList;
		let prodList = this.state.prodList;
		if (!isOpen) {
			prodList = productList;
		}
		else {
			prodList = productList.slice(0, 3);
		}
		this.setState({
			isOpen: !isOpen,
			prodList
		})
	}

	render() {
		return <div>
			<div className="category-outer-box">
				{this.state.categoryTabs.map(val => <div
					onClick={() => this.categoryClickHandler(val.category_name, val.category_id)}
					key={val.category_id}
					className="cat-tab">
					<img src={val.category_image} alt="category Img" />
					<span>{val.category_name}</span>
				</div>)}
			</div>
			{this.state.productList.length > 0 ?
				<ProductList
					productList={this.state.prodList}
					categoryName={this.state.categoryName}
					categoryTabs={this.props.categoryTabs} />
				: <h1>Loading...</h1>
			}
			<div className="footer-outer-box">
				<p className="heading">showing for<span>{this.state.categoryName}</span></p>
				<div className="other-option">
					<Button aria-controls="simple-menu" aria-haspopup="true" onClick={this.handleClick}>Change</Button>
					<Button onClick={this.viewMoreHandler}>{this.state.isOpen ? '[-] View less' : '[+] View more'}</Button>
				</div>
				<Menu
					id="simple-menu"
					anchorEl={this.state.anchorEl}
					keepMounted
					open={Boolean(this.state.anchorEl)}
					onClose={this.handleClose}
				>
					{this.state.categoryTabs.map(val => <MenuItem
						key={val.category_id}
						onClick={() => this.handleClose(val.category_name, val.category_id)}>{val.category_name}</MenuItem>)}
				</Menu>
			</div>
		</div>
	}
}

export default CategoryTabs;
