pipeline {
    
    agent {
      node{
        label "build"
    }
    }

    
    
    
    stages {


        stage ('Checkout SCM'){
          steps {
          git credentialsId: 'github', url: 'https://github.com/kenchedda/react-nodejs-CICD.git', branch: 'main'     
        }
        }
         
        stage ('npm build') {
          steps {
            script {
              sh 'npm install'
              sh 'CI=false npm run build'
              
            }
          }
        }
        
        
         stage ('Docker Build'){
         
                steps {
                  script {
                    withCredentials([string(credentialsId: 'docker', variable: 'docker_hub_cred')])  {
                    def customImage = docker.build("kenappiah/eos-react-webapp:latest")
                    customImage.push()             
                    }
                }
                }
            }
        
         
        stage ('Helm Chart') {
          steps{
            script {
            dir('charts') {
              withCredentials([usernamePassword(credentialsId: 'jfrog', usernameVariable: 'username', passwordVariable: 'password')]) {
              sh '/usr/local/bin/helm package webapp'
              sh '/usr/local/bin/helm push-artifactory webapp-1.0.tgz https://edproject.jfrog.io/artifactory/dpt7-helm-local --username $username --password $password'
              }
            }
          }
       }
    }
}
}