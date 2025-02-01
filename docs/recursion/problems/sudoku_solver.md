---
sidebar_position: 5
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Sudoku Solver (Hard)

_This page is about how to solve sudoku using recursion and backtracking._

### [Leetcode Problem Link](https://leetcode.com/problems/sudoku-solver)

<iframe 
  width="560" 
  height="315" 
  src="https://www.youtube.com/embed/8Q13bT1CAuQ?start=146" 
  frameborder="0" 
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen" 
  allowfullscreen>
</iframe>

## Explanation

The Sudoku solver uses a **backtracking algorithm** to solve the puzzle. It recursively tries to fill in each cell by testing numbers from 1 to 9 and checks if they are valid according to the rules of Sudoku:

- Each number must appear only once in each row.
- Each number must appear only once in each column.
- Each number must appear only once in each 3x3 subgrid.

If a valid number is found, the algorithm moves to the next empty cell. If no valid number is found, it backtracks to the previous cell and tries the next possible number.

### Time Complexity

- **Worst-case Time Complexity**:

The algorithm tries all possible configurations for each empty cell. Since there are 9 possible values to try (1 to 9) for each empty cell, the worst-case time complexity is `O(9^{N^2})`, where `N` is the size of the grid (9 for a standard Sudoku). In the worst case, this could result in testing all 9 possible values for every empty cell.

However, in practice, the backtracking approach often finds a solution much faster, pruning invalid possibilities and terminating earlier. Hence, the worst-case complexity provides an upper bound. If we consider the number of empty spaces as `K` then the time would be `O(9^k)`

### Space Complexity

- **Without Recursion Stack**: The board is a fixed 9x9 grid, so the space required to store the board is `O(N^2)`, where `N` is the size of the grid (9). Therefore, without considering recursion stack space, the space complexity is `O(N^2)`. If the board is already given then it is `O(1)` time complexity as you don't use any extra space to store the board.

- **With Recursion Stack**: The recursion stack depth will be proportional to the number of empty cells that the algorithm needs to explore. If there are `K` empty cells, the recursion stack will have a depth of
  `O(K)`, where `K` is the number of empty cells in the board.

---

## Code Implementation

<Tabs>
  <TabItem value="javascript" label="JavaScript">

```javascript
/**
 * LeetCode 37 - Sudoku Solver (Hard)
 * This function solves a Sudoku puzzle using backtracking.
 */

// Main function to solve the Sudoku board
const solveSudoku = function (board) {
  for (let row = 0; row < board.length; row++) {
    // Loop through each row
    for (let col = 0; col < board[row].length; col++) {
      // Loop through each column in the row
      if (board[row][col] === ".") {
        // Check if the current cell is empty
        for (let n = 1; n <= 9; n++) {
          // Try placing numbers 1 to 9
          if (isValid(`${n}`, row, col, board)) {
            // Check if the number is valid for the current cell
            board[row][col] = `${n}`; // Place the number
            if (solveSudoku(board) === false) {
              // Recursively solve the rest of the board
              board[row][col] = "."; // If it doesn't work, backtrack
            } else {
              return true; // If it works, return true
            }
          }
        }
        return false; // No valid number found, so return false
      }
    }
  }
  return true; // Board is completely filled and valid
};

// Function to check if placing a number 'n' in the board is valid
const isValid = (n, row, col, board) => {
  for (let i = 0; i < board.length; i++) {
    // Check the row for duplicates
    if (board[row][i] === n) return false;
  }
  for (let i = 0; i < board.length; i++) {
    // Check the column for duplicates
    if (board[i][col] === n) return false;
  }
  const startRow = 3 * Math.floor(row / 3); // Find the starting row of the 3x3 subgrid
  const startCol = 3 * Math.floor(col / 3); // Find the starting column of the 3x3 subgrid
  for (let i = 0; i < 9; i++) {
    // Loop through the 3x3 subgrid
    if (board[startRow + Math.floor(i / 3)][startCol + (i % 3)] === `${n}`)
      return false;
  }
  return true; // If no conflicts, return true
};

const board = [
  ["5", "3", ".", ".", "7", ".", ".", ".", "."],
  ["6", ".", ".", "1", "9", "5", ".", ".", "."],
  [".", "9", "8", ".", ".", ".", ".", "6", "."],
  ["8", ".", ".", ".", "6", ".", ".", ".", "3"],
  ["4", ".", ".", "8", ".", "3", ".", ".", "1"],
  ["7", ".", ".", ".", "2", ".", ".", ".", "6"],
  [".", "6", ".", ".", ".", ".", "2", "8", "."],
  [".", ".", ".", "4", "1", "9", ".", ".", "5"],
  [".", ".", ".", ".", "8", ".", ".", "7", "9"],
];

console.log("Before solving:");
console.log(board);

solveSudoku(board);

console.log("After solving:");
console.log(board);
```

