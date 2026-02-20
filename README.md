# 🏦 Enterprise Loan Approval & Risk Assessment System

A full-stack, B2B Machine Learning application designed to predict credit default risk using the German Credit Risk dataset. 

This system moves beyond basic accuracy metrics to focus on **Business Value (Recall)** and **Explainable AI (XAI)**, providing loan officers with both a predictive risk score and the mathematical reasoning behind the decision.

<img width="1378" height="697" alt="image" src="https://github.com/user-attachments/assets/c5c69e60-f409-497b-a176-605ba3998e43" />


## 🚀 Key Features

* **Predictive Risk Engine:** Classifies loan applicants into "Approve (Low Risk)" or "Reject (High Risk)" based on 20 distinct financial and demographic features.
* **Explainable AI (XAI):** Utilizes Logistic Regression to ensure every decision is transparent and auditable by financial regulators, avoiding the "black box" problem of deep learning.
* **Imbalance Handling:** Engineered using class weight balancing to prioritize **Recall**, ensuring the model catches maximum potential defaults (protecting the bank's principal) even at the cost of minor false positives.
* **Production-Grade API:** A strict, type-validated backend built with **FastAPI** and **Pydantic** to prevent bad data from crashing the ML pipeline.
* **Cinematic B2B Dashboard:** A minimal, highly responsive UI built with **React** and **Tailwind CSS**, designed for internal loan officers to process applications efficiently.

## 🛠️ Tech Stack

### Machine Learning & Data Engineering
* **Python 3**
* **Scikit-Learn:** `ColumnTransformer`, `StandardScaler`, `OneHotEncoder`, and `LogisticRegression`.
* **Pandas & NumPy:** Data manipulation and matrix operations.
* **Joblib:** Model persistence and pipeline serialization.

### Backend Engineering
* **FastAPI:** High-performance async web framework.
* **Uvicorn:** ASGI server.
* **Pydantic:** Strict data validation and schema definition.

### Frontend Engineering
* **React.js (Vite):** Component-based UI.
* **Tailwind CSS:** Utility-first framework for the custom dark/glassmorphism aesthetic.
* **Fetch API:** Native asynchronous HTTP requests.

## 🧠 The Machine Learning Pipeline

1. **Data Preprocessing:** * Segregated numerical features for standardization (`StandardScaler`).
   * Processed categorical text features using `OneHotEncoder` to prevent mathematical hierarchy assumptions.
   * Combined into a single, cohesive `Pipeline` to prevent data leakage during cross-validation.
2. **Model Selection:** * Evaluated Logistic Regression vs. Random Forest. 
   * Logistic Regression was selected due to its superior **Recall** on the minority class (actual defaults) and its inherent explainability through coefficient weights.
3. **Feature Importance Insights:**
   * **Highest Risk Factors:** Being a foreign worker, renting housing, and requesting education-specific loans.
   * **Lowest Risk Factors:** Having existing credit lines at other institutions (proven track record) and operating without a standard checking account (relying on savings).

<img width="1002" height="590" alt="image" src="https://github.com/user-attachments/assets/aac4732e-20ae-4cd3-a1eb-4fb3d3e01ad4" />

***

📝 License
This project is licensed under the MIT License.
