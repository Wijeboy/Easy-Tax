const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  birthday: {
    type: Date,
    required: true
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other'],
    required: true
  },
  phoneNumber: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

// Hash password before saving
UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Compare password method
UserSchema.methods.comparePassword = async function(candidatePassword) {
  try {
    console.log('Comparing passwords:');
    console.log('- Stored hash:', this.password);
    console.log('- Candidate password:', candidatePassword);
    
    const result = await bcrypt.compare(candidatePassword, this.password);
    console.log('- Comparison result:', result);
    return result;
  } catch (error) {
    console.error('Password comparison error:', error);
    throw error;
  }
};

module.exports = mongoose.model('User', UserSchema); 