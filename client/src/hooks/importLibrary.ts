import { useState } from "react";
import { importLibrary } from "../ApiService";
import { useAppDispatch, useAppSelector } from "./reduxHooks";
import { setTags } from '../store/tagsSlice';
import { fetchArtists } from "../store/librarySlice";
import { Tag } from "../interfaces/Tag";

function useImportArtists() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const dispatch = useAppDispatch();
  const accessToken = useAppSelector((state) => state.user.accessToken);

  const importArtists = async () => {
    setError(false);
    setIsLoading(true);
    try {
      const account = await importLibrary(accessToken);
      // make sure the artists are refreshed, but don't push new artists
      // dispatch(fetchArtists())
      const newTagList = account.tags.map(function(tag: Tag) {
        return {name:tag.name, status: "inactive"}
      })
      dispatch(setTags(newTagList));
    } catch (error) {
      setError(true);
    }

    setIsLoading(false);
  }

  return {
    importArtists,
    isLoading,
    error,
  }
}


export default useImportArtists;