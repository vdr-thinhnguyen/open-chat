import { IConversation } from "@/types";
export const updateConversationByUuid = (
  arr: IConversation[],
  uuid: string,
  updatedObject: IConversation
) => {
  if (!arr || !arr?.length) return [];
  const index = arr.findIndex((obj) => obj.uuid === uuid);
  if (index !== -1) {
    arr[index] = { ...arr[index], ...updatedObject };
  }
  return arr;
};
