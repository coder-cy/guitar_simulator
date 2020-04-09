const el = str => document.querySelector(str);


class GuitarSimulator {
    constructor() {
        this.GUITAR_STRING_TOTAL = 6;
        this.GUITAR_FRET_TOTAL = 13;
        this.fretData = {};
        this.container = el("#guitar_container");
        this.selectBox = el("#select_box");
        this.init();
    }
    init() {
        this.renderStrings();
        this.renderSelectOptions();
        this.handleMusicalScaleChange();
    }
    renderStrings() {
        let inner = '';
        for (let i = 0; i < this.GUITAR_STRING_TOTAL; i++) {
            inner += `<ul class="string${i + 1} string">`;
            this.fretData[`string${i + 1}`] = [];
            for (let j = 0; j < this.GUITAR_FRET_TOTAL; j++) {
                inner += `
                    <li class="fret${j} fret">
                        <div style="display: none" class="touch_point"></div>
                        <div style="display: none" class="content"></div>
                        <input style="display: none" type="text">
                    </li>
                `;
                this.fretData[`string${i + 1}`].push({
                    stringIndex: i,
                    stringName: `${i + 1}弦`,
                    fretIndex: j,
                    fretName: `${j}品`,
                    isTouched: false,
                    content: "",
                });
            }
            inner += '</ul>';
        }
        this.container.innerHTML = inner;
    }
    renderSelectOptions() {
        let inner = "";
        for (const majorOrMinorName in musicalScaleData) {
            const musicalScaleList = musicalScaleData[majorOrMinorName];
            inner += `
                <option value=${JSON.stringify(musicalScaleList)}>${majorOrMinorName}</option>
            `;
        }
        this.selectBox.innerHTML = inner;

    }
    handleMusicalScaleChange() {
        const that = this;
        this.selectBox.onchange = function (ev) {
            that.initFretData();
            var ev = ev || event;
            const tarList = JSON.parse(ev.target.value);
            tarList.forEach(tar => {
                const {
                    stringIndex,
                    fretIndex,
                    content
                } = tar;
                for (const stringName in that.fretData) {
                    if (stringName.includes(stringIndex + 1)) {
                        that.fretData[stringName][fretIndex].isTouched = true;
                        that.fretData[stringName][fretIndex].content = content;
                    }
                }
            })
            that.updateStrings();
        }
    }
    updateStrings() {
        for (const stringName in this.fretData) {
            const curFretList = this.fretData[stringName];
            const fretLis = Array.from(el("." + stringName).children);
            fretLis.forEach((fretLi, fretLiIndex) => {
                const touchPoint = fretLi.children[0];
                const touchContent = fretLi.children[1];
                const touchInput = fretLi.children[2];

                touchPoint.style.display = curFretList[fretLiIndex].isTouched ? "block" : "none";
                touchContent.style.display = curFretList[fretLiIndex].isTouched ? "block" : "none";
                touchContent.innerHTML = curFretList[fretLiIndex].content;
            });
        }
    }
    initFretData() {
        for (const stringName in this.fretData) {
            this.fretData[stringName] = this.fretData[stringName].map(curFret => {
                return {
                    ...curFret,
                    isTouched: false,
                    content: "",
                }
            });
        }
        // console.log("init", this.fretData)
    }

}

new GuitarSimulator();