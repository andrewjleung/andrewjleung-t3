# andrewjleung.me

This is the new repo for my personal site/portfolio/blogging space, made with [create-t3-app](https://create.t3.gg/) for no reason really other than that I wanted to play with these technologies.

Overall, this app "uses" the following technologies:

- Next.js
- tRPC
- Prisma
- DatoCMS
- GraphQL

## Why tRPC?

It's cool, and my personal website is low stakes. If I ever want to introduce more sophisticated interactions, it'll be quite nice to use. I know, my reasoning is not bulletproof, but I'm just trying to have fun with it.

## Why Prisma?

See the above.

## Why GraphQL? Aren't you using tRPC?

In its current state, I'm not really using much of either to be honest. However, GraphQL is used here to query content from DatoCMS with end-to-end type-safety, albeit relying on [code generation](https://the-guild.dev/graphql/codegen).
