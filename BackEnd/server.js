require('dotenv').config();

const app = require('./src/app');





app.listen(process.env.PORT||8000, () => {
    console.log(`Server is running on http://localhost:3000`);
})