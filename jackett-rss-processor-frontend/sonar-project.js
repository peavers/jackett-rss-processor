const sonarqubeScanner = require('sonarqube-scanner');
sonarqubeScanner(
  {
    serverUrl: process.env.SONAR_HOST,
    token: process.env.SONAR_TOKEN,
  },
  () => {}
);
