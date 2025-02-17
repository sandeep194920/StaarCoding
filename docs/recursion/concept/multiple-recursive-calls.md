---
sidebar_position: 2
---

# Multiple Recursive Calls

_This page introduces multiple recursion concept with a fibonacci sequence example, highlighting its definition, usage, and complexity._

<iframe 
  width="560" 
  height="315" 
  src="https://www.youtube.com/embed/8Q13bT1CAuQ?start=146" 
  frameborder="0" 
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen" 
  allowfullscreen>
</iframe>

---

Multiple recursion occurs when solving a subproblem requires **solving multiple smaller subproblems**, each of which is solved recursively. **Let's understand this by taking an example of Fibonacci series.**

## Fibonacci Series - Recursive approach

**Recursive Nature of Fibonacci series**

In the Fibonacci sequence:

To calculate `fib(n)`, we need the values of `fib(n-1)` and `fib(n-2)`.
Each of these values further requires solving their own subproblems, forming a recursive tree structure, where subproblems branch out into smaller subproblems.

The Fibonacci series looks like this: `0, 1, 1, 2, 3, 5, 8, 13, 21...`

**Key points:**

- The first two numbers are fixed: `Fib(0) = 0` and `Fib(1) = 1`.
- These serve as the base cases because they don't require further recursion. If we call `fib(0)` or `fib(1)`, we can directly return `0` and `1`, respectively.

### Base condition insight

Think of base conditions as the **"stopping point"** for recursion—they prevent infinite calls and provide a concrete result to build the solution upwards.

### Find fib(5) recursively

`Fib(5)` - To find `Fib(5)` we need to first find `Fib(4)` and `Fib(3)` and add them.

Similary, to find `Fib(4)` we need to find `Fib(3)` and `Fib(2)` and add them.

Similarly, to find `Fib(3)` we need to find `Fib(2)` and `Fib(1)` and add them. `Fib(1)` is already known to be 1 (base case)

Similarly, to find `Fib(2)` we need to add `Fib(1)` (known by base case) and `Fib(0)` (known by base case - known to be 0)

### Recursive Code

```js
function fib(n) {
  // Base case - n = 0 or n = 1
  if (n === 0 || n === 1) {
    return n;
  }

  // for any other positive value of n
  const prevNumber1 = fib(n - 1); // recursion call for n-1
  const prevNumber2 = fib(n - 2); // recursion call for n-2

  return prevNumber1 + prevNumber2;
}

// Call for fib(5)
console.log(fib(5)); // gives you 5
```

### Recursive Tree

```scss
                        Fib(5)
                       /      \
                  Fib(4)      Fib(3)
                 /     \      /     \
            Fib(3)   Fib(2) Fib(2) Fib(1)
           /    \    /   \  /   \
      Fib(2) Fib(1)Fib(1)Fib(0)Fib(1)Fib(0)
     /    \
Fib(1) Fib(0)
```

### Time and Space for recursive approach

```scss
                        Fib(5)
                       /      \
                  Fib(4)      Fib(3)
                 /     \      /     \
            Fib(3)   Fib(2) Fib(2) Fib(1)
           /    \    /   \  /   \
      Fib(2) Fib(1)Fib(1)Fib(0)Fib(1)Fib(0)
     /    \
Fib(1) Fib(0)
```

**Time complexity in recursion** - Is to calculate how many recursion calls we have made. In other words, how many times did we call the same function.

If you notice here, for every fib(x) we have 2 calls. For fib(5) we have 2 calls, for fib(4) we have 2 calls and so on.

So we can write `2^input number` -> `O(2^n)` approximately but generally will be less than `2^n` because we already have `fib(0)` and `fib(1)` calculated in the base condition.

So we generally say, `Time complexity = O(2^n)`.

**Space complexity in recursion** - The space complexity of a recursive function is determined by:

