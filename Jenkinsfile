pipeline {
  agent any
  stages {
    stage('Test') {
      steps {
        git credentialsId: '0838c8a9-98bc-46a3-acd7-7c340554cb84', url: 'https://github.com/sharutok/mis_report_client'

        
        script {
          sh 'docker-compose up -d --build'
        }
      }
    }
  }
}
