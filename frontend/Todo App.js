
let btna = document.querySelector("button");
let inp = document.querySelector("input");
let ol = document.querySelector("ol");

// 🌐 Backend API URL
const API_URL = "http://localhost:5000/api/tasks";

// -------------------
// 1️⃣ Load tasks from backend when page loads
// -------------------
window.addEventListener("DOMContentLoaded", async () => {
    try {
        const res = await fetch(API_URL);
        const tasks = await res.json();

        tasks.forEach(task => {
            addTaskToUI(task.title, task._id);
        });
    } catch (err) {
        console.error("❌ Error loading tasks:", err);
    }
});

// -------------------
// 2️⃣ Function to add task element to UI
// -------------------
function addTaskToUI(title, id) {
    const li = document.createElement("li");
    const delBtn = document.createElement("button");

    li.classList.add("d-flex", "justify-content-between", "align-items-center", "mb-2", "list-group-item");
    li.textContent = title;

    delBtn.textContent = "Delete";
    delBtn.classList.add("btn", "btn-danger", "btn-sm");
    delBtn.addEventListener("click", async function () {
        try {
            await fetch(`${API_URL}/${id}`, { method: "DELETE" });
            li.remove();
        } catch (err) {
            console.error("❌ Error deleting task:", err);
        }
    });

    li.appendChild(delBtn);
    ol.appendChild(li);
}

// -------------------
// 3️⃣ Add new task (frontend + backend)
// -------------------
btna.addEventListener("click", async function () {
    const text = inp.value.trim();
    if (!text) return;
    inp.value = "";

    // Add to UI immediately (optional)
    // addTaskToUI(text, null);

    try {
        const res = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title: text }), // ✅ matches backend model
        });
        const newTask = await res.json();
        addTaskToUI(newTask.title, newTask._id);
    } catch (err) {
        console.error("❌ Error saving task:", err);
    }
});
