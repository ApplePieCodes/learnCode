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
function loginUser() {
    return __awaiter(this, void 0, void 0, function* () {
        var emailInput = document.getElementById("email").value;
        var passwordInput = document.getElementById("password").value;
        clearErrors();
        var isValid = true;
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
        let { data, error } = yield client.auth.signInWithPassword({
            email: emailInput,
            password: passwordInput
        });
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
    });
}
