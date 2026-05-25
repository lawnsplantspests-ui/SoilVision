const API_URL = "https://script.google.com/macros/s/AKfycbwfq-yRmIKjYUKT6JAW0WrKPz6m8sF5A0Z_GLcorMdb9Fa2ORT3oR8W1lpHJaNNLqVDIg/exec";

document
  .getElementById("soilForm")
  .addEventListener("submit", async function(e) {

    e.preventDefault();

    const data = {
      customer_id: document.getElementById("customer_id").value,
      sample_date: document.getElementById("sample_date").value,
      field_id: document.getElementById("field_id").value,
      ph: document.getElementById("ph").value,
      phosphorus: document.getElementById("phosphorus").value,
      potassium: document.getElementById("potassium").value,
      acidity: document.getElementById("acidity").value,
      cec: document.getElementById("cec").value,
      calcium: document.getElementById("calcium").value,
      magnesium: document.getElementById("magnesium").value,
      lime_rec: document.getElementById("lime_rec").value,
      nitrogen_rec: document.getElementById("nitrogen_rec").value,
      notes: document.getElementById("notes").value
    };

    try {

      const response = await fetch(API_URL, {
        method: "POST",
        body: JSON.stringify(data)
      });

      const result = await response.json();

      document.getElementById("status").innerText =
        result.message;

      document.getElementById("soilForm").reset();

    } catch(error) {

      document.getElementById("status").innerText =
        "Error saving sample.";

      console.error(error);
    }

});
