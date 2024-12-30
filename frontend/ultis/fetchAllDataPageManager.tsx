import {
  getIdentity,
  getListConfig,
  getProcedure,
} from "@/services/apiServices";
import {
  loadFromLocalStorage,
  saveToLocalStorage,
} from "./localstoragePageManager";
import {
  setListConfig,
  setListIdentity,
  setListProcedure,
} from "@/shared/redux/list/listSlice";
import isEqual from "lodash/isEqual";

export const fetchAllData = async (userId: number, dispatch: any) => {
  const localProcedure = loadFromLocalStorage("listProcedure") || [];
  const localIdentity = loadFromLocalStorage("listIdentity") || [];
  const localConfig = loadFromLocalStorage("listConfig") || [];

  if (localProcedure.length || localIdentity.length || localConfig.length) {
    dispatch(setListProcedure(localProcedure));
    dispatch(setListIdentity(localIdentity));
    dispatch(setListConfig(localConfig));
  }

  try {
    const [procedureRes, identityRes, configRes] = await Promise.all([
      getProcedure(userId),
      getIdentity(userId),
      getListConfig(userId),
    ]);

    const newProcedure = procedureRes.data.data.map((item: any) => ({
      key: item.id,
      procedure: item._procedure,
      procedureName: item.name,
    }));

    const newIdentity = identityRes.data.data.map((item: any) => ({
      key: item.id,
      name: item.name,
      info: item.info,
      story: item.story,
      styleConversation: item.style_conversation,
      exampleConversation: item.example_conversation,
    }));

    const newConfig = configRes.data.data.map((item: any) => ({
      key: item.id,
      name: item.name,
      procedureID: item.id_procedure,
      identityID: item.id_identity,
      role: item.role,
      target: item.target,
      mission: item.mission,
      note: item.note,
    }));

    const isProcedureChanged = !isEqual(localProcedure, newProcedure);
    const isIdentityChanged = !isEqual(localIdentity, newIdentity);
    const isConfigChanged = !isEqual(localConfig, newConfig);

    if (isProcedureChanged || isIdentityChanged || isConfigChanged) {
      saveToLocalStorage("listProcedure", newProcedure);
      saveToLocalStorage("listIdentity", newIdentity);
      saveToLocalStorage("listConfig", newConfig);

      dispatch(setListProcedure(newProcedure));
      dispatch(setListIdentity(newIdentity));
      dispatch(setListConfig(newConfig));
    }
  } catch (error) {
    console.error("Error fetching data from API:", error);
  }
};
