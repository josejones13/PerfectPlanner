// server.js
const app = require('./app'); // import your app.js

const PORT = 3000; // or process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
