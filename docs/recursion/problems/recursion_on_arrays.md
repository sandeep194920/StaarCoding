---
sidebar_position: 3
---

# Practice problems on arrays

_Let's look at a couple of recursion examples on arrays. These should give you a strong foundational understanding of recursion, including writing base cases and identifying patterns to call the recursive function to solve subproblems._

<iframe 
  width="560" 
  height="315" 
  src="https://www.youtube.com/embed/8Q13bT1CAuQ?start=146" 
  frameborder="0" 
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen" 
  allowfullscreen>
</iframe>

---

**All iterative problems (that can be solved using loops) can also be solved using recursion.** Identifying the recursive nature of a problem is crucial, and in this section, we'll practice that through a few examples.

**_Note: The input arrays for the problems in this section are assumed to be valid, i.e., arrays of numbers. Invalid inputs like `[null, undefined, "string"]` or non-array values may result in errors._**

## 1. Sum of array elements

Let's start with a simple example: calculating the sum of all elements in an array.

**Problem statement**

```
arr = [10, 15, 20, 30]

Calculate the sum of all the elements of arr

```

### Iterative approach

```js
const sumOfAll = (arr) => {
  let sum = 0;

  for (let i = 0; i < arr.length; i++) {
    sum += arr[i];
  }

  return sum;
};

console.log(sumOfAll(arr)); // 75
```

**Time complexity** - **`O(n)`** as we iterate through all n elements

**Space complexity** - **`O(1)`** as we don't use extra memory

### Recursive approach

_With new Array_

```js
const sumOfAll = (arr) => {
  if (arr.length === 0) {
    return 0;
  }

  const newArr = arr.slice(1); // arr.slice creates a new array from defined index until end of the array

  // Note: Instead of doing arr[0] and then arr.slice(1), we can do arr.shift() as
  // shown in the example of 'Array Reverse' problem below.

  return arr[0] + sumOfAll(newArr);
};

console.log(sumOfAll(arr));
```

**Time complexity** - **`O(n²)`**

- `O(n)` as the recursive function is called n times (for n elements). Each time inside the recursive function, the slicing happens which is again `O(n)` so it is `O(n*n)` which is **`O(n²)`** overall.

**Space complexity** - **`O(n²)`**

- `O(n)` -> for recursive stack space

- `O(n)` -> to form a new array in each recursive call.

  So overall, it is **`O(n²)`**

_Without new Array_

```js
const recursiveSum = (arr, index) => {
  if (index === arr.length) {
    return 0;
  }

  return arr[index] + recursiveSum(arr, index + 1);
};

console.log(recursiveSum(arr, 0));
```

**Time complexity** - **`O(n)`**

- There are `n` elements in the array, and each recursive call processes one element.

- Since we only do one recursive call at a time, the total number of calls is `n`.

- So, time complexity is `O(n)`.

**Space complexity** - **`O(n)`**

- The recursion depth reaches `n` (each function call is stored in the call stack).

