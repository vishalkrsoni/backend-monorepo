import { StudentController } from './controllers/student';
import { ParentService } from './services/parent';
import { StudentService } from './services/student';

export const parentService = new ParentService();

export const studentService = new StudentService(parentService);
export const studentController = new StudentController();
