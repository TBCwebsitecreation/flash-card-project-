//Sources:
//LinkedIn : https://www.linkedin.com/learning/javascript-events/what-you-should-know?u=2190394
//https://wwbm.com/history
//questions from: https://harrypotter.bloomsbury.com/uk/fun-stuff/
//https://youtu.be/wiozYyXQEVk

//declaring the variables

const startBtn = document.getElementById('start-btn');
const nextBtn = document.getElementById('next-btn');
const questionBox = document.getElementById('questions-container');
let shuffledQuestions, currentQuestions;
const questionList = document.getElementById('question');
const answerList = document.getElementById('answer');
const jsScore = document.querySelector('.scoreBox');
const answer = document.querySelector('#answer');
console.log(answer);

//initializing score to 0
let score = 0;

startBtn.addEventListener('click', startGame);
nextBtn.addEventListener('click', () => {
	currentQuestions++;
	setNextQuestion();
});

//code help taken from youtube[https://youtu.be/f4fB9Xg2JEY]
//hiding the start button after it is clicked.

function startGame() {
	startBtn.classList.add('hidden');
	shuffledQuestions = questions.sort(() => Math.random() - 0.5);
	currentQuestions = 0;
	questionBox.classList.remove('hidden');
	setNextQuestion(); //setting new questions and randomizing. Calling out to another function
}

function setNextQuestion() {
	resetGame();
	showQuestion(shuffledQuestions[currentQuestions]);
}

function showQuestion(question) {
	questionList.innerText = question.question;

	question.answers.forEach((answer) => {
		const button = document.createElement('button');
		button.innerText = answer.text;
		button.classList.add('btn');

		if (answer.correct) {
			button.dataset.correct = answer.correct;
		}
		button.addEventListener('click', selectAnswer);
		answerList.appendChild(button);
	});
}

function resetGame() {
	nextBtn.classList.add('hidden');
	while (answerList.firstChild) {
		answerList.removeChild(answerList.firstChild);
	}
}

//code help taken from https://youtu.be/Z-HLdIYHjRM
function selectAnswer(e) {
	const selectedButton = e.target;
	const correct = selectedButton.dataset.correct;
	setStatus(document.body, correct);
	Array.from(answerList.children).forEach((button) => {
		setStatus(button, button.dataset.correct);
	});
	if (correct) {
		score += 100;
		console.log(score);
		jsScore.innerText = score;
	}

	//coverting the next button to restart
	if (shuffledQuestions.length > currentQuestions + 1) {
		nextBtn.classList.remove('hidden');
	} else {
		startBtn.innerText = 'Restart';
		startBtn.classList.remove('hidden');
	}
}

function setStatus(element, correct) {
	clearStatusClass(element);

	if (correct) {
		element.classList.add('correct');
	} else {
		element.classList.add('wrong');
	}
}

function clearStatusClass(element) {
	element.classList.remove('correct');
	element.classList.remove('wrong');
}

//list of questions
const questions = [
	//question 1
	{
		question:
			'Slughorn teaches his students that Amortentia smells different to each person.  What food does Harry smell?',

		answers: [
			{ text: 'PUMKIN JUICE', correct: false },
			{ text: "MRS.WEASLEY'S FUDGE", correct: false },
			{ text: 'LEMON DROPS', correct: false },
			{ text: 'TREACLE TART', correct: true },
		],
	},

	{
		question:
			'In order they taught, who were the six Defence Against the Dark Arts professors who taught Harry at Hogwarts?',

		answers: [
			{
				text: 'QUIRRELL, LOCKHART, LUPIN, MOODY, UMBRIDGE, SNAPE',
				correct: true,
			},
			{
				text: 'QUIRRELL, LOCKHART, LUPIN, MOODY, UMBRIDGE, SLUGHORN',
				correct: false,
			},
			{
				text: 'QUIRRELL, LOCKHART, LUPIN, UMBRIDGE, MOODY, SNAPE',
				correct: false,
			},
			{
				text: 'QUIRRELL, LOCKHART, LUPIN, MOODY, SNAPE, CARROW',
				correct: false,
			},
		],
	},
];
//going to add more
