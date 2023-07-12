export function convertDateToTable(fechaString) {
  const date = new Date(fechaString);
  // Obtener las partes de la fecha en el formato deseado
  const year = date.getFullYear() - 2000;
  const month = date.getMonth() + 1;
  const day = date.getDate();

  // Combinar las partes en el formato "YYYY-MM-DD"
  //const formattedDate = `${year}-${month}-${day}`;

  // Combinar las partes en el formato "DD/MM/YY"
  const formattedDate = `${day}/${month < 10 ? "0" + month : month}/${year}`;

  return formattedDate;
}

export function convertDateToInput(dateString) {
  const date = new Date(dateString);
  // Obtener las partes de la fecha en el formato deseado
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  // Combinar las partes en el formato "DD/MM/YYYY"
  const formattedDate = `${day}/${month}/${year}`;
  return formattedDate;
}
