//import React from "react";
//The Reducer Pattern
//Video:
//Immutability:
const myObj = { name: "Key" };
const newObj = myObj;

newObj.name = "Kris";

console.log(myObj);
console.log(newObj);

//Predictability:
//do away with side-effects.

//Mutation Tracking:
//provide the ability to see all changes to our application over time

//Redux & Immutability:
//Large applications

//Challenge Article
/* 
5 types of data that pass information around via value:
Booleans
Strings
Numbers
undefined
null

3 types of data that pass information around via reference:
Objects
Arrays
Functions

the value based data are called Primitive types
the variable contains the data.  
*/
//Variable: Value
var x = 10; // x contains 10
var y = "abc"; //y contains the string of abc
var z = null;

var a = x; //a now contains a new 10, a copy from x
var b = y; //b now contains a new string, a copy from y
console.log(x, y, a, b);

//Changing one doesnt affect the other
a = 6; // a now contains a 5, not a 10
b = "def"; // b now contains a string of def, not abc
console.log(x, y, a, b);

/*
the reference based data are called non-primitive types, herein
referred to collectively as Objects.

The variables do NOT contain the value, instead they point 
to the data's location in memory.

When an Object is created, it is made at some location in your computers memory
"Remember where the car is parked"
the 'value' the Object receives is called the Address, or the location
"The car is parked in Red zone, spot 33"

An Address is shown with arrow brackets <>, just like a string uses quotation marks
*/
var arr = [];
console.log(arr);
arr.push(1);
console.log(arr);
//in the computers memory, this looks like:
/*
Line 66:
|-----------------------------------|
|Variables|Values|Addresses| Objects|
|-----------------------------------|
|arr      |<#001>|#001     | []     |
|-----------------------------------|

Line 68:
|-----------------------------------|
|Variables|Values|Addresses| Objects|
|-----------------------------------|
|arr      |<#001>|#001     | [1]    |
|-----------------------------------|

The Value (the Address) doesnt change even though the object did (we added a number)
when we manipulate Objects, JS's engine will find the data in memory and change 
it there, not inside the object itself

When we make a copy of an object using =, unlike primitive types that make a new 
value, Objects will copy the address to the new object. Meaning both objects will change the same data (lines 4 - 10)
*/
var reference = [1];
var refCopy = reference;
/*
|-----------------------------------|
|Variables|Values|Addresses| Objects|
|-----------------------------------|
|reference|<#001>|#001     | [1]    |
|-----------------------------------|
|refCopy  |<#001>|         |        |
|-----------------------------------|
*/
reference.push(2);
console.log(reference, refCopy);
/*
|-----------------------------------|
|Variables|Values|Addresses| Objects|
|-----------------------------------|
|reference|<#001>|#001     | [1, 2] |
|-----------------------------------|
|refCopy  |<#001>|         |        |
|-----------------------------------|
*/
//Reassigning an object replaces the old one
var obj = { first: "reference" };
console.log(obj);
/*
|------------------------------------------------|
|obj      |<#234>  |#234   |{first: 'reference'} |
|------------------------------------------------|
*/
obj = { second: "ref2" };
/*
|------------------------------------------------|
|obj      |<#678>  |#234   |{first: 'reference'} |
|------------------------------------------------|
|         |        |#678   | {second: 'ref2'}    |
|------------------------------------------------|
Because there is no reference to the first obj anymore, JS can 'safely' 
delete it from memory, meaning we have lost accces to 'first: reference'
*/
console.log(obj);

/* 
Equality Operators:
== and ===
when these are used on Objects, they check the reference. If the Objects 
contain a reference to the same item, the comparison return true
*/
var arrRef = ["Hi!"];
var arrRef2 = arrRef;
console.log(arrRef === arrRef2);

//If theyre distinct objects, even if the data looks similar, they will return false
var arr1 = ["Hi!"];
var arr2 = ["Hi!"];
console.log(arr1 === arr2);
/* 
One way to compare two distinct objects is to turn them into strings and then compare them,
because primitive comparisons check if the values are the same
*/
var arr1str = JSON.stringify(arr1);
var arr2str = JSON.stringify(arr2);
console.log(arr1str === arr2str);

/*
Pure vs Impure Functions
a pure function does not affect anything around it, whereas an impure function 
can mutate the state of its surroundings
*/
//Impure:
function changeAgeImpure(person) {
  person.age = 25;
  return person;
}
var alex = {
  name: "Alex",
  age: 30
};

var changedAlex = changeAgeImpure(alex);
console.log(alex);
console.log(changedAlex);

