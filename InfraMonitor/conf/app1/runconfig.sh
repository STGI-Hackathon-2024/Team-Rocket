kubectl apply -f postgres-pv.yaml
kubectl apply -f postgres-pvc.yaml
kubectl apply -f postgres-secret.yaml
kubectl apply -f postgres-deployment.yaml
kubectl apply -f postgres-service.yaml
kubectl apply -f webapp-configmap.yaml
kubectl apply -f webapp-deployment.yaml
kubectl apply -f webapp-service.yaml
