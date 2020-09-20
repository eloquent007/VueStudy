// var superObj = {superVal:'super'}
// // var subObj ={subVal:'sub'}
// // subObj.__proto__ = superObj;
// var subObj = Object.create(superObj);
// subObj.subVal ='sub';
// debugger;
// console.log('subObj.subVal: ', subObj.subVal);
// console.log('subObj.superVal: ', subObj.superVal);
// subObj.superVal ='sub';
// console.log('superObj.superVal: ', superObj.superVal);

// __proto__ 보단 Object.create 를 권장함.



var kim = {name:'kim', first:10, second:20}
var lee = {name:'lee', first:10, second:10}
function sum() {
    return this.first + this.second ;
}

console.log('sum : ', sum.call(kim));
var kimSum = sum.bind(kim,'-->');
console.log('kimSum : ', kimSum());
//call은 호출함수의 this를 지칭하지만 bind는 sum함수 변형없이 새로운 객체를 만들어서 this를 할당함.