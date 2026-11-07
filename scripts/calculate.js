const fs = require('fs');
const input = JSON.parse(fs.readFileSync(process.argv[2], 'utf8'));
const errors = [];
function field(key, max = Number.MAX_SAFE_INTEGER) {
  const value = Number(input[key]);
  if (input[key] === undefined || input[key] === null || input[key] === '' || !Number.isFinite(value) || value < 0 || value > max) {
    errors.push(`${key}必须在0到${max}之间`);
    return null;
  }
  return value;
}
const paid = field('paid');
const totalHours = field('totalHours');
const consumedHours = field('consumedHours');
const nonRefundable = field('nonRefundable');
const deductionRate = field('deductionRate', 1);
if (errors.length === 0 && totalHours <= 0) errors.push('totalHours必须大于0');
if (errors.length === 0 && consumedHours > totalHours) errors.push('已消耗课时不得大于总课时');
if (errors.length) {
  console.log(JSON.stringify({status:'invalid',formula_version:'1.0.2',errors}, null, 2));
  process.exit(2);
}
const remainingHours = Math.max(0, totalHours - consumedHours);
const proratedRemaining = totalHours ? Number((paid * remainingHours / totalHours).toFixed(2)) : null;
const rateDeduction = proratedRemaining === null ? null : Number((proratedRemaining * deductionRate).toFixed(2));
const candidateRefund = proratedRemaining === null ? null : Number(Math.max(0, proratedRemaining - nonRefundable - rateDeduction).toFixed(2));
const warnings = [];
if (nonRefundable + rateDeduction > proratedRemaining) warnings.push('合同扣减超过按剩余课时计算的金额，退款下限按0展示');
console.log(JSON.stringify({status:'ok',formula_version:'1.0.2',remainingHours,proratedRemaining,rateDeduction,candidateRefund,warnings,requiresPolicyReview:true}, null, 2));
