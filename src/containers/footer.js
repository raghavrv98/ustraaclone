import React from "react";
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
class Product extends React.Component {

	state = {
		anchorEl: null,
		categoryTabs: this.props.categoryTabs,
		categoryNames: []
	}

	handleClick = (event) => {
		this.setState({
			anchorEl: event.currentTarget
		})
	};

	handleClose = () => {
		this.setState({
			anchorEl: null
		})
	};

	componentDidMount() {
		let categoryNames = this.state.categoryTabs.map(val => val.category_name)
		this.setState({
			categoryNames
		})
	}


	render() {
		return <div>
			<div className="footer-outer-box">
				<p className="heading">showing for<span>{this.props.categoryName}</span></p>
				<div className="other-option">
					<Button aria-controls="simple-menu" aria-haspopup="true" onClick={this.handleClick}>Change</Button>
					<Button>[+] View more</Button>
				</div>
				<Menu
					id="simple-menu"
					anchorEl={this.state.anchorEl}
					keepMounted
					open={Boolean(this.state.anchorEl)}
					onClose={this.handleClose}
				>
					{this.state.categoryNames.map(val => <MenuItem onClick={this.handleClose}>{val}</MenuItem>)}
				</Menu>
			</div>
		</div >
	}
}

export default Product;
