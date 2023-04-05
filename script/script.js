document.querySelector(".form-submit-button").addEventListener("click", (e) => {
    e.preventDefault();

    const dayOfBirth = document.getElementById("day-input").value;
    const monthOfBirth = document.getElementById("month-input").value;
    const yearOfBirth = document.getElementById("year-input").value;
    
    // Create a Date object for the user's birthdate
    const birthdate = new Date(yearOfBirth, monthOfBirth - 1, dayOfBirth);
    
    // Get the current date
    const currentDate = new Date();
    
    // Calculate the difference between the two dates in milliseconds
    const differenceInMilliseconds = currentDate.getTime() - birthdate.getTime();
    
    // Convert the difference to years, months, and days
    const differenceInYears = Math.floor(differenceInMilliseconds / (1000 * 60 * 60 * 24 * 365.25));
    const differenceInMonths = Math.floor((differenceInMilliseconds / (1000 * 60 * 60 * 24 * 30.44)) % 12);
    const differenceInDays = Math.floor((differenceInMilliseconds / (1000 * 60 * 60 * 24)) % 30.44);

    document.querySelector(".years-number").textContent = differenceInYears;
    document.querySelector(".months-number").textContent = differenceInMonths;
    document.querySelector(".days-number").textContent = differenceInDays;
});