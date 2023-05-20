import { FireCollection, FireCollectionGroup } from "@/datasource/fire-model-package";
import { createDatasourceContext } from "@/resolver";

import { clearFirestore } from "./util";

export const datasource = createDatasourceContext();

export const clearDatasource = async () => {
  await clearFirestore();
  Object.values(datasource).forEach((v) => {
    if (v instanceof FireCollection || v instanceof FireCollectionGroup) v.loader.clearAll();
  });
};
