const el = str => document.querySelector(str);


class GuitarSimulator {
    constructor() {
        this.GUITAR_STRING_TOTAL = 6;
        this.GUITAR_FRET_TOTAL = 13;
        this.fretData = {};
        this.curMusicalScaleName = "";
        let _musicalScaleData = localStorage.getItem("musicalScaleData");
        this.musicalScaleData = (_musicalScaleData == null ? null : JSON.parse(_musicalScaleData)) || musicalScaleData;
        this.container = el("#guitar_container");
        this.selectBox = el("#select_box");
        this.resetButton = el("#reset_button");
        this.init();
    }
    init() {
        this.renderStrings();
        this.renderSelectOptions();
        this.handleMusicalScaleChange();
        this.handleResetData();
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
        let inner = "<option style='display: none'></option>";
        for (const majorOrMinorName in this.musicalScaleData) {
            const musicalScaleList = this.musicalScaleData[majorOrMinorName];
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
            that.curMusicalScaleName = this.options[this.selectedIndex].text;
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
                this.handleInput(touchContent, touchInput, stringName, fretLiIndex);
            });
        }
    }
    initFretData() {
        for (const stringName in this.fretData) {
            this.fretData[stringName] = this.fretData[stringName].map(curFret => {
                return {
                    ...curFret,
                    isTouched: false,
                }
            });
        }
    }
    handleInput(touchContent, touchInput, stringName, fretLiIndex) {
        const that = this;
        touchContent.onclick = function () {
            this.style.display = "none";
            touchInput.style.display = "block";
            touchInput.value = touchContent.innerHTML;
            touchInput.focus();
        }
        touchInput.onblur = function () {
            const newVal = this.value;
            this.style.display = "none";
            touchContent.style.display = "block";
            touchContent.innerHTML = newVal;
            that.fretData[stringName][fretLiIndex].content = newVal;
            const curModifyStringIndex = Number(stringName.slice(6)) - 1;
            that.musicalScaleData[that.curMusicalScaleName] = that.musicalScaleData[that.curMusicalScaleName].map(item => {
                if (item.stringIndex === curModifyStringIndex && item.fretIndex === fretLiIndex) {
                    return {
                        ...item,
                        content: newVal,
                    }                    
                }
                return item;
            });
            localStorage.setItem("musicalScaleData", JSON.stringify(that.musicalScaleData));
            that.selectBox.options[that.selectBox.selectedIndex].value = JSON.stringify(that.musicalScaleData[that.curMusicalScaleName]);
        }
    }
    handleResetData() {
        this.resetButton.onclick = () => {
            if (window.confirm("确认初始化所有数据？")) {
                localStorage.removeItem("musicalScaleData");
                alert("数据初始化成功！");
                window.location.reload();
            }
        } 
    }

}

new GuitarSimulator();