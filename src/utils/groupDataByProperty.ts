// eslint-disable-next-line @typescript-eslint/no-explicit-any
const groupDataByProperty = (data: any[], property: string) =>
  data.reduce((result, item) => {
    const group = item[property];
    if (group !== undefined) {
      result[group] = result[group] || [];
      result[group].push(item);
    }
    return result;
  }, {});

export default groupDataByProperty;