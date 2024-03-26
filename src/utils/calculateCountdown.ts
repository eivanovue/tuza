const calculateCountdown = (date: string): string => {
  const dateFuture = new Date(date);

  if (isNaN(dateFuture.getTime())) {
    throw new Error("Invalid date format");
  }
  
  const dateNow = new Date();

  const seconds = Math.floor((dateFuture.getTime() - dateNow.getTime()) / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  const remainingHours = hours - days * 24;
  const remainingMinutes = minutes - days * 24 * 60 - remainingHours * 60;

  if (remainingMinutes === 0) {
    return "Due";
  }

  return `${remainingMinutes} min`;
};

export default calculateCountdown;
