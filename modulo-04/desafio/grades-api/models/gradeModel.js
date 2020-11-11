import mongoose from 'mongoose';

const gradeSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
  },
  subject: {
    type: String,
    trim: true,
    required: true,
  },
  type: {
    type: String,
    trim: true,
    required: true,
  },
  value: {
    type: Number,
    min: 0,
  },
  lastModified: {
    type: Date,
  },
});

const Grade = mongoose.model('Grade', gradeSchema, 'grades');

export default Grade;
