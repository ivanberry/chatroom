### 
- When to use serial flow control
- How to implement serial flow control
- How to implement parallel flow control
- How to leverage third-party modules for flow control

#### When to use serial flow control

In order to execute a number of asynchronous tasks in sequece, you could use callbacks. but if you have a significant number of tasks, you should organize them, or you'll end up with messy code due to excessive callback nesting.

