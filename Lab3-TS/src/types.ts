// №1
// 1.1
export type Flatten<T extends any[]> = T extends [infer First, ...infer Rest]
    ? First extends any[]
        ? [...Flatten<First>, ...Flatten<Rest>]
        : [First, ...Flatten<Rest>]
    : [];

// Пример использования
export type FlattenExample = Flatten<[1, 2, [3, 4], [[[5]]]]>; // Результат: [1, 2, 3, 4, 5]


// 1.2
export type MyAwaited<T extends Promise<any>> = T extends Promise<infer U> ? U : never;
type ExampleType = Promise<string>;
export type Result = MyAwaited<ExampleType>; // Должен быть 'string'

type TestStringPromise = MyAwaited<Promise<string>>; // Должен вывести 'string'
type TestNumberPromise = MyAwaited<Promise<number>>; // Должен вывести 'number'

// 1.3
export type Concat<T extends any[], U extends any[]> = [...T, ...U];
type Res = Concat<[1], [2]>; // Должен быть тип [1, 2]
type AnotherResult = Concat<[string, boolean], [number]>; // Должен быть тип [string, boolean, number]

// 1.4
export type If<C extends boolean, T, F> = C extends true ? T : F;
type A = If<true, "a", "b">; // Должен быть 'a'
type B = If<false, "a", "b">; // Должен быть 'b'

// 1.5
export type MyExclude<T, U> = T extends U ? never : T;

type T0 = MyExclude<"a" | "b" | "c", "a">; // Должен быть 'b' | 'c'
type T1 = MyExclude<"a" | "b" | "c", "a" | "b">; // Должен быть 'c'


// 1.6
export type First<T extends any[]> = T extends [infer First, ...any[]] ? First : never;

// Пример использования
type arr1 = ["a", "b", "c"]; type arr2 = [3, 2, 1];
type head1 = First<arr1>; // 'a'
type head2 = First<arr2>; // 3

// 1.7
type Includes<T extends any[], U> = U extends T[number] ? true : false;

type isPillarMen = Includes<["Test0", "Test1", "Test2", "Test3"], "Test1213">;

// 1.8
type Push<T extends any[], U> = [...T, U];

type Res1_8 = Push<[1, 2], "3">; // [1, 2, '3']

// 1.9
type MyReadonly<T> = {
    readonly [K in keyof T]: T[K];
};
interface Todo {
    title: string;
    description: string;
}
const todo: MyReadonly<Todo> = {
    title: "Hey",
    description: "foobar",
};

// todo.title = "Hello"; // Error
// todo.description = "barFoo"; // Error


// 1.10
type Length<T extends any[]> = T['length'];

// Пример использования
type array1 = ["test1", "test2", "test3", "test4"];
type array2 = ["test1", "test2", "test3", "test4", "test5"];

type array1Length = Length<array1>; // 4
type array2Length = Length<array2>; // 5





