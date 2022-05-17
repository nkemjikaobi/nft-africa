import ITimeZone from './ITimeZone';

interface ICountry {
	currency: string;
	flag: string;
	isoCode: string;
	latitude: string;
	longitude: string;
	name: string;
	phonecode: string;
	timezones: Array<ITimeZone>;
}

export default ICountry;
