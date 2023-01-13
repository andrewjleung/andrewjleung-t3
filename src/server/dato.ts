import { env } from "../env/server.mjs";
import type { Variables } from "graphql-request";
import { request as graphqlRequest } from "graphql-request";
import type { RequestDocument } from "graphql-request/dist/types";
import type { TypedDocumentNode } from "@graphql-typed-document-node/core";

export function request<TDocument = any, TVariables = Record<string, any>>(
  document: RequestDocument | TypedDocumentNode<TDocument, Variables>,
  variables?: Variables
) {
  return graphqlRequest<TDocument, Variables>(
    "https://graphql.datocms.com/",
    document,
    variables,
    {
      Authorization: env.DATO_API_TOKEN,
      "X-Exclude-Invalid": "true",
    }
  );
}
