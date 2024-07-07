// ------------------------ Responsive menu ----------------
window.addEventListener("load", function () {
	addRequiredClasses();
});


function addRequiredClasses() {
	if (window.innerWidth < 860) {
		document.body.classList.add('mobile');
	}
	else {
		document.body.classList.remove('mobile');
	}
}

let hamberger = document.querySelector('.hamberger');
let mobileNav = document.querySelector('.nav-list');

let bars = document.querySelectorAll('.hamberger span');

let isActive = false

hamberger.addEventListener('click', function () {
	mobileNav.classList.toggle('open');

	if (!isActive) {
		bars[0].style.transform = 'rotate(45deg)';
		bars[1].style.opacity = '0'
		bars[2].style.transform = 'rotate(-45deg)';
		isActive = true
	}
	else {
		bars[0].style.transform = 'rotate(0deg)';
		bars[1].style.opacity = '1'
		bars[2].style.transform = 'rotate(0deg)';
		isActive = false
	}
});
// ------------------------ Responsive menu ----------------

const cardData = [
	{ name: 'Medical Card', description: 'Provides coverage for medical expenses and health-related costs.' },
	{ name: 'Life Insurance', description: 'Ensures financial security for your loved ones in the event of your passing.' },
	{ name: 'Travel Insurance', description: 'Protects you against travel-related risks such as trip cancellations, lost luggage, and medical emergencies abroad.' },
	{ name: 'Home Insurance', description: 'Covers damages and losses to your home and belongings due to events like fire, theft, or natural disasters.' },
	{ name: 'Car Insurance', description: 'Offers protection against car accidents, theft, and damages to your vehicle.' },
	{ name: 'Protect Yourself and Your Family', description: 'Emphasizes the importance of having insurance to safeguard your future and your loved ones.' }
];

let cardElements = [];
let flippedCards = [];
let matchedPairs = 0;

function startGame() {
	const cardGrid = document.querySelector('.card-grid');
	cardGrid.innerHTML = '';
	matchedPairs = 0;
	document.getElementById('description').textContent = '';
	const shuffledCards = shuffleCards([...cardData, ...cardData]);

	shuffledCards.forEach((card, index) => {
		const cardElement = document.createElement('div');
		cardElement.classList.add('card');
		cardElement.dataset.name = card.name;
		cardElement.innerHTML = `
            <div class="front">?</div>
            <div class="back">${card.name}</div>
        `;
		cardElement.addEventListener('click', () => flipCard(cardElement, index));
		cardElements.push(cardElement);
		cardGrid.appendChild(cardElement);
	});
}

function shuffleCards(cards) {
	for (let i = cards.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[cards[i], cards[j]] = [cards[j], cards[i]];
	}
	return cards;
}

function flipCard(cardElement, index) {
	if (flippedCards.length < 2 && !cardElement.classList.contains('flip')) {
		cardElement.classList.add('flip');
		flippedCards.push({ element: cardElement, index });

		if (flippedCards.length === 2) {
			checkMatch();
		}
	}
}

function checkMatch() {
	const [card1, card2] = flippedCards;
	if (card1.element.dataset.name === card2.element.dataset.name) {
		matchedPairs++;
		showDescription(card1.element.dataset.name);
		flippedCards = [];
		if (matchedPairs === cardData.length) {
			alert('Congratulations! You matched all pairs.');
		}
	} else {
		setTimeout(() => {
			card1.element.classList.remove('flip');
			card2.element.classList.remove('flip');
			flippedCards = [];
		}, 1000);
	}
}

function showDescription(name) {
	const card = cardData.find(card => card.name === name);
	document.getElementById('description').textContent = card.description;
}

document.addEventListener('DOMContentLoaded', startGame);



