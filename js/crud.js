const formR = document.querySelector(".form");

formR.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(formR);
    const data = Object.fromEntries(formData);

    fetch("http://localhost:3000/js/crud", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            alertMessage();
        })
        .catch((err) => console.log(err));
});

function alertMessage() {
    alert("User Added Successfully!");
}
