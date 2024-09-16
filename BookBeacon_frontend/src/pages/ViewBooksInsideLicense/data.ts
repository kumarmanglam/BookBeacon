export interface Book {
    book_name: string;
    book_id: number;
    is_Premium: boolean;
    concurrency: number;
}

export interface License {
    _license_id: number;
    license_name: string;
    bundle_id: number;
    mode: string;
    booksInBundle: Book[];
}

export const licenses = [
    {
        _license_id: 101,
        license_name: "Basic License",
        bundle_id: 1001,
        mode: "normal",
        booksInBundle: [
            {
                book_name: "JavaScript Essentials",
                book_id: 5001,
                is_Premium: false,
                concurrency: -1
            },
            {
                book_name: "React Fundamentals",
                book_id: 5002,
                is_Premium: false,
                concurrency: -1
            }
        ]
    },
    {
        _license_id: 102,
        license_name: "Premium License",
        bundle_id: 1002,
        mode: "premium",
        booksInBundle: [
            {
                book_name: "Advanced Node.js",
                book_id: 5003,
                is_Premium: true,
                concurrency: 1
            },
            {
                book_name: "GraphQL Mastery",
                book_id: 5004,
                is_Premium: true,
                concurrency: 1
            }
        ]
    },
    {
        _license_id: 103,
        license_name: "Enterprise License",
        bundle_id: 1003,
        mode: "premium",
        booksInBundle: [
            {
                book_name: "Full-Stack Development",
                book_id: 5005,
                is_Premium: false,
                concurrency: -1
            },
            {
                book_name: "Microservices Architecture",
                book_id: 5006,
                is_Premium: true,
                concurrency: 1
            },
            {
                book_name: "Cloud Native Applications",
                book_id: 5007,
                is_Premium: false,
                concurrency: -1
            }
        ]
    }
];
