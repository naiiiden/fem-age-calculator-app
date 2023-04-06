document.querySelector(".form-submit-button").addEventListener("click", (e) => {
    e.preventDefault();

    const dayOfBirth = document.getElementById("day-input").value;
    const monthOfBirth = document.getElementById("month-input").value;
    const yearOfBirth = document.getElementById("year-input").value;

    let isValid = true;

    // Validate day input
    const maxDaysInMonth = new Date(yearOfBirth, monthOfBirth, 0).getDate();
    if (dayOfBirth === "") {
        document.querySelector("#day-input").style.borderColor = "#ff5757";
        document.querySelector(".day-error").textContent = "This field is required";
        isValid = false;
    } else if (dayOfBirth <= 0 || dayOfBirth > maxDaysInMonth) {
        document.querySelector("#day-input").style.borderColor = "#ff5757";
        document.querySelector(".day-error").textContent = "Must be a valid day";
        isValid = false;
    } else {
        document.querySelector("#day-input").style.borderColor = "#dbdbdb";
        document.querySelector(".day-error").textContent = "";
    }

    // Validate month input
    if (monthOfBirth === "") {
        document.querySelector("#month-input").style.borderColor = "#ff5757";
        document.querySelector(".month-error").textContent = "This field is required";
        isValid = false;
    } else if (monthOfBirth <= 0 || monthOfBirth > 12) {
        document.querySelector("#month-input").style.borderColor = "#ff5757";
        document.querySelector(".month-error").textContent = "Must be a valid month";
        isValid = false;
    } else {
        document.querySelector("#month-input").style.borderColor = "#dbdbdb";
        document.querySelector(".month-error").textContent = "";
    }

    // Validate year input
    if (yearOfBirth === "") {
        document.querySelector("#year-input").style.borderColor = "#ff5757";
        document.querySelector(".year-error").textContent = "This field is required";
        isValid = false;
    } else if (yearOfBirth >= new Date().getFullYear()) {
        document.querySelector("#year-input").style.borderColor = "#ff5757";
        document.querySelector(".year-error").textContent = "Must be in the past";
        isValid = false;
    } else if (yearOfBirth < 0) {
        document.querySelector("#year-input").style.borderColor = "#ff5757";
        document.querySelector(".year-error").textContent = "Must be positive";
        isValid = false;
    } else {
        document.querySelector("#year-input").style.borderColor = "#dbdbdb";
        document.querySelector(".year-error").textContent = "";
    }

    // If all inputs are valid, calculate the age
    if (isValid) {
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

        document.querySelector(".dates-container").setAttribute("aria-label", `You are ${differenceInYears} years, ${differenceInMonths} months and ${differenceInDays} ${differenceInDays > 1 || differenceInDays == 0 ? 'days' : 'day'} old`);

        let currentYears = 0;
        let currentMonths = 0;
        let currentDays = 0;

        // Set the final value of the age numbers
        const finalYears = differenceInYears;
        const finalMonths = differenceInMonths;
        const finalDays = differenceInDays;

        // Use setInterval to increment the age numbers
        const intervalId = setInterval(() => {
            if (currentYears < finalYears) {
                currentYears++;
                document.querySelector(".years-number").textContent = currentYears;
            }
            if (currentMonths < finalMonths) {
                currentMonths++;
                document.querySelector(".months-number").textContent = currentMonths;
            }
            if (currentDays < finalDays) {
                currentDays++;
                document.querySelector(".days-number").textContent = currentDays;
            }

            // Stop the interval when all age numbers have reached their final value
            if (currentYears === finalYears && currentMonths === finalMonths && currentDays === finalDays) {
                clearInterval(intervalId);
            }
        }, 10);
    }
});