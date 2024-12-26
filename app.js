function calculateTimeDifference() {
    let fromTime = document.getElementById("from-time").value;
    let toTime = document.getElementById("to-time").value;
  
    if (!fromTime || !toTime) {
      alert("Please enter both 'from' and 'to' times.");
      return;
    }
  
    let from = new Date(`1970-01-01T${fromTime}:00Z`);
    let to = new Date(`1970-01-01T${toTime}:00Z`);
  
    if (to < from) {
      to.setHours(to.getHours() + 24);
    }
  
    let diffMs = to - from;
    let durationPerDay = (diffMs / 1000 / 60 / 60).toFixed(2);
    console.log(durationPerDay);
  
    return durationPerDay;
  }
  
  let data = JSON.parse(localStorage.getItem("day")) || [];
  let main = document.getElementById("main");
  const form = document.getElementById("form");
  
  form.addEventListener("submit", (e) => {
    e.preventDefault();
  
    const date = new Date();
    const datePerDay = date.toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
    });
  
    const existingEntry = data.find((day) => day.date === datePerDay);
    if (existingEntry) {
      alert("You have already entered data for today.");
      return;
    }
  
    let incomePerDay = document.getElementById("incomeInput").value;
    let mileagePerDay = document.getElementById("mileageInput").value;
    let ratingPerDay = document.getElementById("ratingInput").value;
    let durationPerDay = calculateTimeDifference();
  
    const dayData = {
      date: datePerDay,
      income: incomePerDay,
      mileage: mileagePerDay,
      rating: ratingPerDay,
      duration: durationPerDay,
    };
  
    data.push(dayData);
  
    localStorage.setItem("day", JSON.stringify(data));
  
    runCode();
  
    document.getElementById("from-time").value = "";
    document.getElementById("to-time").value = "";
    document.getElementById("incomeInput").value = "";
    document.getElementById("mileageInput").value = "";
    document.getElementById("ratingInput").value = "";
  });
  
  function runCode() {
    main.innerHTML = "";
  
    const totalIncome = data.reduce((acc, day) => {
      return acc + parseFloat(day.income || 0);
    }, 0);
  
    console.log("Total Income: ", totalIncome);
  
    data.forEach((day) => {
      let card = document.createElement("div");
      card.classList.add("day");
  
      let dateElement = document.createElement("h2");
      dateElement.textContent = day.date;
      card.appendChild(dateElement);
  
      let incomeDiv = document.createElement("div");
      incomeDiv.classList.add("child");
      incomeDiv.innerHTML = `<p>Income:</p><p>${day.income}</p>`;
      card.appendChild(incomeDiv);
  
      let mileageDiv = document.createElement("div");
      mileageDiv.classList.add("child");
      mileageDiv.innerHTML = `<p>Mileage:</p><p>${day.mileage}</p>`;
      card.appendChild(mileageDiv);
  
      let durationDiv = document.createElement("div");
      durationDiv.classList.add("child");
      durationDiv.innerHTML = `<p>Duration:</p><p>${day.duration} HRS</p>`;
      card.appendChild(durationDiv);
  
      let starsDiv = document.createElement("div");
      starsDiv.classList.add("stars");
  
      let rating = parseInt(day.rating);
      for (let i = 0; i < rating; i++) {
        let star = document.createElement("i");
        star.classList.add("fa-solid", "fa-star");
        starsDiv.appendChild(star);
      }
  
      card.appendChild(starsDiv);
  
      main.appendChild(card);
    });
  }
  
  runCode();
  