import React, { useEffect, useState } from "react";
import PreviewBoxDetails from "./PreviewBoxDetails";
import ButtonLoadMore from "../../buttons/ButtonLoadMore";
import { useWallpaperContext } from "../../../hooks/wallpaper/useWallpaperContext";
import { useAuthContext } from "../../../hooks/auth/useAuthContext";

// css
import "../../../css/previews.css";
import { useVerifyAuth } from "../../../hooks/auth/useVerifyAuth";
import BubbleSearchBar from "../../searchBar/bubbleSearchBar";
import { useFilterContext } from "../../../hooks/wallpaper/useFilterContext";
import Loader from "../../utils/Loader";

let first_load = 0;

const ExtendPreviews = ({ x, title }) => {
  const { user } = useAuthContext();
  const [isLoading, setIsLoading] = useState(false);
  const { verifyAuth } = useVerifyAuth();
  const { likedFilter, newFilter, searchFilter } = useFilterContext();

  const { wallpapers, noMoreLoad, dispatch } = useWallpaperContext();

  const handleRefresh = async () => {
    fetchXWallpaper(x, true);
  };
  const fetchXWallpaper = async (x, resetIdArray = false) => {
    setIsLoading(true);

    let idArray = [];
    if (!resetIdArray) {
      idArray = wallpapers.map(({ _id }) => _id);
    }
    let headers = {
      "Content-type": "application/json",
    };
    if (user) {
      headers.Authorization = `Baerer ${user.token}`;
    }
    const response = await fetch(
      process.env.REACT_APP_PROXY + "/api/wallpapers/getX",
      {
        method: "POST",
        body: JSON.stringify({
          idArray,
          x,
          filters: {
            liked: likedFilter,
            new: newFilter,
            search: searchFilter,
          },
        }),
        headers,
      }
    );
    const json = await response.json();

    if (response.ok) {
      if (
        JSON.stringify(json.filters) ===
        JSON.stringify({
          liked: likedFilter,
          new: newFilter,
          search: searchFilter,
        })
      ) {
        if (resetIdArray) {
          dispatch({ type: "SET_NO_MORE_LOAD", payload: false });
          dispatch({ type: "SET_WALLPAPER", payload: [] });
        }
        if (json.wallpapers.length < x) {
          dispatch({ type: "SET_NO_MORE_LOAD", payload: true });
        }
        dispatch({ type: "MERGE_WALLPAPER", payload: json.wallpapers });
      }
    } else {
      if (user) {
        verifyAuth(json);
      }
    }
    setIsLoading(false);
  };

  // init
  useEffect(() => {
    first_load = 0;
    if (wallpapers.length === 0) {
      fetchXWallpaper(x, true);
    }
  }, [x]);

  // reset on filter change
  useEffect(() => {
    if (first_load === 2) {
      fetchXWallpaper(x, true);
    } else {
      first_load += 1;
    }
  }, [likedFilter, newFilter, searchFilter]);

  // reset on deco
  useEffect(() => {
    if (first_load === 2) {
      fetchXWallpaper(x, true);
    } else {
      first_load += 1;
    }
  }, [user]);

  return (
    <div className="extendPreviews extendPreviewsCTN">
      {title && (
        <div className="pageTitleContainer darkSecondaryColor">
          <h1 className="pageTitle negativeDefaultFontColor">{title}</h1>
          <div className="searchContainer">
            <div className="filterContainer">
              <BubbleSearchBar
                className="negativeDefaultFontColor"
                content="Search"
                dispatch_type="SET_SEARCH"
                value={searchFilter}
              />
            </div>
            <div className="sortContainer">
              <BubbleSearchBar
                className="negativeDefaultFontColor"
                color="#FD8A8A99"
                content="Like"
                searchBar={false}
                dispatch_type="SET_LIKED"
                value={likedFilter}
              />
              <BubbleSearchBar
                className="negativeDefaultFontColor"
                color="#B5D5C599"
                content="New"
                searchBar={false}
                dispatch_type="SET_NEW"
                value={newFilter}
              />
              <div className="refreshButton">
                <span
                  onClick={() => handleRefresh()}
                  className="material-symbols-outlined icon iconFilled"
                >
                  refresh
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {wallpapers &&
            wallpapers.map((wallpaper, index) => (
              <PreviewBoxDetails
                key={index}
                wallpaper={wallpaper}
                isLast={index === wallpapers.length - 1}
              />
            ))}
          {noMoreLoad ? (
            <h1 className="noMoreContent">
              {wallpapers.length > 0
                ? "There is no more content to pull"
                : "The search/filters yielded no results."}
            </h1>
          ) : (
            !isLoading && <ButtonLoadMore loadMore={fetchXWallpaper} x={x} />
          )}
        </>
      )}
    </div>
  );
};

export default ExtendPreviews;
