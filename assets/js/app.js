var number = 30;

var intervalId;

function run() {
	intervalId = setInterval(
		decrement, 1000 * 30);
}

function decrement() {

	number--;
	$("#show-number").html("<h2>" + number + "</h2>");

	if (number === 0) {

		stop();

		alert("Times Up!");
	}
}

function buildQuiz() {
		
	var output = [];

	myQuestions.forEach((currentQuestion, questionNumber) => {
			
		var answers = [];

		for (letter in currentQuestion.answers) {
				
			answers.push(
				`<label>
					<input type="radio" name="question${questionNumber}" value="${letter}">
					${letter} :
					${currentQuestion.answers[letter]}
				</label>`
			);
		}

		output.push(
			`<div class="question"> ${currentQuestion.question} </div>
			<div class="answers"> ${answers.join("")} </div>`
		);
	});

	quizContainer.innerHTML = output.join("");
}

function showResults() {
		
	var answerContainers = quizContainer.querySelectorAll(".answers");
		
	let numCorrect = 0;
		
	myQuestions.forEach((currentQuestion, questionNumber) => {
		var answerContainer = answerContainers[questionNumber];
		var selector = `input[name=question${questionNumber}]:checked`;
		var userAnswer = (answerContainer.querySelector(selector) || {}).value;
			
		if (userAnswer === currentQuestion.correctAnswer) {
			numCorrect++;
			
			answerContainers[questionNumber].style.color = "lightgreen";
		} else {
			
			answerContainers[questionNumber].style.color = "red";
		}
	});

	resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;
}

var quizContainer = document.getElementById("quiz");
var resultsContainer = document.getElementById("results");
var submitButton = document.getElementById("submit");
var myQuestions = [
{
	question: "Which is the heaviest Pokemon?",
	answers: {
		a: "Primal Groudon",
		b: "Cosmoem",
		c: "Celesteela",
		d: "B and C"
	},
	correctAnswer: "d"
},
{
	question: "Which is the Pokemon mascot?",
	answers: {
		a: "Eevee",
		b: "Pikachu",
		c: "Meowth",
		d: "Jigglypuff"
	},
	correctAnswer: "b"
},
{
	question: "Which is the first Pokemon?",
	answers: {
		a: "Bulbasaur",
		b: "Arceus",
		c: "Rhydon",
		d: "All of the above"
	},
	correctAnswer: "d"
}	
];
buildQuiz();

submitButton.addEventListener("click", showResults);