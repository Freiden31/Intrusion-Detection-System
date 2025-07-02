# Top Features

# 0	Fwd Packet Length Max
# 1	Fwd Packet Length Mean
# 2	Subflow Fwd Bytes
# 3	Fwd Packets Length Total
# 4	Init Fwd Win Bytes
# 5	Fwd Act Data Packets
# 6	Avg Fwd Segment Size
# 7	Bwd Packet Length Min
# 8	Total Fwd Packets
# 9	Fwd Header Length
# 10	Subflow Fwd Packets
# 11	Fwd IAT Max
# 12	Fwd IAT Std
# 13	Init Bwd Win Bytes
# 14	Total Backward Packets
# 15	Fwd IAT Total
# 16	Bwd Packet Length Std
# 17	Avg Packet Size
# 18	Fwd IAT Mean
# 19	Bwd Header Length

C:\Users\Admin\OneDrive\Desktop\model>python train.py

🔧 Training model on: DDoS-Friday-no-metadata.parquet
✅ Accuracy: 0.9112
✅ F1 Score (weighted): 0.9098
              precision    recall  f1-score   support

      Benign       0.97      0.81      0.89     27975
        DDoS       0.88      0.98      0.93     38405

    accuracy                           0.91     66380
   macro avg       0.92      0.90      0.91     66380
weighted avg       0.92      0.91      0.91     66380


🔧 Training model on: Benign-Monday-no-metadata.parquet
⚠️ Skipping Benign-Monday-no-metadata.parquet: only one class present (Benign).

🔧 Training model on: Bruteforce-Tuesday-no-metadata.parquet
C:\Users\Admin\AppData\Local\Programs\Python\Python311\Lib\site-packages\sklearn\svm\_base.py:1235: ConvergenceWarning: Liblinear failed to converge, increase the number of iterations.
  warnings.warn(
✅ Accuracy: 0.8815
✅ F1 Score (weighted): 0.9233
              precision    recall  f1-score   support

      Benign       0.99      0.88      0.94    114170
 FTP-Patator       0.08      0.67      0.15      1779
 SSH-Patator       0.77      0.91      0.83       966

    accuracy                           0.88    116915
   macro avg       0.61      0.82      0.64    116915
weighted avg       0.98      0.88      0.92    116915


🔧 Training model on: DoS-Wednesday-no-metadata.parquet
C:\Users\Admin\AppData\Local\Programs\Python\Python311\Lib\site-packages\sklearn\svm\_base.py:1235: ConvergenceWarning: Liblinear failed to converge, increase the number of iterations.
  warnings.warn(
✅ Accuracy: 0.8365
✅ F1 Score (weighted): 0.8670
                  precision    recall  f1-score   support

          Benign       0.95      0.84      0.89    117371
   DoS GoldenEye       0.21      0.89      0.33      3086
        DoS Hulk       0.93      0.83      0.88     51854
DoS Slowhttptest       0.21      0.83      0.33      1568
   DoS slowloris       0.16      0.53      0.25      1616
      Heartbleed       0.25      0.67      0.36         3

        accuracy                           0.84    175498
       macro avg       0.45      0.77      0.51    175498
    weighted avg       0.92      0.84      0.87    175498


🔧 Training model on: Botnet-Friday-no-metadata.parquet
✅ Accuracy: 0.8747
✅ F1 Score (weighted): 0.9259
              precision    recall  f1-score   support

      Benign       1.00      0.87      0.93     52381
         Bot       0.06      0.97      0.11       431

    accuracy                           0.87     52812
   macro avg       0.53      0.92      0.52     52812
weighted avg       0.99      0.87      0.93     52812


🔧 Training model on: Infiltration-Thursday-no-metadata.parquet
✅ Accuracy: 0.9852
✅ F1 Score (weighted): 0.9924
              precision    recall  f1-score   support

      Benign       1.00      0.99      0.99     62278
Infiltration       0.01      0.82      0.02        11

    accuracy                           0.99     62289
   macro avg       0.50      0.90      0.51     62289
weighted avg       1.00      0.99      0.99     62289


🔧 Training model on: Portscan-Friday-no-metadata.parquet
✅ Accuracy: 0.8591
✅ F1 Score (weighted): 0.9108
              precision    recall  f1-score   support

      Benign       1.00      0.86      0.92     35270
    PortScan       0.10      0.98      0.19       587

    accuracy                           0.86     35857
   macro avg       0.55      0.92      0.55     35857
weighted avg       0.98      0.86      0.91     35857


🔧 Training model on: WebAttacks-Thursday-no-metadata.parquet
C:\Users\Admin\AppData\Local\Programs\Python\Python311\Lib\site-packages\sklearn\svm\_base.py:1235: ConvergenceWarning: Liblinear failed to converge, increase the number of iterations.
  warnings.warn(
✅ Accuracy: 0.9883
✅ F1 Score (weighted): 0.9889
                            precision    recall  f1-score   support

                    Benign       1.00      0.99      1.00     46103
  Web Attack � Brute Force       0.55      0.83      0.66       441
Web Attack � Sql Injection       0.00      0.00      0.00         6
          Web Attack � XSS       0.03      0.03      0.03       196

                  accuracy                           0.99     46746
                 macro avg       0.39      0.46      0.42     46746
              weighted avg       0.99      0.99      0.99     46746


C:\Users\Admin\OneDrive\Desktop\model>



































