pipeline {
   environment {
        NPM_CONFIG_CACHE = "${WORKSPACE}/.npm"
        registry = 'casmith/grammy'
        registryCredential = 'dockerhub'
        dockerImage = ''
    }
    agent none
    stages {
        stage('build') {
            agent { docker { image 'node:latest' } }
            steps {
                sh 'npm install'
                sh 'npm test'
            }
        }
        stage('publish image') { 
            agent any
            steps{
                script {
                    sh 'ifconfig'
                    dockerImage = docker.build registry + ":$BUILD_NUMBER"
                    docker.withRegistry( '', registryCredential ) {
                        dockerImage.push()
                    }
                    sh "docker rmi $registry:$BUILD_NUMBER"
                }
            }
        }
    }
}
