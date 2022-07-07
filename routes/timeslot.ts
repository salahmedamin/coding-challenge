import { PrismaClient, time_slot } from "@prisma/client";
import { Request, Response, Router } from "express";
import { TCWrapper } from "../ReqResTryCatchWrapper";
const router = Router();
const prisma = new PrismaClient();

const verifySlotLimits = ({ start, end }: Pick<time_slot, "start" | "end">) => {
  return start < end;
};

const createTimeSlot = async ({
  start,
  end,
}: Pick<time_slot, "start" | "end">) => {
  if (!verifySlotLimits({ end, start }))
    throw new Error("Invalid start and ending time for this slot");
  const created = await prisma.time_slot.create({
    data: {
      start: new Date(start),
      end: new Date(end),
    },
  });
  return created;
};

const updateTimeSlot = async ({
  _delete = false,
  id,
  start,
  end,
}: {
  id: number;
  start?: Date;
  end?: Date;
  _delete?: boolean;
}) => {
  if (!_delete) {
    if (!(end && start)) throw new Error("Please provide start and end time");
    if (!verifySlotLimits({ end, start }))
      throw new Error("Invalid start and ending time for this slot");
    const updated = await prisma.time_slot.update({
      where: {
        id,
      },
      data: {
        end: new Date(end),
        start: new Date(start),
      },
    });
    return updated;
  } else {
    await prisma.time_slot.delete({
      where: {
        id,
      },
    });
    return { success: true };
  }
};

const getTimeSlotEmployees = async ({ id }: { id: number }) => {
  return (
    await prisma.time_slot.findFirst({
      where: {
        id,
      },
      select: {
        employees: {
          select: {
            employee: {
              select: {
                email: true,
                name: true,
                id: true,
              },
            },
          },
        },
      },
    })
  )?.employees.map((e) => e.employee);
};

const assignTimeSlot = async ({
  title = "",
  ts_id,
  emp_id,
}: {
  ts_id: number;
  emp_id: number;
  title?: string;
}) => {
  const assigned = await prisma.employees_to_time_slots.create({
    data: {
      title,
      emp_id,
      ts_id,
    },
  });
  return assigned;
};

router.post(
  "/",
  async (
    req: Request<{}, {}, Omit<time_slot, "id" | "emp_id">>,
    res: Response
  ) => {
    await TCWrapper({
      cb: async () => await createTimeSlot(req.body),
      res,
    });
  }
);
router.put(
  "/",
  async (
    req: Request<
      {},
      {},
      {
        id: number;
        start?: Date;
        end?: Date;
        _delete?: boolean;
      }
    >,
    res: Response
  ) => {
    await TCWrapper({
      cb: async () =>
        await updateTimeSlot({ ...req.body, _delete: req.body._delete }),
      res,
    });
  }
);
router.put(
  "/assign",
  async (
    req: Request<
      {},
      {},
      {
        emp_id: number;
        ts_id: number;
        title?: string;
      }
    >,
    res: Response
  ) => {
    await TCWrapper({
      cb: async () => await assignTimeSlot({ ...req.body }),
      res,
    });
  }
);
router.get(
  "/employees",
  async (req: Request<{}, {}, { id: number }>, res: Response) => {
    await TCWrapper({
      cb: async () => await getTimeSlotEmployees(req.body),
      res,
    });
  }
);

export const timeslotRouter = router;
