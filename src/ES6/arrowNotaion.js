
//arrow notation
//################################################################################
//https://blog.naver.com/leeba37/221796637301​

// 기존의 함수방식과 다르게 ES6에서 화살표함수가 새로 도입됬다. 
// 화살표 함수는 아래와 같은 특징이 있다. ​

// - function은 생략해도 된다. 
// - 함수에 매개변수가 하나라면 괄호를 생략할 수 있다. 
// - 함수 바디가 표현식 하나라면 중괄호와 return문도 생략 가능하다. 
// - 화살표 함수는 항상 익명함수로 표현한다. 

const g1 = function () { return "hi"}
const g2 = () => "hi";
const g3 = function (a) {return `${a}`}
const g4 = a => `${a}`; 
const g5 = function (a,b){return a+b}
const g6 = (a,b) => a+b;
g1() //"hi"
g2() //"hi"
g3("hi") //"hi"
g4("hi") //"hi"
g3("h","i") //"hi"
g4("h","i") //"hi"
