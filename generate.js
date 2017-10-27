const select = byid("demo_chooser");
const jsonInput = byid("demo_json");
const fileInput = byid("demo_file");
const downloadInput = byid("download_input");
const inputImage = byid("input_image");
const outputImage = byid("output_image");
const checkboxLabel = byid("checkbox_label");
const table = byclass("interactive-demo")[0];
table.style.visibility = "hidden";
const demos = window.docxApp.shared.demos;

window.addEventListener("hashchange", onHashChange, false);

function onHashChange() {
	demos.some(function (demo) {
		if (location.hash === "#" + demo.name) {
			preloadFile(demo.name);
			return true;
		}
	});
}

function byid(id) {
	return document.getElementById(id);
}
function byclass(name) {
	return document.getElementsByClassName(name);
}

let baseFile = null, fileFetched;

function preloadFile(name) {
	select.value = name;
	inputImage.src = "/docs/" + name + ".png";
	outputImage.src = "/docs/" + name + "-result.png";
	table.style.visibility = "visible";
	baseFile = null;
	const docUrl = "/docs/" + name + ".docx";
	checkboxLabel.textContent = "Use default " + name + ".docx";
	downloadInput.textContent = "Download template " + name + ".docx";
	downloadInput.href = docUrl;
	fileFetched = fetch(docUrl).then(function (f) {
		return f.blob();
	}).then(function (f) {
		baseFile = f;
	});

	fetch("/docs/" + name + ".json").then(function (f) {
		return f.text();
	}).then(function (f) {
		jsonInput.value = f;
	});
}

function generateAsync() {
	return fileFetched.then(function () {
		generate();
	});
}

select.onchange = function (e) {
	window.location.hash = e.target.value;
};

function isExtensionValid(fileName) {
	console.log(fileName);
	if (/(\.docx|\.pptx)$/.test(fileName)) {
		return true;
	}
	alert("The uploaded file must have extension docx or pptx");
	return false;
}

fileInput.onchange = function (e) {
	const file = e.target.files[0];
	isExtensionValid(file.name);
};

function parse(value) {
	return JSON.parse(value.split("\n").join(""));
}

function generate() {
	const files = fileInput.files;
	let file;
	const formchoice = document.getElementsByTagName("form")[0].elements.template.value;
	if (formchoice === "default") {
		file = baseFile;
	}
	if (formchoice === "custom") {
		if (files.length === 0) {
			return alert("No file uploaded");
		}
		file = files[0];
		if (!isExtensionValid(file.name)) {
			return;
		}
	}

	let parsed = null;
	try {
		parsed = parse(jsonInput.value);
	}
	catch(e) {
		console.log(e);
		alert("Your json input is invalid");
	}
	const formData = new FormData();
	formData.append("doc", file, file.name);
	formData.append("data", JSON.stringify(parsed));

	const xhr = new XMLHttpRequest();
	xhr.open("POST", `${window.baseUrl}api/v1/generate?silent=true`, true);
	xhr.onload = function () {
		if (xhr.status === 200 || xhr.status === 204) {
			return window.location = `${window.baseUrl}api/v1/last`;
		}
		alert("An error occurred while uploading the document : \n " + JSON.stringify(JSON.parse(xhr.responseText).error));
	};
	xhr.send(formData);
}
onHashChange();
