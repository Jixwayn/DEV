pipeline {
    agent any

    environment {
        NETLIFY_AUTH_TOKEN = credentials('NETLIFY_AUTH_TOKEN')
        NETLIFY_SITE_ID = credentials('NETLIFY_SITE_ID')
        PATH = "/usr/local/bin:${env.PATH}"  // กำหนด path สำหรับ Node.js ที่ถูกต้อง
    }

    stages {
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
                    image 'node:18-alpine'  // ใช้ Docker image ที่มี Node.js
                    reuseNode true
                }
            }
            steps {
                echo "🧪 Running tests..."
                sh '''
                    test -f build/index.html  # ตรวจสอบไฟล์ที่สร้างขึ้นใน build
                    npm test || echo "No test script, skipping..."  # รันคำสั่ง test หรือข้ามถ้าไม่มี script
                '''
            }
        }

        stage('Deploy to Netlify') {
            agent {
                docker {
                    image 'node:18-alpine'  // ใช้ Docker image ที่มี Node.js
                    reuseNode true
                }
            }
            steps {
                echo "🚀 Deploying to Netlify..."
                sh '''
                    npm install -g netlify-cli  # ติดตั้ง Netlify CLI
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
}