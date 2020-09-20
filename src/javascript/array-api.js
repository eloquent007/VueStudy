//q1.make a string out of and array
{
  const fruits = ["apple", "banana", "orange"];
  const result = fruits.join();
  // const result = fruits.join('|');
  console.log(result);
}

//q2.make an array out of string
{
  const fruits = "A,B,C,D";
  const result = fruits.split(",");
  console.clear();
  console.log(result);
}

//Q3. make this array look like this:[5,4,3,2,1]
{
  const array = [1, 2, 3, 4, 5];
  const result = array.reverse();
  console.clear();
  console.log(result);
  console.log(array); // array 배열자체도 순서가 바뀌어져 있다.
}

//Q4. make new array without the first two elements
{
  const array = [1, 2, 3, 4, 5];
  //const result = array.splice(0, 2); //array 자체도 변형하기 때문에 make new array 가 아니다.
  const result = array.slice(2, 5); //slice 는 원본 array 값을 변경하지 않는다.
  console.clear();
  console.log(result);
  console.log(array);
}

class Student {
  constructor(name, age, enrolled, score) {
    this.name = name;
    this.age = age;
    this.enrolled = enrolled;
    this.score = score;
  }
}

const students = [
  new Student("A", 29, true, 45),
  new Student("B", 28, false, 80),
  new Student("C", 30, true, 90),
  new Student("D", 40, false, 66),
  new Student("E", 18, true, 88),
];

console.clear();
//Q5. find a student with the score 90
{
  const result = students.find(function (student, index) {
    // console.log(student, index);
    return student.score === 90;
  });

  // arrow function 으로 다시 쓰기
  //const result = students.find( (student)  =>  student.score === 90);

  console.clear();
  console.log(result);
}

//Q6. make an array of enrolled students
{
  const result = students.filter((student) => student.enrolled);
  console.clear();
  console.log(result);
}

//Q7. make an array containing only the students' scores
//result should be : [45,80, 90, 66, 88]
{
  const result = students.map((student) => student.score);
  console.clear();
  console.log(result);
}

console.clear();
//Q8. check if there is a student with the score lower then 50
{
  const result = students.find((student) => student.score < 50);
  console.log(result);
}

{
  const result = students.some((student) => student.score < 50);
  console.log(result);
}

{
  //모든 배열값이 만족할때
  const result = !students.every((student) => student.score >= 50);
  console.log(result);
}

console.clear();
//Q9. compute students' average score
{
  // 배열을 돌면서 누적해 주는게 reduce
  const result = students.reduce((prev, curr) => {
    console.log("----------------------");
    console.log(prev);
    console.log(curr);
    // return curr;
    return prev + curr.score;
  }, 0);
}

{
  const result = students.reduce((prev, curr) => prev + curr.score, 0);
  console.log(result / students.length);
}

console.clear();
//Q10. make a string containing all the scores
//result should be:'45, 80, 90,66,88'
{
  const result = students
    .map((student) => student.score)
    .filter((score) => score >= 50)
    .join();
  console.log(result);
}

console.clear();
//Bonus! do Q10 sorted in ascending order
//result should be:'45,66,80,88,90'
{
  const result = students
    .map((student) => student.score)
    .sort((a, b) => b - a)
    .join();
  console.log(result);
}
