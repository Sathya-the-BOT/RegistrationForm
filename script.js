// Array to store registrations
let registrations = [];

// Get references to DOM elements
const form = document.getElementById('registrationForm');
const tableBody = document.getElementById('registrationsTableBody');
const clearRegistrationsBtn = document.getElementById('clearRegistrationsBtn');

// Load existing registrations from localStorage on page load
document.addEventListener('DOMContentLoaded', () => {
    const savedRegistrations = localStorage.getItem('registrations');
    if (savedRegistrations) {
        registrations = JSON.parse(savedRegistrations);
        renderRegistrations();
    }
});

// Form submission event listener
form.addEventListener('submit', function(event) {
    event.preventDefault();

    // Collect form data
    const registration = {
        id: Date.now(), // Unique identifier
        fullName: document.getElementById('fullName').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        gender: document.getElementById('gender').value,
        course: document.getElementById('course').value
    };

    // Add registration to array
    registrations.push(registration);

    // Save to localStorage
    localStorage.setItem('registrations', JSON.stringify(registrations));

    // Render registrations
    renderRegistrations();

    // Reset the form
    this.reset();
});

// Function to render registrations in the table
function renderRegistrations() {
    // Clear existing table rows
    tableBody.innerHTML = '';

    // Populate table with registrations
    registrations.forEach((reg, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${reg.fullName}</td>
            <td>${reg.email}</td>
            <td>${reg.phone}</td>
            <td>${reg.gender}</td>
            <td>${reg.course}</td>
            <td>
                <button onclick="deleteRegistration(${reg.id})">Delete</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// Function to delete a registration
function deleteRegistration(id) {
    // Remove registration with matching id
    registrations = registrations.filter(reg => reg.id !== id);

    // Update localStorage
    localStorage.setItem('registrations', JSON.stringify(registrations));

    // Re-render the table
    renderRegistrations();
}

// Clear all registrations
clearRegistrationsBtn.addEventListener('click', () => {
    registrations = [];
    localStorage.removeItem('registrations');
    renderRegistrations();
});