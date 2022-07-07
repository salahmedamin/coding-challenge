import { PrismaClient } from "@prisma/client";
import { Router } from "express";
const router = Router();
const prisma = new PrismaClient();

// router.post(
//   "/",
//   async (req: Request<{}, {}, Omit<employee, "id">>, res: Response) => {
//     await TCWrapper({
//       cb: async () => await createEmployee(req.body),
//       res,
//     });
//   }
// );
// router.put(
//   "/",
//   async (
//     req: Request<
//       {},
//       {},
//       {
//         id: number;
//         name?: string;
//         email?: string;
//         _delete?: boolean;
//       }
//     >,
//     res: Response
//   ) => {
//     await TCWrapper({
//       cb: async () =>
//         await updateEmployee({ ...req.body, _delete: req.body._delete }),
//       res,
//     });
//   }
// );
// router.get(
//   "/timeslots",
//   async (req: Request<{}, {}, { id: number }>, res: Response) => {
//     await TCWrapper({
//       cb: async () => await getEmployeeTimeSlots(req.body),
//       res,
//     });
//   }
// );

export const supervisorRouter = router;
