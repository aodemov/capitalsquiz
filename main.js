let list;

let entries = [];
let mode = 0;

let current;
let hintLevel = 0;

let stats = {
    outOf: 0,
    right: 0,
    wrong: 0,
    startTime: 0,
    hints: 0,
}

const init = async () => {
    let response = await fetch("entries.json");
    list = await response.json();
    
    list.forEach((region, index) => {
        addRegion(region.name, index);
    });

    let input = document.getElementById('entry-answer');
    input.addEventListener("keydown", function(event) {
        if (event.keyCode === 13) {
            event.preventDefault();
            document.getElementById('continue-button').click();
        }
    });
}

const play = () => {
    entries = [];
    list.forEach((region, index) => {
        let button = document.getElementById('region-button-' + index);
        if (button.classList.contains('is-primary')) {
            localStorage['enable-' + region.name] = true;
            entries = entries.concat(list[index].countries);
        } else {
            localStorage['enable-' + region.name] = null;
        }
    })

    let modeSelect = document.getElementById('mode-select');
    mode = modeSelect.value;

    stats.startTime = Date.now();
    stats.right = 0;
    stats.wrong = 0;
    stats.hints = 0;
    stats.outOf = entries.length;

    document.getElementById('menu').style.display = 'none';
    document.getElementById('game').style.display = 'block';

    pickNext();

    document.getElementById('entry-answer').focus();
}

const pickNext = () => {
    if (entries.length === 0) {
        finish();
        return;
    }

    hintLevel = 0;

    let r = Math.floor(Math.random() * Math.floor(entries.length));

    current = entries[r];
    document.getElementById('entry-name').innerHTML = current.name;
    document.getElementById('entry-answer').value = '';

    let counterText = (stats.right + 1) + ' / ' + stats.outOf;
    document.getElementById('entry-counter').innerHTML = counterText;
}

const check = () => {
    let answer = document.getElementById('entry-answer').value;
    document.getElementById('entry-answer').classList.remove('is-danger');

    if (current.capital.toLowerCase() === answer.toLowerCase()) {
        stats.right += 1;
        entries.splice(entries.indexOf(current), 1);
        pickNext();
    } else { 
        stats.wrong += 1;
        document.getElementById('entry-answer').classList.add('is-danger');
    }
}

const hint = () => {
    if ((hintLevel + 1) <= current.capital.length) {
        stats.hints++;
        document.getElementById('entry-answer').value = current.capital.substring(0, hintLevel + 1);
        hintLevel += 1;
    }
}

const finish = () => {
    document.getElementById('game').style.display = 'none';
    document.getElementById('stats').style.display = 'block';

    let elapsed = new Date(Date.now() - stats.startTime);

    document.getElementById('stats-right').innerHTML = '<b>Completed: </b>' + stats.right + ' / ' + stats.outOf + ' (' + (Math.round(100 * stats.right / stats.outOf) + '%)');
    document.getElementById('stats-mistakes').innerHTML = '<b>Mistakes: </b>' + stats.wrong;
    document.getElementById('stats-hints').innerHTML = '<b>Hints used: </b>' + stats.hints;
    document.getElementById('stats-time').innerHTML = '<b>Time elapsed: </b>' + elapsed.getMinutes() + 'm ' + elapsed.getSeconds() + 's';
}

const again = () => {
    document.getElementById('game').style.display = 'none';
    document.getElementById('stats').style.display = 'none';
    document.getElementById('menu').style.display = 'block';
}

const addRegion = (name, id) => {
    const el = document.getElementById('region-buttons');
    el.insertAdjacentHTML('beforeend', '<button id="region-button-' + id + '" class="button is-outlined ' + ((localStorage['enable-' + name] === 'true') ? 'is-primary' : '') + '" onclick="toggleRegion(this)">' + name + '</button>');
}

const toggleRegion = (el) => {
    el.classList.toggle("is-primary");
}


init();