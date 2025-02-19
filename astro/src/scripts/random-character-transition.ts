const CHARACTERS = "ABCDEFGHIJKLMNOPRSTUVWXYZ0123456789";

type TransitionPhase = "stopped" | "random" | "transition";

function randomString(length: number) {
  let str = "";

  while (str.length < length) {
    str += CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)];
  }

  return str;
}

export async function randomCharacterTransition(
  action: () => Promise<string>,
  emitTransitionString: (str: string) => void,
  errorString: string,
  timeout = 10000,
  delay = 1750,
) {
  let target: string | undefined;
  let phase: TransitionPhase = "stopped";
  let transitionStringLength = 0;
  let leftTransitionPointer = 0;

  function updateStats() {
    if (phase === "stopped") {
      return;
    }

    if (phase === "random") {
      emitTransitionString(randomString(transitionStringLength));

      if (transitionStringLength < 44) {
        transitionStringLength += 1;
      }
    } else if (phase === "transition" && target !== undefined) {
      const stat = target.slice(0, leftTransitionPointer).concat(
        randomString(
          Math.max(
            0,
            (() => {
              if (transitionStringLength < target.length) {
                return transitionStringLength - leftTransitionPointer + 1;
              } else if (transitionStringLength > target.length) {
                return transitionStringLength - leftTransitionPointer - 1;
              } else {
                return transitionStringLength - leftTransitionPointer;
              }
            })(),
          ),
        ),
      );

      emitTransitionString(stat);

      if (stat === target) {
        phase = "stopped";
      }

      leftTransitionPointer += 1;
    }
  }

  action()
    .then((result) => {
      target = result;
      phase = "transition";
    })
    .catch(() => {
      target = errorString;
      phase = "stopped";
    });

  setTimeout(() => {
    if (target === undefined) {
      phase = "random";
    }
  }, delay);
  setInterval(updateStats, 20);

  setTimeout(() => {
    target = errorString;
    phase = "stopped";
  }, timeout);
}
