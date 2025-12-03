import { useState, useEffect, useRef, useCallback } from "react";

interface UseCountdownProps {
  initialCount: number;
  onComplete?: () => void;
  syncToTOTP?: boolean; // Sync to TOTP period (30 seconds)
}

interface UseCountdownReturn {
  count: number;
  resetCounter: () => void;
  startCounter: () => void;
  stopCounter: () => void;
}

export function useCountdown({
  initialCount,
  onComplete,
  syncToTOTP = false,
}: UseCountdownProps): UseCountdownReturn {
  const [count, setCount] = useState(initialCount);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const stopCounter = useCallback(() => {
    setIsRunning(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const resetCounter = useCallback(() => {
    stopCounter();
    setCount(initialCount);
  }, [initialCount, stopCounter]);

  const startCounter = useCallback(() => {
    if (syncToTOTP) {
      // Calculate remaining seconds in current TOTP period
      const now = Math.floor(Date.now() / 1000);
      const remaining = initialCount - (now % initialCount);
      setCount(remaining);
    }
    setIsRunning(true);
  }, [syncToTOTP, initialCount]);

  useEffect(() => {
    if (!isRunning) return;

    const updateCount = () => {
      if (syncToTOTP) {
        // Calculate remaining seconds based on current time
        const now = Math.floor(Date.now() / 1000);
        const remaining = initialCount - (now % initialCount);

        if (remaining === initialCount) {
          // New period started, trigger callback
          if (onComplete) {
            onComplete();
          }
        }

        setCount(remaining);
      } else {
        setCount((prevCount) => {
          if (prevCount <= 1) {
            // When count reaches 0
            if (onComplete) {
              onComplete();
            }
            // Restart from original value
            return initialCount;
          }
          return prevCount - 1;
        });
      }
    };

    // Update immediately
    updateCount();

    intervalRef.current = setInterval(updateCount, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, initialCount, onComplete, syncToTOTP]);

  return {
    count,
    resetCounter,
    startCounter,
    stopCounter,
  };
}