//Pure:
function changeAgePure(person) {
  //var newPersonObj = JSON.parse(JSON.stringify(person));
  //This line changes 'person' into a string and then back into an object, creating a whole new one

  var newPersonObj = { ...person };
  // the spread operator does the same thing by just making a copy of the object.
  //Spread >>>>>>>> JSON.parse(JSON.stringify())
  newPersonObj.age = 25;
  return newPersonObj;
}
var alex = {
  name: "Alex",
  age: 30
};
var alexChanged = changeAgePure(alex);
console.log(alex);
console.log(alexChanged);
/* Test Yourself
Value vs. reference us a concept often tested in coding interviews.
Try to figure out for yourself what's logged here.
*/
function changeAgeAndReference(person) {
  person.age = 25;
  person = {
    name: "John",
    age: 50
  };
  return person;
}
var personObj1 = {
  name: "Alex",
  age: 30
};
var personObj2 = changeAgeAndReference(personObj1);

console.log(personObj1);
console.log(personObj2);

//End of Challenge Article

/*
The Reducer pattern is a state management pattern that allows
us to write pure functions to manage state changes in a 
predeicatble manner

Reducers take two arguments: the current state and an action, and returns a new,
 updated state object based on both arguments
*/
//(state, action) => newState;

/*
const initialState = 0;
const reducer = state => {
  const newState = state + 1;
  return newState;
};
const newStateValue = reducer(initialState);
console.log(initialState, newStateValue);
*/

//returning integers or strings isnt a good idea because growing data

/*
const initialState = { count: 0 };
const reducer = state => {
    return { count: state.count + 1 };
};
const newStateValue = reducer(initialState);
console.log(initialState, newStateValue);
*/

//now we want to add in an action

/*
const initialState = { count: 0 };
const reducer = (state, action) => {
  if (action.type === "increment") {
    return { count: state.count + 1 };
  }
}
const newStateValue = reducer(initialState, { type: 'increment' });
console.log(initialState, newStateValue)
*/

//this stategy is incredibly powerful, now what if we want to REDUCE state

/*
const initialState = { count: 0 };
const reducer = (state, action) => {
  if (action.type === "increment") {
    return { count: state.count + 1 };
  } else if (action.type === "decrement") {
    return { count: state.count - 1 };
  }
};
console.log(
  initialState,
  reducer(initialState, { type: "increment" }),
  reducer(initialState, { type: "decrement" })
);
*/

//now our state is very predictable. we can also add a payload property to our action
//the reducer needs to have some data passed in through the action to be able to update
//the state correctly, and payload is where that data lives

/*
const initialState = { name: "Donald Duck" };
const reducer = (state, action) => {
  if (action.type === "changeName") {
    //how do we know what to change the name to?
    //the action payload!
    return { name: action.payload };
  }
};
console.log(
  initialState,
  reducer(initialState, { type: "changeName", payload: "Mickey Mouse" })
);
*/

/*
 the actions and its associated property 'type' allows us to use the reducer
to perform conditional state transformations
 */

//now we can get rid of 'if...else if... else' using JS's switch statement

// const initialState = { count: 0 };
// const reducer = (state, action) => {
//   /* if (action.type === "increment") {
//     return { count: state.count + 1 };
//   } else if (action.type === "decrement") {
//     return { count: state.count - 1 };
//   } */
//   //we pass in the value we want to look at:
//   switch (action.type) {
//     //then we make a "case" for each possible value we expect:
//     case "increment":
//       return { count: state.count + 1 };
//     case "decrement":
//       return { count: state.count - 1 };
//     //finally we give a 'catch-all' which is just to return state untouched. Never leave this out.
//     //there should always be a default:
//     default:
//       return state;
//   }
// };
// console.log(
//   initialState,
//   reducer(initialState, { type: "increment" }),
//   reducer(initialState, { type: "decrement" })
// );

//now lets clean it up:
/*
const initialState = { count: 0 };
const reducer = (state, action) => {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1 };
    case "decrement":
      return { count: state.count - 1 };
    default:
      return state;
  }
};
console.log(
  initialState,
  reducer(initialState, { type: "increment" }),
  reducer(initialState, { type: "decrement" })
);
*/

//Challenge: create a reducer funtion that

//-takes initialState arra of objs, each obj
//should be a todo item and contain only one property: description, a string

//-takes in an action with a type and payload. the payload should have a
//description key and value equal to description entered by a user (just write the reducer not the inputs)

//-type: 'ADD', return new array and spread in new obj

//-default state

const initalState = {
  todo: [
    {
      description: "Mop the floor"
    }
  ]
};
const reducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      return { ...state.todo, description: action.payload };
    default:
      return state;
  }
};
console.log(initalState);
console.log(initalState.todo);
console.log(initalState.todo[0]);
console.log(initalState.todo[0].description);

console.log(reducer(initalState, { type: "ADD", payload: "do the dishes" }));
