//Graph.js

import React from 'react';
import { Line, Chart } from 'react-chartjs-2';


class Graph extends React.Component {
	constructor (props) {
	super(props)
	}

	render(){
  		return (
  		    <div style={{marginTop: 10}}>
           	{console.log(this.props.data)}
          	Year : {this.props.year}
            	<Line data={this.props.data} height={250} width={450}/>
          	</div>
          	)
          }
      }

export default Graph
