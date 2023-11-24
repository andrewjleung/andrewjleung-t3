import { useState } from "react";
import { useInterval } from "./use-interval";

export function useRandomTransition(
  finalString?: string,
  limit = 50,
  tick = 15,
  delay = 500,
): [string, boolean] {
  const letters = "ABCDEFGHIJKLMNOPRSTUVWXYZ";
  const [started, setStarted] = useState(false);
  const [randomString, setRandomString] = useState("");
  const [hasTransitioned, setHasTransitioned] = useState(false);
  const [pointer, setPointer] = useState(0);

  const makeRandomString = (length: number): string =>
    Array(length)
      .fill("0")
      .map(() => letters[Math.floor(Math.random() * letters.length)])
      .join("");

  useInterval(
    () => {
      setStarted(true);
    },
    started ? null : delay,
  );

  useInterval(
    () => {
      if (finalString === undefined) {
        setRandomString((randomString) =>
          makeRandomString(Math.min(randomString.length + 1, limit)),
        );
        return;
      }

      if (randomString === finalString) {
        setHasTransitioned(true);
        setStarted(false);
        return;
      }

      setRandomString((randomString) =>
        finalString.slice(0, pointer).concat(
          makeRandomString(
            Math.max(
              0,
              (() => {
                if (randomString.length < finalString.length) {
                  return randomString.length - pointer + 1;
                } else if (randomString.length > finalString.length) {
                  return randomString.length - pointer - 1;
                } else {
                  return randomString.length - pointer;
                }
              })(),
            ),
          ),
        ),
      );

      setPointer((pointer) => pointer + 1);
    },
    started && !hasTransitioned ? tick : null,
  );

  return [randomString, hasTransitioned];
}