- The call stack size: How deep the recursion goes.
- At any given moment, the maximum depth of recursive calls (from root to the deepest leaf in the tree) defines the maximum number of active function calls in the stack.

**For Fibonacci Recursion:**

- Each call to fib(n) spawns two new calls: fib(n-1) and fib(n-2).

      - However, only one branch is active at a time in the stack due to the nature of recursion.

  For fib(5):

- When calculating fib(5), it first fully computes fib(4), which computes fib(3), and so on, down to fib(0).
  The maximum depth of the recursion tree is n, as the recursion goes all the way from fib(5) to fib(0).

**Stack at Each Level for fib(5)**

Here’s the sequence of calls, showing how the stack builds and unwinds:

```
fib(5) calls fib(4) and waits.

fib(4) calls fib(3) and waits.

fib(3) calls fib(2) and waits.

fib(2) calls fib(1) and fib(0) (base cases).
```

At this point, the stack contains:

```
fib(5) → fib(4) → fib(3) → fib(2) → fib(1)
```

- The maximum depth of the call stack is equal to n for fib(n).
- Therefore, `space complexity = O(n)`.

### Room for Optimization of Time Complexity

As we can see from the recursive call tree:

```scss
                        Fib(5)
                       /      \
                  Fib(4)      Fib(3)
                 /     \      /     \
            Fib(3)   Fib(2) Fib(2) Fib(1)
           /    \    /   \  /   \
      Fib(2) Fib(1)Fib(1)Fib(0)Fib(1)Fib(0)
     /    \
Fib(1) Fib(0)
```

There’s a major inefficiency here: the same subproblems are being solved multiple times. For example:

- Fib(3) is called twice.
- Fib(2) is called three times.
- Fib(1) and Fib(0) are repeatedly calculated as well.

This repetition leads to an exponential time complexity of O(2^n) in the naive recursive approach, making it impractical for large values of n.

**Optimizing with Caching (Memoization)**

To optimize this, we can introduce memoization, a technique where we store the results of expensive function calls and reuse the cached results when the same inputs occur again. By doing this, we avoid redundant calculations and drastically reduce the number of recursive calls.

Here’s how it works:

- As we calculate Fibonacci values, we store the result of each function call in a cache (often an object or an array).

- If we encounter the same Fibonacci number again, instead of recalculating it, we simply retrieve it from the cache.
  This optimization turns the time complexity from O(2^n) to O(n) because each Fibonacci value is calculated only once.

**Future Optimizations with Dynamic Programming**

What we’ve touched on here is a concept known as **dynamic programming (DP)**. DP is a method for solving problems by breaking them down into simpler subproblems and solving each subproblem just once, storing its result to avoid redundant work.

In the case of the Fibonacci series:

- We calculate fib(0) and fib(1) as base cases.

- For each subsequent number, we can use previously calculated values to build the next value in the series, storing each result as we go.

We will dive deeper into dynamic programming in future topics, but for now, you can think of memoization as a simple form of dynamic programming. By caching previously computed values, we transform our solution from a brute-force recursive approach to a more efficient one.

## Fibonacci Series - Iterative approach

### Find fib(5) iteratively

#### Iterative Code

```js
function fib(n) {
  if (n === 0) return 0;
  if (n === 1) return 1;

  let prev1 = 1; // fib(1)
  let prev2 = 0; // fib(0)
  let current;

  for (let i = 2; i <= n; i++) {
    current = prev1 + prev2;
    prev2 = prev1;
    prev1 = current;
  }

  return current;
}

// Call for fib(5)
console.log(fib(5)); // gives you 5
```

### Time and Space for iterative approach

- The loop runs approximately for n times (less than n as we are omitting 0 and 1), we can say the `Time complexity is approximately O(N)`
- We are not using any extra space here, so the space is constant, `O(1)`

---

## Suggested problems to solve

👉 "Check out these must-try problems to strengthen your understanding of recursion on arrays: [Recursion on Arrays](/docs/recursion/problems/recursion_on_arrays)."
