const name = "Aman";
let age = 29;
const hasHobby = true;

age = 30;
// name = "Amanullah"; // getting error. because we declare name as a constant.

/*
function userSummery(name, age, hasHobby) {
  return "Name is: " + name + ". Age: " + age + ". Has hobby: " + hasHobby;
}
*/

/*
const userSummery = function(name, age, hasHobby) {
  return "Name is: " + name + ". Age: " + age + ". Has hobby: " + hasHobby;
};
*/

const userSummery = (name, age, hasHobby) => {
  return "Name is: " + name + ". Age: " + age + ". Has hobby: " + hasHobby;
};

/*
const add = (a, b) => {
  return a + b;
};
*/
const add = (a, b) => a + b;
const addOne = a => a + 1;
const noParameter = () => 5 + 5;

console.log(userSummery(name, age, hasHobby));

console.log(add(5, 2));
console.log(addOne(7));
console.log(noParameter());

console.log("Object");

const person = {
  name: "Suzon",
  age: 29,
  greet: function() {
    console.log("Hi! I am " + this.name);
  }
};

console.log(person);
person.greet();

console.log("Array***********");

const hobbies = ["Sports", "Travelling"];

for (let hobby of hobbies) {
  console.log(hobby);
}

//map create a new array
console.log(hobbies.map(hobby => "Hobby is: " + hobby));
console.log(hobbies);

hobbies.push("Programming");
console.log(hobbies);

console.log("Spread operator ... to copy array or object");

const copiedArray = [...hobbies];
console.log(copiedArray);

const copiedPerson = { ...person };
console.log(copiedPerson);

console.log("Rest operator same as spread operator but it pass dynamic args");

const rest = (...args) => {
  return args;
};

console.log(rest(1, 2, 3, 4));

// Destructaring. It means retrive specific property from an object.
console.log("Destructaring");

const printName = ({ name, age }) => {
  console.log("My name is: " + name + ". Age is: " + age);
};

printName(person);

// const { name, age } = person;
// console.log(name, age);
const [hobby1, hobby2] = hobbies;
console.log(hobby1, hobby2);
