import { useEffect, useRef } from "react";

const useScrollToBottom = (dependency: any) => {
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const scrollElement = scrollRef.current;
    if (scrollElement) {
      scrollElement.scrollTop = scrollElement.scrollHeight;
    }
  }, [dependency]);

  return scrollRef;
};

export default useScrollToBottom;
