//javascript 유용한 15가지.
// https://medium.com/@Dongmin_Jang/javascript-15%EA%B0%80%EC%A7%80-%EC%9C%A0%EC%9A%A9%ED%95%9C-map-reduce-filter-bfbc74f0debd


// 1.숫자/문자열 배열에서 중복 제거하기
// 이것은 map/reduce/filter 에 해당되지 않는 것인데, 이 리스트에서 제외시키기에는 너무 간결하다. 다음에 나올 예시들에도 나올 것이다.
// 추가1 : Dictionary로 처리하는것 보다 set 이 빠르다.

let values = [3, 1, 3, 5, 2, 4, 4, 4];
let uniqueValues = [...new Set(values)];
// uniqueValues is [3, 1, 5, 2, 4]

console.log('uniqueValues : ', uniqueValues);


//########################################################################################################


// 2. 간단한 검색(case-sensitive)
console.clear();
// filter() 함수는 인자로 제공되는 함수에 의해 test 를 통과한 모든 요소를 새로운 array 로 만든다.
let users = [
  { id: 11, name: 'Adam', age: 23, group: 'editor' },
  { id: 47, name: 'John', age: 28, group: 'admin' },
  { id: 85, name: 'William', age: 34, group: 'editor' },
  { id: 97, name: 'Oliver', age: 28, group: 'admin' }
];
let res = users.filter(it => it.name.includes('Oli'));
// let res = users.filter(it => it.group.includes('admin'));
// res is []
console.log('res : ', res);

//########################################################################################################


// 3. 간단한 검색(case-insensitive)
console.clear();
{
let res = users.filter(it => new RegExp('oli', "i").test(it.name));
// res is
console.log('res : ', res);
}


