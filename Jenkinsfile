pipeline {
    
    agent {
      node{
        label "build"
    }
    }

    
    tools {nodejs 'nodejs-16'}
    
    stages {


        stage ('Checkout SCM'){
          steps {
          git credentialsId: 'github', url: 'https://github.com/kenchedda/react-nodejs-CICD.git', branch: 'main'     
        }
        }
         
        stage ('npm build') {
          steps {
          
              sh 'npm install'
              sh 'CI=false npm run build'
              
            }
          }
        
        
        
         stage(" Docker Build ") {
      steps {
        script {
           echo '<--------------- Docker Build Started --------------->'
           app = docker.build("kenappiah/eos-webapp")
           echo '<--------------- Docker Build Ends --------------->'
        }
      }
    }
    stage (" Docker Publish "){
        steps {
            script {
               echo '<--------------- Docker Publish Started --------------->'  
                docker.withRegistry('https://registry.hub.docker.com', 'docker'){
                    app.push()
                }    
               echo '<--------------- Docker Publish Ended --------------->'  
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