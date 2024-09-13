const data = [
    {
        bundle_id: 18,
        book_id: "abc"
    },
    {
        bundle_id: 19,
        book_id: "def"
    },
    {
        bundle_id: 20,
        book_id: "ghi"
    },
    {
        bundle_id: 18,
        book_id: "jkl"
    },
    {
        bundle_id: 19,
        book_id: "mno"
    },
    {
        bundle_id: 19,
        book_id: "pqr"
    },
    {
        bundle_id: 20,
        book_id: "stu"
    },
    {
        bundle_id: 19,
        book_id: "vwx"
    },
    {
        bundle_id: 18,
        book_id: "yz1"
    },
    {
        bundle_id: 18,
        book_id: "234"
    }
];

const books = [
    {
        "id": "1",
        "bundle_id": "19",
        "book_name": "Decatur HI-Way Airfield",
        "book_id": "844710162-2",
        "is_Premium": "FALSE",
        "bundle_Name": "ariddles24"
    },
    {
        "id": "2",
        "bundle_id": "8",
        "book_name": "Hasvik Airport",
        "book_id": "438226157-0",
        "is_Premium": "FALSE",
        "bundle_Name": "ngilderoyy"
    },
    {
        "id": "3",
        "bundle_id": "18",
        "book_name": "Hammerfest Airport",
        "book_id": "406808092-5",
        "is_Premium": "TRUE",
        "bundle_Name": "kbrandi0"
    },
    {
        "id": "4",
        "bundle_id": "13",
        "book_name": "Xewkija Heliport",
        "book_id": "248344238-2",
        "is_Premium": "TRUE",
        "bundle_Name": "bgariff3"
    },
    {
        "id": "5",
        "bundle_id": "1",
        "book_name": "Amderma Airport",
        "book_id": "043778955-1",
        "is_Premium": "TRUE",
        "bundle_Name": "ramorta"
    },
    {
        "id": "6",
        "bundle_id": "18",
        "book_name": "Virginia Tech Montgomery Executive Airport",
        "book_id": "743918925-6",
        "is_Premium": "TRUE",
        "bundle_Name": "kbrandi0"
    },
    {
        "id": "7",
        "bundle_id": "5",
        "book_name": "Badu Island Airport",
        "book_id": "996338447-1",
        "is_Premium": "TRUE",
        "bundle_Name": "lironl"
    },
    {
        "id": "8",
        "bundle_id": "16",
        "book_name": "Zhukovsky International Airport",
        "book_id": "637484593-5",
        "is_Premium": "TRUE",
        "bundle_Name": "cmeir1"
    },
    {
        "id": "9",
        "bundle_id": "19",
        "book_name": "Rajahmundry Airport",
        "book_id": "534527516-5",
        "is_Premium": "TRUE",
        "bundle_Name": "ariddles24"
    },
    {
        "id": "10",
        "bundle_id": "13",
        "book_name": "Billy Bishop Toronto City Centre Airport",
        "book_id": "842753290-3",
        "is_Premium": "FALSE",
        "bundle_Name": "bgariff3"
    },
    {
        "id": "11",
        "bundle_id": "3",
        "book_name": "Agartala Airport",
        "book_id": "022883907-6",
        "is_Premium": "FALSE",
        "bundle_Name": "msuthren6"
    },
    {
        "id": "12",
        "bundle_id": "1",
        "book_name": "Yeniseysk Airport",
        "book_id": "984080306-9",
        "is_Premium": "TRUE",
        "bundle_Name": "ramorta"
    },
    {
        "id": "13",
        "bundle_id": "18",
        "book_name": "Columbus Lowndes County Airport",
        "book_id": "311838226-0",
        "is_Premium": "FALSE",
        "bundle_Name": "kbrandi0"
    },
    {
        "id": "14",
        "bundle_id": "11",
        "book_name": "Pattaya Airpark",
        "book_id": "334687370-6",
        "is_Premium": "FALSE",
        "bundle_Name": "smccooked"
    },
    {
        "id": "15",
        "bundle_id": "13",
        "book_name": "Ie Jima Airport",
        "book_id": "151388832-3",
        "is_Premium": "FALSE",
        "bundle_Name": "bgariff3"
    },
    {
        "id": "16",
        "bundle_id": "13",
        "book_name": "Aitape Airport",
        "book_id": "973060427-4",
        "is_Premium": "TRUE",
        "bundle_Name": "bgariff3"
    },
    {
        "id": "17",
        "bundle_id": "20",
        "book_name": "Talkeetna Airport",
        "book_id": "774742502-3",
        "is_Premium": "FALSE",
        "bundle_Name": "rvickerstaffb"
    },
    {
        "id": "18",
        "bundle_id": "11",
        "book_name": "Quetzalcóatl International Airport",
        "book_id": "396780716-9",
        "is_Premium": "FALSE",
        "bundle_Name": "smccooked"
    },
    {
        "id": "19",
        "bundle_id": "18",
        "book_name": "Ağrı Airport",
        "book_id": "072782946-7",
        "is_Premium": "FALSE",
        "bundle_Name": "kbrandi0"
    },
    {
        "id": "20",
        "bundle_id": "4",
        "book_name": "Mörön Airport",
        "book_id": "808662698-9",
        "is_Premium": "FALSE",
        "bundle_Name": "jtonner2"
    },
    {
        "id": "21",
        "bundle_id": "5",
        "book_name": "Kebar Airport",
        "book_id": "644152828-2",
        "is_Premium": "TRUE",
        "bundle_Name": "lironl"
    },
    {
        "id": "22",
        "bundle_id": "13",
        "book_name": "Mifflin County Airport",
        "book_id": "905975648-7",
        "is_Premium": "FALSE",
        "bundle_Name": "bgariff3"
    },
    {
        "id": "23",
        "bundle_id": "20",
        "book_name": "Diomício Freitas Airport",
        "book_id": "827294785-4",
        "is_Premium": "TRUE",
        "bundle_Name": "rvickerstaffb"
    },
    {
        "id": "24",
        "bundle_id": "1",
        "book_name": "Samana El Portillo Airport",
        "book_id": "609631262-4",
        "is_Premium": "FALSE",
        "bundle_Name": "ramorta"
    },
    {
        "id": "25",
        "bundle_id": "16",
        "book_name": "Enid Woodring Regional Airport",
        "book_id": "274702723-6",
        "is_Premium": "FALSE",
        "bundle_Name": "cmeir1"
    },
    {
        "id": "26",
        "bundle_id": "9",
        "book_name": "Daugavpils Intrenational Airport",
        "book_id": "899505253-8",
        "is_Premium": "TRUE",
        "bundle_Name": "mgregoraceo"
    },
    {
        "id": "27",
        "bundle_id": "5",
        "book_name": "Cuito Cuanavale Airport",
        "book_id": "126028796-3",
        "is_Premium": "FALSE",
        "bundle_Name": "lironl"
    },]

function modifyData(arr) {
    let ansobj = {};
    for (let item of arr) {
        // console.log(item.bundle_id);
        // console.log(item.book_id);
        let bundle_id = item.bundle_id;
        let book_id = item.book_id;
        let newObj = {};
        newObj.book_id = book_id;
        if (ansobj[bundle_id] == undefined) {
            // console.log(ansobj[bundle_id])
            ansobj[bundle_id] = [];
        }
        // console.log(ansobj[bundle_id])
        ansobj[bundle_id].push(newObj)
        console.log(newObj);
    }
    return ansobj;
}

// console.log(modifyData(data));

function modifyToAnswer(obj) {
    let ans = [];
    for (let i of Object.keys(obj)) {
        // console.log(i)
        // console.log(obj[i]);
        let newObj = {};
        newObj.bundle_id = i;
        newObj.books_bundle = obj[i];
        console.log(newObj)
        ans.push(newObj);
    }
    return ans;
}

const ans = modifyToAnswer(modifyData(data));

// for (let i of ans) {
//     console.log(i);
// }


