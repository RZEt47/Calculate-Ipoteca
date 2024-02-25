import * as Model from "./model.js"

import updateResultsView from "./view/updateResultsView.js"
import costInput from "./view/costInput.js"
import programs from "./view/radioPrograms.js"
import costRange from "./view/costRange.js"
import {updateMinPercents} from "./view/utils.js"
import paymentInput from "./view/paymentInput.js"
import paymentRange from "./view/paymentRange.js"
import timeInput from "./view/timeInput.js"
import timeRange from "./view/timeRange.js"


window.onload = function () {

    const getData = Model.getData

    // Init program

    programs(getData)

    const cleaveCost = costInput(getData)

    const sliderCost = costRange(getData)

    // init paymentInput and sliderPayment
    const cleavePayment = paymentInput(getData)
    const sliderPayment = paymentRange(getData)

    // init timeInput and sliderTime
    const sliderTime = timeRange(getData)
    const cleaveTime = timeInput(getData)

    Model.setData({})
    const results = Model.getResults()
    updateResultsView(results)


    document.addEventListener('updateForm', function (e){

        Model.setData(e.detail)

        const data = Model.getData()
        const results = Model.getResults()

        // Update all form view based on Model
        updateFormAndSlider(data)

        //Update results block
        updateResultsView(results)
    })

    function updateFormAndSlider(data) {

        // update percents in input

        if (data.onUpdate === 'radioProgram') {
            updateMinPercents(data)

            // update payment slider
            sliderPayment.noUiSlider.updateOptions({
                range: {
                    min: data.minPayPercents * 100,
                    max: data.maxPayPercents * 100
                }
            })
        }

        // costInput
        if (data.onUpdate !== 'inputCost')  {
            cleaveCost.setRawValue(data.cost)
        }

        // costSlider
        if (data.onUpdate !== 'costSlider')  {
            sliderCost.noUiSlider.set(data.cost)
        }

        // paymentInput
        if (data.onUpdate !== 'inputPayment') {
            cleavePayment.setRawValue(data.payment)
        }

        // paymentSlider
        if (data.onUpdate !== 'paymentSlider')  {
            sliderPayment.noUiSlider.set(data.paymentPercents * 100)
        }

        // timeInput
        if (data.onUpdate !== 'inputTime') {
            cleaveTime.setRawValue(data.time)
        }

        // timeSlider
        if (data.onUpdate !== 'timeSlider') {
            sliderTime.noUiSlider.set(data.time)
        }
    }

    // Order Form
    const openFormBtn = document.querySelector('#openFormBtn')
    const orderForm = document.querySelector('#orderForm')
    const submitFormBtn = document.querySelector('#submitFormBtn')

    openFormBtn.addEventListener('click', function () {
        orderForm.classList.remove('none')
        openFormBtn.classList.add('none')
    })

    orderForm.addEventListener('submit', function (e) {
        e.preventDefault()

        // Get data from form
        const formData = new FormData(orderForm)

        // Disable input and buttons
        submitFormBtn.setAttribute('disabled', true)
        submitFormBtn.innerText = 'Заявка отправляется...'

        orderForm.querySelectorAll('input').forEach(function (input) {
            input.setAttribute('disabled', true)
        })

        fetchData()
        async function fetchData() {
            const data = Model.getData()
            const results = Model.getResults()

            let url = checkOnUrl(document.location.href)
            function checkOnUrl(url) {

                let urlArrayDot = url.split('.')

                // If last element of array
                if (urlArrayDot[urlArrayDot.length - 1]) {

                    urlArrayDot.pop()

                    let newUrl = urlArrayDot.join('/')

                    let newUrlSlash = newUrl.split('/')

                    if (newUrlSlash[newUrlSlash.length - 1] === 'index') {
                        newUrlSlash.pop()
                    }

                    newUrl = newUrlSlash.join('/') + '/'

                    return newUrl

                    // Для VS Code ссылка серверная другая:

                    // let urlArrayDot = url.split('.')
                    // console.log(urlArrayDot)
                    //
                    // if (urlArrayDot[urlArrayDot.length - 1] === 'html') {
                    //
                    //     urlArrayDot.pop()
                    //
                    //     let newUrl = urlArrayDot.join('.')
                    //     console.log(newUrl)
                    //
                    //     let urlArraySlash = newUrl.split('/')
                    //     console.log(urlArraySlash)
                    //
                    //     urlArraySlash.pop()
                    //
                    //     newUrl = urlArraySlash.join('/') + '/'
                    //     console.log(newUrl)
                    //     return newUrl
                }

                return url
            }

            const response = await fetch(url + 'mail.php', {
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/json;charset=utf-8'
                },
                body: JSON.stringify({
                    form: {
                        name: formData.get('name'),
                        email: formData.get('email'),
                        phone: formData.get('phone'),
                    },
                    data,
                    results
                })

            })

            const result = await response.text()

            submitFormBtn.removeAttribute('disabled', true)
            submitFormBtn.innerText = 'Оформить заявку'

            orderForm.querySelectorAll('input').forEach(function (input) {
                input.removeAttribute('disabled', true)
            })

            orderForm.reset()
            orderForm.classList.add('none')

            if (result === 'SUCCESS') {
                document.getElementById('success').classList.remove('none')
            } else {
                document.getElementById('error').classList.remove('none')
            }
        }
    })

}