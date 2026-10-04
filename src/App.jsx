import { useState } from "react";

function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  // Add a new task
  const addTask = () => {
    if (task.trim() === "") return;

    const newTask = {
      id: Date.now(),
      text: task,
      completed: false,
    };

    setTasks([...tasks, newTask]);
    setTask("");
  };

  // Mark task Done / Not Done
  const toggleTask = (id) => {
    setTasks(
      tasks.map((item) =>
        item.id === id
          ? { ...item, completed: !item.completed }
          : item
      )
    );
  };

  // Delete task
  const deleteTask = (id) => {
    setTasks(tasks.filter((item) => item.id !== id));
  };

  // Clear all tasks
  const clearTasks = () => {
    setTasks([]);
  };

  // Allow Enter key to add a task
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      addTask();
    }
  };

  const completedTasks = tasks.filter((task) => task.completed).length;
  const remainingTasks = tasks.length - completedTasks;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg">
        <div className="mx-auto max-w-5xl px-4 py-8 text-center">
          <h1 className="text-4xl font-bold sm:text-5xl">
            My To-Do List
          </h1>

          <p className="mt-2 text-blue-100">
            Stay organized. Stay productive.
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-8">

        {/* Main To-Do Card */}
        <section className="rounded-2xl bg-white p-6 shadow-xl sm:p-8">

          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              Add a Task
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Enter a task below and add it to your list.
            </p>
          </div>

          {/* Input */}
          <div className="flex flex-col gap-3 sm:flex-row">
            <input
              type="text"
              value={task}
              onChange={(e) => setTask(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="What do you need to do?"
              className="flex-1 rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            />

            <button
              onClick={addTask}
              className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 active:scale-95"
            >
              + Add Task
            </button>
          </div>

          {/* Statistics */}
          <div className="mt-6 grid grid-cols-3 gap-3">
            <div className="rounded-xl bg-blue-50 p-4 text-center">
              <p className="text-2xl font-bold text-blue-600">
                {tasks.length}
              </p>
              <p className="text-sm text-gray-600">Total</p>
            </div>

            <div className="rounded-xl bg-yellow-50 p-4 text-center">
              <p className="text-2xl font-bold text-yellow-600">
                {remainingTasks}
              </p>
              <p className="text-sm text-gray-600">Not Done</p>
            </div>

            <div className="rounded-xl bg-green-50 p-4 text-center">
              <p className="text-2xl font-bold text-green-600">
                {completedTasks}
              </p>
              <p className="text-sm text-gray-600">Done</p>
            </div>
          </div>

          {/* Task List */}
          <div className="mt-8">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-800">
                My Tasks
              </h2>

              {tasks.length > 0 && (
                <button
                  onClick={clearTasks}
                  className="text-sm font-semibold text-red-500 hover:text-red-700"
                >
                  Clear All
                </button>
              )}
            </div>

            {tasks.length === 0 ? (
              <div className="rounded-xl border-2 border-dashed border-gray-200 py-12 text-center">
                <div className="text-5xl">📝</div>

                <h3 className="mt-4 text-lg font-semibold text-gray-700">
                  No tasks yet
                </h3>

                <p className="mt-1 text-gray-500">
                  Add your first task above.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {tasks.map((item, index) => (
                  <div
                    key={item.id}
                    className={`flex flex-col gap-4 rounded-xl border p-4 transition sm:flex-row sm:items-center sm:justify-between ${
                      item.completed
                        ? "border-green-200 bg-green-50"
                        : "border-gray-200 bg-gray-50"
                    }`}
                  >
                    {/* Task information */}
                    <div className="flex items-start gap-3">
                      <div
                        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full font-bold ${
                          item.completed
                            ? "bg-green-500 text-white"
                            : "bg-blue-100 text-blue-600"
                        }`}
                      >
                        {index + 1}
                      </div>

                      <div>
                        <p
                          className={`font-medium ${
                            item.completed
                              ? "text-gray-400 line-through"
                              : "text-gray-800"
                          }`}
                        >
                          {item.text}
                        </p>

                        <span
                          className={`mt-1 inline-block rounded-full px-3 py-1 text-xs font-semibold ${
                            item.completed
                              ? "bg-green-100 text-green-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {item.completed ? "Done" : "Not Done"}
                        </span>
                      </div>
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-2">
                      <button
                        onClick={() => toggleTask(item.id)}
                        className={`rounded-lg px-4 py-2 text-sm font-semibold text-white transition ${
                          item.completed
                            ? "bg-yellow-500 hover:bg-yellow-600"
                            : "bg-green-500 hover:bg-green-600"
                        }`}
                      >
                        {item.completed ? "Undo" : "Done"}
                      </button>

                      <button
                        onClick={() => deleteTask(item.id)}
                        className="rounded-lg bg-red-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* User Guide */}
        <section className="mt-8 rounded-2xl bg-white p-6 shadow-lg sm:p-8">
          <h2 className="text-2xl font-bold text-gray-800">
            📖 User Guide
          </h2>

          <div className="mt-5 grid gap-5 md:grid-cols-3">

            <div className="rounded-xl bg-blue-50 p-5">
              <div className="text-3xl">➕</div>

              <h3 className="mt-3 font-bold text-blue-700">
                How to Add a Task
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-600">
                Type your task into the input box and click the
                <strong> Add Task </strong>
                button. You can also press Enter.
              </p>
            </div>

            <div className="rounded-xl bg-green-50 p-5">
              <div className="text-3xl">✅</div>

              <h3 className="mt-3 font-bold text-green-700">
                How to Mark Done
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-600">
                Click the <strong>Done</strong> button beside a task.
                Click <strong>Undo</strong> to change it back to
                Not Done.
              </p>
            </div>

            <div className="rounded-xl bg-red-50 p-5">
              <div className="text-3xl">🗑️</div>

              <h3 className="mt-3 font-bold text-red-700">
                How to Delete
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-600">
                Click the red <strong>Delete</strong> button beside
                the task you want to remove.
              </p>
            </div>

          </div>
        </section>

        {/* React Features */}
        <section className="mt-8 rounded-2xl bg-gray-900 p-6 text-white shadow-lg sm:p-8">
          <h2 className="text-2xl font-bold">
            ⚛️ React Features Used
          </h2>

          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

            <div className="rounded-xl bg-white/10 p-4">
              <h3 className="font-bold text-blue-300">
                useState
              </h3>

              <p className="mt-1 text-sm text-gray-300">
                Manages tasks and input state.
              </p>
            </div>

            <div className="rounded-xl bg-white/10 p-4">
              <h3 className="font-bold text-green-300">
                Event Handling
              </h3>

              <p className="mt-1 text-sm text-gray-300">
                Handles button clicks and keyboard events.
              </p>
            </div>

            <div className="rounded-xl bg-white/10 p-4">
              <h3 className="font-bold text-purple-300">
                Components
              </h3>

              <p className="mt-1 text-sm text-gray-300">
                React is used to organize the interface.
              </p>
            </div>

            <div className="rounded-xl bg-white/10 p-4">
              <h3 className="font-bold text-yellow-300">
                Dynamic UI
              </h3>

              <p className="mt-1 text-sm text-gray-300">
                Tasks update immediately when changed.
              </p>
            </div>

          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="mt-8 bg-gray-900 px-4 py-6 text-center text-sm text-gray-400">
        <p>
          DCIT 26 • Application Development and Emerging Technologies
        </p>

        <p className="mt-1">
          Laboratory 2 • React To-Do List
        </p>
      </footer>
    </div>
  );
}

export default App;

