import { Response } from "express";

export const TCWrapper = async ({
  cb,
  errorCode,
  res,
  errorMessage,
}: {
  cb: Function;
  res: Response;
  errorCode?: number;
  errorMessage?: string;
}) => {
  try {
    const toReturn = await cb();
    res.send(toReturn);
  } catch (error: any) {
    res.status(errorCode || 400).send({
      error: true,
      message: errorMessage || error.message,
    });
  }
};
