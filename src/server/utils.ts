import type { z } from "zod";

export const handle200 = <T>(
  response: Response,
  schema: z.ZodSchema<T>
): Promise<T | undefined> =>
  response
    .json()
    .then((res) => schema.parse(res))
    .catch((err) => {
      console.error(err);
      return undefined;
    });
