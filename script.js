const API_URL = "https://script.google.com/macros/s/AKfycbwfq-yRmIKjYUKT6JAW0WrKPz6m8sF5A0Z_GLcorMdb9Fa2ORT3oR8W1lpHJaNNLqVDIg/exec";

document
  .getElementById("soilForm")
  .addEventListener("submit", async function(e) {

    e.preventDefault();

    const data = {

      customer_id:
        document.getElementById("customer_id").value,

      sample_date:
        document.getElementById("sample_date").value,

      field_id:
        document.getElementById("field_id").value,

      ph:
        document.getElementById("ph").value,

      phosphorus:
        document.getElementById("phosphorus").value,

      potassium:
        document.getElementById("potassium").value,

      acidity:
        document.getElementById("acidity").value,

      cec:
        document.getElementById("cec").value,

      calcium:
        document.getElementById("calcium").value,

      magnesium:
        document.getElementById("magnesium").value,

      lime_rec:
        document.getElementById("lime_rec").value,

      nitrogen_rec:
        document.getElementById("nitrogen_rec").value,

      notes:
        document.getElementById("notes").value

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

async function loadSamples() {

  try {

    const response = await fetch(
      API_URL + "?action=getSamples"
    );

    const samples = await response.json();

    const container =
      document.getElementById("samplesContainer");

    container.innerHTML = "";

    samples.reverse().forEach(sample => {

      const card = document.createElement("div");

      card.className = "sample-card";

      card.innerHTML = `

        <h3>${sample.customer_id}</h3>

        <p><strong>Date:</strong>
        ${sample.sample_date}</p>

        <p><strong>Field:</strong>
        ${sample.field_id}</p>

        <p><strong>pH:</strong>
        ${sample.ph}</p>

        <p><strong>Phosphorus:</strong>
        ${sample.phosphorus}</p>

        <p><strong>Potassium:</strong>
        ${sample.potassium}</p>

        <p><strong>CEC:</strong>
        ${sample.cec}</p>

        <p><strong>Calcium:</strong>
        ${sample.calcium}</p>

        <p><strong>Magnesium:</strong>
        ${sample.magnesium}</p>

        <hr>

      `;

      container.appendChild(card);

    });

  } catch(error) {

    console.error(error);

  }

}
