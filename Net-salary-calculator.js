function calculateNetSalary(basicSalary, benefits) {
  // -----------------------------
  // CONSTANTS
  // -----------------------------
  const personalRelief = 2400; // KRA personal relief
  const housingLevyRate = 0.015; // 1.5%
  const shifRate = 0.0275; // 2.75% of gross
  const nssfTier1Limit = 8000;
  const nssfTier2Limit = 72000;
  const nssfRate = 0.06; // 6%

  // -----------------------------
  // GROSS SALARY
  // -----------------------------
  const grossSalary = basicSalary + benefits;

  // -----------------------------
  // NSSF (Tier I & II)
  // -----------------------------
  let nssfDeduction = 0;
  if (grossSalary <= nssfTier1Limit) {
    nssfDeduction = grossSalary * nssfRate;
  } else if (grossSalary <= nssfTier2Limit) {
    nssfDeduction = (nssfTier1Limit * nssfRate) + ((grossSalary - nssfTier1Limit) * nssfRate);
  } else {
    nssfDeduction = (nssfTier1Limit * nssfRate) + ((nssfTier2Limit - nssfTier1Limit) * nssfRate);
  }

  // -----------------------------
  // TAXABLE PAY
  // -----------------------------
  const taxablePay = grossSalary - nssfDeduction;

  // -----------------------------
  // PAYE (2023 bands)
  // -----------------------------
  let paye = 0;
  if (taxablePay <= 24000) {
    paye = taxablePay * 0.10;
  } else if (taxablePay <= 32333) {
    paye = (24000 * 0.10) + ((taxablePay - 24000) * 0.25);
  } else if (taxablePay <= 500000) {
    paye = (24000 * 0.10) + (8333 * 0.25) + ((taxablePay - 32333) * 0.30);
  } else if (taxablePay <= 800000) {
    paye = (24000 * 0.10) + (8333 * 0.25) + (467667 * 0.30) + ((taxablePay - 500000) * 0.325);
  } else {
    paye = (24000 * 0.10) + (8333 * 0.25) + (467667 * 0.30) + (300000 * 0.325) + ((taxablePay - 800000) * 0.35);
  }

  // Apply personal relief
  paye = Math.max(paye - personalRelief, 0);

  // -----------------------------
  // SHIF (2.75% of gross)
  // -----------------------------
  const shifDeduction = grossSalary * shifRate;

  // -----------------------------
  // Housing Levy (1.5% of gross)
  // -----------------------------
  const housingLevy = grossSalary * housingLevyRate;

  // -----------------------------
  // NET SALARY
  // -----------------------------
  const netSalary = grossSalary - (paye + nssfDeduction + shifDeduction + housingLevy);

  // -----------------------------
  // OUTPUT
  // -----------------------------
  return {
    grossSalary,
    nssfDeduction,
    taxablePay,
    paye,
    shifDeduction,
    housingLevy,
    netSalary
  };
}

// -----------------------------
// Example Usage
// -----------------------------
let salaryDetails = calculateNetSalary(50000, 10000);

console.log("Gross Salary:", salaryDetails.grossSalary);
console.log("NSSF Deduction:", salaryDetails.nssfDeduction);
console.log("Taxable Pay:", salaryDetails.taxablePay);
console.log("PAYE (Tax):", salaryDetails.paye);
console.log("SHIF Deduction:", salaryDetails.shifDeduction);
console.log("Housing Levy:", salaryDetails.housingLevy);
console.log("Net Salary:", salaryDetails.netSalary);
