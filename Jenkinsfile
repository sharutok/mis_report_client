pipeline {
  agent any
  stages {
    stage('Test') {
      steps {
        dir('adorprojects/mis_distributor_reports/client') {
          git 'https://github.com/sharutok/mis_report_client'
        }
        
        script {
          sh 'docker-compose up -d --build'
        }
      }
    }
  }
}
