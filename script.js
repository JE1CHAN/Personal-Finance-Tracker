// --- TEMPLATE LOGIC ---
let transactions = [
  {
    id: 1,
    desc: "Monthly Salary",
    amount: 3000.0,
    type: "income",
    category: "Salary",
    date: "2023-10-01",
  },
  {
    id: 2,
    desc: "Grocery Store",
    amount: 150.25,
    type: "expense",
    category: "Food",
    date: "2023-10-02",
  },
  {
    id: 3,
    desc: "Netflix Subscription",
    amount: 14.99,
    type: "expense",
    category: "Entertainment",
    date: "2023-10-05",
  },
];

// 1. Initial Render
document.addEventListener("DOMContentLoaded", () => {
  renderList();
  updateSummary();
});

// 2. Handle Form Submit
document.getElementById("transaction-form").addEventListener("submit", (e) => {
  e.preventDefault();

  // Get values from inputs
  const desc = document.getElementById("desc").value;
  const amount = parseFloat(document.getElementById("amount").value);
  const type = document.getElementById("type").value;
  const categorySelect = document.getElementById("category");
  const categoryName =
    categorySelect.options[categorySelect.selectedIndex].text;

  // Create new object
  const newTransaction = {
    id: Date.now(), // temporary ID
    desc: desc,
    amount: amount,
    type: type,
    category: categoryName,
    date: new Date().toISOString().split("T")[0],
  };

  // Add to array (In real app: Send POST request to MySQL here)
  transactions.unshift(newTransaction);

  // Clear inputs
  document.getElementById("desc").value = "";
  document.getElementById("amount").value = "";

  // Update UI
  renderList();
  updateSummary();
});

// 3. Render the Table
function renderList() {
  const listEl = document.getElementById("transaction-list");
  const emptyState = document.getElementById("empty-state");

  listEl.innerHTML = "";

  if (transactions.length === 0) {
    emptyState.classList.remove("hidden");
    return;
  } else {
    emptyState.classList.add("hidden");
  }

  transactions.forEach((t) => {
    const row = document.createElement("tr");

    // Color logic
    const amountClass =
      t.type === "income" ? "text-emerald-600" : "text-rose-600";
    const sign = t.type === "income" ? "+" : "-";

    // Category badge colors
    const badgeColors = {
      Food: "bg-orange-100 text-orange-800",
      Salary: "bg-green-100 text-green-800",
      Rent: "bg-red-100 text-red-800",
      Utilities: "bg-blue-100 text-blue-800",
      Entertainment: "bg-purple-100 text-purple-800",
    };
    const badgeClass = badgeColors[t.category] || "bg-gray-100 text-gray-800";

    row.innerHTML = `
                    <td class="px-6 py-4 whitespace-nowrap">
                        <div class="text-sm font-medium text-gray-900">${t.desc}</div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                        <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${badgeClass}">
                            ${t.category}
                        </span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        ${t.date}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-bold ${amountClass}">
                        ${sign}$${t.amount.toFixed(2)}
                    </td>
                `;
    listEl.appendChild(row);
  });
}

// 4. Update Math
function updateSummary() {
  let income = 0;
  let expense = 0;

  transactions.forEach((t) => {
    if (t.type === "income") income += t.amount;
    else expense += t.amount;
  });

  document.getElementById("display-income").textContent =
    `$${income.toFixed(2)}`;
  document.getElementById("display-expense").textContent =
    `$${expense.toFixed(2)}`;
  document.getElementById("display-balance").textContent =
    `$${(income - expense).toFixed(2)}`;
}

function clearList() {
  if (confirm("Are you sure you want to clear the list?")) {
    transactions = [];
    renderList();
    updateSummary();
  }
}
