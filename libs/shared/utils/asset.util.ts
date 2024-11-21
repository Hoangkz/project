function differenceInMonths(date1, date2) {
	const dayDiff = date1.getDate() - date2.getDate();
	const monthDiff = date1.getMonth() - date2.getMonth();
	const yearDiff = date1.getYear() - date2.getYear();

	return dayDiff !== 0
		? monthDiff + yearDiff * 12 + 1
		: monthDiff + yearDiff * 12;
}

export const countMonth = (model: any, appendix: any, contract: any) => {
	let start_date;
	let end_date;
	if (model.fromDate) {
		start_date = new Date(model.fromDate);
	} else {
		start_date = new Date(appendix.effectiveDate);
	}

	if (model.toDate) {
		end_date = new Date(model.toDate);
	} else {
		if (appendix.expirationDate) {
			end_date = new Date(appendix.expirationDate);
		} else {
			end_date = new Date(contract.expirationDate);
		}
	}
	start_date.setHours(0, 0, 0);
	end_date.setHours(0, 0, 0);

	return differenceInMonths(end_date, start_date);
};

export const countValueAsset = (
	model: any,
	appendix: any,
	contract: any,
	rentedAsset: any,
) => {
	const result = countMonth(model, appendix, contract);
	let value = 0;
	if (model.coefficient) {
		if (model.type !== "COT") {
			const length = rentedAsset.metadata.find(
				(e) => e.metaKey === "CHIEU_DAI_CONG_BE",
			).metaValue;
			value =
				((Number(model.price) * Number(model.coefficient)) / 100) *
				Number(length) *
				result;
		} else {
			value =
				((Number(model.price) * Number(model.coefficient)) / 100) * result;
		}
	} else {
		if (model.type !== "COT") {
			const length = rentedAsset.metadata.find(
				(e) => e.metaKey === "CHIEU_DAI_CONG_BE",
			).metaValue;
			value = Number(model.price) * Number(length) * result;
		} else {
			value = Number(model.price) * result;
		}
	}
	return value;
};
