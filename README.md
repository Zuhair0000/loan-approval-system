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

1. **Data preprocessing**
   * Numeric features are standardised with `StandardScaler`.
   * Categorical features are one-hot encoded with `OneHotEncoder`, so the model doesn't assume an order between categories.
   * Both steps are combined in a single `Pipeline` fitted on training data only, to prevent data leakage.

2. **Model selection**
   * Compared Logistic Regression and Random Forest, both with balanced class weights.
   * Logistic Regression was selected for its much higher **recall** on actual defaults and for its explainability through coefficient weights.

3. **Feature importance insights**
   * **Highest risk factors:** being a foreign worker, renting housing, and requesting education-specific loans.
   * **Lowest risk factors:** having existing credit lines at other institutions (a proven track record) and having no standard checking account (relying on savings).
   * **Fairness note:** the German Credit dataset includes sensitive attributes such as foreign-worker status and personal status. A production system should remove or audit these features to avoid discriminating against protected groups.

## 📊 Results

Test set: 200 applicants, 60 of whom defaulted.

| Model | Recall on defaults | Precision | Accuracy |
|---|---|---|---|
| **Logistic Regression** (selected) | **80%** (48 of 60) | 56% | 75% |
| Random Forest | 43% (26 of 60) | 70% | 78% |

Random Forest had higher accuracy, but it missed more than half of the real defaults. Logistic Regression catches 80% of them, at the cost of more applications sent for manual review. For a bank, a missed default costs far more than an extra review.

<img width="1002" height="590" alt="image" src="https://github.com/user-attachments/assets/aac4732e-20ae-4cd3-a1eb-4fb3d3e01ad4" />

***
