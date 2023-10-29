document.getElementById("MyButton").addEventListener("click",function(){
    var enteredPassword= document.getElementById("password").value;
    var correctPassword="1234"
    if (enteredPassword === correctPassword) {
        document.getElementById("message").textContent="Redirecting to another page..."
        window.location.href = "https://chat.openai.com";
    } else {
        document.getElementById("message").textContent="Incorrect Password. Try Again"
    }

})