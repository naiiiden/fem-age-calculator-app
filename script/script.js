document.querySelector(".form-submit-button").addEventListener("click", (e) => {
    e.preventDefault();

    const dayOfBirth = parseInt(document.getElementById("day-input").value);
    const monthOfBirth = parseInt(document.getElementById("month-input").value);
    const yearOfBirth = parseInt(document.getElementById("year-input").value);

    if (isNaN(dayOfBirth) || isNaN(monthOfBirth) || isNaN(yearOfBirth)) {
        document.querySelectorAll(".error").forEach(error => {
            error.textContent = "This field is required";
        });
        document.querySelectorAll("input").forEach(input => {
            input.style.borderColor = "#ff5757";
        });
        return;
    } else {
        document.querySelectorAll(".error").forEach(error => {
            error.textContent = "";
        });
        document.querySelectorAll("input").forEach(input => {
            input.style.borderColor = "#dbdbdb";
        });
    }

    // Validate the input
    const maxDaysInMonth = new Date(yearOfBirth, monthOfBirth, 0).getDate();
    if (isNaN(dayOfBirth) || dayOfBirth < 1 || dayOfBirth > maxDaysInMonth || isNaN(monthOfBirth) || monthOfBirth < 1 || monthOfBirth > 12 || isNaN(yearOfBirth)) {
        document.querySelector(".day-error").textContent = "Must be a valid date";
        document.querySelectorAll("input").forEach(input => {
            input.style.borderColor = "#ff5757";
        });
        return;
    } else {
        document.querySelector(".day-error").textContent = "";
        document.querySelectorAll("input").forEach(input => {
            input.style.borderColor = "#dbdbdb";
        });
    }

    const currentYear = new Date().getFullYear();
    if (yearOfBirth > currentYear) {
        document.querySelector(".year-error").textContent = "Must be in the past";
        document.getElementById("year-input").style.borderColor = "#ff5757";
        return;
    } else {
        document.querySelector(".year-error").textContent = "";
        document.getElementById("year-input").style.borderColor = "#dbdbdb";
    }

    // Create a Date object for the user's birthdate
    const birthdate = new Date(yearOfBirth, monthOfBirth - 1, dayOfBirth);
    const currentDate = new Date();

    // Convert the difference to years, months, and days
    let differenceInYears = currentDate.getFullYear() - birthdate.getFullYear();
    let differenceInMonths = currentDate.getMonth() - birthdate.getMonth();
    let differenceInDays = currentDate.getDate() - birthdate.getDate();

    // Adjust years, months, and days if needed
    if (differenceInMonths < 0 || (differenceInMonths === 0 && differenceInDays < 0)) {
        differenceInYears--;
        differenceInMonths += 12;
        if (differenceInDays < 0) {
            const maxDaysInLastMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0).getDate();
            differenceInDays += maxDaysInLastMonth;
            differenceInMonths--;
        }
    }

    document.querySelector(".years-number").textContent = differenceInYears;
    document.querySelector(".months-number").textContent = differenceInMonths;
    document.querySelector(".days-number").textContent = differenceInDays;
});