import { useState } from "react";

function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

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

  const toggleTask = (id) => {
    setTasks(
      tasks.map((item) =>
        item.id === id
          ? { ...item, completed: !item.completed }
          : item
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((item) => item.id !== id));
  };

  const clearTasks = () => {
    setTasks([]);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      addTask();
    }
  };

  const completedTasks = tasks.filter((task) => task.completed).length;
  const remainingTasks = tasks.length - completedTasks;

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-rose-50 to-pink-200">

      {/* HEADER */}
      <header className="bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 text-white shadow-lg">
        <div className="mx-auto max-w-5xl px-4 py-10 text-center">

          <div className="mb-3 text-5xl">
            🌸
          </div>

          <h1 className="text-4xl font-extrabold sm:text-5xl">
            My To-Do List
          </h1>

          <p className="mt-3 text-pink-100">
            Stay organized. Stay productive. 💕
          </p>

        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-8">

        {/* MAIN TODO CARD */}
        <section className="rounded-3xl border border-pink-100 bg-white p-6 shadow-xl sm:p-8">

          <div className="mb-6">
            <h2 className="text-2xl font-bold text-pink-700">
              Add a Task 💗
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              What would you like to accomplish today?
            </p>
          </div>

          {/* INPUT */}
          <div className="flex flex-col gap-3 sm:flex-row">

            <input
              type="text"
              value={task}
              onChange={(e) => setTask(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Enter your task..."
              className="flex-1 rounded-xl border-2 border-pink-200 bg-pink-50 px-4 py-3 outline-none transition placeholder:text-pink-300 focus:border-pink-500 focus:bg-white focus:ring-4 focus:ring-pink-100"
            />

            <button
              onClick={addTask}
              className="rounded-xl bg-pink-500 px-7 py-3 font-bold text-white shadow-md transition hover:bg-pink-600 hover:shadow-lg active:scale-95"
            >
              + Add Task
            </button>

          </div>

          {/* STATISTICS */}
          <div className="mt-6 grid grid-cols-3 gap-3">

            <div className="rounded-2xl border border-pink-100 bg-pink-50 p-4 text-center">
              <p className="text-2xl font-extrabold text-pink-600">
                {tasks.length}
              </p>

              <p className="text-sm text-gray-600">
                Total
              </p>
            </div>

            <div className="rounded-2xl border border-rose-100 bg-rose-50 p-4 text-center">
              <p className="text-2xl font-extrabold text-rose-500">
                {remainingTasks}
              </p>

              <p className="text-sm text-gray-600">
                Not Done
              </p>
            </div>

            <div className="rounded-2xl border border-green-100 bg-green-50 p-4 text-center">
              <p className="text-2xl font-extrabold text-green-500">
                {completedTasks}
              </p>

              <p className="text-sm text-gray-600">
                Done
              </p>
            </div>

          </div>

          {/* TASK LIST */}
          <div className="mt-8">

            <div className="mb-4 flex items-center justify-between">

              <h2 className="text-2xl font-bold text-pink-700">
                My Tasks 📝
              </h2>

              {tasks.length > 0 && (
                <button
                  onClick={clearTasks}
                  className="rounded-lg px-3 py-2 text-sm font-bold text-pink-500 transition hover:bg-pink-50 hover:text-pink-700"
                >
                  Clear All
                </button>
              )}

            </div>

            {/* EMPTY STATE */}
            {tasks.length === 0 ? (

              <div className="rounded-2xl border-2 border-dashed border-pink-200 bg-pink-50 py-14 text-center">

                <div className="text-6xl">
                  🌷
                </div>

                <h3 className="mt-4 text-lg font-bold text-pink-700">
                  No tasks yet
                </h3>

                <p className="mt-1 text-gray-500">
                  Add your first task above! 💕
                </p>

              </div>

            ) : (

              <div className="space-y-3">

                {tasks.map((item, index) => (

                  <div
                    key={item.id}
                    className={`flex flex-col gap-4 rounded-2xl border p-4 shadow-sm transition sm:flex-row sm:items-center sm:justify-between ${
                      item.completed
                        ? "border-green-200 bg-green-50"
                        : "border-pink-100 bg-pink-50"
                    }`}
                  >

                    {/* TASK INFO */}
                    <div className="flex items-start gap-3">

                      <div
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full font-bold ${
                          item.completed
                            ? "bg-green-500 text-white"
                            : "bg-pink-500 text-white"
                        }`}
                      >
                        {index + 1}
                      </div>

                      <div>

                        <p
                          className={`font-semibold ${
                            item.completed
                              ? "text-gray-400 line-through"
                              : "text-gray-800"
                          }`}
                        >
                          {item.text}
                        </p>

                        <span
                          className={`mt-2 inline-block rounded-full px-3 py-1 text-xs font-bold ${
                            item.completed
                              ? "bg-green-100 text-green-700"
                              : "bg-pink-100 text-pink-700"
                          }`}
                        >
                          {item.completed
                            ? "✓ Done"
                            : "○ Not Done"}
                        </span>

                      </div>

                    </div>

                    {/* BUTTONS */}
                    <div className="flex gap-2">

                      <button
                        onClick={() => toggleTask(item.id)}
                        className={`rounded-lg px-4 py-2 text-sm font-bold text-white shadow-sm transition active:scale-95 ${
                          item.completed
                            ? "bg-pink-400 hover:bg-pink-500"
                            : "bg-green-500 hover:bg-green-600"
                        }`}
                      >
                        {item.completed ? "Undo" : "Done"}
                      </button>

                      <button
                        onClick={() => deleteTask(item.id)}
                        className="rounded-lg bg-red-400 px-4 py-2 text-sm font-bold text-white shadow-sm transition hover:bg-red-500 active:scale-95"
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

        {/* USER GUIDE */}
        <section className="mt-8 rounded-3xl border border-pink-100 bg-white p-6 shadow-lg sm:p-8">

          <h2 className="text-2xl font-bold text-pink-700">
            📖 User Guide
          </h2>

          <div className="mt-5 grid gap-5 md:grid-cols-3">

            <div className="rounded-2xl border border-pink-100 bg-pink-50 p-5">
              <div className="text-4xl">➕</div>

              <h3 className="mt-3 font-bold text-pink-700">
                How to Add a Task
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-600">
                Type your task into the input box and click the
                <strong> Add Task </strong>
                button. You can also press Enter.
              </p>
            </div>

            <div className="rounded-2xl border border-green-100 bg-green-50 p-5">
              <div className="text-4xl">✅</div>

              <h3 className="mt-3 font-bold text-green-700">
                How to Mark Done
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-600">
                Click the <strong>Done</strong> button beside a task.
                Click <strong>Undo</strong> to change it back to
                Not Done.
              </p>
            </div>

            <div className="rounded-2xl border border-red-100 bg-red-50 p-5">
              <div className="text-4xl">🗑️</div>

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

        {/* REACT FEATURES */}
        <section className="mt-8 rounded-3xl bg-gradient-to-r from-pink-600 to-rose-600 p-6 text-white shadow-lg sm:p-8">

          <h2 className="text-2xl font-bold">
            ⚛️ React Features Used
          </h2>

          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

            <div className="rounded-2xl bg-white/15 p-4 backdrop-blur">
              <h3 className="font-bold text-pink-100">
                useState
              </h3>

              <p className="mt-1 text-sm text-pink-50">
                Manages tasks and input state.
              </p>
            </div>

            <div className="rounded-2xl bg-white/15 p-4 backdrop-blur">
              <h3 className="font-bold text-pink-100">
                Event Handling
              </h3>

              <p className="mt-1 text-sm text-pink-50">
                Handles button clicks and keyboard events.
              </p>
            </div>

            <div className="rounded-2xl bg-white/15 p-4 backdrop-blur">
              <h3 className="font-bold text-pink-100">
                Components
              </h3>

              <p className="mt-1 text-sm text-pink-50">
                React organizes the application interface.
              </p>
            </div>

            <div className="rounded-2xl bg-white/15 p-4 backdrop-blur">
              <h3 className="font-bold text-pink-100">
                Dynamic UI
              </h3>

              <p className="mt-1 text-sm text-pink-50">
                Tasks update immediately when changed.
              </p>
            </div>

          </div>

        </section>

      </main>

      {/* FOOTER */}
      <footer className="mt-8 bg-pink-900 px-4 py-7 text-center text-sm text-pink-200">

        <p className="font-semibold">
          🌸 DCIT 26 • Application Development and Emerging Technologies
        </p>

        <p className="mt-1">
          Laboratory 2 • React To-Do List
        </p>

        <p className="mt-3 text-pink-300">
          Made with React & Tailwind CSS 💕
        </p>

      </footer>

    </div>
  );
}

export default App;


