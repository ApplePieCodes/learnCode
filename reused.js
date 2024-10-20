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
const ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNxcWt6d3JwbGtmdHlkc2d2cHB4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjkyNTE2NjcsImV4cCI6MjA0NDgyNzY2N30.Z5KKKTzk1DhjkYXh4ZVwOj51yJwqHttUkwrvgF7bAZQ";
const DB_URL = "https://sqqkzwrplkftydsgvppx.supabase.co";
function checkIfLoggedIn(client) {
    return __awaiter(this, void 0, void 0, function* () {
        const { data: { session }, error } = yield client.auth.getSession();
        // Check if a session exists
        if (session) {
            // User is logged in, redirect to the dashboard
            window.location.href = "dash.html";
        }
    });
}
function showError(fieldId, message) {
    var errorElement = document.getElementById(fieldId);
    errorElement.innerText = message;
    errorElement.style.display = "block";
}
function clearErrors() {
    const errorFields = document.querySelectorAll('.help.is-danger');
    errorFields.forEach(function (field) {
        field.style.display = "none";
    });
}
function validateEmail(email) {
    var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}
