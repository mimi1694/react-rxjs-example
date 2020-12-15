import { interval } from "rxjs";
import { map } from "rxjs/operators";

const peopleList = [
  { name: "Jim", shirt: "red", eye: "brown", hair: "blonde", hat: true },
  { name: "Jane", shirt: "red", eye: "brown", hair: "brown", hat: false },
  { name: "Sally", shirt: "red", eye: "brown", hair: "red", hat: false },
  { name: "Steven", shirt: "red", eye: "blue", hair: "brown", hat: false },
  { name: "Abe", shirt: "blue", eye: "green", hair: "brown", hat: true },
  { name: "Abby", shirt: "blue", eye: "hazel", hair: "red", hat: false },
  { name: "Ben", shirt: "blue", eye: "brown", hair: "blonde", hat: false },
  { name: "Brenda", shirt: "blue", eye: "brown", hair: "blonde", hat: false },
  { name: "Chad", shirt: "blue", eye: "brown", hair: "white", hat: false },
  { name: "Charlotte", shirt: "blue", eye: "blue", hair: "gray", hat: false },
  { name: "Dave", shirt: "green", eye: "green", hair: "blonde", hat: false },
  { name: "Dianne", shirt: "green", eye: "hazel", hair: "black", hat: true },
  { name: "Ed", shirt: "green", eye: "brown", hair: "brown", hat: true },
  { name: "Elena", shirt: "green", eye: "brown", hair: "brown", hat: false },
  { name: "Fred", shirt: "green", eye: "brown", hair: "gray", hat: false },
  { name: "Fiona", shirt: "green", eye: "blue", hair: "red", hat: false },
  { name: "Gob", shirt: "green", eye: "blue", hair: "brown", hat: false },
  { name: "Grace", shirt: "green", eye: "green", hair: "gray", hat: true },
  { name: "Henry", shirt: "yellow", eye: "green", hair: "gray", hat: false },
  { name: "Harriet", shirt: "yellow", eye: "hazel", hair: "blonde", hat: false },
  { name: "Isabel", shirt: "yellow", eye: "brown", hair: "brown", hat: true },
  { name: "Ian", shirt: "yellow", eye: "brown", hair: "red", hat: false },
  { name: "Kyle", shirt: "yellow", eye: "brown", hair: "gray", hat: false },
  { name: "Kim", shirt: "yellow", eye: "brown", hair: "white", hat: false },
  { name: "Larry", shirt: "yellow", eye: "hazel", hair: "brown", hat: false },
  { name: "Lindsay", shirt: "yellow", eye: "brown", hair: "black", hat: false },
  { name: "Marty", shirt: "yellow", eye: "brown", hair: "blonde", hat: true },
  { name: "Marie", shirt: "pink", eye: "brown", hair: "black", hat: true },
  { name: "Ned", shirt: "pink", eye: "green", hair: "blonde", hat: true },
  { name: "Nancy", shirt: "pink", eye: "blue", hair: "black", hat: false },
  { name: "Otis", shirt: "pink", eye: "blue", hair: "brown", hat: false },
  { name: "Olive", shirt: "pink", eye: "hazel", hair: "white", hat: false },
  { name: "Penelope", shirt: "pink", eye: "green", hair: "gray", hat: false },
  { name: "Peter", shirt: "gray", eye: "brown", hair: "blonde", hat: true },
  { name: "Quinn", shirt: "gray", eye: "hazel", hair: "black", hat: false },
  { name: "Rob", shirt: "gray", eye: "green", hair: "brown", hat: false },
  { name: "Rory", shirt: "gray", eye: "brown", hair: "red", hat: false },
  { name: "Tina", shirt: "gray", eye: "brown", hair: "gray", hat: true },
  { name: "Tim", shirt: "gray", eye: "blue", hair: "white", hat: false },
  { name: "Ursula", shirt: "black", eye: "blue", hair: "blonde", hat: false },
  { name: "Xena", shirt: "black", eye: "green", hair: "black", hat: false },
  { name: "Vince", shirt: "black", eye: "brown", hair: "brown", hat: false },
  { name: "Winnie", shirt: "black", eye: "green", hair: "white", hat: false },
  { name: "Zeke", shirt: "black", eye: "brown", hair: "red", hat: true }
];
export const peopleStream = interval(1000).pipe(map(i => peopleList.slice(0, i + 1)));

export const getPeople = (startIdx, endIdx) => new Promise(resolve => {
  resolve(peopleList.slice(startIdx, endIdx + 1));
});

export default peopleList;