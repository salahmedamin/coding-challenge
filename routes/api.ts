import { Router } from "express";
import { employeeRouter } from "./employee";
import { timeslotRouter } from "./timeslot";
const router = Router();

router.use("/employee", employeeRouter);
router.use("/timeslot", timeslotRouter);

export const APIRouter = router;
