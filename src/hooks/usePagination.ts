import {useEffect, useMemo, useState} from 'react';

const usePagination = (totalCount: number) => {
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [afterArr, setAfterArr] = useState<string[]>(['']);
  const [after, setAfter] = useState<string>('');
  const [localLoading, setLocalLoading] = useState<boolean>(false);

  const pageAmount = useMemo(() => Math.ceil(totalCount / 10), [totalCount]);

  const nextClickHandler = () => {
    setLocalLoading(true);
    if (afterArr.length <= pageAmount) {
      setAfter(afterArr[afterArr.length - 1]);
    }
    if (pageNumber < pageAmount) {
      setPageNumber(prevState => prevState + 1);
    }
  };

  const prevClickHandler = () => {
    setLocalLoading(true);
    if (afterArr.length > 2) {
      const mutedArray = afterArr.slice(0, -2);
      setAfterArr(mutedArray);
      setAfter(afterArr[mutedArray.length - 1]);
    }
    if (pageNumber > 1) {
      setPageNumber(prevState => prevState - 1);
    }
  };

  useEffect(() => {
    if (pageNumber === 1) {
      setAfter('');
    }
  }, [pageNumber]);

  return {
    pageNumber,
    setAfterArr,
    setLocalLoading,
    nextClickHandler,
    prevClickHandler,
    pageAmount,
    localLoading,
    after,
  };
};

export default usePagination;
