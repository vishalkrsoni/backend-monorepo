// import { Request, Response } from 'express';
// import { subjectService } fro../assets/storeore';
// import { APIResponse, BaseController } from '@backend-monorepo/common';
// import { SubjectService } fro../assets/services/subjectect';

// export class SubjectController extends BaseController<SubjectService> {
//   constructor() {
//     super(subjectService);
//   }
//   async addSubject(req: Request, res: Response) {
//     const { name } = req.body;
//     try {
//       const newSubject = await subjectService.addSubject(name);
//       res.json(
//         APIResponse.success(newSubject, 'added new subject successfully to db'),
//       );
//       console.log(newSubject);
//     } catch (error) {
//       console.log('error:', error);
//       res.status(500).json(APIResponse.internalServerError(error.message));
//     }
//   }
// }