</TabItem>

<TabItem value="python" label="Python">

```python
# LeetCode 37 - Sudoku Solver (Hard)
# This function solves a Sudoku puzzle using backtracking.

# Main function to solve the Sudoku board
def solveSudoku(board):
    for row in range(len(board)):  # Loop through each row
        for col in range(len(board[row])):  # Loop through each column in the row
            if board[row][col] == ".":  # Check if the current cell is empty
                for n in range(1, 10):  # Try placing numbers 1 to 9
                    if isValid(str(n), row, col, board):  # Check if the number is valid for the current cell
                        board[row][col] = str(n)  # Place the number
                        if not solveSudoku(board):  # Recursively solve the rest of the board
                            board[row][col] = "."  # If it doesn't work, backtrack
                        else:
                            return True  # If it works, return True
                return False  # No valid number found, so return False
    return True  # Board is completely filled and valid


# Function to check if placing a number 'n' in the board is valid
def isValid(n, row, col, board):
    for i in range(len(board)):  # Check the row for duplicates
        if board[row][i] == n:
            return False
    for i in range(len(board)):  # Check the column for duplicates
        if board[i][col] == n:
            return False
    startRow = 3 * (row // 3)  # Find the starting row of the 3x3 subgrid
    startCol = 3 * (col // 3)  # Find the starting column of the 3x3 subgrid
    for i in range(9):  # Loop through the 3x3 subgrid
        if board[startRow + (i // 3)][startCol + (i % 3)] == n:
            return False
    return True  # If no conflicts, return True


# Example input Sudoku board (9x9)
board = [
    ["5", "3", ".", ".", "7", ".", ".", ".", "."],
    ["6", ".", ".", "1", "9", "5", ".", ".", "."],
    [".", "9", "8", ".", ".", ".", ".", "6", "."],
    ["8", ".", ".", ".", "6", ".", ".", ".", "3"],
    ["4", ".", ".", "8", ".", "3", ".", ".", "1"],
    ["7", ".", ".", ".", "2", ".", ".", ".", "6"],
    [".", "6", ".", ".", ".", ".", "2", "8", "."],
    [".", ".", ".", "4", "1", "9", ".", ".", "5"],
    [".", ".", ".", ".", "8", ".", ".", "7", "9"]
]

print("Before solving:")
print(board)

solveSudoku(board)

print("After solving:")
print(board)


```

</TabItem>

<TabItem value="java" label="Java">

