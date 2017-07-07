import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Weather } from './weather';

@Injectable()
export class WeatherService {

	constructor(private http: Http) { }

	tmaxBaseUrl = "https://www.ncdc.noaa.gov/cdo-web/api/v2/data?datasetid=GHCND";


	getHeaders() {
		let headers = new Headers();
		headers.append("token", "iieFRhkITdGuNOAwuSuncoVUUEHzXeZf");
		return headers;
	}

	getData(datatype, station): Observable<Weather[]> {
		let queryUrl = this.tmaxBaseUrl + "&datatypeid=" + datatype + "&startdate=" + getOldDate() + "&enddate=" + getCurrDate() + "&stationid=" + station;
		//console.log(queryUrl);
		let data = this.http.get(queryUrl, { headers: this.getHeaders() }).map(populate);
		return data;
	}
}

function populate(res: Response): Weather[] {
	return res.json().results.map(toWeather);
}

function toWeather(res: any): Weather {
	let w = <Weather>({ val: res.value, date: new Date(res.date) });
	return w;
}

function getCurrDate() {
	let today = new Date();
	let dd = today.getDate();
	let mm = today.getMonth() + 1;
	let yyyy = today.getFullYear();

	if (dd < 10) {
		if (mm < 10) {
			return yyyy + '-0' + mm + '-0' + dd;
		} else {
			return yyyy + '-' + mm + '-0' + dd;
		}
	}

	if (mm < 10) {
		if (dd < 10) {
			return yyyy + '-0' + mm + '-0' + dd;
		} else {
			return yyyy + '-0' + mm + '-' + dd;
		}
	}

	return yyyy + '-' + mm + '-' + dd;
}

function getOldDate() {
	let today = new Date();
	today.setMonth(today.getMonth() - 1);
	var dd = today.getDate();
	let mm = today.getMonth() + 1;
	let yyyy = today.getFullYear();

	if (dd < 10) {
		if (mm < 10) {
			return yyyy + '-0' + mm + '-0' + dd;
		} else {
			return yyyy + '-' + mm + '-0' + dd;
		}
	}

	if (mm < 10) {
		if (dd < 10) {
			return yyyy + '-0' + mm + '-0' + dd;
		} else {
			return yyyy + '-0' + mm + '-' + dd;
		}
	}

	return yyyy + '-' + mm + '-' + dd;
}