document.getElementById('emiForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const loanAmount = parseFloat(document.getElementById('loanAmount').value);
    const interestRate = parseFloat(document.getElementById('interestRate').value) / 12 / 100;
    const loanTenure = parseFloat(document.getElementById('loanTenure').value) * 12;

    const emi = (loanAmount * interestRate * Math.pow(1 + interestRate, loanTenure)) / (Math.pow(1 + interestRate, loanTenure) - 1);
    const totalAmountPayable = emi * loanTenure;
    const totalInterestPayable = totalAmountPayable - loanAmount;

    document.getElementById('monthlyEMI').innerText = `Rs ${emi.toFixed(2)}`;
    document.getElementById('totalAmountPayable').innerText = `Rs ${totalAmountPayable.toFixed(2)}`;
    document.getElementById('totalInterestPayable').innerText = `Rs ${totalInterestPayable.toFixed(2)}`;

    const ctx = document.getElementById('emiChart').getContext('2d');
    new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['Principal Amount', 'Total Interest Payable'],
            datasets: [{
                data: [loanAmount, totalInterestPayable],
                backgroundColor: ['#36a2eb', '#ff6384']
            }]
        }
    });
});
