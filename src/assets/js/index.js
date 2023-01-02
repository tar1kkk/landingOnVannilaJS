import '../styles/reset.scss';
import '../styles/styles.scss';
import '../styles/mixins.scss';

let isPlay = false;
const classes = {
	opened: 'opened',
	hidden: 'hidden'
}

const menuLink = document.querySelectorAll('.menu-link');
const header = document.querySelector('.header');
const menuButton = document.querySelector('.header-menu__button');
const video = document.getElementById('video');
const videoButton = document.querySelector('.video-btn');

const toggleMenu = () => {
	header.classList.toggle(classes.opened);
};
const scrollToSection = (e) => {
	e.preventDefault();
	const href = e.currentTarget.getAttribute('href');

	if (!href && !href.startsWith('#')) return;

	const section = href.slice(1);
	const top = document.getElementById(section)?.offsetTop || 0;
	window.scrollTo({ top, behavior: 'smooth' });
};

const formatValue = (value) => value < 10 ? `0${value}` : value;

const getTimerValues = (diff) => {
	return {
		seconds: (diff / 1000) % 60,
		minutes: (diff / (1000 * 60)) % 60,
		hours: (diff / (1000 * 3600)) % 24,
		days: (diff / (1000 * 3600 * 24)) % 30,
	}
};

const setTimerValues = (values) => {
	Object.entries(values).forEach(([key, value]) => {
		const timerValue = document.getElementById(key);
		timerValue.innerText = formatValue(Math.floor(value));
	})
}

const startTimer = (data) => {
	const id = setInterval(() => {
		const diff = new Date(data).getTime() - new Date().getTime();

		if (diff < 0) {
			clearInterval(id)
			return
		}
		setTimerValues(getTimerValues(diff));
	}, 1000);

};

const handleVideo = ({ target }) => {
	const info = target.parentElement;

	isPlay = !isPlay;
	info.classList.toggle(classes.hidden, isPlay);
	target.innerText = isPlay ? 'Pause' : 'Play';
	isPlay ? video.play() : video.pause();
}


startTimer('January 10, 2023 00:00:00');
menuButton.addEventListener('click', toggleMenu);
videoButton.addEventListener('click', handleVideo);
menuLink.forEach((link) => link.addEventListener('click', scrollToSection));
