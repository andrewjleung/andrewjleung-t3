import { createTRPCRouter } from "~/server/api/trpc";
import { githubRouter } from "./routers/github";
import { spotifyRouter } from "./routers/spotify";
import { weatherRouter } from "./routers/weather";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
	spotify: spotifyRouter,
	github: githubRouter,
	weather: weatherRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
