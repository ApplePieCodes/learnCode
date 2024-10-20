"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var client = supabase.createClient(DB_URL, ANON_KEY);
checkIfLoggedIn(client);
function registerUser() {
    return __awaiter(this, void 0, void 0, function* () {
        var usernameInput = document.getElementById("username").value;
        var emailInput = document.getElementById("email").value;
        var passwordInput = document.getElementById("password").value;
        var confirmPasswordInput = document.getElementById("confirmPassword").value;
        var agreeNoHackInput = document.getElementById("noHack").checked;
        var agreeNewsletterInput = document.getElementById("newsletter").checked;
        clearErrors();
        var isValid = true;
        if (!usernameInput || usernameInput === "") {
            showError("username-error", "You must enter a username.");
            isValid = false;
        }
        var { data, error } = yield client
            .from("UserData")
            .select("*")
            .eq("username", usernameInput)
            .single();
        if (error && error.code !== 'PGRST116') { // PGRST116 is "No rows found"
            console.error("Supabase Query Error:", error.message);
            return;
        }
        if (data) {
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
        var { data, error } = yield client
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
        var { data, error } = yield client
            .from("UserData")
            .insert([
            { email: emailInput, username: usernameInput, newsletter: agreeNewsletterInput, xp: 0, level: 1 },
        ])
            .select();
        if (error) {
            console.log(error);
            return;
        }
        var { data, error } = yield client.auth.signUp({
            email: emailInput,
            password: passwordInput
        });
        if (error) {
            console.log(error);
            return;
        }
        window.location.href = "registered.html";
    });
}
