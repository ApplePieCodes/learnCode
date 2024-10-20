const ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNxcWt6d3JwbGtmdHlkc2d2cHB4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjkyNTE2NjcsImV4cCI6MjA0NDgyNzY2N30.Z5KKKTzk1DhjkYXh4ZVwOj51yJwqHttUkwrvgF7bAZQ"
const DB_URL = "https://sqqkzwrplkftydsgvppx.supabase.co"

async function checkIfLoggedIn(client: any) {
    const { data: { session }, error } = await client.auth.getSession();

    // Check if a session exists
    if (session) {
        // User is logged in, redirect to the dashboard
        window.location.href = "dash.html";
    }
}

function showError(fieldId: string, message: string) {
    var errorElement: HTMLElement = document.getElementById(fieldId) as HTMLElement;
    errorElement.innerText = message;
    errorElement.style.display = "block";
}

function clearErrors() {
    const errorFields = document.querySelectorAll('.help.is-danger');
    errorFields.forEach(function (field) {
        (field as HTMLElement).style.display = "none";
    });
}


function validateEmail(email: string) {
    var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}