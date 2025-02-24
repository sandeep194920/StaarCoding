---
sidebar_position: 2
---

# Sorting Algorithms

_Different sorting algorithms using recursion._

There are many sorting algorithms, but they can be broadly classified based on their approach. Here’s a breakdown:

## Sorting Algorithms Classification

### 1. Comparison-Based Sorting Algorithms

| Sorting Algorithm  | Uses Recursion?                 | Time Complexity (Avg) | Space Complexity     |
| ------------------ | ------------------------------- | --------------------- | -------------------- |
| **Bubble Sort**    | ❌ (Iterative)                  | O(n²)                 | O(1)                 |
| **Selection Sort** | ✅ (Can be written recursively) | O(n²)                 | O(1)                 |
| **Insertion Sort** | ✅ (Can be written recursively) | O(n²)                 | O(1)                 |
| **Merge Sort**     | ✅ (Recursion-based)            | O(n log n)            | O(n)                 |
| **Quick Sort**     | ✅ (Recursion-based)            | O(n log n)            | O(log n) (Best case) |
| **Heap Sort**      | ❌ (Uses a heap data structure) | O(n log n)            | O(1)                 |

### 2. Non-Comparison-Based Sorting Algorithms

| Sorting Algorithm | Uses Recursion? | Time Complexity (Avg) | Space Complexity |
| ----------------- | --------------- | --------------------- | ---------------- |
| **Counting Sort** | ❌ (Iterative)  | O(n + k)              | O(k)             |
| **Radix Sort**    | ❌ (Iterative)  | O(nk)                 | O(n + k)         |
| **Bucket Sort**   | ❌ (Iterative)  | O(n + k)              | O(n)             |

## Which Sorting Algorithms Use Recursion?

### ✅ Recursive Sorts:

1. [Selection Sort (can be recursive)](/docs/recursion/problems/selection_sort)
2. Insertion Sort (can be recursive)
3. Merge Sort (recursive by nature)
4. Quick Sort (recursive by nature)

### ❌ Non-Recursive Sorts:

1. Bubble Sort
2. Heap Sort
3. Counting Sort
4. Radix Sort
5. Bucket Sort

## Key Takeaways

- **Merge Sort and Quick Sort** are inherently recursive.
- **Selection Sort and Insertion Sort** can be written recursively but are usually iterative.
- **Non-comparison sorts (like Counting Sort, Radix Sort, Bucket Sort)** do not use recursion.
- **Heap Sort** uses a heap data structure instead of recursion.
