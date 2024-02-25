import updateModel from "./../utils/updateModel.js";

function init(getData) {

    const slider = document.querySelector('#slider-term')

    noUiSlider.create(slider, {
        start: getData().time,
        connect: 'lower',
        tooltips: true,
        step: 1,
        range: {
            min: getData().minYear,
            max: getData().maxYear
        },
        format: wNumb({
            decimals: 0,
            thousand: ' ',
            suffix: ''
        })
    })

    slider.noUiSlider.on('slide', function () {

        let sliderValue = slider.noUiSlider.get()
        sliderValue = sliderValue.split('.')[0]
        sliderValue = parseInt(String(sliderValue).replace(/ /g, ''))

        updateModel(slider, {
            time: sliderValue,
            onUpdate: 'timeSlider'
        })
    })

    return slider
}

export default init