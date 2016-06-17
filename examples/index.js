var greetingOne = Animals.dog.hello('bobby');
document.getElementById('blackboard').innerHTML = '<p>' + greetingOne + '</p>';

var greetingTwo = Animals.cat.hello('fuffi');
document.getElementById('blackboard').innerHTML += '<p>' + greetingTwo + '</p>';