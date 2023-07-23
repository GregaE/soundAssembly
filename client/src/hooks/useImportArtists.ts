import { useState } from "react";
import { importLibrary, getTags } from "../ApiService";
import { useAppDispatch, useAppSelector } from "./reduxHooks";
import { fetchArtists, resetArtists } from "../store/librarySlice";
import { setTags } from '../store/tagsSlice';

function useImportArtists() {
  const [isLoadingImport, setIsLoadingImport] = useState(false);
  const [error, setError] = useState(false);
  const dispatch = useAppDispatch();
  const accessToken = useAppSelector((state) => state.user.accessToken);

  const importArtists = async () => {
    setError(false);
    setIsLoadingImport(true);
    try {
      await importLibrary(accessToken);
      dispatch(resetArtists());
      dispatch(fetchArtists());
      const tags = await getTags();
      if (tags && tags.length) dispatch(setTags(tags));
    } catch (error) {
      setError(true);
    }
    setIsLoadingImport(false);
  }

  return {
    importArtists,
    isLoadingImport,
    error,
  }
}


export default useImportArtists;