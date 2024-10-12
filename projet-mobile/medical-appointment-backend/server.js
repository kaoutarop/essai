const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Connexion à MongoDB
mongoose.connect('mongodb://localhost:27017/medical_app_BD', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  
}).then(() => console.log('MongoDB connected'))
  .catch((error) => console.error('MongoDB connection error:', error));


// Importer les routes
const authRoutes = require('./routes/auth');
const patientRoutes = require('./routes/Patient');
const medecinRoutes = require('./routes/Medecin');
const appointmentRoutes = require('./routes/Appointment');
const specialtyRoutes = require('./routes/Specialty');

// Utiliser les routes
app.use('/api/auth', authRoutes);
app.use('/api/Patient', patientRoutes);
app.use('/api/Medecin', medecinRoutes);
app.use('/api/Appointment', appointmentRoutes);
app.use('/api/Specialty', specialtyRoutes);
// Routes
app.get('/', (req, res) => {
  res.send('Welcome to Medical Appointment API');
});

// Démarrer le serveur
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
