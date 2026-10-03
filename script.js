function analyzeFood() {

    // Get values from the form
    let food = document.getElementById("food").value;
    let stock = Number(document.getElementById("stock").value);
    let demand = Number(document.getElementById("demand").value);
    let expiry = Number(document.getElementById("expiry").value);

    let result = document.getElementById("result");

    // Check input
    if (food === "" || stock <= 0 || demand < 0 || expiry <= 0) {

        result.innerHTML = `
            <h2>⚠️ Invalid Input</h2>
            <p>Please enter all details correctly.</p>
        `;

        return;
    }

    // Calculate surplus
    let surplus = stock - demand;

    // Calculate waste percentage
    let wastePercentage = surplus > 0
        ? (surplus / stock) * 100
        : 0;

    // Update Dashboard
    document.getElementById("stockDisplay").textContent =
        stock + " kg";

    document.getElementById("demandDisplay").textContent =
        demand + " kg";

    document.getElementById("surplusDisplay").textContent =
        surplus.toFixed(1) + " kg";

    document.getElementById("wasteDisplay").textContent =
        wastePercentage.toFixed(1) + "%";


    // If there is surplus food
    if (surplus > 0) {

        let risk;

        // Determine risk
        if (expiry <= 2 && wastePercentage >= 20) {
            risk = "🔴 HIGH";
        }
        else if (expiry <= 5 || wastePercentage >= 20) {
            risk = "🟠 MEDIUM";
        }
        else {
            risk = "🟢 LOW";
        }

        // Show result
        result.innerHTML = `
            <h2>⚠️ Waste Risk: ${risk}</h2>

            <p><b>Food:</b> ${food}</p>
            <p><b>Current Stock:</b> ${stock} kg</p>
            <p><b>Predicted Demand:</b> ${demand} kg</p>
            <p><b>Potential Surplus:</b> ${surplus.toFixed(1)} kg</p>
            <p><b>Waste Risk:</b> ${wastePercentage.toFixed(1)}%</p>
            <p><b>Expiry:</b> ${expiry} days</p>

            <br>

            <h3>🤖 AI Recommendations</h3>

            <ul>
                <li>Use ${surplus.toFixed(1)} kg of ${food} before expiry.</li>
                <li>Reduce the next purchase quantity.</li>
                <li>Monitor demand before ordering more stock.</li>
            </ul>
        `;
    }

    // If stock exactly matches demand
    else if (surplus === 0) {

        result.innerHTML = `
            <h2>✅ Stock Matches Demand</h2>

            <p><b>Food:</b> ${food}</p>
            <p>Stock exactly matches predicted demand.</p>
            <p>No surplus is expected.</p>
        `;
    }

    // If there is a shortage
    else {

        let shortage = Math.abs(surplus);

        result.innerHTML = `
            <h2>📦 Stock Shortage</h2>

            <p><b>Food:</b> ${food}</p>
            <p><b>Required:</b> ${shortage.toFixed(1)} kg more</p>

            <p>
                🤖 <b>AI Recommendation:</b>
                Consider purchasing approximately ${shortage.toFixed(1)} kg.
            </p>
        `;
    }
}