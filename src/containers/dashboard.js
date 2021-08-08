import axios from 'axios';
import React from 'react'
import CategoryTabs from './categoryTabs';
import history from '../shared/history';

class Dashboard extends React.Component {

	state = {
		categoryTabs: []
	}

	componentDidMount() {
		this.getCategoryTabs();
	}

	getCategoryTabs = () => {
		let url = "https://backend.ustraa.com/rest/V1/api/homemenucategories/v1.0.1?device_type=mob";
		axios.get(url)
			.then((res) => {
				let categoryTabs = res.data;
				this.setState({
					categoryTabs: categoryTabs.category_list,
					categoryId: categoryTabs.category_list[0].category_id
				}, () => history.push('/all-products/' + categoryTabs.category_list[0].category_name))
			})
			.catch((error) => {
				console.log(error);
			});
	};

	render() {
		return <div>
			{this.state.categoryTabs.length > 0 ?
				<CategoryTabs categoryTabs={this.state.categoryTabs} categoryId={this.state.categoryId} categoryName={this.state.categoryTabs[0].category_name} /> : <h1>Loading ....</h1>
			}
		</div>
	}
}

export default Dashboard;