const constants = {
    loanAmountRange: {
        min: 500,
        max: 5000,
        unit: "USD"
    }, // in USD
    loanDurationRange: {
        min: 6,
        max: 24,
        unit: "months"
    }, // in months
    apiRootURL: "https://ftl-frontend-test.herokuapp.com/interest"
}

export default constants;