/*
//########################################################################################################
console.clear();
// 4. 특정 유저가 admin 권한을 갖고 있는지 확인
let hasAdmin = users.some(user => user.group === 'admin');
// hasAdmin is true
console.log('hasAdmin : ', hasAdmin);



//########################################################################################################
console.clear();
// 5. array of arrays 펼치기
// 첫번째 iteration은 […[], …[1, 2, 3]] 이렇게 결과가 나오는데, 이는 [1,2,3] 으로 바뀐다. 이것은 두번째 iteration 의 acc로 위치한다.
let nested = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
let flat = nested.reduce((acc, it) => [...acc, ...it], []);
// flat is [1, 2, 3, 4, 5, 6, 7, 8, 9]

// 여기서 명심할 것은 reduce 안에서 spread operator 는 좋은 성능을 보이지 못한다. 이 예시는 성능 측정할 때, 사용 예시로 적합하다.
// 아래는 Array.reduce 를 사용하지 않고 짧은 코드로 표현하는 방법이다.
// let flat = [].concat.apply([], nested);

console.log('flat : ', flat);



//########################################################################################################
// 6. 특정 키의 빈도를 포함하는 객체를 만들기
console.clear();
{
let users = [
    { id: 11, name: 'Adam', age: 23, group: 'editor' },
    { id: 47, name: 'John', age: 28, group: 'admin' },
    { id: 85, name: 'William', age: 34, group: 'editor' },
    { id: 97, name: 'Oliver', age: 28, group: 'admin' }
  ];
  let groupByAge = users.reduce((acc, it) =>
    ({ ...acc, [it.age]: (acc[it.age] || 0) + 1 }),
  {});
  // groupByAge is {23: 1, 28: 2, 34: 1}

  console.log('groupByAge : ', groupByAge);
}



//########################################################################################################
// 7. array of objects 인덱싱 (lookup table)
// id로 유저를 찾기위해 전체 array 를 처리하는 것 대신에 user’s id 가 key로 작용하는 객체를 만들 수 있다. (일정한 검색 시간)
console.clear();
{
    let uTable = users.reduce((acc, it) => ({...acc, [it.id]: it }), {})
    // uTable equals:
    // {
    // 11: { id: 11, name: 'Adam', age: 23, group: 'editor' },
    // 47: { id: 47, name: 'John', age: 28, group: 'admin' },
    // 85: { id: 85, name: 'William', age: 34, group: 'editor' },
    // 97: { id: 97, name: 'Oliver', age: 28, group: 'admin' }
    // }

    console.log('uTable[85] : ', uTable[85].name);    
}
// uTable[85].name처럼 id로 데이터에 접근할 때 유용하다.



//########################################################################################################
// 8. 배열 안의 각각의 item에서 특정 키로 유일한 값들 뽑아내기
console.clear();
// map()은 각 item 의 group 값만 모아서 새로운 배열을 만들것이다.
let listOfUserGroups = [...new Set(users.map(it => it.group))];
// listOfUserGroups is ['editor', 'admin'];
console.log('listOfUserGroups : ', listOfUserGroups);    




//########################################################################################################
// 9. 객체 key-value map 역전
console.clear();
let cities = {
  Lyon: 'France',
  Berlin: 'Germany',
  Paris: 'France'
};
// let countries = Object.keys(cities).reduce(
//   (acc, k) => (acc[cities[k]] = [...(acc[cities[k]] || []), k], acc) , {});
// // countries is
// {
//   France: ["Lyon", "Paris"],
//   Germany: ["Berlin"]
// }
// 이는 마치 트릭처럼 보일 수 있다. 여기에는 comma operator가 쓰였다. 이는 acc로 삽입되는부분에 마지막 값을 return 한다. 위 코드를 좀 더 읽기 편하게 쓰면 아래와 같다.
let countries = Object.keys(cities).reduce((acc, k) => {
  let country = cities[k];
  acc[country] = [...(acc[country] || []), k];
  return acc;
}, {});

console.log('countries : ', countries); 


//########################################################################################################
// 10. 섭씨 온도를 화씨 온도로 바꾸기
console.clear();
let celsius = [-15, -5, 0, 10, 16, 20, 24, 32]
let fahrenheit = celsius.map(t => t * 1.8 + 32);
// fahrenheit is [5, 23, 32, 50, 60.8, 68, 75.2, 89.6]
console.log('fahrenheit : ', fahrenheit); 


//########################################################################################################
// 11. 객체를 쿼리 스트링으로 인코딩하기
console.clear();
let params = {lat: 45, lng: 6, alt: 1000};
let queryString = Object.entries(params).map(p => encodeURIComponent(p[0]) + '=' + encodeURIComponent(p[1])).join('&')
// queryString is "lat=45&lng=6&alt=1000"
console.log('queryString : ', queryString); 


//########################################################################################################
// 12. 명시된 키와 함께 읽기 가능한 string 으로 유저 테이블 출력
console.clear();
{
    let users = [
    { id: 11, name: 'Adam', age: 23, group: 'editor' },
    { id: 47, name: 'John', age: 28, group: 'admin' },
    { id: 85, name: 'William', age: 34, group: 'editor' },
    { id: 97, name: 'Oliver', age: 28, group: 'admin' }
    ];
    
    let returns = users.map(({id, age, group}) => `\n${id} ${age} ${group}`).join('')

    console.log('returns : ', returns); 

}
// it returns:
// "
// 11 23 editor
// 47 28 admin
// 85 34 editor
// 97 28 admin"




// 13. 객체 배열에서 key-value 쌍을 찾아서 바꾸기
console.clear();
// John의 나이를 바꾸겠다고 하면, users[1].age = 29 이렇게 하면 끝난다. 그러나 아래와 같이 다른 방식을 써보자.
let updatedUsers = users.map(
  p => p.id !== 47 ? p : {...p, age: p.age + 1}
);
// John is turning 29 now
// 한개 아이템을 바꾸는 것 대신에, 다른 값 하나를 포함하는 새로운 배열을 만들었다. 이제 이를 이용하여 array를 참조에 의해 비교가 가능하다. updateedUsers == users 이렇게 말이다. (정말이요??)
// 리액트가 reconciliation process의 속도를 올리기 위해 이러한 방법을 사용했다고 합니다.
// Here is some explanation.(https://blog.logrocket.com/immutability-in-react-ebe55253a1cc/)

console.log('updatedUsers : ', updatedUsers); 


// 14. A와 B의 합집합
console.clear();
let arrA = [1, 4, 3, 2];
let arrB = [5, 2, 6, 7, 1];
let ss = [...new Set([...arrA, ...arrB])]; // returns [1, 4, 3, 2, 5, 6, 7]
console.log('ss : ', ss); 


// 15. A와 B의 교집합
console.clear();
{
let arrA = [1, 4, 3, 2];
let arrB = [5, 2, 6, 7, 1];
let bb = arrA.filter(it => arrB.includes(it)); // returns [1, 2]
// 자세한 내용과 질문은 원문을 참고하시기 바랍니다. 원문의 댓글에 참고할 만한 링크가 있어 아래 남깁니다.
console.log('bb : ', bb); 
}

*/