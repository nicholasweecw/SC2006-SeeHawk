import React, {Component} from 'react';
import {Card, CardBody, CardTitle, CardText, Progress} from 'reactstrap';

class CarkparkDetail extends Component {
	constructor(props) {
		super(props);
	}

    render() {
        return(
            <Card className='text-start my-3 grey-card shadow-sm'>
                <CardBody>
                    <CardTitle tag="h4">{this.props.number} Carpark</CardTitle>
                    <CardText className='mb-0'><b className='me-2'>Address:</b> {this.props.address}</CardText>
                    <CardText className="d-flex">
                            <b>Number of slots:</b> <Progress className='w-25 ms-2 mt-1 border border-secondary' value={this.props.availableSlots / this.props.totalSlots * 100}>{this.props.availableSlots} / {this.props.totalSlots}</Progress>
                    </CardText>
                </CardBody>
            </Card>
        )
    }
}

export default CarkparkDetail;