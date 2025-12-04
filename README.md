⚡ Electricity Service System - Distributed Database Architecture
    Final project for the Distributed Database Systems course. This system simulates an electricity service management platform featuring a horizontal fragmentation architecture, integrated with an automatic Failover mechanism and an AI-powered (LLM) Log Replay tool for data recovery.


------------------------------------------------------------------------------------------------------    

    📖 Table of Contents
    - System Architecture
    - Tech Stack
    - Key Features
    - Installation & DeploymentUsage Guide
    - AI Recovery Tool


-----------------------------------------------------------------------------------------------------


    🏛 System ArchitectureThe system is deployed using a distributed model on Linux (via Docker Containers), consisting of:
    - 3 Data Sites (TP1, TP2, TP3): Store horizontally fragmented data based on geographical regions.
    - API Gateway (Node.js): Handles request routing and load balancing.
    - Log DB (Loki): Centralized log storage for monitoring and disaster recovery.
    ![Insert your architecture diagram here - e.g.,] (images/architecture_diagram.png)
    

------------------------------------------------------------------------------------------------------  
    
    🛠 Tech Stack
    | Component | Technology | Note |
    | :--- | :--- | :--- |
    | **Database** | Microsoft SQL Server 2022 | Running on Docker Containers |
    | **Backend** | Node.js (Express) | API Gateway & Logic Processing |
    | **Container** | Docker & Docker Compose | Infrastructure Management |
    | **Monitoring** | Grafana & Loki | System Log Monitoring |
    | **AI Module** | Ollama (Model Qwen 2.5) | Parses JSON Logs -> Generates SQL Scripts |
    

------------------------------------------------------------------------------------------------------    
    
    🚀 Key Features
    1. Horizontal Fragmentation: Data is distributed across different servers based on branch/city location.
    2. Custom Replication: A self-developed data synchronization mechanism optimized for flexibility in Linux environments.
    3. Failover System: Automatically redirects traffic to a backup server when the primary server goes down.
    4. AI Log Replay: Utilizes a Local AI model to parse JSON logs and reconstruct SQL commands to synchronize missing data during backup delays.
    
    
------------------------------------------------------------------------------------------------------    
     
    ⚙ Installation & Deployment
    1. Prerequisites
        Docker Desktop
        Node.js (v18 or higher)
        Ollama (Required for the AI module)
    2. Start Database & Monitoring
        Use Docker Compose to set up the SQL Server infrastructure, Grafana, and Loki:
        
        ```docker-compose up -d```

        This command initializes 4 SQL Server containers (db1, db2, db3, db4) and the monitoring stack.
        
    3. Setup Backend
        Navigate to the app directory and install dependencies:
        
        ```
        npm install
        node server.js
        ```
        The Node.js server will start on port 9999.


------------------------------------------------------------------------------------------------------    

    🎮 Usage Guide
    1. Access Monitoring DashboardOnce
        Docker is running, access Grafana to view logs and system status:
        Grafana URL: http://localhost:3300/Loki URL: http://localhost:3200/
        Credentials:
            Username: admin
            Password: admin

    2. Main APIs
    Use Postman to test data flows:
        POST /api/chinhanh: Add a new branch (automatically routed to DB TP1, TP2, or TP3).
        (List other APIs here if applicable)


------------------------------------------------------------------------------------------------------               
        
    🤖 AI Recovery Tool (Advanced Feature)
    In the event of a server failure where the latest backup is outdated, use the AI tool to replay logs:
    Configuration: Ensure Ollama is running the qwen2.5-coder:7b model.
    How to run the recovery script:

    ```
        # Syntax: node generateSQL.js [City] [Last Backup Date] [Last Backup Time]
        node generateSQL.js TP1 2025-11-26 13:00:00
    ```

    The script reads logs from D:/loki-logging/logs, filters transactions occurring after the backup time, and uses AI to convert them into an SQL script.


------------------------------------------------------------------------------------------------------ 


    👥 Authors
        Do Huu Hau 