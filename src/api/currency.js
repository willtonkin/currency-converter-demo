export async function getLatest(symbol) {
  const endpointUrl = `http://fixer.handlebarlabs.com/latest?base=${symbol}`;
  let response = null;

  try {
    response = await fetch(endpointUrl).then(response => response.json());
  } catch (e) {
    throw new Error("Failed to get currency rates", e);
  }

  return response.rates;
}

export const symbols = [
  {value: "AUD", label: "Australian Dollar"},
  {value: "BGN", label: "Bulgarian Lev"},
  {value: "BRL", label: "Brazilian Real"},
  {value: "CAD", label: "Canadian Dollar"},
  {value: "CHF", label: "Swiss Franc"},
  {value: "CNY", label: "Chinese Yuan"},
  {value: "CZK", label: "Czech Republic Koruna"},
  {value: "DKK", label: "Danish Krone"},
  {value: "EUR", label: "Euro"},
  {value: "GBP", label: "British Pound Sterling"},
  {value: "HKD", label: "Hong Kong Dollar"},
  {value: "HRK", label: "Croatian Kuna"},
  {value: "HUF", label: "Hungarian Forint"},
  {value: "IDR", label: "Indonesian Rupiah"},
  {value: "ILS", label: "Israeli New Sheqel"},
  {value: "INR", label: "Indian Rupee"},
  {value: "ISK", label: "Icelandic Króna"},
  {value: "JPY", label: "Japanese Yen"},
  {value: "KRW", label: "South Korean Won"},
  {value: "MXN", label: "Mexican Peso"},
  {value: "MYR", label: "Malaysian Ringgit"},
  {value: "NOK", label: "Norwegian Krone"},
  {value: "NZD", label: "New Zealand Dollar"},
  {value: "PHP", label: "Philippine Peso"},
  {value: "PLN", label: "Polish Zloty"},
  {value: "RON", label: "Romanian Leu"},
  {value: "RUB", label: "Russian Ruble"},
  {value: "SEK", label: "Swedish Krona"},
  {value: "SGD", label: "Singapore Dollar"},
  {value: "THB", label: "Thai Baht"},
  {value: "TRY", label: "Turkish Lira"},
  {value: "USD", label: "United States Dollar"},
  {value: "ZAR", label: "South African Rand"}
];
