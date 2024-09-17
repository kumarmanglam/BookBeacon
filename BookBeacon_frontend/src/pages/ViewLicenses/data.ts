
export const licenses = [
    {
        _license_id: 101,
        license_name: "Basic License",
        bundle_id: 1001,
        mode: "normal",
    }, {
        _license_id: 101,
        license_name: "Advanced License",
        bundle_id: 1001,
        mode: "premium",
    }, {
        _license_id: 101,
        license_name: "Basic License",
        bundle_id: 1001,
        mode: "premium",
    },
];
const filteredData = licenses.map(({ license_name, mode }) => ({
    license_name,
    mode
  }));

export default filteredData;
