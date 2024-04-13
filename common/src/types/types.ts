export type UserType =
  | 'Student'
  | 'Admin'
  | 'Parent'
  | 'Teacher'
  | 'Super_Admin';

export type genderType = 'Male' | 'Female' | 'Other';

export type UserActionTypes =
  | 'USER_CREATE'
  | 'USER_UPDATE'
  | 'USER_LOGGED'
  | 'USER_DELETE';

// Action types for USERs
export type StudentActionTypes =
  | 'STUDENT_CREATE'
  | 'STUDENT_UPDATE'
  | 'STUDENT_LOGGED'
  | 'STUDENT_DELETE';

// Action types for admins
export type AdminActionTypes =
  | 'SUPER-ADMIN_CREATE'
  | 'ADMIN_CREATE'
  | 'ADMIN_UPDATE'
  | 'ADMIN_LOGGED'
  | 'ADMIN_DELETE';

// Action types for parents
export type ParentActionTypes =
  | 'PARENT_CREATE'
  | 'PARENT_UPDATE'
  | 'PARENT_LOGGED'
  | 'PARENT_DELETE';

// Action types for teachers
export type TeacherActionTypes =
  | 'TEACHER_CREATE'
  | 'TEACHER_UPDATE'
  | 'TEACHER_LOGGED'
  | 'TEACHER_DELETE';

export type EventTypes =
  | UserActionTypes
  | StudentActionTypes
  | AdminActionTypes
  | ParentActionTypes
  | TeacherActionTypes;

// Message type for events
export type EventMessage = {
  type: EventTypes;
  data: any;
  createdAt: Date;
};
