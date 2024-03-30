pipeline {
    agent any
    
    stages {
        stage('Clone Repository') {
            steps {
                git 'https://github.com/sharutok/mis_report_client'
            }
        }
        
        stage('Build and Run Docker Compose') {
            steps {
                sh 'docker-compose up --build -d'
            }
        }
    }
    
    post {
        always {
            // Clean up Docker containers after the build
            sh 'docker-compose down'
        }
    }
}
