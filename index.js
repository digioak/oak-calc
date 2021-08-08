const readLine = require('readline-sync');

while (true) {
  console.log('Loan calculator. Please provide the following data:');

  const isValidLoanAmount = amount => (amount > 0) && !Number.isNaN(amount);

  let principle = 0;
  while (!isValidLoanAmount(principle)) {
    principle = readLine.question('Loan amount: $ ');
    principle = parseFloat(principle.replace(',', ''));
    if (!isValidLoanAmount(principle)) console.log('Error: Invalid loan amount. Loan amount must be greater than 0.');
  }

  let apr = -1;
  while (apr < 0) {
    apr = readLine.questionFloat('Loan APR (for example, 5.5%): ', { limitMessage: 'Invalid rate, please try again.'});
    if (apr < 0) console.log('Error: APR must be 0 or greater.');
  }

  apr /= 100;

  let loanYears = 0;
  while (loanYears <= 0) {
    loanYears = readLine.questionInt('Loan duration (in years): ', { limitMessage: 'Invalid duration, please try again.'});
    if (loanYears < 1) console.log('Error: Loan duration must be 1 or greater');
  }

  const MONTHS_PER_YEAR = 12;

  const mpr = apr / MONTHS_PER_YEAR;
  const loanMonths = loanYears * MONTHS_PER_YEAR;

  const monthlyPayment = principle *
    (mpr / (1 - Math.pow((1 + mpr), (-loanMonths))));

  console.log(`Your monthly payment is $${monthlyPayment.toFixed(2)}.`);

  if (!readLine.keyInYN('Another calculation?')) break;
}
