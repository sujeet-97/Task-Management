# Self-Evaluation Document

**Half-Page Summary**
This project is a simple Task Management Kanban Board built with ReactJS. It allows users to view, create, and organize tasks into three categories: To Do, In Progress, and Done.
Users can create new tasks through a modal form and move tasks between columns via drag and drop.
Task data is fetched from a mock API (JSONPlaceholder), and updates like creating or moving tasks simulate API interaction.
The project successfully demonstrates basic CRUD (Create, Read, Update) operations along with a user-friendly interface.


# Self-Criticism
**Task Status Representation:**
Currently, tasks are categorized mainly by the completed field (true/false), making the "In Progress" state artificial rather than dynamic. This would not scale well for a real-world Kanban board.

Component Modularity:
The code structure could be improved by breaking the large KanbanBoard component into smaller reusable components (e.g., TaskCard, Column, TaskModal).

Error Handling:
There is minimal error handling for API calls. Failed fetches or validation errors (like empty title fields) should be shown properly to users.

Styling and Responsiveness:
The UI is basic and not mobile-responsive. Some transitions or hover effects would improve the user experience significantly.

Drag and Drop Library:
Since react-beautiful-dnd isn't compatible with React 18, I used an alternative (@hello-pangea/dnd), but deeper customizations (like smooth reordering or transition effects) were not added.

**Improvements (If More Time Was Available)**
Better Status Management:
Add a real status field (todo, inProgress, done) for each task, rather than relying only on completed.

UI/UX Enhancements:
Add better modals, task editing capabilities, confirmation dialogs, animations, and mobile responsiveness.

Reusable Components:
Refactor the project into smaller components for better readability, reusability, and maintainability.

API Expansion:
Implement a local mock server using json-server to allow full control over task creation, update, and deletion with a real database (even if local).

Validation & Notifications:
Add input validations and show success/error notifications after task creation, updates, or API failures.


**Technology	Rating (/10)	Reason**
ReactJS	8/10	Good command but can improve component modularization and hooks management.
CSS Styling	7/10	Basic styling is clear, but lacks mobile responsiveness and modern UI elements.
Drag & Drop (dnd)	7/10	Good understanding, but deeper customization can be improved.
API Integration (REST)	9/10	Confident with fetch, API handling, and data manipulation.
Project Architecture	7/10	Simple and functional, but needs better component decomposition.