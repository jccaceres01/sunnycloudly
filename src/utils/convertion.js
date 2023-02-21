export const mtok = (meters) => {
  return  `${(meters / 1000).toFixed(2)} KM`;
}

export const tempConverter = (kelvinTemp, convertionType) => {
  if (['c', 'f'].includes(convertionType) ) {
    let c = (kelvinTemp - 273.14).toFixed(2);
    let f = c * 1.8 + 32;

    switch(convertionType.toLowerCase()) {
      case 'c':
        return `${c} °C`;
      case 'f':
        return `${f} °F`;
      default:
        return ``;
    }
  }

  throw new Error('Invalid convertion params');
}