```java
// LeetCode 37 - Sudoku Solver (Hard)
// This function solves a Sudoku puzzle using backtracking.

public class SudokuSolver {
    public static void solveSudoku(char[][] board) {
        for (int row = 0; row < board.length; row++) {  // Loop through each row
            for (int col = 0; col < board[row].length; col++) {  // Loop through each column
                if (board[row][col] == '.') {  // Check if the current cell is empty
                    for (char n = '1'; n <= '9'; n++) {  // Try placing numbers 1 to 9
                        if (isValid(n, row, col, board)) {  // Check if the number is valid
                            board[row][col] = n;  // Place the number
                            if (!solveSudoku(board)) {  // Recursively solve the rest of the board
                                board[row][col] = '.';  // If it doesn't work, backtrack
                            } else {
                                return true;  // If it works, return true
                            }
                        }
                    }
                    return false;  // No valid number found
                }
            }
        }
        return true;  // Board is completely filled
    }

    // Helper function to check if a number is valid at the given position
    public static boolean isValid(char n, int row, int col, char[][] board) {
        // Check the row
        for (int i = 0; i < board.length; i++) {
            if (board[row][i] == n) return false;
        }
        // Check the column
        for (int i = 0; i < board.length; i++) {
            if (board[i][col] == n) return false;
        }
        // Check the 3x3 grid
        int startRow = 3 * (row / 3);
        int startCol = 3 * (col / 3);
        for (int i = 0; i < 9; i++) {
            if (board[startRow + i / 3][startCol + i % 3] == n) return false;
        }
        return true;
    }

    public static void main(String[] args) {
        char[][] board = {
            {'5', '3', '.', '.', '7', '.', '.', '.', '.'},
            {'6', '.', '.', '1', '9', '5', '.', '.', '.'},
            {'.', '9', '8', '.', '.', '.', '.', '6', '.'},
            {'8', '.', '.', '.', '6', '.', '.', '.', '3'},
            {'4', '.', '.', '8', '.', '3', '.', '.', '1'},
            {'7', '.', '.', '.', '2', '.', '.', '.', '6'},
            {'.', '6', '.', '.', '.', '.', '2', '8', '.'},
            {'.', '.', '.', '4', '1', '9', '.', '.', '5'},
            {'.', '.', '.', '.', '8', '.', '.', '7', '9'}
        };
        System.out.println("Before solving:");
        System.out.println(Arrays.deepToString(board));

        solveSudoku(board);

        System.out.println("After solving:");
        System.out.println(Arrays.deepToString(board));
    }
}

```

</TabItem>

<TabItem value="c++" label="C++">

```c++
#include <iostream>
#include <vector>
using namespace std;

// LeetCode 37 - Sudoku Solver (Hard)
// This function solves a Sudoku puzzle using backtracking.

bool isValid(char n, int row, int col, vector<vector<char>>& board) {
    for (int i = 0; i < 9; i++) {
        if (board[row][i] == n) return false;  // Check row
        if (board[i][col] == n) return false;  // Check column
        if (board[3 * (row / 3) + i / 3][3 * (col / 3) + i % 3] == n) return false;  // Check 3x3 grid
    }
    return true;
}

// Main function to solve the Sudoku board
bool solveSudoku(vector<vector<char>>& board) {
    for (int row = 0; row < 9; row++) {
        for (int col = 0; col < 9; col++) {
            if (board[row][col] == '.') {  // Check if the current cell is empty
                for (char n = '1'; n <= '9'; n++) {
                    if (isValid(n, row, col, board)) {
                        board[row][col] = n;
                        if (solveSudoku(board)) return true;
                        board[row][col] = '.';  // Backtrack if no solution
                    }
                }
                return false;  // No valid number found
            }
        }
    }
    return true;  // Board is completely filled
}

int main() {
    vector<vector<char>> board = {
        {'5', '3', '.', '.', '7', '.', '.', '.', '.'},
        {'6', '.', '.', '1', '9', '5', '.', '.', '.'},
        {'.', '9', '8', '.', '.', '.', '.', '6', '.'},
        {'8', '.', '.', '.', '6', '.', '.', '.', '3'},
        {'4', '.', '.', '8', '.', '3', '.', '.', '1'},
        {'7', '.', '.', '.', '2', '.', '.', '.', '6'},
        {'.', '6', '.', '.', '.', '.', '2', '8', '.'},
        {'.', '.', '.', '4', '1', '9', '.', '.', '5'},
        {'.', '.', '.', '.', '8', '.', '.', '7', '9'}
    };

    cout << "Before solving:" << endl;
    for (auto row : board) {
        for (auto c : row) cout << c << " ";
        cout << endl;
    }

    solveSudoku(board);

    cout << "After solving:" << endl;
    for (auto row : board) {
        for (auto c : row) cout << c << " ";
        cout << endl;
    }

    return 0;
}


```

</TabItem>

</Tabs>
