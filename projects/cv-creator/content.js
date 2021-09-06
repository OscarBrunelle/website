function get_date(year, month = null) {
	// const date = data.date_year, data.date_month != null ? (data.date_month) : null)
	const date = new Date(year, month);
	let str = date.getFullYear();
	if (month != null) str += "/" + to_fixed_length(date.getMonth() + 1, 2);
	return str;
}

function add_job_title(data, parent) {
	const title_container = doch3(parent, null, "title");
	if (data.job_title != null) docspan(title_container, data.job_title, "job_title");
	if (data.date_year != null) docspan(title_container, get_date(data.date_year, data.date_month), "date-start");
	if (data.duration == -1) {
		docspan(title_container, "Aujourd'hui", "date-end");
	} else if (data.duration != null) {
		docspan(title_container, get_date(data.date_year, data.date_month + data.duration - 1), "date-end");
	}
	if (data.country != null) docspan(title_container, data.country, "country");
	if (data.employer != null) doch4(parent, data.employer, "subtitle");
}