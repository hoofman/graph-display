import React, { Component } from 'react';
import Header from './components/Header';
import './App.css';
import _ from 'lodash';
import { Line, Chart } from 'react-chartjs-2';
import moment from 'moment';
import currencies from './supported-currencies.json';

console.log(currencies)

class App extends Component {
  constructor (props) {
    super(props)

    // chart.js defaults
    Chart.defaults.global.defaultFontColor = '#000';
    Chart.defaults.global.defaultFontSize = 16;

    this.state = {historicalData: null, currency: "GBP"}
    this.onCurrencySelect = this.onCurrencySelect.bind(this)
  }

  componentDidMount () {
    this.getBitcoinData()
  }

  getBitcoinData () {
    fetch(`https://api.coindesk.com/v1/bpi/historical/close.json?currency=${this.state.currency}&start=2013-09-01&end=2013-10-01`)
      .then(response => response.json())
      .then(historicalData => this.setState({historicalData}))
      .catch(e => e)
  }

  formatChartData (historicalData) {
    const {bpi} = historicalData//this.state.historicalData

    return {
      labels: _.map(_.keys(bpi), date => moment(date).format("ll")),
      datasets: [
        {
          label: "Bitcoin",
          fill: true,
          lineTension: 0.1,
          backgroundColor: 'rgba(75,192,192,0.4)',
          borderColor: 'rgba(75,192,192,1)',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: 'rgba(75,192,192,1)',
          pointBackgroundColor: '#fff',
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: 'rgba(75,192,192,1)',
          pointHoverBorderColor: 'rgba(220,220,220,1)',
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: _.values(bpi)
        }
      ]
    }
  }

  setCurrency (currency) {
    this.setState({currency}, this.getBitcoinData)
  }

  onCurrencySelect (e) {
    this.setCurrency(e.target.value)
  }

  next (){
console.log('foo');
    fetch(`https://api.coindesk.com/v1/bpi/historical/close.json?currency=GBP&start=2013-10-01&end=2013-11-01`)
      .then(response => response.json())
      //.then(historicalData => this.setState({historicalData}))
      .then(response => this.setState((state, props) =>({historicalData:response})))


      .catch(e => e)
  }

  render() {
    if (this.state.historicalData) {
      return (
        <div className="app">
          <Header title="BITCOIN PRICE INDEX" />

          <div className="select-container">
            <span style={{fontSize: 18, fontFamily: 'Bungee'}}> Select your currency: </span>
            <select value={this.state.currency} onChange={this.onCurrencySelect}>
              {currencies.map((obj, index) =>
                <option key={`${index}-${obj.country}`} value={obj.currency}> {obj.currency} </option>
              )}
            </select>
            {
              this.state.currency !== 'GBP' && (<div>
                <a href="#" className="link" onClick={() => this.setCurrency('GBP')} style={{color: "black", fontSize: 16, fontFamily: 'Bungee'}}> [RESET] </a>
              </div>)
            }
          </div>
          <button onClick={this.next}> Next </button>

          <div style={{marginTop: 10}}>
            <Line data={this.formatChartData(this.state.historicalData)} height={250} width={450}/>
          </div>
        </div>
      )
    }

    return null
  }
}

export default App;
