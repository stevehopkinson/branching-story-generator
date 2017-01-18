const app = require('./src/app.js');
const port = 8000;

const server = app.listen(port, () => console.log(`Server listening on port ${port}`));