- Since each call has its own stack frame, we use `O(n)` [auxiliary space](/docs/recursion/concept/what-is-recursion#space-complexity).

- So, space complexity is `O(n)`.

### 🔥 Challenge

Try to find product of all elements of array using iterative and recursive approaches.

---

## 2. Find Maximum Element in Array

**Problem statement**

```
arr = [10, -20, 300, 40]

Find the maximum element of the arr
```

### Iterative approach

```js
const findMax = (arr) => {
  let maxEl = -Infinity;

  for (const ch of arr) {
    maxEl = Math.max(maxEl, ch);
  }
  return maxEl;
};

console.log(findMax(arr)); // 300
```

**Time Complexity** - **`O(n)`**

`O(n)` → Since we iterate through the array once.

**Space Complexity** - **`O(1)`**

`O(1)` → We use only a single variable (maxEl), so space usage is constant.

### Recursive approach

```js
const findMax = (arr, index = 0) => {
  if (arr.length === 0) return null; // Guard condition - Explicit check for empty array

  if (index === arr.length) return -Infinity; // Base case for recursion

  return Math.max(arr[index], findMax(arr, index + 1));
};

console.log(findMax(arr)); // 300
console.log(findMax([])); // -Infinity (natural behavior for empty lists)
```

**Time complexity** - **`O(n)`**

- There are `n` elements in the array, and each recursive call processes one element.

- Since we only do one recursive call at a time, the total number of calls is `n`.

- So, time complexity is `O(n)`.

**Space complexity** - **`O(n)`**

- The recursion depth reaches `n` (each function call is stored in the call stack).

- Since each call has its own stack frame, we use `O(n)` [auxiliary space](/docs/recursion/concept/what-is-recursion#space-complexity).

- So, space complexity is `O(n)`.

### 🔥 Challenge

Try to find minimum element in the array using using iterative and recursive approaches.

---

## 3. Array Reverse

**Problem statement**

```
arr = [10, 20, 30, 40]

Reverse the arr
```

### Iterative approach

```js
for (let i = 0, j = arr.length - 1; i < arr.length / 2; i++, j--) {
  //   let temp = arr[i];
  //   arr[i] = arr[j];
  //   arr[j] = temp;

  // The above commented code can also be rewritten using array destructuring assignment in JavaScript:

  [arr[i], arr[j]] = [arr[j], arr[i]];
}

console.log(arr); // [ 40, 30, 20, 10 ]
```

**Time complexity** - **`O(n)`** as we iterate through all n elements

**Space complexity** - **`O(1)`** as we don't use extra memory

### Recursive approach

_with shift operation (Modifying the original array)_

```js
const reverseArr = (arr) => {
  if (arr.length === 0) {
    return arr;
  }

  const firstElement = arr.shift();
  reverseArr(arr);

  // Note: The other option here would be to use arr[0] and arr.slice(1)
  // as shown in first problem (Sum of array elements) above.

  arr.push(firstElement);
  return arr;
};

const res = reverseArr(arr);
console.log(res); // [40, 30, 20, 10]
```

**Time complexity** - **`O(n²)`**

- `arr.shift()` removes the first element of the array.
  Since arrays are contiguous in memory, removing the first element requires shifting all the remaining elements to the left.
  This takes `O(n)` time in each recursive call.

- Number of recursive calls `O(n)` - The function calls itself recursively until `arr.length === 0`, meaning it makes `n` recursive calls.

- Each call takes `O(n)` due to shift(), and there are `O(n)` recursive calls.
  So, the total time complexity is `O(n) * O(n) = O(n²)`.

**Space complexity** - **`O(n)`**

- The recursion depth goes up to `n`, leading to `O(n)` stack space.

_without shift operation - Storing the result in new array_

```js
const reverseArr = (arr, index = 0) => {
  if (arr.length === 0) {
    return [];
  }

  if (index === arr.length - 1) {
    return [arr[index]];
  }

  const reversedArr = reverseArr(arr, index + 1);
  reversedArr.push(arr[index]);
  return reversedArr;
};

const res = reverseArr(arr);
console.log(res); // [40, 30, 20, 10]

const res = reverseArr([]); // for an empty array
console.log(res); // []
```

**Time complexity** - **`O(n)`**

- There are `n` elements in the array, and each recursive call processes one element.

- Since we only do one recursive call at a time, the total number of calls is `n`.

- So, time complexity is `O(n)`.

**Space complexity** - **`O(n)`**

- The recursion depth reaches `n` (each function call is stored in the call stack).

- Since each call has its own stack frame, we use `O(n)` [auxiliary space](/docs/recursion/concept/what-is-recursion#space-complexity).

- So, space complexity is `O(n)`.

---

## 4. Array Search (Linear Search)

**Problem statement**

```
arr = [1, 2, 3, 2, 2, 4], element = 2

Find the index of the given element.

# output -> should return 1

---
arr = [1, 2, 3, 2, 2, 4], element = 200

Find the index of the given element.

# output -> should return -1 as 200 doesn't exist in `arr`

```

### Iterative approach

```js
const arraySearch = (arr, el) => {
  for (let index = 0; index < arr.length; index++) {
    if (arr[index] === el) {
      return index;
    }
  }
  return -1;
};

const indexOfElement = arraySearch(arr, element);
console.log(indexOfElement); // 1
```

**Time Complexity** - **`O(n)`**

`O(n)` → Since we iterate through the array once.

**Space Complexity** - **`O(1)`**

`O(1)` → We don't use any extra space here.

### Recursive approach

```js
const arraySearch = (arr, index, el) => {
  if (index === arr.length) return -1; // Element not found

  if (arr[index] === el) {
    return index;
  }

  return arraySearch(arr, index + 1, el);
};

const indexOfElement = arraySearch(arr, 0, element);
console.log(indexOfElement); // 1
```

**Time complexity** - **`O(n)`**

- There are `n` elements in the array, and each recursive call processes one element.

- Since we only do one recursive call at a time, the total number of calls is `n`.

- So, time complexity is `O(n)`.

**Space complexity** - **`O(n)`**

- The recursion depth reaches `n` (each function call is stored in the call stack).

- Since each call has its own stack frame, we use `O(n)` [auxiliary space](/docs/recursion/concept/what-is-recursion#space-complexity).

- So, space complexity is `O(n)`.

### 🔥 Challenge

Try to find the index of last occurrence of the element.

```
[1, 2, 3, 2, 2, 4], element = 2

# output -> Should return index `4`

```

Hint: The process must start from the last index of the array.

---

## 5. Count Occurrences of an Element

**Problem statement**

```
arr = [1, 2, 3, 2, 2, 4], element = 2

Find the number of times the given `element` exists in `arr`.

# output -> should return `3`
```

### Iterative approach

```js
const findOccurances = (arr, el) => {
  let count = 0;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === el) {
      count += 1;
    }
  }

  return count;
};

console.log(findOccurances([1, 2, 3, 2, 2, 4], 2)); // 3
```

**Time Complexity** - **`O(n)`**

`O(n)` → Since we iterate through the array once.

**Space Complexity** - **`O(1)`**

`O(1)` → Only one count variable is used, which is constant space.

### Recursive approach

```js
const findOccurances = (arr, el, index = 0) => {
  if (index === arr.length) {
    return 0;
  }

  let count = (arr[index] === el ? 1 : 0) + findOccurances(arr, el, index + 1);

  return count;
};

console.log(findOccurances([1, 2, 3, 2, 2, 4], 2)); // 3
```

This can also be written using normal `if-else` condition

```js
const findOccurrences = (arr, el, index = 0) => {
  if (index === arr.length) {
    return 0;
  }

  let count = 0;
  if (arr[index] === el) {
    count = 1;
  }

  count += findOccurrences(arr, el, index + 1);

  return count;
};

console.log(findOccurrences([1, 2, 3, 2, 2, 4], 2)); // 3
```

**Time complexity** - **`O(n)`**

- There are `n` elements in the array, and each recursive call processes one element.

- Since we only do one recursive call at a time, the total number of calls is `n`.

- So, time complexity is `O(n)`.

**Space complexity** - **`O(n)`**

- The recursion depth reaches `n` (each function call is stored in the call stack).

- Since each call has its own stack frame, we use `O(n)` [auxiliary space](/docs/recursion/concept/what-is-recursion#space-complexity).

- So, space complexity is `O(n)`.

---
