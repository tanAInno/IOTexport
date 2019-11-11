import React, {Component} from 'react';
import axios from 'axios'
import '../css/App.css'
import { convertArrayToCSV } from 'convert-array-to-csv';

class App extends Component {

    state = {
        blynk : [],
        skytec : []
    }

    componentDidMount(){
        this.getBlynk()
        this.getSkytec()
    }

    exportBlynk(){
        let csv = convertArrayToCSV(this.state.blynk)
        var fileDownload = require('js-file-download');
        fileDownload(csv, 'GIS.csv')
    }

    exportSkytec(){
        let csv = convertArrayToCSV(this.state.skytec)
        var fileDownload = require('js-file-download');
        fileDownload(csv, 'Ekarat.csv')
    }

    async getBlynk(){
        await axios.get("http://203.154.132.69:8000/api/blynks")
            .then(response => {
                console.log(response.data.data)
                const list = response.data.data.map(c => {
                    return({
                        aqi: c.aqi,
                        datetime: c.datetime,
                        fan: c.fan,
                        filter: c.filter,
                        humid: c.humid,
                        pm1: c.pm1,
                        pm10: c.pm10,
                        pm25: c.pm25,
                        temp: c.temp,
                        weather: c.weather
                    })
                })
                this.setState({blynk: list})
            }).catch(error => console.log(error))
    }

    async getSkytec(){
        await axios.get("http://203.154.132.69:8000/api/skytecs")
            .then(response => {
                console.log(response.data.data)
                const list = response.data.data.map(c => {
                    return({
                        analog0: c.analog0,
                        analog5: c.analog5,
                        date: c.date,
                        digital1: c.digital1,
                        digital2: c.digital2,
                        digital3: c.digital3,
                        digital4: c.digital4,
                        humid: c.humid,
                        sensorId: c.sensorId,
                        temp1: c.temp1,
                        temp2: c.temp2,
                        temp3: c.temp3,
                        temp4: c.temp4,
                        time: c.time
                    })
                })
                this.setState({skytec: list})
            }).catch(error => console.log(error))
    }

    render(){
        return(
            <div className="app-container">
                <div className="app-export-wrapper">
                    <div className="app-export-text">GIS (Blynk)</div>
                    <div className="app-export-text">{this.state.blynk.length} records</div>
                    <button className="app-export-button" onClick={() => this.exportBlynk()}>Export CSV</button>
                </div>
                <div className="app-export-wrapper">
                    <div className="app-export-text">Ekarat (Skytec)</div>
                    <div className="app-export-text">{this.state.skytec.length} records</div>
                    <button className="app-export-button" onClick={() => this.exportSkytec()}>Export CSV</button>
                </div>
            </div>
        )
    }

}

export default App