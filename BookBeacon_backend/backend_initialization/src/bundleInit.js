const data = require("./raw_data.json")
const fs = require("fs");

function makeBundleList(data) {
    const bundleMap = new Map();

    for (let item of data) {
        let newObj = {};
        newObj.bundle_id = item.bundle_id;
        newObj.bundle_name = item.bundle_name;
        if (!bundleMap.has(item.bundle_id)) {
            bundleMap.set(item.bundle_id, newObj);
        }
    }

    let ans = Array.from(bundleMap.values())

    return ans.sort((a, b) => a.bundle_id - b.bundle_id);
}

// console.log(makeBundleList(data))

function writeBundleList() {
    fs.writeFileSync("./data/bundles.json", JSON.stringify(makeBundleList(data), null, 2), "utf-8");
}