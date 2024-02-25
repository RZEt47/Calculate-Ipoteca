import updateModel from "./../utils/updateModel.js"
function init(getData) {

    const input = document.querySelector('#input-downpayment')

    const settings = {
        numeral: true,
        numeralThousandsGroupStyle: 'thousand',
        delimiter: ' '
    }

    const cleaveInput = new Cleave(input, settings)
    cleaveInput.setRawValue(getData().payment)

    input.addEventListener('input', function (){

        const value = +cleaveInput.getRawValue()

        // Check the min and max first payment
        if (value < getData().getMinPayment() || value > getData().getMaxPayment()) {
            input.closest('.param__details').classList.add('param__details--error')
        }
        // Check the acceptable range price
        else if (value >= getData().getMinPayment() && value <= getData().getMaxPayment()) {
            input.closest('.param__details').classList.remove('param__details--error')
        }

        // update Model
        updateModel(input, {
            payment: value,
            onUpdate: 'inputPayment'
        })
    })

    input.addEventListener('change', function (){

        const value = +cleaveInput.getRawValue()

        if (value > getData().getMaxPayment()) {
            input.closest('.param__details').classList.remove('param__details--error')
            cleaveInput.setRawValue(getData().getMaxPayment())
        }
        else if (value < getData().getMinPayment()) {
            input.closest('.param__details').classList.remove('param__details--error')
            cleaveInput.setRawValue(getData().getMinPayment())
        }

        // update Model
        updateModel(input, {
            payment: value,
            onUpdate: 'inputPayment'
        })
    })

    return cleaveInput
}

export default init