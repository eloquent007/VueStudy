//1. Object.keys()
// Obejct values()는 파라미터로 전달된 객체가 가지는 열거 가능한 속성의 모든 나열형 속성들을 나타내는 문자열 배열.
// 쉽게 설명하면 Object에 key값을 출력한다고 생각하시면 쉬울 것 같습니다.

{
let arr = ['a', 'b', 'c'];
console.log(Object.keys(arr)); // console: ['0', '1', '2']

// array like object
let obj = { 0: 'a', 1: 'b', 2: 'c' };
console.log(Object.keys(obj)); // console: ['0', '1', '2']

// array like object with random key ordering
let anObj = { 100: 'a', 2: 'b', 7: 'c' };
console.log(Object.keys(anObj)); // ['2', '7', '100']
}


console.clear()
// 2.Object.values()
// Obejct values()는 파라미터로 전달된 객체가 가지는 열거 가능한 속성의 값들로 구성된 배열을 반환합니다.
// 말로 설명하는 것보다 예시를 드는게 이해에 빠르겠죠?

{
let obj = { name: 'geonsang', nickname: 'Marcus' };
console.log(Object.values(obj)); // ['geonsang', 'Marcus']

// 유사 배열 (숫자를 속성으로 사용하는 객체)
let obj1 = { 0: 'a', 1: 'b', 2: 'c' };
console.log(Object.values(obj1)); // ['a', 'b', 'c']

// 유사 배열의 경의 속성으로 사용한 숫자의 크기 순으로 정렬되어 반환됩니다.
let an_obj = { 100: 'a', 2: 'b', 7: 'c' };
console.log(Object.values(an_obj)); // ['b', 'c', 'a']

}


console.clear()

{
//Object.values 는 IE가 지원하지 않기 때문에 map을 이용해도 된다.
var obj = { name: 'geonsang', nickName: 'Marcus' };
var values = Object.keys(obj).map(value => {
  return obj[value]
})

console.log(values)
// 위에 설명한 Object.keys로 key값을 뽑은 뒤 map함수를 이용하면 쉽게 할 수 있습니다.
}


console.clear()
// 3. Object.assign()
// Object.assign() 메서드는 열거할 수 있는 하나 이상의 출처 객체로부터 대상 객체로 속성을 복사할 때 사용합니다.
{
const obj = { a: 1 };
const copy = Object.assign({}, obj);
console.log('copy : ' , copy); // { a: 1 }
// 이번 포스팅에서는 Object.keys, Object.values, Object.assign에 대해서 알아봤습니다.
// 오늘 소개한 메서드들은 제가 평소에 자주 사용하는 메서드들입니다.

// 오늘 소개드린 모든 정보는 MDN을 참고했습니다
// https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
}