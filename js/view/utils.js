
function updateMinPercents(data) {
    document.querySelector('#percents-from').innerText = data.minPayPercents * 100 + '%'
}

export {updateMinPercents}