import updateModel from "./../utils/updateModel.js"
function init(getData) {

    const input = document.querySelector('#input-term')
    const settings = {
        numeral: true,
        numeralThousandsGroupStyle: 'thousand',
        delimiter: ' '
    }

    const cleaveInput = new Cleave(input, settings)
    cleaveInput.setRawValue(getData().time)

    input.addEventListener('input', function (){

        const value = +cleaveInput.getRawValue()

        // Check the min and max value
        if (value < getData().minYear || value > getData().maxYear) {
            input.closest('.param__details').classList.add('param__details--error')
        }
        // Check the acceptable range value
        else if (value >= getData().minYear && value <= getData().maxYear) {
            input.closest('.param__details').classList.remove('param__details--error')
        }

        // update Model
        updateModel(input, {
            time: value,
            onUpdate: 'inputTime'
        })
    })

    input.addEventListener('change', function (){

        const value = +cleaveInput.getRawValue()

        if (value > getData().maxYear) {
            input.closest('.param__details').classList.remove('param__details--error')
            cleaveInput.setRawValue(getData().maxYear)
        }
        else if (value < getData().minYear) {
            input.closest('.param__details').classList.remove('param__details--error')
            cleaveInput.setRawValue(getData().minYear)
        }

        // update Model
        updateModel(input, {
            time: +cleaveInput.getRawValue(),
            onUpdate: 'inputTime'
        })
    })

    return cleaveInput
}

export default init