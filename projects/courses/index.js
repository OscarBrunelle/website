const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
const STARTING_TIME = 8.5;
const JET_LAG = 6;
const SHIFT_LENGTH = 1.5;

/*
add export / import
choose colors
add course
*/

$(function() {
	create_grid();
	create_course_checkboxes();
	update_grid(get_previously_selected_courses());
});

function create_grid() {
	$("#week_grid").empty();

	const col_h = $("<div id='column-hours'><div></div></div>").appendTo("#week_grid");
	for (let h = 0; h < 9; h++) {
		const time = (STARTING_TIME + JET_LAG + SHIFT_LENGTH * h) % 24;
		const hours = ("0" + parseInt(time)).substr(-2);
		const minutes = ("0" + time % 1 * 60).substr(-2);
		const text = hours + "h" + minutes;
		col_h.append("<div>" + text + "</div>");
	}
	for (let d = 0; d < 5; d++) {
		const col_d = $("<div id='column-" + d + "'></div>").appendTo("#week_grid");
		col_d.append("<div>" + DAYS[d] + "</div>");
		for (let h = 0; h < 9; h++) {
			col_d.append("<div id='D" + d + "H" + h + "'></div>");
		}
	}
}

function display_classes(selected_courses) {
	for (const c_index in courses_json) {
		const course = courses_json[c_index];
		if (selected_courses.indexOf(course.short_name) > -1) {
			for (let i = 0; i < course.sessions.length; i++) {
				let session = course.sessions[i];
				let parent = $("<div class='" + course.short_name + "'></div>").appendTo("#D" + session.day + "H" + session.hour);
				parent.addClass("course_color-" + c_index);
				parent.append("<span class='course_name'>" + course.short_name + " - " + session.type + "</span>");
				if ($("#option-time").is(":checked")) {
					let text = "";
					let time = (STARTING_TIME + JET_LAG + SHIFT_LENGTH * session.hour) % 24;
					const hours_1 = ("0" + parseInt(time)).substr(-2);
					const minutes_1 = ("0" + time % 1 * 60).substr(-2);
					time = (time + 1.5) % 24;
					const hours_2 = ("0" + parseInt(time)).substr(-2);
					const minutes_2 = ("0" + time % 1 * 60).substr(-2);
					text += hours_1 + "h" + minutes_1;
					text += " - ";
					text += hours_2 + "h" + minutes_2;
					parent.append("<span class='course_time'>" + text + "</span>");
				}
				if ($("#option-long_name").is(":checked")) {
					parent.append("<span class='course_name'>" + course.long_name + "</span>");
				}
				if (session.duration === 2) {
					$("#D" + session.day + "H" + (session.hour + 1)).append(parent.clone());
				}
			}
		}
	}
}

function create_course_checkboxes() {
	$("#course_checkboxes").empty();

	const select_all = $("<input id='checkbox-all' type='checkbox' value='all'></input>").appendTo("#course_checkboxes");
	$("<label for='checkbox-all'>Select / Deselect all</label><br />").appendTo("#course_checkboxes");
	select_all.on("change", function() {
		const checked = $(this).is(":checked");
		$.each($("input[name='selected_courses']"), function() {
			$(this).prop("checked", checked).trigger("change");
		});
	});

	let all_checked = true;
	const selected_courses = get_previously_selected_courses();
	for (const c_index in courses_json) {
		const course = courses_json[c_index];
		const checked = (selected_courses.indexOf(course.short_name) > -1) ? " checked" : "";
		if (!checked) all_checked = false;
		const input = $("<input id='checkbox-" + course.short_name + "' type='checkbox' name='selected_courses' value='" + course.short_name + "'" + checked + "></input>").appendTo("#course_checkboxes");
		$("<label for='checkbox-" + course.short_name + "'>" + course.short_name + "</label><br />").appendTo("#course_checkboxes");
		input.on("change", function() {
			let all_checked = true;
			if (!$(this).is(":checked")) {
				all_checked = false;
			} else {
				$.each($("input[name='selected_courses']"), function() {
					if (!$(this).is(":checked")) {
						all_checked = false;
					}
				});
			}
			select_all.prop("checked", all_checked);
			update_grid();
		});
	}

	select_all.prop("checked", all_checked);
}

function update_grid() {
	create_grid();
	const selected_courses = get_selected_courses();
	display_classes(selected_courses);
	set_cookie("selected_courses", JSON.stringify(selected_courses));
	set_session_storage("selected_courses", JSON.stringify(selected_courses));
}

function get_cookie(cookie_name) {
	const name = cookie_name + "=";
	const decodedCookie = decodeURIComponent(document.cookie);
	const ca = decodedCookie.split(";");
	for(let i = 0; i <ca.length; i++) {
		let c = ca[i];
		while (c.charAt(0) == " ") {
			c = c.substring(1);
		}
		if (c.indexOf(name) == 0) {
			return c.substring(name.length, c.length);
		}
	}
	return "";
}

function set_cookie(name, value) {
	document.cookie = name + "=" + value + ";";
}

function get_session_storage(name) {
	return sessionStorage.getItem(name);
}

function set_session_storage(name, value) {
	sessionStorage.setItem(name, value);
}

function get_previously_selected_courses() {
	let cookie = get_cookie("selected_courses");
	cookie = get_session_storage("selected_courses");
	if (cookie != null && cookie !== "") {
		cookie = JSON.parse(cookie);
	} else {
		cookie = [];
	}
	return cookie;
}

function get_selected_courses() {
	let selected_courses = [];
	$.each($("input[name='selected_courses']:checked"), function(){
		selected_courses.push($(this).val());
	});
	return selected_courses;
}