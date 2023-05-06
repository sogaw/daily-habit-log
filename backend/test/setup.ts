import "@/lib/fire"; // initialize

import { buildHTTPExecutor } from "@graphql-tools/executor-http";
import { parse } from "graphql";
import { isString } from "lodash";
import request from "request";

import { decodeJWT, extractJWT } from "@/lib/auth";
import { genNow } from "@/lib/gen";
import { deleteFile, deleteFileRecursive, getSignedUrl } from "@/lib/storage";
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
jest.mock("@/lib/auth");

export const mockWithAuth = ({ uid }: { uid: string }) => {
  (extractJWT as jest.Mock).mockResolvedValue("_token");
  (decodeJWT as jest.Mock).mockResolvedValue({ uid });
};

export const mockWithNoAuth = () => {
  (extractJWT as jest.Mock).mockResolvedValue(null);
  (decodeJWT as jest.Mock).mockResolvedValue(null);
};

// Mock Storage
jest.mock("@/lib/storage");

export const mockGetSignedUrl = (publicUrl: string) => {
  (getSignedUrl as jest.Mock).mockResolvedValue(publicUrl);
};

export const mockDeleteFile = () => {
  (deleteFile as jest.Mock).mockResolvedValue(null);
};

export const mockDeleteFileRecursive = () => {
  (deleteFileRecursive as jest.Mock).mockResolvedValue(null);
};

// Mock Date
jest.mock("@/lib/gen");

export const mockGenNow = (date: Date) => {
  (genNow as jest.Mock).mockReturnValue(date);
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
