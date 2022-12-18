import { useState } from "react";
import { importLibrary } from "../ApiService";
import { useAppDispatch, useAppSelector } from "./reduxHooks";
import { fetchArtists } from "../store/librarySlice";

function useImportArtists() {
  const [isLoadingImport, setIsLoadingImport] = useState(false);
  const [error, setError] = useState(false);
  const dispatch = useAppDispatch();
  const accessToken = useAppSelector((state) => state.user.accessToken);

  const importArtists = async () => {
    setError(false);
    setIsLoadingImport(true);
    try {
      const account = await importLibrary(accessToken);
      // make sure the artists are refreshed, but don't push new artists
      // dispatch(fetchArtists())
      console.log(account)
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