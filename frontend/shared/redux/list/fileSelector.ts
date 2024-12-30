import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  setListConfig,
  setListIdentity,
  setListPageManager,
  setListProcedure,
} from "./listSlice";
import { AppDispatch, RootState } from "../store";
import {
  Config,
  Identity,
  PageManager,
  Procedure,
} from "@/shared/types/commonTypes";
import { saveToLocalStorage } from "@/ultis/localstoragePageManager";

export const addNewConfig = createAsyncThunk<
  void,
  Config,
  { dispatch: AppDispatch; state: RootState }
>("list/addNewConfig", async (config, { dispatch, getState }) => {
  const currentList = getState().list.listConfig;
  const updatedList = [...currentList, config];
  dispatch(setListConfig(updatedList));
  saveToLocalStorage("listConfig", updatedList);
});

export const updateConfig = createAsyncThunk<
  void,
  Config,
  { dispatch: AppDispatch; state: RootState }
>("list/updateConfig", async (config, { dispatch, getState }) => {
  const currentList = getState().list.listConfig;
  const updatedList = currentList.map((item) =>
    item.key === config.key ? { ...item, ...config } : item
  );
  dispatch(setListConfig(updatedList));
  saveToLocalStorage("listConfig", updatedList);
});

export const deleteConfig = createAsyncThunk<
  void,
  string,
  { dispatch: AppDispatch; state: RootState }
>("list/deleteConfig", async (configKey, { dispatch, getState }) => {
  const currentList = getState().list.listConfig;
  const updatedList = currentList.filter(
    (item: Config) => item.key !== configKey
  );
  dispatch(setListConfig(updatedList));
  saveToLocalStorage("listConfig", updatedList);
});

export const addNewProcedure = createAsyncThunk<
  void,
  Procedure,
  { dispatch: AppDispatch; state: RootState }
>("list/addNewProcedure", async (procedure, { dispatch, getState }) => {
  const currentList = getState().list.listProcedure;
  const updatedList = [...currentList, procedure];
  dispatch(setListProcedure(updatedList));
  saveToLocalStorage("listProcedure", updatedList);
});

export const updateProcedure = createAsyncThunk<
  void,
  Procedure,
  { dispatch: AppDispatch; state: RootState }
>("list/updateProcedure", async (procedure, { dispatch, getState }) => {
  const currentList = getState().list.listProcedure;
  const updatedList = currentList.map((item) =>
    item.key === procedure.key ? { ...item, ...procedure } : item
  );
  dispatch(setListProcedure(updatedList));
  saveToLocalStorage("listProcedure", updatedList);
});

export const deleteProcedure = createAsyncThunk<
  void,
  string,
  { dispatch: AppDispatch; state: RootState }
>("list/deleteProcedure", async (procedureKey, { dispatch, getState }) => {
  const currentList = getState().list.listProcedure;
  const updatedList = currentList.filter(
    (item: Procedure) => item.key !== procedureKey
  );
  dispatch(setListProcedure(updatedList));
  saveToLocalStorage("listProcedure", updatedList);
});

export const updateIdentity = createAsyncThunk<
  void,
  Identity,
  { dispatch: AppDispatch; state: RootState }
>("list/updateIdentity", async (identity, { dispatch, getState }) => {
  const currentList = getState().list.listIdentity;
  const updatedList = currentList.map((item) =>
    item.key === identity.key ? { ...item, ...identity } : item
  );
  dispatch(setListIdentity(updatedList));
  saveToLocalStorage("listIdentity", updatedList);
});

export const addNewIdentity = createAsyncThunk<
  void,
  Identity,
  { dispatch: AppDispatch; state: RootState }
>("list/addNewIdentity", async (identity, { dispatch, getState }) => {
  const currentList = getState().list.listIdentity;
  const updatedList = [...currentList, identity];
  dispatch(setListIdentity(updatedList));
  saveToLocalStorage("listIdentity", updatedList);
});

export const deleteIdentity = createAsyncThunk<
  void,
  string,
  { dispatch: AppDispatch; state: RootState }
>("list/deleteIdentity", async (identityKey, { dispatch, getState }) => {
  const currentList = getState().list.listIdentity;
  const updatedList = currentList.filter(
    (item: Identity) => item.key !== identityKey
  );
  dispatch(setListIdentity(updatedList));
  saveToLocalStorage("listIdentity", updatedList);
});

export const updatePage = createAsyncThunk<
  void,
  PageManager,
  { dispatch: AppDispatch; state: RootState }
>("list/updatePage", async (page, { dispatch, getState }) => {
  const currentList = getState().list.listPage;
  const updatedList = currentList.map((item) =>
    item.key === page.key ? { ...item, ...page } : item
  );
  dispatch(setListPageManager(updatedList));
  saveToLocalStorage("listPage", updatedList);
});

export const deletePage = createAsyncThunk<
  void,
  string,
  { dispatch: AppDispatch; state: RootState }
>("list/deletePage", async (pageKey, { dispatch, getState }) => {
  const currentList = getState().list.listPage;
  const updatedList = currentList.filter(
    (item: PageManager) => item.key !== pageKey
  );
  dispatch(setListPageManager(updatedList));
  saveToLocalStorage("listPage", updatedList);
});
