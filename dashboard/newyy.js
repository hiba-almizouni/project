// Show Popup
document.getElementById("openPopup").addEventListener("click", function () {
    document.getElementById("popup").style.display = "flex";
});

// Close Popup
document.getElementById("closePopup").addEventListener("click", function () {
    document.getElementById("popup").style.display = "none";
});

// Cancel Button
document.getElementById("cancelButton").addEventListener("click", function () {
    document.getElementById("popup").style.display = "none";
});

// Add New Habit
document.getElementById("habitForm").addEventListener("submit", function (event) {
    event.preventDefault();

    // Get input values
    const habitName = document.getElementById("habitName").value;
    const goal = parseInt(document.getElementById("goal").value);
    const goalType = document.getElementById("goalType").value;
    const goalFrequency = document.getElementById("goalFrequency").value;

    // Create a new habit element
    const habitContainer = document.createElement("div");
    habitContainer.classList.add("habit-item");

    // Add habit content and initialize progress
    let progress = 0;

    habitContainer.innerHTML = `
        <span><strong>${habitName}</strong> - Goal: ${goal} ${goalType} (${goalFrequency})</span>
        <div class="habit-controls">
            <button class="increment-btn">+1</button>
            <span class="progress-counter">Completed: ${progress} of ${goal}</span>
            <button class="delete-btn">Remove</button>
        </div>
    `;

    // Increment button functionality
    const incrementButton = habitContainer.querySelector(".increment-btn");
    const progressCounter = habitContainer.querySelector(".progress-counter");

    incrementButton.addEventListener("click", function () {
        progress++;
        progressCounter.textContent = `Completed: ${progress} of ${goal}`;

        if (progress >= goal) {
            // Move to Completed Habits
            moveToCompleted(habitContainer, habitName);
        }
    });

    // Delete button functionality
    const deleteButton = habitContainer.querySelector(".delete-btn");
    deleteButton.addEventListener("click", function () {
        habitContainer.remove();
    });

    // Append to current habits container
    document.getElementById("habitsContainer").appendChild(habitContainer);

    // Close popup and reset form
    document.getElementById("popup").style.display = "none";
    document.getElementById("habitForm").reset();
});

// Function to move habit to Completed Habits
function moveToCompleted(habitContainer, habitName) {
    // Remove increment button from completed habit
    const completedContainer = habitContainer.cloneNode(true);
    completedContainer.querySelector(".increment-btn").remove();

    // Update text to show completion
    const textSpan = completedContainer.querySelector("span");
    textSpan.textContent = `${habitName} - Completed!`;

    // Remove the habit from the current list and add to completed list
    habitContainer.remove();
    document.getElementById("completedHabitsContainer").appendChild(completedContainer);
}