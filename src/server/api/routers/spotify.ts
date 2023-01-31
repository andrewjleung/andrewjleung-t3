import { z } from "zod";
import { getAccessToken, getPlaybackState, getTopItems } from "../../spotify";

import { createTRPCRouter, publicProcedure } from "../trpc";

export const spotifyRouter = createTRPCRouter({
  getTopItems: publicProcedure.query(async ({ ctx }) => {
    const accessToken = await getAccessToken();
    const topItems = await getTopItems(accessToken);
    return topItems;
  }),
  getPlaybackState: publicProcedure.query(async ({ ctx }) => {
    const accessToken = await getAccessToken();
    const playbackState = await getPlaybackState(accessToken);
    return playbackState;
  }),
});
