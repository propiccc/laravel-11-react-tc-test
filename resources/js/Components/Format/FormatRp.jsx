const FormatRp = ({value}) => {
    const formattedNumber = new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);

    return formattedNumber;
  };
export default FormatRp
