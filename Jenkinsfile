pipeline {
    agent any

    stages {

        stage('Clone') {
            steps {
                git branch: 'master',
                    credentialsId: 'cred',
                    url: 'https://github.com/sifeddine00/CRUD-laravel-React.git'
            }
        }

        stage('Build & Deploy') {
            steps {
                sh 'docker-compose down --remove-orphans'
                sh 'docker-compose up --build -d'
            }
        }

    }

    post {
        success {
            echo 'App is running!'
        }
        failure {
            echo 'Something went wrong!'
        }
    }
}