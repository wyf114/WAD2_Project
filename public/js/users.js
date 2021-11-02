// Check login status
function checkLoginStatus() {
    if (sessionStorage.getItem("login_status") == null) {
        window.location.href = 'index.html';
        // alert("You have not logged in yet.")
    }
}

// Logout
function logout() {
    sessionStorage.clear("login_status")
    checkLoginStatus()
}