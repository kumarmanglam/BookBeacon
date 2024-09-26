export interface booksInLicenseStructure {
    "book_name": "Agartala Airport",
    "book_id": 22883907,
    "is_Premium": false,
    "concurrency": -1,
    "_id": "66f2dbaac2cdd42415045c4d"
}

export interface licenseStructure {
    "_id": string,
    "license_name": string,
    "bundle_id": number,
    "mode": string,
    "start_date": string,
    "end_date": string,
    "purchase_date": string,
    "booksInBundle": booksInLicenseStructure[]
}