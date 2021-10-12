import { useEffect, useRef, useState } from "react";
import Places from "places.js";

export default function useAlgoliaPlaces({ options, events }) {
  const algoliaPlacesRef = useRef();
  const [container, setContainer] = useState();

  useEffect(() => {
    if (container) {
      const algoliaPlaces = Places({ ...options, container });
      const e = [
        "onSuggestions",
        "onCursorChanged",
        "onChange",
        "onClear",
        "onLimit",
        "onError",
      ]
        .filter((prop) => !!events[prop])
        .map((prop) => ({ prop, eventName: prop.substr(2).toLowerCase() }));

      e.forEach(({ prop, eventName }) =>
        algoliaPlaces.on(eventName, events[prop])
      );
      algoliaPlacesRef.current = algoliaPlaces;

      return () =>
        e.forEach(({ eventName }) =>
          algoliaPlaces.removeAllListeners(eventName)
        );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [container]);

  return setContainer;
}
