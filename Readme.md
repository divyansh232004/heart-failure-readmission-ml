# 30-Day Hospital Readmission Prediction using Machine Learning

## Project Overview

This project develops and evaluates machine learning models for predicting whether a patient will be readmitted to the hospital within 30 days.

The project compares three classification algorithms:

1. Logistic Regression
2. K-Nearest Neighbors (KNN)
3. Decision Tree

The models are evaluated using Accuracy, Precision, Recall, F1-score, ROC-AUC, confusion matrices, and ROC curves.

The project also investigates KNN hyperparameter selection and Decision Tree complexity using cross-validation.

---

## Problem Statement

Hospital readmissions within 30 days can be an important healthcare outcome.

The objective of this project is to build machine learning classification models that can predict the target variable:

`Readmitted_30_Days`

where:

- `0` = Patient was not readmitted within 30 days
- `1` = Patient was readmitted within 30 days

The project focuses on comparing different machine learning approaches and understanding their strengths, weaknesses, and generalization behavior.

---

## Dataset

The dataset contains:

- 12,000 records
- A binary target variable: `Readmitted_30_Days`

### Target Distribution

| Class | Count | Percentage |
|------:|------:|-----------:|
| 0 | 8,400 | 70% |
| 1 | 3,600 | 30% |

The target distribution is therefore moderately imbalanced.

Because of this imbalance, model evaluation does not rely only on accuracy. Precision, Recall, F1-score, ROC-AUC, and confusion matrices are also considered.

---

## Machine Learning Workflow

The project follows this workflow:

1. Dataset loading
2. Data inspection
3. Exploratory Data Analysis (EDA)
4. Target distribution analysis
5. Feature and target separation
6. Train-test split
7. Data preprocessing
8. Logistic Regression
9. KNN experimentation
10. KNN cross-validation
11. Decision Tree experimentation
12. Decision Tree cross-validation
13. Model evaluation
14. ROC curve analysis
15. Confusion matrix analysis
16. Feature interpretation
17. Overfitting and underfitting analysis
18. Final model comparison

---

## Preprocessing

The project uses a preprocessing pipeline to handle numeric and categorical features.

The preprocessing is fitted using the training data to avoid information leakage from the test set.

Numeric features are processed appropriately for the machine learning models, while categorical variables are encoded into numerical representations.

A pipeline-based approach ensures that preprocessing and model training remain connected during cross-validation and evaluation.

---

## Models

### 1. Logistic Regression

Logistic Regression is used as one of the classification models and provides a linear baseline for the prediction problem.

The model's coefficients are also examined to understand the direction and relative magnitude of associations within the fitted model.

---

### 2. K-Nearest Neighbors

KNN is a distance-based classification algorithm.

The following values of `k` were evaluated:

```text
3, 5, 7, 9, 11, 15