import LineContext from "./LineContext";
import useFetch from "../../hooks/useFetch";
import lineMapper from "../../utils/lineMapper";
import sortLines from "../../utils/sortLines";
import filterOperationalLines from "../../utils/filterOperationalLines";
import { useEffect, useState } from "react";
import { LineListType, LineType, UseFetchType } from "../../types";

const LineProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [lines, setLines] = useState<LineListType>([]);
  const [operationalOnlyLines, setOperationalOnlyLines] =
    useState<LineListType>([]);

  const { data, loading, error, refetch }: UseFetchType<[] | null> = useFetch(
    "https://api.tfl.gov.uk/line/mode/tube/status"
  );

  useEffect(() => {
    if (!loading && data) {
      const mappedLines = data.map(lineMapper);
      const sortedLines = sortLines(mappedLines);
      const operationalLines = filterOperationalLines(sortedLines);
      setLines(sortedLines);
      setOperationalOnlyLines(operationalLines);
    }
  }, [data, loading]);

  const getLineById = (id: string) => {
    return lines.find((line: LineType) => line.id === id);
  };

  return (
    <LineContext.Provider
      value={{
        lines,
        operationalOnlyLines,
        loading,
        error,
        refetch,
        getLineById,
      }}
    >
      {children}
    </LineContext.Provider>
  );
};

export default LineProvider;
