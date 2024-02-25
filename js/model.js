
let data = {
    selectedProgram: 0.1,
    cost: 12000000,
    minPrice: 375000,
    maxPrice: 100000000,
    minPayPercents: 0.15,
    maxPayPercents: 0.9,
    paymentPercents: 0.5,
    payment: 6000000,
    getMinPayment: function () {
      return this.cost * this.minPayPercents
    },
    getMaxPayment: function () {
        return this.cost * this.maxPayPercents
    },
    minYear: 1,
    maxYear: 30,
    time: 10,
    programs: {
        base: 0.1,
        it: 0.047,
        gov: 0.067,
        zero: 0.12
    },
}

let results = {
    rate: data.selectedProgram
}

function getData() {
    return {...data}
}

function getResults() {
    return {...results}
}

function setData(newData) {

    // Filter of percents
    if (newData.onUpdate === 'radioProgram') {
        if (newData.id === 'zero-value') {
            data.minPayPercents = 0
        } else {
            data.minPayPercents = 0.15
        }
    }

    // Filter of cost
    if (newData.onUpdate === 'inputCost' || newData.onUpdate === 'costSlider') {
        if (newData.cost < data.minPrice) {
            newData.cost = data.minPrice
        }
        else if (newData.cost > data.maxPrice) {
            newData.cost = data.maxPrice
        }

    // Filter of first payment
        if (data.payment > data.getMaxPayment()) {
            data.payment = data.getMaxPayment()
        } else if (data.payment < data.getMinPayment()) {
            data.payment = data.getMinPayment()
        }

        data.paymentPercents = (data.payment * 100) / newData.cost / 100
    }

    // Filter of higher and lower percent
    if (newData.onUpdate === 'inputPayment') {

        newData.paymentPercents = newData.payment / data.cost

        // if percents more than 90%
        if (newData.paymentPercents > data.maxPayPercents) {
            newData.paymentPercents = data.maxPayPercents
            newData.payment = data.cost * data.maxPayPercents
        }

        // if percents less than 90%
        if (newData.paymentPercents < data.minPayPercents) {
            newData.paymentPercents = data.minPayPercents
            newData.payment = data.cost * data.minPayPercents
        }
    }

    // Filter of rangePayment
    if (newData.onUpdate === 'paymentSlider') {
        newData.paymentPercents = newData.paymentPercents / 100
        data.payment = data.cost * newData.paymentPercents
    }

    // Filter of time
    if (newData.onUpdate === 'inputTime') {

        if (newData.time > data.maxYear) {
            newData.time = data.maxYear
        }

        if (newData.time < data.minYear) {
            newData.time = data.minYear
        }
    }

    data = {
        ...data,
        ...newData
    }

    // Calculate results

    const months = data.time * 12
    const totalAmount = data.cost - data.payment
    const monthRate = data.selectedProgram / 12
    const generalRate = (1 + monthRate) ** months
    const monthPayment = (totalAmount * monthRate * generalRate) / (generalRate - 1)
    const overPayment = monthPayment * months - totalAmount

    results = {
        rate: data.selectedProgram,
        totalAmount,
        monthPayment,
        overPayment
    }

}

export {getData, setData, getResults}