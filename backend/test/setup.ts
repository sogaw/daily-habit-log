import "@/lib/fire"; // for initialize

import { buildHTTPExecutor } from "@graphql-tools/executor-http";
import { parse } from "graphql";
import { isString } from "lodash";
import request from "request";

import * as auth from "@/lib/auth";
import * as gen from "@/lib/gen";
import * as storage from "@/lib/storage";
import { yoga } from "@/yoga";

/**
 * Misc
 */
console.debug = () => undefined; // disable console.debug

export const sleep = (ms = 0) =>
  new Promise((resolve) =>
    setTimeout(() => {
      resolve(true);
    }, ms)
  );

/**
 * Executor
 */
type Executor = ReturnType<typeof buildHTTPExecutor>;
type ExecutorParams = Parameters<Executor>;

const executorOriginal = buildHTTPExecutor({ fetch: yoga.fetch });

const executor = <T = { data: any; errors: any }>(...params: ExecutorParams) =>
  executorOriginal(...params).then((v) => {
    if (Symbol.asyncIterator in v) throw new Error("Expected single value");
    return v as T;
  });
export const execute = (s: string) => executor({ document: parse(s) });

export const nullable = (v: string | number | boolean | null | undefined) => {
  if (!v) return null;
  if (isString(v)) return `"${v}"`;
  return v;
};

/**
 * Mock
 */
// Mock Auth
export const mockWithAuth = ({ uid }: { uid: string }) => {
  jest.spyOn(auth, "extractJWT").mockImplementation(() => "_token");
  jest.spyOn(auth, "decodeJWT").mockImplementation(() => Promise.resolve({ uid }));
};

export const mockWithNoAuth = () => {
  jest.spyOn(auth, "extractJWT").mockImplementation(() => undefined);
};

// Mock Storage
export const mockGetSignedUrl = (publicUrl: string) => {
  jest.spyOn(storage, "getSignedUrl").mockImplementation(() => Promise.resolve(publicUrl));
};

export const mockDeleteFile = () => {
  jest.spyOn(storage, "deleteFile").mockImplementation(() => Promise.resolve());
};

export const mockDeleteFileRecursive = () => {
  jest.spyOn(storage, "deleteFileRecursive").mockImplementation(() => Promise.resolve());
};

// Mock Date
export const mockGenNow = (date: Date) => {
  jest.spyOn(gen, "genNow").mockImplementation(() => date);
};

/**
 * Emulator
 */
export const clearFirestore = async () => {
  await request({
    url: `http://${process.env.FIRESTORE_EMULATOR_HOST}/emulator/v1/projects/${process.env.GCLOUD_PROJECT}/databases/(default)/documents`,
    method: "DELETE",
  });
  await sleep(100); // need to wait to clear
};
