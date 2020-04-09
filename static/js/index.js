const el = str => document.querySelector(str);


class GuitarSimulator {
    constructor() {
        this.GUITAR_STRING_TOTAL = 6;
        this.GUITAR_FRET_TOTAL = 12;
        this.fretData = {};
        this.container = el("#guitar_container");
        this.selectBox = el("#select_box");
        this.init();
    }
    init() {
        this.renderString();
    }
    renderString() {
        let inner = '';
        for (let i = 0; i < this.GUITAR_STRING_TOTAL; i++) {
            inner += `<ul class="string${i + 1} string">`;
            const curFretList = [];
            this.fretData[`string${i + 1}`] = curFretList;
            for (let j = 0; j < this.GUITAR_FRET_TOTAL; j++) {
                inner += `
                    <li class="fret${j + 1} fret">
                        <div style="display: block" class="touch_point"></div>
                        <div style="display: block" class="content"></div>
                        <input type="text" style="display: none">
                    </li>
                `;
                curFretList.push({
                    stringIndex: i,
                    stringName: `${i + 1}弦`,
                    fretIndex: j,
                    fretName: `${j + 1}品`,
                    isTouched: false,
                    content: "",
                });
            }
            inner += '</ul>';
        }
        this.container.innerHTML = inner;
    }

}

new GuitarSimulator();