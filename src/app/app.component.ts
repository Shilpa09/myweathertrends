import { Component, OnInit } from '@angular/core';
import { WeatherService } from './weather.service';
import { Chart, Highcharts } from 'angular-highcharts';
import { SeriesOptions } from 'highcharts';
import { Weather } from './weather';


@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css'],
	providers: [WeatherService]
})
export class AppComponent implements OnInit {

	constructor(private weatherService: WeatherService) { }

	chart1 = new Chart({
		chart: {
			zoomType: 'x'
		},
		title: {
			text: 'Temperature'
		},
		xAxis: {
			type: 'datetime'
		},
		yAxis: {
			title: {
				text: 'Temperature (F)'
			}
		},
		credits: {
			enabled: false
		},
		legend: {
			enabled: true
		}
	});

	chart2 = new Chart({
		chart: {
			zoomType: 'x'
		},
		title: {
			text: 'Wind Speed'
		},
		xAxis: {
			type: 'datetime'
		},
		yAxis: {
			title: {
				text: 'Miles per hr'
			}
		},
		credits: {
			enabled: false
		},
		legend: {
			enabled: true
		}
	});
	maxWeather: Weather[] = [];
	minWeather: Weather[] = [];
	avgWeather: Weather[] = [];
	windSpeed: Weather[] = [];
	cities = ['San Francisco, CA', 'Los Angeles, CA', 'Tampa, FL', 'New York, NY', 'New Delhi, IN', 'Mumbai, IN', 'London, UK'];
	stations = ['GHCND:USW00023234', 'GHCND:USW00023174', 'GHCND:USW00012842', 'GHCND:USW00094789', 'GHCND:IN022021900', 'GHCND:IN012070800', 'GHCND:UKM00003772'];

	selectedcity: string;

	ngOnInit() {
		this.weatherService.getData("TMAX", this.stations[0]).subscribe(w => this.maxWeather = w, e => this.maxWeather = [], () => this.loadTMax());
		this.weatherService.getData("TMIN", this.stations[0]).subscribe(w => this.minWeather = w, e => this.minWeather = [], () => this.loadTMin());
		this.weatherService.getData("TAVG", this.stations[0]).subscribe(w => this.avgWeather = w, e => this.avgWeather = [], () => this.loadTAvg());
		this.weatherService.getData("AWND", this.stations[0]).subscribe(w => this.windSpeed = w, e => this.windSpeed = [], () => this.loadWind());
		this.selectedcity = this.cities[0];
	}

	loadTMax() {
		this.chart1.addSerie({ name: "Max Temp", data: this.convertToArr(this.maxWeather, true) });
	}

	loadTMin() {
		this.chart1.addSerie({ name: "Min Temp", data: this.convertToArr(this.minWeather, true) });
	}

	loadTAvg() {
		this.chart1.addSerie({ name: "Avg Temp", data: this.convertToArr(this.avgWeather, true) });
	}

	loadWind() {
		this.chart2.addSerie({ name: "Speed", data: this.convertToArr(this.windSpeed, false) });
	}

	convertToArr(we: Weather[], isTemp: boolean) {
		let retArr = [];
		var i;
		for (i = 0; i < we.length; i++) {
			if (isTemp)
				retArr.push([we[i].date.getTime(), (we[i].val * 9) / 50 + 32]);
			else
				retArr.push([we[i].date.getTime(), we[i].val]);
		}
		return retArr;
	}

	updateCharts() {
		let idx = this.cities.indexOf(this.selectedcity);
		let count1 = this.chart1.options.series.length;
		for (var i = count1; i > 0; i--) {
			this.chart1.removeSerie(i - 1);
		}

		let count2 = this.chart2.options.series.length;
		for (var i = count2; i > 0; i--) {
			this.chart2.removeSerie(i - 1);
		}

		this.weatherService.getData("TMAX", this.stations[idx]).subscribe(w => this.maxWeather = w, e => this.maxWeather = [], () => this.loadTMax());
		this.weatherService.getData("TMIN", this.stations[idx]).subscribe(w => this.minWeather = w, e => this.minWeather = [], () => this.loadTMin());
		this.weatherService.getData("TAVG", this.stations[idx]).subscribe(w => this.avgWeather = w, e => this.avgWeather = [], () => this.loadTAvg());
		this.weatherService.getData("AWND", this.stations[idx]).subscribe(w => this.windSpeed = w, e => this.windSpeed = [], () => this.loadWind());
	}

}
