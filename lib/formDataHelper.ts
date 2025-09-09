// hooks/useFormDataUploader.ts
import * as FileSystem from "expo-file-system";
import { useCallback } from "react";

/**
 * Hook returns a helper to build FormData with files in React Native/Expo.
 */
export function useFormDataUploader() {
  const prepareFile = useCallback(
    async (uri: string, name?: string, type?: string) => {
      const filename = name ?? uri.split("/").pop() ?? "file";
      const mime = type ?? "application/octet-stream";

      // copy the file into cache so fetch/axios can read it
      const cachePath = FileSystem.cacheDirectory + filename;
      await FileSystem.copyAsync({ from: uri, to: cachePath });

      return {
        uri: cachePath,
        name: filename,
        type: mime,
      } as any; // FormData file object
    },
    []
  );

  const buildFormData = useCallback(
    async (
      fields: Record<string, any>,
      files?: { field: string; uri: string; name?: string; type?: string }[]
    ) => {
      const formData = new FormData();

      // append normal fields
      Object.entries(fields).forEach(([key, value]) => {
        formData.append(key, value);
      });

      // append files
      if (files) {
        for (const f of files) {
          const fileObj = await prepareFile(f.uri, f.name, f.type);
          formData.append(f.field, fileObj);
        }
      }

      return formData;
    },
    [prepareFile]
  );

  return { buildFormData };
}
