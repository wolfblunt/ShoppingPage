const swaggerUi = require('swagger-ui-express');
const yaml = require('yamljs');
const path = require('path');
const glob = require('glob');

console.log(`dirname: ${__dirname}`);
const customDirectory = path.join(__dirname, './../routes/docs');

const yamlFiles = glob.sync(path.join(customDirectory, '*.yaml'));

const swaggerDocuments = yamlFiles.map(file => yaml.load(file));
const mergedSwaggerDocument = swaggerDocuments.reduce((acc, doc) => {
  return {
    ...acc,
    ...doc,
    paths: { ...acc.paths, ...doc.paths },
    components: { ...acc.components, ...doc.components },
  };
}, {});

mergedSwaggerDocument.openapi = mergedSwaggerDocument.openapi || '3.0.0';
mergedSwaggerDocument.info = mergedSwaggerDocument.info || {
  title: 'API Documentation',
  version: '1.0.0',
  description: 'Automatically generated API documentation',
};

const setupSwagger = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(mergedSwaggerDocument));
};

module.exports = setupSwagger;