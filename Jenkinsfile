pipeline {
  agent any
  stages {
    stage('Test') {
      steps {
          git 'https://github.com/sharutok/mis_report_client'
        
        script {
          sh 'docker-compose up -d --build'
        }
      }
    }
  }
}
