/**
 * 定义数据的规则：
 * 1. stringIndex表示弦的顺序，值为第“几”弦【减1】，如：stringIndex: 0 表示 1弦，stringIndex: 4 表示 5弦。
 * 2. fretIndex表示品格的顺序，值为第“几”格，如：fretIndex: 0 表示 0格空弦，fretIndex: 4 表示 4格。
 * 3. content表示默认显示的内容，必须是字符串的形式（英语半角的引号""）。
 * 4. 建议添加数据的顺序，按照 do/re/mi/fa/so/la/si/do 即 content："1"/"2"/"3"/"4"/"5"/"6"/"7" 的顺序进行添加。
 * 5. 规则按照默认的C major和D这样进行即可，把你希望显示的和弦名字作为键名添加即可，如 "F": [{}, {}]。
 */
var musicalScaleData = {
    "C major": [{
            stringIndex: 4,
            fretIndex: 3,
            content: "1",
        },
        {
            stringIndex: 3,
            fretIndex: 0,
            content: "2",
        },
        {
            stringIndex: 3,
            fretIndex: 2,
            content: "3",
        },
        {
            stringIndex: 3,
            fretIndex: 3,
            content: "4",
        },
        {
            stringIndex: 2,
            fretIndex: 0,
            content: "5",
        },
        {
            stringIndex: 2,
            fretIndex: 2,
            content: "6",
        },
        {
            stringIndex: 1,
            fretIndex: 0,
            content: "7",
        },
        {
            stringIndex: 1,
            fretIndex: 1,
            content: "i",
        },
    ],
    "D": [
        {
            stringIndex: 4,
            fretIndex: 5,
            content: "1",
        },
        {
            stringIndex: 4,
            fretIndex: 7,
            content: "2",
        },
        {
            stringIndex: 3,
            fretIndex: 4,
            content: "3",
        },
        {
            stringIndex: 3,
            fretIndex: 5,
            content: "4",
        },
        {
            stringIndex: 3,
            fretIndex: 7,
            content: "5",
        },
        {
            stringIndex: 2,
            fretIndex: 4,
            content: "6",
        },
        {
            stringIndex: 2,
            fretIndex: 6,
            content: "7",
        },
        {
            stringIndex: 2,
            fretIndex: 8,
            content: "i",
        },
    ]
};