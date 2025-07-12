# Real-Time Network Traffic Classification for Anomaly Detection

A cyber security project for final year aim to develop a  real-time network traffic classification to detect anomalous behavior of packet in a server network. This detect threshold such:
 - Distributed Denial of Service (DDoS),
 - Denial of Service (DoS),
 - Infiltration,
 - Port Scan,
 - Brute force, and
 - Bot Net.

Note: '''The system classify if safe or anomaly.'''

By training machine learning algorithms to select the best performing, Random Forest outperformed Decision Tree, Logistic Regression, and Naive Bayes with 97 percent ( of 70% train set ), 88 percent ( of 30% test set ), and 89 percent ( of 5-folds Cross- Validation ) for unseen data injected with 10 percent noise - from CIC-IDS 2017 dataset.

The system develop through the specification of Reactjs ( JavaScript library ) for frontend, Django ( Python backend framework ), Tailwindcss, and MaterialUI ( CSS framework ).

The system features are:
- Authentication ( Email Backend )
  * Registration
  * Login
  * Reset Password
- Server Credential Input ( requires some configuration in the server allowing tester to monitor server network - mush handle with permissions )
- Dashboard
  * Packets Information Table
  * Rythm Graph
- Notification
- Report

# AUTHENTICATION 1/3 - REGISTRATION FORM
* New user is require to create and register account to proceed to the main page for monitoring server network

![Screenshot (332)](https://github.com/user-attachments/assets/9e444f3f-8228-4e24-8231-b5a68e415432)

# AUTHENTICATION 2/3 - LOGIN FORM
* If user have already an account he can use this form for authenticaion.

![Screenshot (322)](https://github.com/user-attachments/assets/49a33482-4fd5-457d-ada3-0957c66997dc)

# HOME PAGE
![Screenshot (333)](https://github.com/user-attachments/assets/2c2bfd43-1d8a-44b3-9440-0063b49041ea)

# SERVER CREDENTIAL
* To monitor server network the user should have full consent and permission of the company or server owner.

![Screenshot (334)](https://github.com/user-attachments/assets/71543500-a2b5-410d-b4cf-3789043e66f4)

# MONITORING PAGE
![Screenshot (335)](https://github.com/user-attachments/assets/39476249-8e8e-4ad9-ad82-09d6811fcb3f)












