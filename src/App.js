import React, { Component } from 'react';
import Header from './components/Header';
import Graph from './components/Graph';
import './App.css';
import _ from 'lodash';
import { Line, Chart } from 'react-chartjs-2';
import moment from 'moment';
import currencies from './supported-currencies.json';

console.log(currencies)

var foo = {"bpi":{"2013-10-01":77.6076,"2013-10-02":61.6188,"2013-10-03":72.3678,"2013-10-04":75.6701,"2013-10-05":75.6467,"2013-10-06":75.9542,"2013-10-07":76.6108,"2013-10-08":77.2967,"2013-10-09":78.8573,"2013-10-10":78.7429,"2013-10-11":78.647,"2013-10-12":79.2982,"2013-10-13":81.6891,"2013-10-14":83.2486,"2013-10-15":86.6849,"2013-10-16":86.0651,"2013-10-17":88.3956,"2013-10-18":92.4917,"2013-10-19":98.8581,"2013-10-20":100.8425,"2013-10-21":107.8592,"2013-10-22":113.4089,"2013-10-23":124.1354,"2013-10-24":113.0609,"2013-10-25":110.1134,"2013-10-26":108.7913,"2013-10-27":114.7939,"2013-10-28":116.3386,"2013-10-29":123.4603,"2013-10-30":121.3207,"2013-10-31":123.5947,"2013-11-01":124.5198},"disclaimer":"This data was produced from the CoinDesk Bitcoin Price Index. BPI value data returned as GBP.","time":{"updated":"Nov 2, 2013 00:03:00 UTC","updatedISO":"2013-11-02T00:03:00+00:00"}}


class App extends Component {
  constructor (props) {
    super(props)

    // chart.js defaults
    Chart.defaults.global.defaultFontColor = '#000';
    Chart.defaults.global.defaultFontSize = 16;

    this.state = {historicalData: foo, currency: "GBP", year:'2013'}
    this.onCurrencySelect = this.onCurrencySelect.bind(this);

    // this.next = this.next.bind(this);
    // this.refresh = this.refresh.bind(this);
    this.setYear = this.setYear.bind(this)
    this.formatChart = this.formatChart.bind(this);
    this.getBitcoinData = this.getBitcoinData.bind(this);
        this.getBitcoinDataJune = this.getBitcoinDataJune.bind(this);
     //  this.setState({historicalData:foo})
  }

  componentDidMount () {
    //this.getBitcoinData()
   // this.setState({historicalData:foo})
  }

  getDaysInMonth(year, month){

    return moment(year+"-"+month, "YYYY-MM").daysInMonth()
  }

  getBitcoinData(month){
    var year = this.state.year;
    var daysInMonth = this.getDaysInMonth(year, month);

    console.log('fetching next data: ',this.state.sm,' : ',this.state.em);
    fetch(`https://api.coindesk.com/v1/bpi/historical/close.json?currency=${this.state.currency}&start=${year}-${month}-01&end=${year}-${month}-${daysInMonth}`)
      .then(response => response.json())
      .then(historicalData => this.setState({historicalData}))
      .catch(e => e)
  }

  getBitcoinDataJune(){
      //  this.setState({sm:this.state.sm+1,em:this.state.em+1});
    console.log('fetching next data: ',this.state.sm,' : ',this.state.em);
    fetch(`https://api.coindesk.com/v1/bpi/historical/close.json?currency=${this.state.currency}&start=2013-06-01&end=2013-07-01`)
      .then(response => response.json())
      .then(historicalData => this.setState({historicalData}))
      .catch(e => e)
  }

