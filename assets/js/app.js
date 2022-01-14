const board = document.getElementById('board');
let similary_needed;
let game_running;
let inter;
let timer_size;
let theme;
let nb_rows;
let nb_cols;
let size;

function init_game(mode) {
	switch (mode) {
		case 'easy':
			game_running = true;
			timer_size = parseInt(document.getElementById('easy-timer-size').value);
			similary_needed = parseInt(document.getElementById('easy-similary-needed').value);
			theme = document.getElementById('theme').value;

			nb_rows = document.getElementById('easy-nb-rows').value;
			nb_cols = document.getElementById('easy-nb-cols').value;
			size = nb_rows * nb_cols;

			if (size % similary_needed != 0) {
				alert('The board\'s size is not good !');
			} else {
				create_board(nb_rows, nb_cols);
			}

			break;

		case 'medium':
			game_running = true;
			timer_size = parseInt(document.getElementById('medium-timer-size').value);
			similary_needed = parseInt(document.getElementById('medium-similary-needed').value);
			theme = document.getElementById('theme').value;

			nb_rows = document.getElementById('medium-nb-rows').value;
			nb_cols = document.getElementById('medium-nb-cols').value;
			size = nb_rows * nb_cols;

			if (size % similary_needed != 0) {
				alert('The board\'s size is not good !');
			} else {
				create_board(nb_rows, nb_cols);
			}
			
			break;

		case 'hard':
			game_running = true;
			timer_size = parseInt(document.getElementById('hard-timer-size').value);
			similary_needed = parseInt(document.getElementById('hard-similary-needed').value);
			theme = document.getElementById('theme').value;

			nb_rows = document.getElementById('hard-nb-rows').value;
			nb_cols = document.getElementById('hard-nb-cols').value;
			size = nb_rows * nb_cols;

			if (size % similary_needed != 0) {
				alert('The board\'s size is not good !');
			} else {
				create_board(nb_rows, nb_cols);
			}
			
			break;

		default:
			game_running = true;
			timer_size = parseInt(document.getElementById('zen-timer-size').value);
			similary_needed = parseInt(document.getElementById('zen-similary-needed').value);
			theme = document.getElementById('theme').value;

			nb_rows = document.getElementById('zen-nb-rows').value;
			nb_cols = document.getElementById('zen-nb-cols').value;
			size = nb_rows * nb_cols;

			if (size % similary_needed != 0) {
				alert('The board\'s size is not good !');
			} else {
				create_board(nb_rows, nb_cols);
			}
			
			break;
	}
}

function create_board(nb_rows, nb_cols) {
	board.innerHTML = '';

	let timer = timer_size;
	document.getElementById('timer').innerText = timer;
	if (typeof inter !== 'undefined') {
		clearInterval(inter);
	}
	inter = setInterval(() => {
		timer--;
		document.getElementById('timer').innerText = timer;
		if (!game_running) {
			clearInterval(inter);
		}
		if (timer <= 0) {
			loose_game();
			game_running = false;
			clearInterval(inter);
		}
	}, 1000);

	let cells = [];
	for (let i = 1; i <= nb_rows * nb_cols / similary_needed; i++) {
		for (let j = 0; j < similary_needed; j++) {
			cells.push(i);
		}
	}
	cells = cells.sort(() => 0.5 - Math.random());

	let count = 0;
	let cells_selected = [];
	let cells_remaining = cells.length;
	for (let i = 0; i < nb_rows; i++) {
		const row_element = document.createElement('div');
		row_element.setAttribute('class', 'row');
		for (let j = 0; j < nb_cols; j++) {
			const cell_element = document.createElement('div');
			cell_element.setAttribute('data', cells[count]);
			cell_element.setAttribute('class', 'cell');
			cell_element.addEventListener('click', e => {
				if (e.currentTarget.innerHTML === '' && cells_selected.length < similary_needed) {
					if (theme === 'cats') {
						e.currentTarget.innerHTML = `<img src="./assets/img/${theme}/cat.${e.currentTarget.getAttribute('data')}.jpg" alt="${e.currentTarget.getAttribute('data')}">`;
					} else if (theme === 'dogs') {
						e.currentTarget.innerHTML = `<img src="./assets/img/${theme}/dog.${e.currentTarget.getAttribute('data')}.jpg" alt="${e.currentTarget.getAttribute('data')}">`;
					} else {
						e.currentTarget.innerHTML = `<img src="./assets/img/${theme}/${e.currentTarget.getAttribute('data')}.png" alt="${e.currentTarget.getAttribute('data')}">`;
					}
					cells_selected.push(e.currentTarget);
					if (cells_selected.length === parseInt(similary_needed)) {
						let instruct = '';
						setTimeout(() => {
							instruct += `cells_selected[0].getAttribute('data') === cells_selected[1].getAttribute('data')`;
							for (let k = 1; k < similary_needed - 1; k++) {
								instruct += `&& cells_selected[${k}].getAttribute('data') === cells_selected[${k+1}].getAttribute('data')`;
							}
							if (eval(instruct)) {
								for (let k = 0; k < similary_needed; k++) {
									cells_selected[k].style.backgroundColor = 'white';
									cells_selected[k].style.pointerEvents = 'none';
								}
								cells_remaining -= similary_needed;
								if (cells_remaining <= 0) {
									win_game();
									game_running = false;
								}
							}
							cells_selected = [];
							clear_all_cells();
						}, 250);
					}
				}
			});
			row_element.appendChild(cell_element);
			count++;
		}
		board.appendChild(row_element);
	}
}

