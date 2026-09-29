const API_URL =
    "https://heart-failure-readmission-api.onrender.com/predict";

const form = document.getElementById("predictionForm");
const predictButton = document.getElementById("predictButton");

const loading = document.getElementById("loading");
const resultSection = document.getElementById("resultSection");
const errorMessage = document.getElementById("errorMessage");

const predictionResult = document.getElementById("predictionResult");
const probabilityValue = document.getElementById("probabilityValue");
const progressBar = document.getElementById("progressBar");

const errorText = document.getElementById("errorText");
const newPredictionButton =
    document.getElementById("newPredictionButton");


/* =========================================================
   FORM SUBMISSION
========================================================= */

form.addEventListener("submit", async function (event) {

    event.preventDefault();

    // Hide previous messages
    resultSection.classList.add("hidden");
    errorMessage.classList.add("hidden");

    // Show loading
    loading.classList.remove("hidden");

    // Disable button
    predictButton.disabled = true;

    try {

        const formData = new FormData(form);

        const data = {

            // -------------------------
            // Numeric features
            // -------------------------

            Age: Number(formData.get("Age")),

            BMI: Number(formData.get("BMI")),

            Exercise_Frequency:
                Number(formData.get("Exercise_Frequency")),

            Hypertension:
                Number(formData.get("Hypertension")),

            Diabetes:
                Number(formData.get("Diabetes")),

            Chronic_Kidney_Disease:
                Number(formData.get("Chronic_Kidney_Disease")),

            Coronary_Artery_Disease:
                Number(formData.get("Coronary_Artery_Disease")),

            Previous_Stroke:
                Number(formData.get("Previous_Stroke")),

            Atrial_Fibrillation:
                Number(formData.get("Atrial_Fibrillation")),

            Previous_HF_Admissions:
                Number(formData.get("Previous_HF_Admissions")),

            Previous_Hospital_Admissions:
                Number(formData.get("Previous_Hospital_Admissions")),

            NYHA_Class:
                Number(formData.get("NYHA_Class")),

            Ejection_Fraction:
                Number(formData.get("Ejection_Fraction")),

            Systolic_BP:
                Number(formData.get("Systolic_BP")),

            Diastolic_BP:
                Number(formData.get("Diastolic_BP")),

            Heart_Rate:
                Number(formData.get("Heart_Rate")),

            Oxygen_Saturation:
                Number(formData.get("Oxygen_Saturation")),

            Creatinine:
                Number(formData.get("Creatinine")),

            Sodium:
                Number(formData.get("Sodium")),

            Potassium:
                Number(formData.get("Potassium")),

            Hemoglobin:
                Number(formData.get("Hemoglobin")),

            Blood_Glucose:
                Number(formData.get("Blood_Glucose")),

            BNP:
                Number(formData.get("BNP")),

            Length_of_Stay:
                Number(formData.get("Length_of_Stay")),

            ICU_Admission:
                Number(formData.get("ICU_Admission")),

            Emergency_Admission:
                Number(formData.get("Emergency_Admission")),

            Beta_Blocker:
                Number(formData.get("Beta_Blocker")),

            ACE_ARB:
                Number(formData.get("ACE_ARB")),

            Diuretic:
                Number(formData.get("Diuretic")),

            SGLT2_Inhibitor:
                Number(formData.get("SGLT2_Inhibitor")),


            // -------------------------
            // Categorical features
            // -------------------------

            Gender:
                formData.get("Gender"),

            Smoking_Status:
                formData.get("Smoking_Status"),

            Alcohol_Consumption:
                formData.get("Alcohol_Consumption"),

            Heart_Failure_Type:
                formData.get("Heart_Failure_Type")
        };


        console.log("Sending data:", data);


        /* ================================================
           SEND REQUEST TO FASTAPI
        ================================================= */

        const response = await fetch(API_URL, {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(data)
        });


        /* ================================================
           HANDLE SERVER ERROR
        ================================================= */

        if (!response.ok) {

            let errorMessageText =
                "Server returned an error.";

            try {

                const errorData =
                    await response.json();

                if (errorData.detail) {

                    errorMessageText =
                        typeof errorData.detail === "string"
                            ? errorData.detail
                            : JSON.stringify(errorData.detail);

                }

            } catch (error) {

                console.log(
                    "Could not parse server error."
                );

            }

            throw new Error(errorMessageText);
        }


        /* ================================================
           GET PREDICTION
        ================================================= */

        const result = await response.json();

        console.log("Prediction response:", result);


        displayResult(result);

    }

    catch (error) {

        console.error(
            "Prediction error:",
            error
        );

        errorText.textContent =
            error.message ||
            "Unable to connect to the prediction server.";

        errorMessage.classList.remove("hidden");
    }

    finally {

        loading.classList.add("hidden");

        predictButton.disabled = false;
    }

});


/* =========================================================
   DISPLAY RESULT
========================================================= */

function displayResult(result) {

    const prediction =
        Number(result.prediction);

    const probability =
        Number(result.readmission_probability_percent);


    /* ---------------------------------------------
       Prediction text
    ---------------------------------------------- */

    predictionResult.textContent =
        result.result;


    /* ---------------------------------------------
       Probability
    ---------------------------------------------- */

    probabilityValue.textContent =
        probability.toFixed(2);


    /* ---------------------------------------------
       Progress bar
    ---------------------------------------------- */

    progressBar.style.width =
        `${probability}%`;


    /* ---------------------------------------------
       Change result styling based on prediction
    ---------------------------------------------- */

    const resultMain =
        document.querySelector(".result-main");

    if (prediction === 1) {

        resultMain.style.background =
            "#fef2f2";

        resultMain.style.borderColor =
            "#fecaca";

        predictionResult.style.color =
            "#dc2626";

        progressBar.style.background =
            "#dc2626";

    } else {

        resultMain.style.background =
            "#f0fdf4";

        resultMain.style.borderColor =
            "#bbf7d0";

        predictionResult.style.color =
            "#16a34a";

        progressBar.style.background =
            "#16a34a";
    }


    /* ---------------------------------------------
       Show result
    ---------------------------------------------- */

    resultSection.classList.remove("hidden");


    /* ---------------------------------------------
       Scroll to result
    ---------------------------------------------- */

    setTimeout(function () {

        resultSection.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    }, 100);
}


/* =========================================================
   NEW PREDICTION
========================================================= */

newPredictionButton.addEventListener(
    "click",
    function () {

        form.reset();

        resultSection.classList.add(
            "hidden"
        );

        errorMessage.classList.add(
            "hidden"
        );

        progressBar.style.width =
            "0%";

        probabilityValue.textContent =
            "0";

        predictionResult.textContent =
            "—";

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    }
);