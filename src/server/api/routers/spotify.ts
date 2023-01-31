import { z } from "zod";
import { getAccessToken, getTopItems } from "../../spotify";

import { createTRPCRouter, publicProcedure } from "../trpc";

export const spotifyRouter = createTRPCRouter({
  getTopItems: publicProcedure.query(async ({ ctx }) => {
    const accessToken = await getAccessToken();
    const topItems = await getTopItems(accessToken);
    return topItems;
  }),
});
