const GenerateCodeOrders = () => {
  var result = '';
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  var digits = '0123456789';
  var charactersLength = characters.length;
  var digitsLength = digits.length;
  for (var i = 0; i < 3; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  for (var i = 0; i < 5; i++) {
    result += digits.charAt(Math.floor(Math.random() * digitsLength));
  }
  return result;
};

export default GenerateCodeOrders;
