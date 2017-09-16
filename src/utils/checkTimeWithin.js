import moment from "moment"

export const checkTimeWithin = hours => inputMoment => {
	let currentMoment = moment();
	return currentMoment.diff(inputMoment, 'h') <= hours;
}
export default checkTimeWithin

export const checkTimeWithin12Hours = checkTimeWithin(12)