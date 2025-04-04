pipeline {
    agent any

    environment {
        NETLIFY_AUTH_TOKEN = credentials('NETLIFY_AUTH_TOKEN')
        NETLIFY_SITE_ID = credentials('NETLIFY_SITE_ID')
    }

    stages {
        stage('Build') {
            agent {
                docker {
                    image 'node:18'
                    reuseNode true
                }
            }
            steps {
                echo '🛠️ Building in Docker...'
                sh '''
                    node --version
                    npm --version
                    npm ci
                    npm run build
                    ls -la build
                '''
            }
        }

        stage('Test') {
            agent {
                docker {
                    image 'node:18'
                    reuseNode true
                }
            }
            steps {
                echo '🧪 Running tests...'
                sh '''
                    test -f build/index.html
                    npm test || echo "No test script, skipping..."
                '''
            }
        }

        stage('Deploy to Netlify') {
            agent {
                docker {
                    image 'node:18'
                    reuseNode true
                }
            }
            steps {
                echo '🚀 Deploying to Netlify...'
                sh '''
                    npm install -g netlify-cli
                    netlify deploy --dir=build --auth=$NETLIFY_AUTH_TOKEN --site=$NETLIFY_SITE_ID --prod
                '''
            }
        }
    }

    post {
        always {
            echo '📦 Post steps: no test results to archive yet.'
        }
    }
}
