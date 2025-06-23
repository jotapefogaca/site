export function stringToDate(dataString: string): Date {
  // Verifica se a string está no formato correto (YYYY-MM-DD)
  if (!/^\d{4}-\d{1,2}-\d{1,2}$/.test(dataString)) {
    throw new Error('Formato de data inválido. Utilize o formato YYYY-MM-DD.');
  }

  // Divide a string em partes (ano, mês, dia)
  const partesData = dataString.split('-');
  const ano = parseInt(partesData[0]);
  const mes = parseInt(partesData[1]) - 1; // O índice do mês em JavaScript começa em 0
  const dia = parseInt(partesData[2]);

  // Cria um objeto Date com a data especificada
  const dataConvertida = new Date(ano, mes, dia);

  // Retorna a data convertida
  return dataConvertida;
}
interface Timestamp {
  seconds: number;
  nanoseconds: number;
}
export function convertTimestampToDate(timestamp: Timestamp): Date {
  // O valor dos segundos é multiplicado por 1000 para converter para milissegundos
  const milliseconds = timestamp.seconds * 1000;
  return new Date(milliseconds);
}