import { ParsedUrlQuery } from "querystring";
import { Category, Location } from "../generated/graphql";
import { useEffect, useState } from "react";

export interface Options {
  name: string;
  value: string | number;
  count?: number;
}
export const getAsString = (value: string | string[]): string => {
  if (Array.isArray(value)) {
    return value[0];
  }

  return value;
};

export const postQueries = (values: object) => {
  let queryObject = {};
  Object.entries(values).map((value) => {
    queryObject[value[0]] = value[1].name;
  });
  return queryObject;
};

export const initQueries = (
  query: ParsedUrlQuery,
  check: string,
  options: Options[]
) => {
  // If query item exists but the value is not in the possible options, send the first item in options
  if (query[check]) {
    const queryIndex = options.findIndex(
      (x) => x.name === getAsString(query[check]!)
    );
    return queryIndex > -1 ? options[queryIndex] : options[0];
  } else {
    return options[0];
  }
};

export const isObject = (value: object) => {
  return !!(value && typeof value === "object" && !Array.isArray(value));
};

export const toFormattedArray = (
  unformattedArray: string | string[] | Location[] | Category[]
): Options[] => {
  let listOfObjs: Options[] = [];
  let newObj = {} as Options;

  const newObjFunction = (name: string, value: string | number) => {
    newObj = { name: name, value: value };
    return listOfObjs.push(newObj);
  };

  if (Array.isArray(unformattedArray)) {
    unformattedArray.map((val) => {
      if (typeof val === "string") {
        newObj = { name: val, value: val };
        listOfObjs.push(newObj);
      } else if (
        typeof val === "object" &&
        (val.__typename === "Location" || val.__typename === "Category")
      ) {
        newObjFunction(val.name!, val.databaseId!);
        if ("children" in val) {
          val.children?.nodes?.map((child) => {
            newObjFunction(`-- ${child.name!}`, child.databaseId!);
          });
        }
      }
    });
  }
  return listOfObjs;
};

function useMediaQuery(query: string): boolean {
  const getMatches = (query: string): boolean => {
    // Prevents SSR issues
    if (typeof window !== "undefined") {
      return window.matchMedia(query).matches;
    }
    return false;
  };

  const [matches, setMatches] = useState<boolean>(getMatches(query));

  function handleChange() {
    setMatches(getMatches(query));
  }

  useEffect(() => {
    const matchMedia = window.matchMedia(query);

    // Triggered at the first client-side load and if query changes
    handleChange();

    // Listen matchMedia
    matchMedia.addEventListener("change", handleChange);

    return () => {
      matchMedia.removeEventListener("change", handleChange);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  return matches;
}

export default useMediaQuery;
