import { body } from 'express-validator';

export const teacherValidator = [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').optional().isEmail().withMessage('Invalid email'),
  body('phone').optional().isMobilePhone(undefined, {
    strictMode: false, // Allow non-strict mode
  }).withMessage('Invalid phone number'),
  body('dateOfBirth').isDate().withMessage('Invalid date of birth'),
  body('gender').notEmpty().withMessage('Gender is required'),
  body('password').notEmpty().withMessage('Password is required'),
  body('role').notEmpty().withMessage('Role is required'),
  body('address').notEmpty().withMessage('Address is required'),
  body('school').notEmpty().withMessage('School ID is required'),
  body('specialization').notEmpty().withMessage('Specialization is required'),
  body('classSchedule').optional().isObject().withMessage('Invalid class schedule'),
  body('subjects').optional().isArray().withMessage('Invalid subjects'),
  body('teachSclass').notEmpty().withMessage('Teaching class is required'),
  body('attendance').optional().isArray().withMessage('Invalid attendance'),
  body('isDeleted').optional().isBoolean().withMessage('Invalid isDeleted flag'),
];


export const studentValidator = [
  body('name').notEmpty().withMessage('Name is required'),
  // Add more validation rules as needed
];

export const parentValidator = [
  body('name').notEmpty().withMessage('Name is required'),
  // Add more validation rules as needed
];


export const adminValidator = [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').notEmpty().withMessage('Email is required'),
  body('email').isEmail().withMessage('Invalid email format'),
  body('password').notEmpty().withMessage('Password is required'),
  body('role').notEmpty().withMessage('Role is required'),
  body('schoolName').notEmpty().withMessage('School name is required'),
  // Add more validation rules as needed
];

export const userValidator = [
  body('name').notEmpty().withMessage('Name is required'),
  body('userName').notEmpty().withMessage('Username is required'),
  body('password').notEmpty().withMessage('Password is required'),
  // Add more validation rules as needed
];

export const classValidator = [
  body('name').notEmpty().withMessage('Class name is required'),
  body('school').notEmpty().withMessage('School ID is required'),
  body('classTeacher').notEmpty().withMessage('Class teacher ID is required'),
  body('classSchedule').notEmpty().withMessage('Class schedule ID is required'),
  body('students').optional().isArray().withMessage('Invalid students'),
  body('subjects').optional().isArray().withMessage('Invalid subjects'),
  body('isDeleted').optional().isBoolean().withMessage('Invalid isDeleted flag'),
];