  formatChartData () {
    const {bpi} = this.state.historicalData

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

  setYear(year){
    var foo = year;
    this.setState({year:foo})
    console.log('set year: ', foo, ' type: ', typeof(foo))
  }

  setCurrency (currency) {
    this.setState({currency}, this.getBitcoinData)
  }

  onCurrencySelect (e) {
    this.setCurrency(e.target.value)
  }


  formatChart(data){
const {bpi} = this.state.historicalData
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

  render() {
    if (true) {
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

          <div >
            <button onClick={()=>{this.setYear('2010')}}>2010</button>
            <button onClick={()=>{this.setYear('2011')}}>2011</button>
            <button onClick={()=>{this.setYear('2012')}}>2012</button>
            <button onClick={()=>{this.setYear('2013')}}>2013</button>
            <button onClick={()=>{this.setYear('2014')}}>2014</button>
            <button onClick={()=>{this.setYear('2015')}}>2015</button>
            <button onClick={()=>{this.setYear('2016')}}>2016</button>
            <button onClick={()=>{this.setYear('2017')}}>2017</button>
            <button onClick={()=>{this.setYear('2018')}}>2018</button>

          </div>

          <button onClick={()=>{this.getBitcoinData('01')}}> Jan </button>
          <button onClick={()=>{this.getBitcoinData('02')}}> Feb </button>
          <button onClick={()=>{this.getBitcoinData('03')}}> Mar </button>
          <button onClick={()=>{this.getBitcoinData('04')}}> Apr </button>
          <button onClick={()=>{this.getBitcoinData('05')}}> May </button>
          <button onClick={()=>{this.getBitcoinData('06')}}> Jun </button>
          <button onClick={()=>{this.getBitcoinData('07')}}> Jul </button>
          <button onClick={()=>{this.getBitcoinData('08')}}> Aug </button>
          <button onClick={()=>{this.getBitcoinData('19')}}> Sep </button>
          <button onClick={()=>{this.getBitcoinData('10')}}> Oct </button>
          <button onClick={()=>{this.getBitcoinData('11')}}> Nov </button>
          <button onClick={()=>{this.getBitcoinData('12')}}> Dec </button>




          <div style={{marginTop: 10}}>
          <Graph data={this.formatChart()} year={this.state.year}></Graph>
          </div>
          
        </div>
      )
    }

    return null
  }
}


/*

  getBitcoinData () {

    // let headers = new Headers();

    // headers.append('Content-Type', 'application/json');
    // headers.append('Accept', 'application/json');
    // headers.append('Origin','http://localhost:3000');

    fetch(`https://api.coindesk.com/v1/bpi/historical/close.json?currency=${this.state.currency}&start=2013-${this.state.sm}-01&end=2013-${this.state.em}-01`, {
        mode: 'no-cors',
        method: 'GET',
        headers: {'Access-Control-Allow-Origin': '*'}
    })
//     headers.append('Access-Control-Allow-Origin', 'http://localhost:3000')
// headers.append('Access-Control-Allow-Credentials', 'true')
      .then(response => response.json())
      .then(historicalData => this.setState({historicalData}))
      .catch(e => e)
  }

  next (){
    this.setState({sm:this.state.sm+1,em:this.state.em+1});
    console.log('fetching next data: ',this.state.sm,' : ',this.state.em);
    fetch(`https://api.coindesk.com/v1/bpi/historical/close.json?currency=${this.state.currency}&start=2013-${this.state.sm}-01&end=2013-${this.state.em}-01`)
      .then(response => response.json())
      .then(historicalData => this.setState({historicalData}))
      .catch(e => e)
//this.setState({historicalData:{"bpi":{"2013-10-01":77.6076,"2013-10-02":61.6188,"2013-10-03":72.3678,"2013-10-04":75.6701,"2013-10-05":75.6467,"2013-10-06":75.9542,"2013-10-07":76.6108,"2013-10-08":77.2967,"2013-10-09":78.8573,"2013-10-10":78.7429,"2013-10-11":78.647,"2013-10-12":79.2982,"2013-10-13":81.6891,"2013-10-14":83.2486,"2013-10-15":86.6849,"2013-10-16":86.0651,"2013-10-17":88.3956,"2013-10-18":92.4917,"2013-10-19":98.8581,"2013-10-20":100.8425,"2013-10-21":107.8592,"2013-10-22":113.4089,"2013-10-23":124.1354,"2013-10-24":113.0609,"2013-10-25":110.1134,"2013-10-26":108.7913,"2013-10-27":114.7939,"2013-10-28":116.3386,"2013-10-29":123.4603,"2013-10-30":121.3207,"2013-10-31":123.5947,"2013-11-01":124.5198},"disclaimer":"This data was produced from the CoinDesk Bitcoin Price Index. BPI value data returned as GBP.","time":{"updated":"Nov 2, 2013 00:03:00 UTC","updatedISO":"2013-11-02T00:03:00+00:00"}}})

  }

  refresh (){
    console.log('refreshing chart');
    this.formatChartData(this.state.historicalData);
  }

            <div style={{marginTop: 10}}>
            <Line data={this.formatChartData(this.state.historicalData)} height={250} width={450}/>
          </div>

*/

export default App;
