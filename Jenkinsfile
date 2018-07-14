pipeline {
  agent any
  stages {
    stage('install deps') {
      steps {
        sh 'npm install'
      }
    }
    stage('build') {
      steps {
        sh 'npm run build'
        catchError() {
          emailext(subject: '[ERROR] $PROJECT_NAME - Build # $BUILD_NUMBER - $BUILD_STATUS:', body: '$PROJECT_NAME - Build # $BUILD_NUMBER - $BUILD_STATUS:', from: 'dev', to: 'dev', attachLog: true)
        }

      }
    }
    stage('test') {
      steps {
        sh 'npm run test'
        catchError() {
          emailext(subject: '[ERROR] $PROJECT_NAME - Build # $BUILD_NUMBER - $BUILD_STATUS:', body: '$PROJECT_NAME - Build # $BUILD_NUMBER - $BUILD_STATUS:  Check console output at $BUILD_URL to view the results.', from: 'dev', to: 'test', attachLog: true)
        }

      }
    }
    stage('MergeToMaster') {
      steps {
        sh 'git checkout master'
        catchError() {
          emailext(subject: '[ERROR] $PROJECT_NAME - Build # $BUILD_NUMBER - $BUILD_STATUS:', body: '$PROJECT_NAME - Build # $BUILD_NUMBER - $BUILD_STATUS:  Check console output at $BUILD_URL to view the results.', attachLog: true)
        }

      }
    }
    stage('notify') {
      steps {
        emailext(subject: '[SUCCESS] $PROJECT_NAME - Build # $BUILD_NUMBER - $BUILD_STATUS:', body: '[SUCCESS] $PROJECT_NAME - Build # $BUILD_NUMBER - $BUILD_STATUS:', from: 'dev', to: 'dev, test, mauro')
      }
    }
  }
}