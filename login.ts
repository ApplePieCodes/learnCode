var client = supabase.createClient(DB_URL, ANON_KEY)

checkIfLoggedIn(client);

async function loginUser() {
    var emailInput: string = (document.getElementById("email") as HTMLInputElement).value;
    var passwordInput: string = (document.getElementById("password") as HTMLInputElement).value;

    clearErrors();

    var isValid: Boolean = true;

    if (!emailInput || emailInput === "") {
        showError("email-error", "You must enter an email.");
        isValid = false;
    }

    if (!validateEmail(emailInput)) {
        showError("email-error", "You must enter a valid email.");
        isValid = false;
    }

    if (!passwordInput || passwordInput === "") {
        showError("password-error", "You must enter a password");
        isValid = false;
    }

    if (!isValid) {
        return;
    }

    console.log(passwordInput);

    let { data, error } = await client.auth.signInWithPassword({
        email: emailInput,
        password: passwordInput
    })

    if (error) {
        if (error.code === "invalid_credentials") {
            showError("password-error", "Incorrect Email or Password");
            return;
        }
        else {
            showError("password-error", "An Error Occured");
        }
    }
    else {
        window.location.href = "dash.html";
    }
}