function calculateNetSalary(basic, benefits) {
  const gross = basic + benefits;

  // NSSF and SHIF calculations
  const nssfTier1 = Math.min(gross, 8000) * 0.06;
  const nssfTier2 = gross > 8000 ? Math.min(gross - 8000, 72000 - 8000) * 0.06 : 0;
  const nssf = Math.min(nssfTier1 + nssfTier2, 4320);
  const shif = Math.max(300, gross * 0.0275); 

  let taxable = gross - (nssf + shif);

  let paye = 0;
  const relief = 2400;
  const bands = [
    { upTo: 24000, rate: 0.10 },
    { upTo: 32333, rate: 0.25 },
    { upTo: 500000, rate: 0.30 },
    { upTo: 800000, rate: 0.325 },
    { upTo: Infinity, rate: 0.35 }
  ];
   let remaining = taxable;
  let lower = 0;
  for (const band of bands) {
    if (remaining <= 0) break;
    const taxablePortion = Math.min(remaining, band.upTo - lower);
    paye += taxablePortion * band.rate;
    remaining -= taxablePortion;
    lower = band.upTo;
  }
  paye = Math.max(0, paye - relief);

  // -- Net Salary --
  const net = gross - (nssf + shif + paye);

  console.log(`Gross: Ksh ${gross.toFixed(2)}`);
  console.log(`NSSF Deduction: Ksh ${nssf.toFixed(2)}`);
  console.log(`SHIF Deduction: Ksh ${shif.toFixed(2)}`);
  console.log(`PAYE: Ksh ${paye.toFixed(2)}`);
  console.log(`Net Salary: Ksh ${net.toFixed(2)}`);
}

calculateNetSalary();


  