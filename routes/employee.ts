import { employee, PrismaClient } from "@prisma/client";
import { Request, Response, Router } from "express";
import { TCWrapper } from "../ReqResTryCatchWrapper";
const router = Router();
const prisma = new PrismaClient();

const validateEmail = (email: string) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

const createEmployee = async ({ email, name }: Omit<employee, "id">) => {
  if (!validateEmail(email)) throw new Error("Invalid email format");
  const created = await prisma.employee.create({
    data: {
      email,
      name,
    },
  });
  return created;
};

const updateEmployee = async ({
  _delete = false,
  id,
  email,
  name,
}: {
  id: number;
  name?: string;
  email?: string;
  _delete?: boolean;
}) => {
  if (!_delete) {
    if (
      typeof email == "string" &&
      email.trim().length > 0 &&
      !validateEmail(email)
    )
      throw new Error("Invalid email format to update");
    const updated = await prisma.employee.update({
      where: {
        id,
      },
      data: {
        email,
        name,
      },
    });
    return updated;
  } else {
    await prisma.employee.delete({
      where: {
        id,
      },
    });
    return { success: true };
  }
};

const getEmployeeTimeSlots = async ({ id }: { id: number }) => {
  return (
    await prisma.employee.findFirst({
      where: {
        id,
      },
      select: {
        time_slots: {
          select: {
            title: true,
            time_slot: {
              select: {
                end: true,
                start: true,
                id: true,
              },
            },
          },
        },
      },
    })
  )?.time_slots.map((ts) => ({ ...ts.time_slot, title: ts.title }));
};

router.post(
  "/",
  async (req: Request<{}, {}, Omit<employee, "id">>, res: Response) => {
    await TCWrapper({
      cb: async () => await createEmployee(req.body),
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
        name?: string;
        email?: string;
        _delete?: boolean;
      }
    >,
    res: Response
  ) => {
    await TCWrapper({
      cb: async () =>
        await updateEmployee({ ...req.body, _delete: req.body._delete }),
      res,
    });
  }
);
router.get(
  "/timeslots",
  async (req: Request<{}, {}, { id: number }>, res: Response) => {
    await TCWrapper({
      cb: async () => await getEmployeeTimeSlots(req.body),
      res,
    });
  }
);

export const employeeRouter = router;
