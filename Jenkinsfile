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
           app = docker.build("kenappiah/eos-webapp:latest")
           echo '<--------------- Docker Build Ends --------------->'
        }
      }
    }
               stage ('publish docker image') {
                steps{
                    script{
                        withCredentials([string(credentialsId: 'docker', variable: 'docker_hub_cred')]) {
                            sh 'docker login -u kenappiah -p ${docker_hub_cred}'
                            sh 'docker image push kenappiah/eos-webapp'
                    }
                }
            }                
        }

        stage ('Helm Chart') {
          steps{
      
            dir('charts') {
              withCredentials([usernamePassword(credentialsId: 'jfrog', usernameVariable: 'username', passwordVariable: 'password')]) {
              sh '/usr/local/bin/helm package webapp'
               sh 'curl -u$username:$password  -T /home/ec2-user/workspace/job/charts/webapp-1.0.tgz "https://kenappiah.jfrog.io/artifactory/default-helm/webapp-1.0.tgz"'
              }
            
          }
       }
    }
}
}