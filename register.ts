var client = supabase.createClient(DB_URL, ANON_KEY)

checkIfLoggedIn(client);

async function registerUser() {
    var usernameInput: string = (document.getElementById("username") as HTMLInputElement).value;
    var emailInput: string = (document.getElementById("email") as HTMLInputElement).value;
    var passwordInput: string = (document.getElementById("password") as HTMLInputElement).value;
    var confirmPasswordInput: string = (document.getElementById("confirmPassword") as HTMLInputElement).value;
    var agreeNoHackInput: Boolean = (document.getElementById("noHack") as HTMLInputElement).checked;
    var agreeNewsletterInput: Boolean = (document.getElementById("newsletter") as HTMLInputElement).checked;

    clearErrors();

    var isValid = true;

    if (!usernameInput || usernameInput === "") {
        showError("username-error", "You must enter a username.");
        isValid = false;
    }

    var { data, error } = await client
        .from("UserData")
        .select("*")
        .eq("username", usernameInput);

    if (error) {
        console.log(error);
        return;
    }

    if (data.length > 0) {
        showError("username-error", "User with this username already exists");
        return;
    }

    if (!emailInput || emailInput === "") {
        showError("email-error", "You must enter an email.");
        isValid = false;
    }

    if (!validateEmail(emailInput)) {
        showError("email-error", "You must enter a valid email.");
        isValid = false;
    }

    var { data, error } = await client
        .from("UserData")
        .select("*")
        .eq("email", emailInput);

    if (error) {
        console.log(error);
        return;
    }

    if (data.length > 0) {
        showError("email-error", "User with this email already exists");
        return;
    }

    if (!passwordInput || passwordInput === "") {
        showError("password-error", "You must enter a password");
        isValid = false;
    }

    var security = 0;

    if (passwordInput.length >= 6) {
        security += 2;
    }

    if (/[0-9]/.test(passwordInput)) {
        security += 1;
    }

    if (/[a-z]/.test(passwordInput)) {
        security += 1;
    }

    if (/[A-Z]/.test(passwordInput)) {
        security += 1;
    }

    if (/[^a-zA-Z0-9\s]/.test(passwordInput)) {
        security += 1;
    }

    if (security < 4) {
        showError("password-error", "Your password is not secure enough. Try using uppercase and lowercase letters, numbers, and special symbols");
        isValid = false;
    }
    
    if (!confirmPasswordInput || confirmPasswordInput === "") {
        showError("confirmPassword-error", "You must confirm your password.");
        isValid = false;
    }

    if (!agreeNoHackInput) {
        showError("agreeNoHack-error", "You must check this box.");
        isValid = false;
    }

    if (!isValid) {
        return;
    }

    var { data, error } = await client
        .from("UserData")
        .insert([
            { email: emailInput, username: usernameInput, newsletter: agreeNewsletterInput, xp: 0, level: 1 },
        ])
        .select()

    if (error) {
        console.log(error);
        return;
    }

    var { data, error } = await client.auth.signUp({
        email: emailInput,
        password: passwordInput
    })

    if (error) {
        console.log(error);
        return;
    }

    window.location.href = "registered.html";
}