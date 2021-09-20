function build_top() {
	const top_left = docdiv(side_top, "top_left");
	docimg(top_left, "profile_picture.jpg", "profile_picture");
	const top_left_infos = docdiv(top_left, "infos");
	const name = doch1(top_left_infos, null, "name");
	docspan(name, cv_data.first_name, "first_name");
	docspan(name, cv_data.last_name, "last_name");
	doca(top_left_infos, `mailto:${cv_data.email}`, cv_data.email, "email");
	doca(top_left_infos, `tel:${cv_data.phone}`, cv_data.phone, "phone");
	doca(top_left_infos, `https://${cv_data.site}`, cv_data.site, "site");
	const links = docspan(top_left_infos, null, "links");
	for (const link of cv_data.links) {
		doca(links, link.link, link.site, link.site);
	}

	const top_right = docdiv(side_top, "top_right");
	docspan(top_right, cv_data.position, "job_searched");
	docp(top_right, cv_data.description, "about");
}