function clear_all_cells() {
	let arr_of_cells = document.querySelectorAll('.cell');
	arr_of_cells.forEach(cell => cell.innerHTML = '');
}

function show_all_cells() {
	let arr_of_cells = document.querySelectorAll('.cell');
	if (theme === 'cats') {
		arr_of_cells.forEach(cell => cell.innerHTML = `<img src="./assets/img/${theme}/cat.${cell.getAttribute('data')}.jpg" alt="${cell.getAttribute('data')}">`);
	} else if (theme === 'dogs') {
		arr_of_cells.forEach(cell => cell.innerHTML = `<img src="./assets/img/${theme}/dog.${cell.getAttribute('data')}.jpg" alt="${cell.getAttribute('data')}">`);
	} else {
		arr_of_cells.forEach(cell => cell.innerHTML = `<img src="./assets/img/${theme}/${cell.getAttribute('data')}.png" alt="${cell.getAttribute('data')}">`);
	}
}

function win_game() {
	board.innerHTML = '<h1 style="color: black;">YOU WIN !</h1>';
}

function loose_game() {
	board.innerHTML = '<h1 style="color: black;">YOU LOOSE !</h1>';
}

//Gestion des évènements de l'interface

const btn_settings_element = document.getElementById('btn-settings');
const btn_exit_menu_settings_element = document.getElementById('btn-exit-menu-settings');
const btn_play_element = document.getElementById('btn-play');
const btn_exit_menu_play_element = document.getElementById('btn-exit-menu-play');
const menu_settings_element = document.getElementById('menu-settings');
const menu_play_element = document.getElementById('menu-play');

const btn_play_zen_element = document.getElementById('btn-play-zen');
const btn_play_easy_element = document.getElementById('btn-play-easy');
const btn_play_medium_element = document.getElementById('btn-play-medium');
const btn_play_hard_element = document.getElementById('btn-play-hard');

btn_settings_element.addEventListener('click', e => {
	if (menu_play_element.style.display === '' || menu_play_element.style.display === 'none') {
		menu_settings_element.style.display = 'flex';
	}
})

btn_exit_menu_settings_element.addEventListener('click', e => {
	menu_settings_element.style.display = 'none';
})

btn_play_element.addEventListener('click', e => {
	if (menu_settings_element.style.display === '' || menu_settings_element.style.display === 'none') {
		menu_play_element.style.display = 'flex';
	}
})

btn_exit_menu_play_element.addEventListener('click', e => {
	menu_play_element.style.display = 'none';
})

btn_play_zen_element.addEventListener('click', e => {
	init_game('zen');
	menu_play_element.style.display = 'none';
})

btn_play_easy_element.addEventListener('click', e => {
	init_game('easy');
	menu_play_element.style.display = 'none';
})

btn_play_medium_element.addEventListener('click', e => {
	init_game('medium');
	menu_play_element.style.display = 'none';
})

btn_play_hard_element.addEventListener('click', e => {
	init_game('hard');
	menu_play_element.style.display = 'none';
})

document.addEventListener('keydown', e => {
	if (e.key === 's') {
		let arr_of_cells = document.querySelectorAll('td');
		if (arr_of_cells[0].innerHTML === '') {
			show_all_cells();
		} else {
			clear_all_cells();
		}
	}
})
