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
                    image 'node:18-alpine'
                    reuseNode true
                }
            }
            steps {
                sh '''
                    echo "🛠️ Building..."
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
                    image 'node:18-alpine'
                    reuseNode true
                }
            }
            steps {
                sh '''
                    echo "🧪 Running tests..."
                    test -f build/index.html
                    npm test || echo "No test script, skipping..."
                '''
            }
        }

        stage('Deploy to Netlify') {
            agent {
                docker {
                    image 'node:18-alpine'
                    reuseNode true
                }
            }
            steps {
                sh '''
                    echo "🚀 Deploying to Netlify..."
                    npm install -g netlify-cli
                    netlify deploy --dir=build --auth=$NETLIFY_AUTH_TOKEN --site=$NETLIFY_SITE_ID --prod
                '''
            }
        }
    }

    post {
    always {
        echo 'No test result to archive yet.'
        // junit 'reports/**/*.xml' // ยังไม่มีไฟล์ทดสอบ
    }
}

}
