## **README**

### **Project: Task Management API**

**Overview:**
This project implements a RESTful API for managing tasks using an in-memory data store. The API provides endpoints for creating, reading, updating, and deleting (CRUD) tasks.

**Endpoints:**

**GET /tasks:**
- Retrieves a list of all tasks.
- Supports filtering by completion status (`?completed=true`) and sorting by creation date.

**GET /tasks/:id:**
- Retrieves a specific task by its ID.

**POST /tasks:**
- Creates a new task.
- Requires `title`, `description`, and `completed` fields.
- Supports setting the `priority` field.

**PUT /tasks/:id:**
- Updates an existing task by its ID.
- Allows modifying `title`, `description`, `completed`, and `priority`.

**DELETE /tasks/:id:**
- Deletes a task by its ID.

**Error Handling:**
- Returns appropriate HTTP status codes for errors:
  - 404: Not Found (for non-existent task IDs)
  - 400: Bad Request (for invalid input or missing required fields)

**Data Structure:**
- Tasks are stored in an in-memory array.
- Each task object has the following properties:
  - `id` (unique identifier)
  - `title`
  - `description`
  - `completed` (boolean)
  - `priority` (optional, default: "low")

**Testing:**
- The API should be tested using tools like Postman or curl to ensure proper functionality and error handling.

**Future Enhancements:**
- Implement a more persistent data storage solution (e.g., database).
- Add authentication and authorization.
- Implement pagination for large result sets.

**Installation and Usage:**
- **Prerequisites:**
  - Node.js and npm (or yarn)
- **Installation:**
  1. Clone the repository.
  2. Run `npm install` (or `yarn install`) to install dependencies.
- **Running the server:**
  1. Start the server using `npm start` (or `yarn start`).
- **Testing:**
  1. Use Postman or curl to send requests to the API endpoints.

**Example Request (using curl):**
```bash
curl -X POST http://localhost:3000/tasks -H "Content-Type: application/json" -d '{"title": "Complete homework", "description": "Finish math assignment", "completed": false}'