import React, { Component } from 'react';
import CarkparkDetail from './CarparkDetail';
import { CarparkManager } from "../../../control/CarparkManager";
import ViewOnMap from '../ViewOnMapUI/ViewOnMap';
import Lottie from "lottie-react";
import RunningLoadingAnimation from '../../Animation/runningLoading.json';

class CarkparkList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			carparkList: [],
			isLoading: true,
			updatedTime: 'Not available'
		};
	}

	fetchNearbyCarpark = async() => {
		const carparkList = await CarparkManager.fetchNearbyCarpark(this.props.lat, this.props.lng);
		const dateString = (new Date(Date.now())).toLocaleString('en-SG', {timeZone: 'Asia/Singapore'}).toUpperCase();
		this.setState({ carparkList: carparkList, isLoading: false, updatedTime: dateString});
	}

	render() {
		if (this.state.isLoading){
			return(
				<div className="mt-5 pt-5 page-transition d-flex align-items-center justify-content-center">
					<Lottie className="mt-2" animationData={RunningLoadingAnimation} style={{height: 200}}/>
				</div>
			)
		} else {
			return (
				<>
					<div className="d-flex align-items-center">
						<h3>List of Nearby Carparks</h3>
						<ViewOnMap lat={this.props.lat} lng={this.props.lng} carparkList={this.state.carparkList} carpark/>
						<p className='text-muted ms-auto fst-italic mt-1'>Last updated: {this.state.updatedTime}</p>
					</div>
					<div>
						{
							this.state.carparkList.length === 0 ?
								<h4>No nearby carpark available</h4>
							:
								this.state.carparkList.map((carpark) =>
									<CarkparkDetail 
										key={carpark.carparkNumber} 
										number={carpark.carparkNumber}
										address={carpark.address} 
										totalSlots={carpark.totalSlots} 
										availableSlots={carpark.availableSlots}
									/>
								)
						}
					</div>
				</>
			)
		}

	}

	componentDidMount() {
		this.fetchNearbyCarpark()
		setInterval(this.fetchNearbyCarpark, 60001);
	}
}

export default CarkparkList;
