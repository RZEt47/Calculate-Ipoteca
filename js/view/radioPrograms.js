import updateModel from "./../utils/updateModel.js"
function init(getData) {

    const {base, it, gov, zero} = getData().programs

    // Insert value in the HTML-markup
    document.querySelector('#base-value').value = base
    document.querySelector('#it-value').value = it
    document.querySelector('#gov-value').value = gov
    document.querySelector('#zero-value').value = zero

    // Insert value on the page
    document.querySelector('#base-text').innerText = `${base * 100 }%`
    document.querySelector('#it-text').innerText = `${it * 100 }%`
    document.querySelector('#gov-text').innerText = `${gov * 100 }%`
    document.querySelector('#zero-text').innerText = `${zero * 100 }%`

    // Find the radioButton
    const radioBtn = document.querySelectorAll('input[name = "program"]')

    radioBtn.forEach(function (radioBtn){
        radioBtn.addEventListener('change', function (){

            updateModel(this, {
                onUpdate: 'radioProgram',
                selectedProgram: parseFloat(this.value),
                id: this.id
            })
        })
    })
}

export default init