[Canva Link](https://www.canva.com/design/DAGSGdOtMkE/AecM8nfe5lKrZhO879GulQ/edit?utm_content=DAGSGdOtMkE&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton)


# Infra Monitoring System

## Overview
This project demonstrates how to set up a complete infrastructure using Minikube to run a Node.js application with MySQL, monitoring using Prometheus and Grafana, and logging with Fluent Bit and Loki.

### Prerequisites
- Minikube installed
- Docker installed
- kubectl installed
- Helm installed

---

## Steps to Set Up the Cluster

### 1. Start Minikube
Begin by starting Minikube. This creates a single-node Kubernetes cluster locally.
```bash
minikube start
```

### 2. Build and Run Docker-Compose Files for the App
To run the app locally, use Docker Compose to spin up the Node.js app and MySQL database:
```bash
docker-compose up --build
```
Ensure the app runs successfully in Docker before proceeding to Kubernetes.

### 3. Load Docker Images onto Minikube
Minikube uses its own Docker environment, so you need to load the images into it:
```bash
eval $(minikube docker-env)
docker build -t docker-node-crud-mysql-app .
docker build -t postgres:13.2 .
```

### 4. Deploy App and Database to Minikube
Once the images are available in Minikube, deploy them using Kubernetes `Deployment` and `Service` YAML files:
```bash
kubectl apply -f app1-deployment.yaml
kubectl apply -f postgres-deployment.yaml
```

### 5. Initialize Prometheus in the Kubernetes Cluster
Follow the Prometheus documentation to initialize it in your cluster. Use the Docker command line to configure it:
```bash
kubectl apply -f prometheus.yaml
```

### 6. Run Fluent Bit Configurations
To load Fluent Bit configurations into your cluster:
```bash
kubectl apply -f fluent-bit-config.yaml
```

This will set up log forwarding from your app to Loki or another storage backend.

### 7. Install Loki and Grafana using Helm
Use Helm to install Loki and Grafana for log collection and visualization:
```bash
helm repo add grafana https://grafana.github.io/helm-charts
helm install loki grafana/loki-stack --set grafana.enabled=true,prometheus.enabled=true
```

### 8. Run the Node.js App
Finally, ensure your Node.js app is running in the Minikube cluster and accessible. You can check the status of the pods:
```bash
kubectl get pods
```
Access the app via Minikube's NodePort or service.

---

## Monitoring and Logging Setup

- **Prometheus**: Used for gathering application and system metrics.
- **Grafana**: For visualizing metrics and logs from the system.
- **Fluent Bit**: For collecting and shipping logs to Loki.
- **Loki**: Log aggregation platform, paired with Grafana for log analysis.

---

## Troubleshooting
- Ensure images are correctly built and loaded into Minikube.
- Verify that the `kubectl get pods` shows running pods.
- Check Prometheus and Fluent Bit logs for any setup issues.
- For Grafana, check port-forwarding if the UI doesn't open.

## Future Improvements
- Automate the deployment process using CI/CD pipelines.
- Add more monitoring and alerting mechanisms.

---

This README provides clear instructions for setting up the cluster and all components, helping any user to reproduce your environment.
