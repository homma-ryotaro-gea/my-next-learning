import { faker } from "@faker-js/faker";

export type Person = {
  firstName: string;
  lastName: string;
  age: number;
  visits: number;
  progress: number;
  status: "relationship" | "complicated" | "single";
  subRows?: Person[];
};

const range = (len: number) => {
  const arr: number[] = [];
  for (let i = 0; i < len; i++) {
    arr.push(i);
  }
  return arr;
};

const newPerson = (): Person => {
  return {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    age: faker.number.int(40),
    visits: faker.number.int(1000),
    progress: faker.number.int(100),
    status:
      faker.helpers.shuffle<Person["status"]>([
        "relationship",
        "complicated",
        "single",
      ])[0] ?? "single",
  };
};

export function makeData(...lens: number[]): Person[] {
  // const makeDataLevel = (depth = 0): Person[] => {
  //   const len = lens[depth] ?? 0;
  //   return range(len).map((d): Person => {
  //     return {
  //       ...newPerson(),
  //       subRows: lens[depth + 1] ? makeDataLevel(depth + 1) : undefined,
  //     };
  //   });
  // };

  // return makeDataLevel();
  return [
    {
      firstName: "John",
      lastName: "Doe",
      age: 25,
      visits: 100,
      progress: 50,
      status: "single",
    },
    {
      firstName: "Jane",
      lastName: "Doe",
      age: 22,
      visits: 200,
      progress: 60,
      status: "relationship",
    },
    {
      firstName: "John",
      lastName: "Smith",
      age: 32,
      visits: 300,
      progress: 70,
      status: "complicated",
    },
    {
      firstName: "Jane",
      lastName: "Smith",
      age: 33,
      visits: 400,
      progress: 80,
      status: "single",
    },
  ];
}
