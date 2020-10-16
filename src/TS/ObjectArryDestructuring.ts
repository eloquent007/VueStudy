
//Object 와 배열의 차이점

let o = {
    a:"foo",
    b:12,
    c:"bar"
};

// let {a,b} =o;
let {b,a} =o;

console.log('a',a);
console.log('b',b);
//object는 이름을 지칭하고


const arr = [1,2,3];
const [c,d] = arr;
// const [c,...d] = arr; // 이렇게 선언하고  console.log('d',...d); 로 출력해도 된다.(object는 이렇게 출력불가)
console.log('c',c);
console.log('d',d);
//배열은 순서대로 들어간다.
