define(function(require) {
	'use strict';

	var Q = require('q');
	var LocalStorage = require('cmvp/services/LocalStorage');
	var RestAPI = require('infra/RestAPI');
	var _ = require('lodash');

	function StepThree(di) {
		this.Q = di.Q;
		this.localStorage = di.localStorage;
		this.restAPI = di.restAPI;
	}

	StepThree.newInstance = function(di) {
		di.Q = di.Q || Q;
		di.localStorage = di.localStorage || LocalStorage.newInstance();
		di.restAPI = di.restAPI || RestAPI.newInstance();
		return new StepThree(di);
	};

	StepThree.prototype.initModel = function(page) {
		this.page = page || 1;
		this.data = this._getData();
		this._initDefaultFilter();
		return this.Q.all([
				this.restAPI.filterPlans(this._beforeFilter(this.filter)),
				this.restAPI.getMasterArea()
			])
			.then(function(array) {
				this._setData(array[0]);
				this._setArea(array[1]);
			}.bind(this))
			.then(this._toDTO.bind(this));
	};

	StepThree.prototype._beforeFilter = function(filter) {
		filter = _.cloneDeep(filter);
		filter.outpatientCover = '' + filter.outpatientCover;
		filter.dentalCover = '' + filter.dentalCover;
		filter.maternityCover = '' + filter.maternityCover;
		filter.opticalCover = '' + filter.opticalCover;
		return filter;
	};

	StepThree.prototype._initDefaultFilter = function() {
		var stepTwo = _.cloneDeep(this.data.stepTwo);
		var stepOne = _.cloneDeep(this.data.stepOne);
		this.filter = this.data.filter || {
				masterAreaOfCoverObject: stepTwo.persons[0].masterAreaOfCover,
				masterAreaOfCover: stepTwo.persons[0].masterAreaOfCover.master_area_id,
				countryOfResidence: stepOne.countryOfResidence.country_id,
				outpatientCover: this._checkInclude('Outpatient cover'),
				dentalCover: this._checkInclude('Dental cover'),
				maternityCover: this._checkInclude('Maternity cover'),
				opticalCover: this._checkInclude('Optical cover'),
				excess: '500',
				maximumCover: '90000',
				nationalityObject: stepTwo.persons[0].nationality,
				nationality: stepTwo.persons[0].nationality.country_id,
				numberInsured: stepOne.numberInsured,
				persons: this._decoratePersons(stepTwo.persons),
				page: this.page
			};
	};

	StepThree.prototype._decoratePersons = function(persons) {
		return persons.map(function(e) {
			e.nationality = e.nationality.country_name;
			return e;
		});
	};

	StepThree.prototype._checkInclude = function(option) {
		return this.data.stepOne.requirement.indexOf(option) > -1 ? 1 : 0;
	};

	StepThree.prototype._setData = function(data) {
		this._decoratePlans(data.list);
		this._makePlanItemFilter();
		this._sortPlans();
		this.totalPage = data.totalPage;
	};

	StepThree.prototype.filterWithOptions = function(filter) {
		this.filter = filter;
		this._setFilter(filter);
		return this.initModel(this.page);
	};

	StepThree.prototype._decoratePlans = function(list) {
		this.plans = list.map(function(e) {
			return {
				id: e.id,
				plan_id: e.plan_id,
				logo: e.logo_url,
				company: e.company_name,
				planName: e.plan_name,
				areaOfCover: e.area_of_cover,
				maximumCover: 'USD '
				+ ' ' + e.maximum_cover.toLocaleString()
				+ ' ' + e.maximum_cover_periodicity,
				excess: 'USD '
				+ ' ' + e.excess.toLocaleString()
				+ ' ' + e.excess_periodicity,
				outPatientCover: {
					checked: e.outpatient_cover === 1,
					text: (e.outpatient_cover === 1 ? e.currency : '')
					+ ' ' + this._checkNull(e.outpatient_cover_maximum)
					+ ' ' + this._checkNull(e.outpatient_cover_periodicity)
					+ ' ' + this._checkNull(e.outpatient_cover_information)
				},
				dentalCover: {
					checked: e.dental_cover === 1,
					text: (e.dental_cover === 1 ? e.currency : '')
					+ ' ' + this._checkNull(e.dental_cover_maximum)
					+ ' ' + this._checkNull(e.dental_cover_periodicity)
					+ ' ' + this._checkNull(e.dental_cover_information)
				},
				maternityCover: {
					checked: e.maternity_cover === 1,
					text: (e.maternity_cover === 1 ? e.currency : '')
					+ ' ' + this._checkNull(e.maternity_cover_maximum)
					+ ' ' + this._checkNull(e.maternity_cover_periodicity)
					+ ' ' + this._checkNull(e.maternity_cover_information)
				},
				opticalCover: {
					checked: e.optical_cover === 1,
					text: (e.optical_cover === 1 ? e.currency : '')
					+ ' ' + this._checkNull(e.optical_cover_maximum)
					+ ' ' + this._checkNull(e.optical_cover_periodicity)
					+ ' ' + this._checkNull(e.optical_cover_information)
				},
				otherHighlights: e.other_highlights,
				askUs: [{
					name: 'Benefits schedule',
					url: '/upload/documents/' + e.benefits_schedule_pdf_url
				}, {
					name: 'General conditions',
					url: '/upload/documents/' + e.general_conditions_pdf_url
				}],
				totalAnnualPremium: 'USD ' + e.total_annual_premium
			};
		}.bind(this));
	};

	StepThree.prototype._makePlanItemFilter = function() {
		this.plans = this.plans.map(function(e) {
			if (e.outPatientCover.text === 'USD') e.outPatientCover.text = '';
			if (e.dentalCover.text === 'USD') e.dentalCover.text = '';
			if (e.maternityCover.text === 'USD') e.maternityCover.text = '';
			if (e.opticalCover.text === 'USD') e.opticalCover.text = '';
			return e;
		});
	};

	StepThree.prototype._sortPlans = function() {
		this.plans = this.plans.sort(function(a, b) {
			var numA = +a.totalAnnualPremium.split('USD')[1];
			var numB = +b.totalAnnualPremium.split('USD')[1];
			return numA - numB;
		});
	};

	StepThree.prototype._checkNull = function(data) {
		if (data) return data;
		return '';
	};

	StepThree.prototype._getData = function() {
		return this.localStorage.get('data');
	};

	StepThree.prototype._setFilter = function(filter) {
		var data = {
			stepOne: this.data.stepOne,
			stepTwo: this.data.stepTwo,
			filter: filter
		};
		return this.localStorage.set('data', data);
	};

	StepThree.prototype._setArea = function(masterAreaOfCover) {
		this.masterAreaOfCover = masterAreaOfCover;
	};

	StepThree.prototype._toDTO = function() {
		return {
			plans: this.plans,
			totalPage: this.totalPage,
			currentPage: this.page,
			data: this.data,
			masterAreaOfCover: this.masterAreaOfCover || [],
			filter: this.filter
		};
	};

	return StepThree;
});
