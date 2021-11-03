document.getElementById('user').addEventListener('change', (event) => {
	console.log(document.getElementById('user').value);
	localStorage.setItem('user', document.getElementById('user').value);
});

document.addEventListener('DOMContentLoaded', (event) => {
	document.getElementById('user').value = localStorage.getItem('user');
	if ( ! localStorage.getItem('user') ) {
		document.getElementById('user').focus();
	} else {
		document.getElementById('message').focus();
	}
});